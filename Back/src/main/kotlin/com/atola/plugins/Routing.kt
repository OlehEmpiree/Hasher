package com.atola.plugins

import com.atola.common.HashTaskParams
import com.atola.common.HashType
import com.atola.core.HashTask
import com.atola.core.OnHashingListener
import com.atola.tasks.Tasks
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.io.File
import java.util.*


fun Application.configureRouting() {

    val API_STRING = "/api"

    routing {
        get(API_STRING) {
            call.respondText("SERVER IS STARTED!")
        }

        get("$API_STRING/getAll") {
            call.respond(Tasks.AllTasks.map(HashTask::getResult))
        }

        get("$API_STRING/fileExist"){

            val filePath = call.parameters["filePath"]

            if(filePath.isNullOrEmpty())
                call.respond(false)
            else
                call.respond(File(filePath).exists())
        }

        get("$API_STRING/remove") {
            val token = call.parameters["token"]

            if (token == null) {
                call.respond(false)
                return@get
            }

            val task = Tasks.AllTasks.firstOrNull {
                it.token.toString() == token
            }
            if (task == null) {
                call.respond(false)
                return@get
            }

            task.abort()
            Tasks.AllTasks.remove(task)
            call.respond(true)
        }

        get("$API_STRING/start") {
            val pathParam = call.parameters["file"]!!
            val hashParam = call.parameters["hash"]?.uppercase() ?: "MD5"

            val hashType = HashType.fromString(hashParam)

            val file = File(pathParam)
            val hashTask = HashTask(HashTaskParams(file, hashType))

            Tasks.AllTasks.add(hashTask)

            call.respond(hashTask.token)

            CoroutineScope(Dispatchers.IO).launch {
                hashTask.start()
            }

        }
    }
}
