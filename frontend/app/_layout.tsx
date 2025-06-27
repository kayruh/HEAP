import { Stack } from "expo-router";
import "./global.css";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });
  return (
  <ClerkProvider tokenCache={tokenCache}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{headerShown:false}}/>
      <Stack.Screen 
        name="settings" 
        options={{headerShown:false}}/>
        {/* <Stack.Screen 
        name="(auth)" 
        options={{headerShown:false}}/> */}
      <Slot />
    </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  </ClerkProvider>

    )
}