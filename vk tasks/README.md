# Quest Service

## Запуск сервиса

1. Убедитесь, что у вас установлены Docker и Docker Compose.

2. Клонируйте репозиторий
3. Перейдите в директорию проекта:
    cd quest-service
4. Запустите сервис:
    docker-compose up
5. После запуска сервиса, вы можете открыть браузер и перейти по адресу http://localhost:8080.

6. API
    Создание пользователя
 http
POST /user
Content-Type: application/json

{
    "name": "John Doe",
    "balance": 100
}
Создание задания
http
Copy code
POST /quest
Content-Type: application/json

{
    "name": "Complete a task",
    "cost": 50,
    "owner": 1
}
Выполнение задания
http
Copy code
POST /complete
Content-Type: application/json

{
    "user_id": 1,
    "quest_id": 1
}
Получение истории пользователя
http
Copy code
GET /history?user_id=1
7. Тесты
Для запуска тестов используйте команду:

bash
Copy code
go test -v
Архитектура
Сервис создан на основе минимальной архитектуры REST API, используя Go для серверной части и PostgreSQL для хранения данных.

Кастомизация заданий
В данной версии сервиса не реализована какая-либо кастомизация заданий. Для добавления такой функциональности можно расширить модель заданий и добавить соответствующие методы в код.

Плюсы
Минималистичный дизайн

Легкость в расширении функциональности

Использование Go и PostgreSQL

Минусы
Отсутствие кастомизации заданий

Нет реализации механизма многошаговых заданий

