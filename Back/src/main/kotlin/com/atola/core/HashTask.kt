package com.atola.core

import com.atola.common.ByteArrayPool
import com.atola.common.HashTaskParams
import com.atola.models.HashProcessToken
import com.atola.models.HashResult
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.channels.produce
import java.security.MessageDigest
import java.util.*
import java.util.concurrent.TimeUnit

//C:\Users\Atolanin\Desktop\WDC WD10SMZW-11Y0TS0 WDWXW1A58HUVF0.img

data class BytesData(val bytes: ByteArray, val bytesRead: Int)

class HashTask(val params: HashTaskParams) {

    private var checksum = ""
    val token: UUID = UUID.randomUUID()

    val byteArrayPool = ByteArrayPool(4096 * 512)

    var isAborted = false
        private set
    var progress = -1
        private set


    fun abort() {
        if (!isAborted)
            isAborted = true
    }


    @OptIn(ExperimentalCoroutinesApi::class)
    suspend fun start() {

        val callback = params.callbackListener
        val startTime = System.currentTimeMillis()


        if (!params.file.exists()) {
            callback?.onFailed("File not exist")
            return
        }

        val hashType = params.hashType
        val totalSizeInBytes = params.file.length()

        val digest = MessageDigest.getInstance(hashType.name)

        val receiver = GlobalScope.produce(capacity = 2) {
            params.file.inputStream().use { stream ->

                var processedBytes = 0L

                while (!isAborted) {
                    val byteArray = byteArrayPool.Allocate()

                    val bytesRead = stream.read(byteArray)

                    if (bytesRead == -1)
                        break

                    send(byteArray to bytesRead)
                    processedBytes += bytesRead
                    progress = (processedBytes * 100 / totalSizeInBytes).toInt()

                }
            }
        }

        for ((bytes, bytesRead) in receiver) {
            digest.update(bytes, 0, bytesRead)
            byteArrayPool.Free(bytes)
        }

        isAborted = true
        checksum = hashType.bytesToString(digest.digest())
        println(TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis() - startTime))
    }

    fun getResult(): HashResult =
        HashResult(
            params.hashType,
            checksum,
            HashProcessToken(token, params.file.absolutePath),
            progress
        )


}