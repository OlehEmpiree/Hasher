package com.atola.core

import java.util.*

interface OnHashingListener {
    suspend fun onStarted(hashProcessId: UUID)
    suspend fun onFailed(message: String)
}