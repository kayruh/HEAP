import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const browse = () => {
  return (
    <SafeAreaView>
      <Text className='text-2xl font-bold pl-3'>What's Happening</Text>

      <Text className='text-sm pl-3'>Description of this tab</Text>


    </SafeAreaView>
  )
}

export default browse

// to do, add a horizontal carousel that fits maybe 1/3 the screen to show whats popular
//below that add a vertical scrollable to show all events that are happening
//add a filter button