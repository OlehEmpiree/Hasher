package com.atola.common

class ByteArrayPool(val bufferSize: Int) : AbstractObjectPool<ByteArray>({ ByteArray(bufferSize) })