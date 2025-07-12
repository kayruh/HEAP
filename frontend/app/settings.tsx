import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, usePathname, useRouter } from 'expo-router';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton'; 
import FyndColors from '@/components/fyndColours';

// when clicking hamburger menu 

export default function SettingsScreen() {
    const { user } = useUser();

    const { isSignedIn } = useAuth(); // check if user is signed in

    const router = useRouter();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}> 
                <Ionicons name="close" size={24} color={FyndColors.Yellow}/>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Greeting */}
                <Text style={styles.greeting}>FYND WHAT FYNDS YOU!</Text>

                {/* Diamond underline */}
                <View style={styles.underlineWrapper}>
                    <View style={styles.underlineLine} />
                </View>

                {/* Menu Items */}
                <SignedIn>
                    <TouchableOpacity
                        style={styles.menuItem}>
                        <Text style={styles.userGreeting}>Hello @{user?.username}</Text>
                        <SignOutButton/>
                    </TouchableOpacity>
                </SignedIn>
                
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
                    <Text style={styles.menuText}>FYND Us</Text>
                </TouchableOpacity>

                {/* click profile -> show sign up & sign in */}
               

            </ScrollView>

            <View style={styles.authSection}>
                <SignedOut>
                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')} style={styles.authItem}>
                        <Ionicons name="person-outline" size={20} color={FyndColors.Yellow} style={styles.authIcon} />
                        <Text style={styles.authText}>Sign In</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')} style={styles.authItem}>
                        <Ionicons name="person-add-outline" size={20} color={FyndColors.Yellow} style={styles.authIcon} />
                        <Text style={styles.authText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => router.push('/(auth)/business-sign-up')} style={styles.authItem}>
                        <Ionicons name="business-outline" size={20} color={FyndColors.Yellow} style={styles.authIcon} />
                        <Text style={styles.authText}>Business Sign Up</Text>
                    </TouchableOpacity>
                </SignedOut>
            </View>

            {/* Footer Slogan */}
            <Text style={styles.footerText}>Get lost, FYND more.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FyndColors.Green,
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
        fontSize: 16,
        letterSpacing: 1.5,
        marginBottom: 8,
        textTransform: 'uppercase',
        color: FyndColors.Yellow,
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
    // auth 
    authSection: {
        marginTop: 32,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(240, 230, 140, 0.3)', // Semi-transparent yellow
        marginBottom: 100, // push it above the footer
    },
    authItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    authIcon: {
        marginRight: 12,
    },
    authText: {
        fontSize: 16,
        color: FyndColors.Yellow,
        fontWeight: '500',
    },
    // menu items
    menuItem: {
        marginBottom: 24,
    },
    menuText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: FyndColors.Yellow,
    },
    // footer
    footerText: {
        position: 'absolute',
        fontWeight: 'bold',
        bottom: 30,
        alignSelf: 'center',
        fontSize: 14,
        color: FyndColors.Yellow,
    },
    userGreeting:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
        color: FyndColors.Yellow,
    },
});


