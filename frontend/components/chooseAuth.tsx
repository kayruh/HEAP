import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router';

const maxWidth= 300; // for styling

const Green = '#556B2F'; // colors
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

const ChooseAuth = () => {
  return (
    <View>
      <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/sign-in')}>
            <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/sign-up')}>
            <Text style={styles.signInButtonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/business-sign-up')}>
            <Text style={styles.signInButtonText}>Business Sign up</Text>
        </TouchableOpacity>

    </View>
  )
}

export default ChooseAuth

const styles = StyleSheet.create({
    signInButton: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: Yellow,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 15,
        alignItems: 'center',
        maxWidth: maxWidth,
      },
      signInButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center',
      },
})