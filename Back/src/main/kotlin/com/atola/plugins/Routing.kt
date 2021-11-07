package com.atola.plugins

import com.atola.common.HashType
import com.atola.core.HashWorker
import com.atola.core.OnHashingListener
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import java.util.*



fun Application.configureRouting() {

    val API_STRING = "/api"
    var worker = HashWorker()

    routing {
        get("$API_STRING") {
            call.respondText("SERVER IS STARTED!")
        }

        get("$API_STRING/getResult") {

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
        * */

        get("$API_STRING/getHash") {
            val path = call.parameters["filePath"]
            path?.let { it ->
                try {
                    worker.startNew(it, HashType.MD5, object : OnHashingListener {
                        override suspend fun onStarted(hashProcessId: UUID) {
                            call.respondText(hashProcessId.toString())
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
