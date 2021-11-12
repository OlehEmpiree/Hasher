package com.atola.core

import com.atola.common.HashTaskParams
import com.atola.models.HashProcessToken
import com.atola.models.HashResult
import kotlinx.coroutines.CompletableDeferred
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousFileChannel
import java.security.MessageDigest
import java.util.*


class HashTask(val params: HashTaskParams) {

    private var checksum = ""
    val token: UUID = UUID.randomUUID()

    var isAborted = false
        get() = field
        private set(value) {
            field = value
        }
    var progress = -1
        get() = field
        private set(value) {
            field = value
        }


    fun abort() {
        if (!isAborted)
            isAborted = true
    }


    suspend fun start() {

        val callback = params.callbackListener

        if (!params.file.exists()) {
            callback?.onFailed("File not exist")
            return
        }

        val hashType = params.hashType
        val totalSizeInBytes = params.file.length()

        val digest = MessageDigest.getInstance(hashType.name)

        params.file.inputStream().use { stream ->

            stream.available()

            val byteArray = ByteArray(1024)

            var processedBytes = 0L

            while (!isAborted) {
                val bytesRead = stream.read(byteArray)

                if (bytesRead == -1)
                    break

                digest.update(byteArray, 0, bytesRead)
                processedBytes += bytesRead
                progress = (processedBytes * 100 / totalSizeInBytes).toInt()

            }

            stream.close()
        }

        isAborted = true
        checksum = hashType.bytesToString(digest.digest())
    }

    fun getResult(): HashResult =
        HashResult(
            params.hashType,
            checksum,
            HashProcessToken(token, params.file.absolutePath),
            progress
        )


}