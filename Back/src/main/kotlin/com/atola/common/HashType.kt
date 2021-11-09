package com.atola.common

import java.math.BigInteger

enum class HashType: IHashType {
    MD5 {
        override fun bytesToString(bytes: ByteArray): String {
           return BigInteger(1, bytes).toString(16).padStart(32, '0')
        }
    },
    SHA256 {
       override fun bytesToString(bytes: ByteArray) = BigInteger(1, bytes).toString(16).padStart(64, '0')
    };

    companion object {
        fun fromString(string: String?): HashType {
            return if (string == null) MD5 else try {
                valueOf(string)
            }
            catch (e: IllegalArgumentException){
                MD5
            }
        }
    }

}

interface IHashType {
    fun bytesToString(bytes: ByteArray) : String
}