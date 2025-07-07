import { Text, SafeAreaView, View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import FyndBanner from '@/components/fyndBanner'
import FavouritesScreen from '@/components/favourtiesScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// users need to login to see their lists
// if not log in -> prompt to log in
// else show fav lists

const favourites = () => {

  return (
    <View>
        <FyndBanner/>
      <FavouritesScreen/>

      {/* onpress -> pop up to fill up fav list details (name, desc) -> pass to BE */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name='add' size={20} color="#fff"/>
      </TouchableOpacity>

    </View>
  )
}

export default favourites

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 30,         // distance from bottom of the screen
    right: 30,          // distance from right of the screen
    backgroundColor: '#852333', // same color as FYND text in banner. or #6E1725 for bg banner color
    borderRadius: 24,
    padding: 10,        
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
});