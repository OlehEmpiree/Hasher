package com.atola.models

import com.atola.common.HashType
import java.util.*

data class HashResult(val FilePath: String, val HashType: HashType,  var Hash: String?, val Id: UUID, var Progress: Int)