// Dynamic Expo config to inject Google Maps API key from .env
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[app.config.js] GOOGLE_MAPS_API_KEY is not set – Maps may not function.');
}

module.exports = ({ config }) => ({
  ...config,
  name: 'fynd',
  slug: 'fynd',
  version: '1.0.0',
  orientation: 'portrait',
  // Use existing FYND asset for app icon
  icon: './assets/FYND.png',
  scheme: 'fynd',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: { supportsTablet: true },
  // Provide Google Maps API key for native iOS builds. This will be used by
  // a config plugin (if present) or can be read during prebuild to wire the
  // API key into native code. You still need to add the GoogleMaps SDK to
  // the iOS project (pods) and call GMSServices.provideAPIKey(...) in
  // AppDelegate for Google Maps to work on iOS.
  ios: {
  // iOS bundle identifier used by the generated native project.
  // Required for prebuild and native builds.
  bundleIdentifier: 'com.anonymous.fynd',
  supportsTablet: true,
    config: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    },
  },
  android: {
  // Android package name used by the generated native project.
  // Required for prebuild and native builds.
  package: 'com.anonymous.fynd',
    adaptiveIcon: {
  // Use existing FYND asset for adaptive icon foreground
  foregroundImage: './assets/FYND.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    // Inject Google Maps API key for native Android builds. Expo will
    // include this value when prebuilding or creating a custom dev client
    // so react-native-maps can use Google as a provider on Android.
    config: {
      googleMaps: {
        apiKey: GOOGLE_MAPS_API_KEY || '',
      },
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
  favicon: './assets/FYND.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  // Note: react-native-maps does not ship a valid Expo config plugin in
  // some published versions. Removing it here prevents Expo from attempting
  // to load a plugin that isn't present which causes the startup error.
  // If you prebuild the app (bare workflow) or upgrade to a react-native-maps
  // release that provides an Expo config plugin, you can re-add this entry.
  ],
  experiments: { typedRoutes: true }
});
