package com.atola.plugins

import com.atola.common.HashType
import com.atola.core.HashWorker
import com.atola.core.OnHashingListener
import com.atola.models.HashProcessToken
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import java.util.*


fun Application.configureRouting() {

    val API_STRING = "/api"
    val worker = HashWorker()

    routing {
        get(API_STRING) {
            call.respondText("SERVER IS STARTED!")
        }

        get("$API_STRING/result") {

            val id = call.parameters["id"]

            id?.let {
                worker.hashResults.forEach {
                    if (it.Id.toString() == id) {
                        if (it.Hash == null) {
                            call.respondText(it.Progress.toString())
                            return@get
                        }
                        call.respond(it)
                        return@get
                    }
                }
            }

            call.respondText("Not found your hash :(")

        }

        /* TODO
        * 1. Добавить возможность выбрать тип хэша через API (support SHA256)
        * 2. Добавить логгирование
        * 3. Очищение результатов хэша спустя время (1-2 минуты)
        * 4. Упростить работу с API
        * 5. Добавить обновление прогресса (!)
        * */

        get("$API_STRING/start") {
            val pathParam = call.parameters["file"]
            val hashParam =
                call.parameters["hash"]?.uppercase()

            val hashType: HashType = try {
                hashParam?.let { hash ->
                    HashType.valueOf(hash)
                } ?: HashType.MD5
            } catch (ignored: Exception) {
                HashType.MD5
            }

            pathParam?.let { path ->
                try {
                    worker.startNew(path, hashType, object : OnHashingListener {
                        override suspend fun onStarted(hashProcessId: UUID) {
                            val process = HashProcessToken(hashProcessId, path)
                            call.respond(process)
                        }

                        override suspend fun onFailed(message: String) {
                            call.respondText(message)
                        }
                    })
                } catch (exception: Exception) {
                    log.error(exception.message)
                }
            }

        }
    }
}
