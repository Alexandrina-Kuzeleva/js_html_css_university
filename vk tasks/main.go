package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "quest_service"
)

type User struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Balance int    `json:"balance"`
}

type Quest struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Cost  int    `json:"cost"`
	Owner int    `json:"owner"`
}

var db *sql.DB

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/user", createUser)
	http.HandleFunc("/quest", createQuest)
	http.HandleFunc("/complete", completeQuest)
	http.HandleFunc("/history", getUserHistory)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sqlStatement := `
		INSERT INTO users (name, balance)
		VALUES ($1, $2)
		RETURNING id`
	id := 0
	err = db.QueryRow(sqlStatement, user.Name, user.Balance).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.ID = id
	json.NewEncoder(w).Encode(user)
}

func createQuest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var quest Quest
	err := json.NewDecoder(r.Body).Decode(&quest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sqlStatement := `
		INSERT INTO quests (name, cost, owner)
		VALUES ($1, $2, $3)
		RETURNING id`
	id := 0
	err = db.QueryRow(sqlStatement, quest.Name, quest.Cost, quest.Owner).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	quest.ID = id
	json.NewEncoder(w).Encode(quest)
}

func completeQuest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var params struct {
		UserID  int `json:"user_id"`
		QuestID int `json:"quest_id"`
	}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tx, err := db.Begin()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Check if the user has already completed the quest
	var completed int
	err = tx.QueryRow("SELECT COUNT(*) FROM completed_quests WHERE user_id = $1 AND quest_id = $2", params.UserID, params.QuestID).Scan(&completed)
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if completed > 0 {
		tx.Rollback()
		http.Error(w, "Quest already completed", http.StatusBadRequest)
		return
	}

	// Update user's balance
	_, err = tx.Exec("UPDATE users SET balance = balance + (SELECT cost FROM quests WHERE id = $1) WHERE id = $2", params.QuestID, params.UserID)
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Mark the quest as completed
	_, err = tx.Exec("INSERT INTO completed_quests (user_id, quest_id) VALUES ($1, $2)", params.UserID, params.QuestID)
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tx.Commit()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func getUserHistory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT quests.name, quests.cost FROM completed_quests JOIN quests ON completed_quests.quest_id = quests.id WHERE completed_quests.user_id = $1", userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var history []Quest
	for rows.Next() {
		var quest Quest
		err := rows.Scan(&quest.Name, &quest.Cost)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		history = append(history, quest)
	}

	var userBalance int
	err = db.QueryRow("SELECT balance FROM users WHERE id = $1", userID).Scan(&userBalance)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := struct {
		History []Quest `json:"history"`
		Balance int     `json:"balance"`
	}{
		History: history,
		Balance: userBalance,
	}

	json.NewEncoder(w).Encode(response)
}