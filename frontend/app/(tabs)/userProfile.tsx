import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const userProfile = () => {
  return (
    <SafeAreaView>
      <Text>userProfile</Text>
    </SafeAreaView>
  )
}

export default userProfile

//more backend side but when user logs it should ensure that businessprofile.tsx should not 
//be shown to the user and vice versa for the businesses
//this can leave to the end not important yet