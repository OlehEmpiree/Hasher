package com.atola.core

import java.util.*

interface OnHashingListener {
    suspend fun onFailed(message: String)
}