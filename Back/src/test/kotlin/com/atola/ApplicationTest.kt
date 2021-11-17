package com.atola

import com.atola.common.HashTaskParams
import com.atola.common.HashType
import com.atola.core.HashTask
import com.atola.core.OnHashingListener
import com.atola.plugins.configureRouting
import io.ktor.server.testing.*
import kotlinx.coroutines.runBlocking
import org.junit.Test
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.fail

class ApplicationTest {

    private val testFile = System.getProperty("user.dir") + "\\tests\\" + "test.txt"

    @Test
    fun testMD5() {
        val expectedHash = "42146759f5cd54c396f30b1666a7db49"
        testCheckSum(testFile, expectedHash, HashType.MD5)
    }

    @Test
    fun testSHA256() {
        val expectedHash = "5312020010fa8f8a81d0bddce22cf754e86b9cf7fa93a2469628a001e574dac9"
        testCheckSum(testFile, expectedHash,  HashType.SHA256)
    }

    private fun testCheckSum(filePath: String, expectedHash: String, hashType: HashType) {
        withTestApplication({ configureRouting() }) {

            val file = File(filePath)

            val task = HashTask(HashTaskParams(file, hashType, object : OnHashingListener {
                override suspend fun onFailed(message: String) = fail(message)
            }))

            runBlocking {
                task.start()
            }

            val result = task.getResult()

            assertEquals(expectedHash, result.Checksum)

        }
    }
}