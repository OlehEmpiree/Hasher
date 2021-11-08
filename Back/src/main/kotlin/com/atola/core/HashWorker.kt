package com.atola.core

import com.atola.common.HashType
import com.atola.models.HashResult
import kotlinx.coroutines.delay
import java.io.File
import java.io.FileInputStream
import java.math.BigInteger
import java.security.MessageDigest
import java.util.*


class HashWorker {

    var hashResults = mutableListOf<HashResult>()


//    var progress: Int by Delegates.observable(0) { prop, old, new ->
//        run {
//            runBlocking {
//                eventListener.onProgressChanged(old-new)
//            }
//        }
//    }

    suspend fun startNew(filePath: String, hashType: HashType, callback: OnHashingListener, hashDelay:Int = 0) {

        val file = File(filePath)
        if (!file.exists())
        {
            callback.onFailed("File not found")
            return
        }

        val uuid = UUID.randomUUID()

        val result = HashResult(filePath, hashType, null, uuid, 0)

        hashResults.add(result)

        callback.onStarted(uuid)

        if(hashDelay != 0) {
            for (i in 1..hashDelay) {
                delay(2000)
                result.Progress += 10;
            }
        }

        val digest = MessageDigest.getInstance(hashType.name)

        val hash = getFileChecksum(digest, result, file)

        result.Progress = 100
        result.Hash = hash;
    }


    private fun getFileChecksum(digest: MessageDigest, hashResult: HashResult, file: File): String {

        val fis = FileInputStream(file)

        val byteArray = ByteArray(1024)
        var bytesCount: Int

        while (fis.read(byteArray).also { bytesCount = it } != -1) {
            digest.update(byteArray, 0, bytesCount)
        }

        fis.close()

        val bytes = digest.digest()

        return when(hashResult.HashType){
            HashType.MD5 -> BigInteger(1, bytes).toString(16).padStart(32, '0')
            HashType.SHA256 -> BigInteger(1, bytes).toString(16).padStart(64, '0')
        }

    }


}