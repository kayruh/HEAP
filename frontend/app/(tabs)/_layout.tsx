import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { useUser } from '@clerk/clerk-expo'
import { Platform } from 'react-native'
import { HapticTab } from '@/components/hapticTab';
import { IconSymbol } from '@/components/ui/iconSymbol';
import TabBarBackground from '@/components/ui/tabBarBackground';
import { Image } from 'react-native';
import FyndColors from '@/components/fyndColors'


const _layout = () => {

  // const {isSignedIn} = useUser();
  const colorScheme = useColorScheme();

  // if (!isSignedIn) return <Redirect href={"/sign-in"} />; //redirects to the sign in page if not authenticated
  const { user } = useUser();
  // console.log(user?.unsafeMetadata?.accountType)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FyndColors.Green,
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
        headerShown:false, //turn off the headers
        tabBarIcon: ({ focused }) => (
          <Image

            source={require('../../assets/FYND_logo/green.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: focused ? '#1A5D1A' : '#999', // optional: color tint for active/inactive
            }}
            resizeMode="contain"
          />
        ),
      }}
    />
    
    <Tabs.Screen 
    name='browse'
    options={{title:"Browse",
        headerShown:false,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />
    }}
    />
    <Tabs.Screen 
    name='favourites'
    options={{
      title:'Favourites',
        headerShown:false,
        // tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.circle.fill" color={color} 
        href: null // hide favourties from navi bar
    }}
    />
    <Tabs.Screen 
    name='businessProfile' // hiding biz profile frm navigation tab
    options={{title:'Profile_B',
        headerShown:false,
        href: (user?.unsafeMetadata?.accountType == "business") ? './businessProfile' : null ,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color}
         />
    }}
    />
    <Tabs.Screen 
    name='userProfile'
    options={{title:'Profile',
        headerShown:false,
        href: (user?.unsafeMetadata?.accountType == "user") ? './userProfile' : null ,
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />
    }}
    />

    <Tabs.Screen 
        name="editProfile"
        options={{
          headerShown:false,
          href: null, // hides editProfile from the tab bar
        }}/>
      
      <Tabs.Screen 
        name="userProfile_archive"
        options={{
          headerShown:false,
          href: null, // hides userProfile_archive from the tab bar
        }}/>

      <Tabs.Screen 
      name="folder/[folderName]"
      options={{
        headerShown:false,
        href: null, // hides [folderName] from the tab bar
        tabBarStyle: { display: 'none' },
      }}/>

    <Tabs.Screen 
      name="browse_archive"
      options={{
        headerShown:false,
        href: null, // hides [folderName] from the tab bar
      }}/>

    </Tabs>
  )
}

export default _layout