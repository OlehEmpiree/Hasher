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

        /* TODO
        * (1 done). Добавить возможность выбрать тип хэша через API (support SHA256)
        * 2. Добавить логгирование
        * 3. Очищение результатов хэша спустя время (1-2 минуты)
        * 4. Упростить работу с API
        * 5. Добавить обновление прогресса (!)
        * */

//        get("$API_STRING/start") {
//            val pathParam = call.parameters["file"]
//            val hashParam =
//                call.parameters["hash"]?.uppercase()
//
//            val hashType: HashType = try {
//                hashParam?.let { hash ->
//                    HashType.valueOf(hash)
//                } ?: HashType.MD5
//            } catch (ignored: Exception) {
//                HashType.MD5
//            }
//
//            pathParam?.let { path ->
//                try {
//                    worker.startNew(path, hashType, object : OnHashingListener {
//                        override suspend fun onStarted(hashProcessId: UUID) {
//                            val process = HashProcessToken(hashProcessId, path)
//                            call.respond(process)
//                        }
//
//                        override suspend fun onFailed(message: String) {
//                            call.respondText(message)
//                        }
//
//                        override suspend fun onAborted(message: String) {
//                            call.respondText(message)
//                        }
//                    })
//                } catch (exception: Exception) {
//                    log.error(exception.message)
//                }
//            }
//
//        }

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
