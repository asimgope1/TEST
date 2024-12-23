package com.tatapower;

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class MyTaskService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        return intent.extras?.let {
            HeadlessJsTaskConfig(
                "SomeTaskName", // Task name registered in JS
                Arguments.fromBundle(it), // Pass extras from Intent to JS
                5000, // Timeout in milliseconds
                false // Allow execution in foreground (optional)
            )
        }
    }
}
