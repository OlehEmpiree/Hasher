package com.atola.common

import com.atola.core.OnHashingListener
import java.io.File

data class HashTaskParams(val file: File, val hashType: HashType, val callbackListener: OnHashingListener? = null)