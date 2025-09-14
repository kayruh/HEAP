const config = {
  "expo": {
    "name": "fynd",
    "slug": "fynd",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "fynd",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
      ios: {
  // iOS bundle identifier used by the generated native project.
  // Required for prebuild and native builds.
  bundleIdentifier: 'com.anonymous.fynd',
  supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    },
  },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      // [
      //   "react-native-maps",
      //   {
      //     "iosGoogleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY,
      //     "androidGoogleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      //   }
      // ],
      "expo-router", 
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}

module.exports = config;