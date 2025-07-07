import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, usePathname, useRouter } from 'expo-router';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton'; 

// when clicking hamburger menu 

export default function SettingsScreen() {
    const { user } = useUser();

    const { isSignedIn } = useAuth(); // check if user is signed in

    const router = useRouter();
    // router PUSH -> allows user to go back to prev page (keeps track of)
    // router REPLACE -> navitage to that page and removes navigation history 

    // to see path
    // const pathname = usePathname();
    // console.log('Current path:', pathname);

    return (
        <View style={styles.container}>

            {/* Close icon FIX THIS !!!!! cannot be js back */}
            <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}> 
                <Ionicons name="close" size={24} color="black"/>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Greeting */}
                <Text style={styles.greeting}>WELCOME TO FYND!</Text>

                {/* Diamond underline */}
                <View style={styles.underlineWrapper}>
                    <View style={styles.underlineLine} />
                    <View style={styles.diamond} />
                </View>

                {/* Menu Items */}
                {/* click profile -> show sign up & sign in */}

                <TouchableOpacity style={styles.menuItem}>
                    <SignedIn>
                        <Text>Hello @{user?.username}</Text>
                        <SignOutButton/>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/(auth)/sign-in">
                            <Text style={styles.menuText}>Sign In {'\n'}</Text>
                        </Link>
                        <Link href="/(auth)/sign-up">
                            <Text style={styles.menuText}>Sign Up</Text>
                        </Link>
                    </SignedOut>
                </TouchableOpacity>

                <SignedIn>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { router.push('/(tabs)/userProfile') }}>
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                </SignedIn>

                <TouchableOpacity style={styles.menuItem}
                    onPress={() => router.replace('/(tabs)/browse')}>
                    <Text style={styles.menuText}>FYND Places</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} 
                    onPress={() => router.replace('/(tabs)/favourites')}>
                    <Text style={styles.menuText}>Favourites</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} 
                    onPress={() => router.replace('/(tabs)/ourStory')}>
                    <Text style={styles.menuText}>Our Story</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} 
                    onPress={() => router.replace('/(tabs)/contactUs')}>
                    <Text style={styles.menuText}>Contact Us</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Footer Slogan */}
            <Text style={styles.footerText}>Get lost, FYND more.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4DFB2', // beige (following figma)
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding:4, // increases tappable area
    },
    contentContainer: {
        paddingTop: 40,
        paddingBottom: 80,
    },
    greeting: {
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1.5,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    underlineWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    underlineLine: {
        height: 1,
        backgroundColor: '#000',
        width: '100%',
        position: 'absolute',
        top: 5,
    },
    diamond: {
        width: 8,
        height: 8,
        backgroundColor: '#000',
        transform: [{ rotate: '45deg' }],
        marginLeft: 5,
        zIndex: 1,
    },
    menuItem: {
        marginBottom: 24,
    },
    menuText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    footerText: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 10,
    },
});
