package com.atola.common

import java.util.Queue
import java.util.concurrent.ConcurrentLinkedQueue

abstract class AbstractObjectPool<T>(private val __Factory: () -> T) {
    private val __Pool: Queue<T> = ConcurrentLinkedQueue()

    open fun Allocate() = __Pool.poll() ?: __Factory()
    open fun Free(obj: T) = __Pool.offer(obj)
}