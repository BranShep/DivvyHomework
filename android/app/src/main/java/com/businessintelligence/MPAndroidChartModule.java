package com.businessintelligence;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;


public class MPAndroidChartModule extends ReactContextBaseJavaModule {
	@Override
	public String getName() {
		return "MPAndroidChartModule";
	}

	MPAndroidChartModule(ReactApplicationContext context) {
		super(context);
	}

	@ReactMethod
	public void createCalendarEvent(String name, String location) {
		Log.d("CalendarModule", "Create event called with name: " + name
			+ " and location: " + location);
	}
}

