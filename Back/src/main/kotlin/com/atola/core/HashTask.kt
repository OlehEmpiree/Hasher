package com.atola.core

import com.atola.common.HashTaskParams
import com.atola.common.HashType
import com.atola.models.HashProcessToken
import com.atola.models.HashResult
import java.io.InputStream
import java.security.MessageDigest


class HashTask(val hashTaskParams: HashTaskParams) {

    var checksum = ""

    var isAborted = false

    var progress = -1

    fun start() {
        calculateChecksum(hashTaskParams.hashType, hashTaskParams.file.inputStream(), hashTaskParams.file.length())
    }

    fun abort() {
        if (!isAborted)
            isAborted = true
    }


    private fun calculateChecksum(hashType: HashType, stream: InputStream, totalSizeInBytes: Long) {
        val digest = MessageDigest.getInstance(hashType.name)

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

        checksum = hashType.bytesToString(digest.digest())
    }

    fun getResult() = HashResult(
        hashTaskParams.hashType,
        checksum,
        HashProcessToken(hashTaskParams.uuid, hashTaskParams.file.absolutePath),
        progress
    )

}