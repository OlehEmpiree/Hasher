package com.atola.plugins

import com.atola.core.HashWorker
import com.atola.core.OnHashingListener
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

data class Test(val Name: String, val age: Int)

fun Application.configureRouting() {

    routing {
        get("/api") {
            call.respondText("SERVER IS STARTED!")
        }
//        get("/api/getString") {
//            call.respond(Test("Test", 1))
//        }
//        get("/api/setString") {
//            println(call.parameters["string"])
//            call.respond("")
//        }

        get("/api/getHash"){
            val path = call.parameters["filePath"]

            val worker = HashWorker()

            path?.let { it ->
                try {
                    val hash = worker.Create(it, object : OnHashingListener {
                        override suspend fun onProgressChanged() {
                            call.respondText(worker.progress.toString())
                        }
                    })
                    call.respondText("Hashing is done! You file path: $path ... MD5Hash = $hash")
                }catch(exception: Exception){
                    call.respondText(exception.message.toString())
                }


            }

        }
    }
}
