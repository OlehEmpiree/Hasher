package com.atola

import com.atola.common.HashType
import com.atola.core.HashWorker
import com.atola.core.OnHashingListener
import com.atola.plugins.configureRouting
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.junit.Test
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.fail

class ApplicationTest {

    private val testFile = System.getProperty("user.dir") + "\\tests\\" + "test.txt"

    @Test
    fun testBadId() {
        withTestApplication({ configureRouting() }) {
            handleRequest(HttpMethod.Get, "/api/getResult").apply {
                assertEquals(HttpStatusCode.OK, response.status())
                assertEquals("Not found your hash :(", response.content)
            }
        }
    }

    @Test
     fun testMD5() {
        val expectedHash = "42146759f5cd54c396f30b1666a7db49"
        val hashType = HashType.MD5

        testCheckSum(testFile, expectedHash, hashType)
    }

    @Test
    fun testSHA256() {
        val expectedHash = "5312020010fa8f8a81d0bddce22cf754e86b9cf7fa93a2469628a001e574dac9"
        val hashType = HashType.SHA256

        testCheckSum(testFile, expectedHash, hashType)
    }

   private fun testCheckSum(filePath: String, expectedHash: String, hashType: HashType){
        withTestApplication({ configureRouting() }) {

            val worker = HashWorker()
            var uuid: UUID? = null

            runBlocking {
                worker.startNew(filePath, hashType, object: OnHashingListener{
                    override suspend fun onFailed(message: String) {
                        fail(message)
                    }

                    override suspend fun onStarted(hashProcessId: UUID) {
                        uuid = hashProcessId
                    }
                })
            }

            uuid?.let {
                worker.hashResults.forEach{
                    if(it.Id == uuid){
                        assertEquals(expectedHash, it.Hash)
                    }
                }
            }

            assertEquals(1,  worker.hashResults.size)
        }
    }
}