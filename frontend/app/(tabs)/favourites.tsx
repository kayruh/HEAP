import { Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import FyndBanner from '@/components/fyndBanner'

// users need to login to see their lists
// if not log in -> prompt to log in
// else show fav lists

const favourites = () => {
  return (
    <View>
        <FyndBanner/>
      <Text className='pl-3 pt-5'>favourites list tab</Text>
      <Text className='pl-3'>display user's favs list (need log in)</Text>
    </View>
  )
}

export default favourites