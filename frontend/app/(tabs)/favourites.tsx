import { Text, SafeAreaView, View, Dimensions } from 'react-native'
import React from 'react'
import FyndBanner from '@/components/fyndBanner'
import FavouritesScreen from '@/components/favourtiesScreen';

// users need to login to see their lists
// if not log in -> prompt to log in
// else show fav lists

const favourites = () => {

  return (
    <View>
        <FyndBanner/>
      <FavouritesScreen/>

    </View>
  )
}

export default favourites