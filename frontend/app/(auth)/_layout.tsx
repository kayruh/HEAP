import { Redirect, Stack, Tabs } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Colors } from '@/constants/colors'
import { Platform, useColorScheme } from 'react-native'
import { HapticTab } from '@/components/hapticTab'
import BlurTabBarBackground from '@/components/ui/tabBarBackground.ios'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const colorScheme = useColorScheme();

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack screenOptions={{headerShown: false }}>
      </Stack>
    
  )
}