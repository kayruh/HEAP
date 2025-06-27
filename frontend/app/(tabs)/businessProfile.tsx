import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const businessProfile = () => {
  return (
    <SafeAreaView>
      <Text>businessProfile</Text>
      <Text>wna delete this, have only one profile tab. {'\n'} 
        have business profile as a profile feature (must meet our criteria to be a biz user)
      </Text>
    </SafeAreaView>
  )
}

export default businessProfile


//if not user then business profile might have to change this within _layout.tsx within (tabs) group