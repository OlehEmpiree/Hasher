package com.atola.models

class TaskContext {
    var isAborted = false
        private set(value) {
            field = value
        }

    private var progress = -1

    fun updateProgress(newProgress: Int) {
        progress = newProgress
    }

    fun abort() {
        isAborted = true
    }

}