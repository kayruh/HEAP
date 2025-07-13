import { View, Text,StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import FyndColors from '@/components/fyndColours'


interface FyndBannerProps {
    backgroundColor?: string;
    textColor?: string;
    iconColor?: string;
  }

export default function FyndBanner({
    backgroundColor = FyndColors.Green, // default colours
    textColor = FyndColors.Yellow,       
    iconColor = FyndColors.Yellow        
    }: FyndBannerProps) {

    const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={[styles.header,{backgroundColor}]}>
            <TouchableOpacity onPress={() => router.push('/settings')}>
                <Ionicons name="menu" size={28} color={iconColor}/>
            </TouchableOpacity>

            <Text style={[styles.headerTitle,{color:textColor}]}>FYND</Text>

            <TouchableOpacity onPress={() => router.push('/search')}>
                <Ionicons name="search" size={24} color={iconColor}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffff',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        paddingTop: 2,
    },
})