package com.atola.models

import com.atola.common.HashType
import java.util.*

data class HashResult(val HashType: HashType,  val Checksum: String, val Token: HashProcessToken, var Progress: Int)