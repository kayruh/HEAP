import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { useUser } from '@clerk/clerk-expo'
import { Platform } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { HapticTab } from '@/components/hapticTab';
import { IconSymbol } from '@/components/ui/iconSymbol';
import TabBarBackground from '@/components/ui/tabBarBackground';

const _layout = () => {

  const {isSignedIn} = useUser();
  const colorScheme = useColorScheme();

  // if (!isSignedIn) return <Redirect href={"/sign-in"} />; //redirects to the sign in page if not authenticated

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
    
    <Stack screenOptions={{headerShown: false}} />;
    
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