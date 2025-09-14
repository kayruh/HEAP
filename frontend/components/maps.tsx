import { View, Text, Platform } from 'react-native'
import React from 'react'

let MapView: any = null
let Marker: any = null

if (Platform.OS !== 'web') {
  // lazy-require so Node/web dev server doesn't parse JSX from node_modules
  // which causes "Unexpected token '<'". Keep map code native-only.
  // eslint-disable-next-line global-require
  try {
    // some package builds export the component as default, others as named
    const RNMaps = require('react-native-maps')
    MapView = RNMaps.default || RNMaps.MapView || RNMaps
    Marker = RNMaps.Marker || null
  } catch (e) {
    // module not present in this environment
    MapView = null
    Marker = null
  }
}

const Map = () => {
  if (!MapView) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Map is unavailable on web / in this environment.</Text>
      </View>
    )
  }

  else {

  // eslint-disable-next-line no-console
    console.log('MapView.PROVIDER_GOOGLE', MapView.PROVIDER_GOOGLE)
  }

  // Use Google provider on Android and iOS so native builds use Google Maps SDK.
  const provider = (Platform.OS === 'android' || Platform.OS === 'ios') ? MapView.PROVIDER_GOOGLE : undefined

  return (
    <MapView
      provider={provider}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 1.311,
        longitude: 103.844,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* example marker (optional) */}
      {Marker && (
        <Marker coordinate={{ latitude: 1.311, longitude: 103.844 }} />
      )}
    </MapView>
  )
}

export default Map