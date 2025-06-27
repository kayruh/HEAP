import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

// when click 3 bar menu 

export default function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Close icon */}
            <Pressable style={styles.closeIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={20} color="black" />
            </Pressable>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Greeting */}
                <Text style={styles.greeting}>HELLO, JOHN DOE.</Text>

                {/* Diamond underline */}
                <View style={styles.underlineWrapper}>
                    <View style={styles.underlineLine} />
                    <View style={styles.diamond} />
                </View>

                {/* Menu Items */}
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>FYND Places</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Favourites</Text>
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
        backgroundColor: '#f7eac0', // Light tan/yellowish
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
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
