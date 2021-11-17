package com.atola

import com.atola.common.HashType
import com.atola.core.BytesData
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.io.File
import java.security.MessageDigest
import kotlin.test.Test

class HashTest {

    private val testFile = System.getProperty("user.dir") + "\\tests\\" + "test.txt"

    @Test
    fun HashTest() {
        val digest = MessageDigest.getInstance("md5")

        runBlocking {

        val channel = Channel<BytesData>()
        GlobalScope.launch {
            File(testFile).inputStream().use { stream ->



                var processedBytes = 0L

                while (true) {
                    val byteArray = ByteArray(1024)

                    val bytesRead = stream.read()

                    if (bytesRead == -1)
                        break

                    println("send")
                    channel.send(BytesData(byteArray, bytesRead))

                    processedBytes += bytesRead

                }


                channel.close()
            }
        }

            for (data in channel){
                println("recive")
                digest.update(data.bytes, 0, data.bytesRead)
            }
        }

        assert("42146759f5cd54c396f30b1666a7db49" == HashType.MD5.bytesToString(digest.digest()))
    }
}