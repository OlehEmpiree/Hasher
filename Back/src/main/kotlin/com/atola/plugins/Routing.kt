package com.atola.plugins

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

data class Test(val Name: String, val age: Int)

fun Application.configureRouting() {

    routing {
        get("/api") {
            call.respondText("Hello World!")
        }
        get("/api/getString") {
            call.respond(Test("Test", 1))
        }
        get("/api/setString") {
            println(call.parameters["string"])
            call.respond("")
        }
    }
}
