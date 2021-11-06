package com.atola.core

import kotlinx.coroutines.runBlocking
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.io.IOException
import java.math.BigInteger
import java.security.MessageDigest
import kotlin.properties.Delegates


class HashWorker {


    var progress: Int by Delegates.observable(0) { prop, old, new ->
        run {
            runBlocking {
                eventListener.onProgressChanged()
            }
        }
    }

    private var eventListener: OnHashingListener = object : OnHashingListener{
        override suspend fun onProgressChanged() {
            throw IllegalArgumentException()
        }

    }

    fun Create(filePath: String, EventListener: OnHashingListener): String? {
        this.eventListener = EventListener
        val file = File(filePath)
        if (!file.exists())
            throw FileNotFoundException("File not found!")

        val md5Digest = MessageDigest.getInstance("MD5")

        val hash = getFileChecksum(md5Digest, file)

        return hash;
    }

    @Throws(IOException::class)
    fun getFileChecksum(digest: MessageDigest, file: File?): String? {

        val fis = FileInputStream(file)

        val byteArray = ByteArray(1024)
        var bytesCount: Int

        while (fis.read(byteArray).also { bytesCount = it } != -1) {
            digest.update(byteArray, 0, bytesCount)
        }

        fis.close()

        val bytes = digest.digest()

        return BigInteger(1, bytes).toString(16).padStart(32, '0')
    }


}