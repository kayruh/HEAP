import { Text, SafeAreaView } from 'react-native'
import React from 'react'

// users need to login to see their lists
// if not log in -> prompt to log in
// else show fav lists

const favourites = () => {
  return (
    <SafeAreaView>
      <Text className='pl-3'>favourites list tab</Text>
      <Text className='pl-3'>display user's favs list (need log in)</Text>
    </SafeAreaView>
  )
}

export default favourites