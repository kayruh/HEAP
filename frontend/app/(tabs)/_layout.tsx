import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
    <Tabs.Screen //most likely have to change this to an image.png instead of a text
    name='index' //name of the tab labelled in the file.tsx
    options={{title:'FYND', //relabelling on the shown screen
        headerShown:false //turn off the headers
    }}
    />
    <Tabs.Screen 
    name='browse'
    options={{title:"Browse",
        headerShown:false
    }}
    />
    <Tabs.Screen 
    name='businessProfile'
    options={{title:'Profile_B',
        headerShown:false
    }}
    />
    <Tabs.Screen 
    name='userProfile'
    options={{title:'Profile_U',
        headerShown:false
    }}
    />
    </Tabs>
  )
}

export default _layout