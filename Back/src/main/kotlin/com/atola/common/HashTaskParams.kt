package com.atola.common

import java.io.File
import java.util.*

data class HashTaskParams(val uuid: UUID, val file: File, val hashType: HashType)