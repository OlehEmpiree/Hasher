package com.atola.common

import com.atola.core.OnHashingListener
import java.io.File
import java.util.*

data class HashTaskParams(val file: File, val hashType: HashType, val callbackListener: OnHashingListener? = null)