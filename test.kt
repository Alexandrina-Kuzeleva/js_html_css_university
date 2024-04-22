class User(val name: String)

val firstUser = User("Ivan")
val secondUser = User("Ivan")
val hashSet = setOf(firstUser, secondUser)

println("The set size is ${hashSet.size}")