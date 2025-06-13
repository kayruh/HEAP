import { Stack } from "expo-router";
import "./global.css";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';


export default function RootLayout() {
  return (
  <ClerkProvider tokenCache={tokenCache}>

    <Slot />

    <Stack>
    <Stack.Screen 
    name="(tabs)" 
    options={{headerShown:false}}/>
    
  </Stack>
  </ClerkProvider>

    )
}
