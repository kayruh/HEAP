import { Stack } from "expo-router";
import "./global.css";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';


export default function RootLayout() {
  return (
  <ClerkProvider tokenCache={tokenCache}>

    

    <Stack>
      <Stack.Screen 
      name="(tabs)" 
      options={{headerShown:false}}/>
      <Slot />
    </Stack>
  </ClerkProvider>

    )
}
