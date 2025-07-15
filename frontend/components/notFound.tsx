import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import FyndColors from './fyndColors';

const notFound = () => {
    const router = useRouter();

    const handleInstagramPress = () => {
        Linking.openURL('https://www.instagram.com/yourusername'); // add our IG username
    };
    
    const handleEmailPress = () => {
        Linking.openURL('mailto:your@email.com'); // add our email address
    };

  return (
    <View style={styles.container}>
      <Text>Oops! We can't find the page you're looking for</Text>

        {/* style button on page  */}
      <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Ionicons name='arrow-back' size={20} color={FyndColors.Yellow}/>
        <Text>Home page</Text>
      </TouchableOpacity>

      {/* add socials buttons */}
      <View style={styles.iconRow}>
            <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
                <FontAwesome name="instagram" size={25} color={FyndColors.Yellow}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
                <FontAwesome name="envelope" size={25} color={FyndColors.Yellow}/>
            </TouchableOpacity>
        </View> 

        <Text style={styles.footerText}>Get lost, FYND more.</Text>

    </View>
  )
}

export default notFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FyndColors.Green,
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'relative',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop:10,
    },
      icon: {
        padding: 10,
    },
      footerText: {
        position: 'absolute',
        fontWeight: 'bold',
        bottom: 30,
        alignSelf: 'center',
        fontSize: 14,
        color: FyndColors.Yellow,
    },
    textStyle:{
        color: FyndColors.Yellow,
        fontSize: 18,
        alignSelf: 'center',
    },
})