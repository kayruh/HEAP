import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { SignOutButton } from '@/components/SignOutButton';

const chooseAuth = () => {
    const { user } = useUser();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem}>
                <SignedIn>
                    <Text>Hello @{user?.username}</Text>
                    <SignOutButton/>
                    </SignedIn>
                    <SignedOut>
                    <Link href="/(auth)/sign-in">
                    {/* <Stack.Screen 
                        name="(auth)" 
                        options={{headerShown:false}}/> */}
                    <Text style={styles.menuText}>Sign In {'\n'}</Text>
                    </Link>
                    <Link href="/(auth)/sign-up">
                    {/* <Stack.Screen 
                        name="(auth)" 
                        options={{headerShown:false}}/> */}
                        <Text style={styles.menuText}>Sign Up</Text>
                    </Link>
                </SignedOut>
        </TouchableOpacity>
    </View>
  )
}

export default chooseAuth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4DFB2', // beige (following figma)??
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'relative',
    },
    menuItem: {
        marginBottom: 24,
    },
    menuText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})