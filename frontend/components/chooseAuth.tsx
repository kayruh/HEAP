import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from './fyndColors';

const maxWidth= 300; // for styling

const ChooseAuth = () => {
  return (
    <View>
      <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/sign-in')}>
          <View style={styles.inlineRow}>
            <Ionicons name="person-outline" size={20} color={FyndColors.Green} style={styles.authIcon} />
            <Text style={styles.signInButtonText}>Sign in</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/sign-up')}>
          <View style={styles.inlineRow}>
          <Ionicons name="person-add-outline" size={20} color={FyndColors.Green} style={styles.authIcon} />
            <Text style={styles.signInButtonText}>Sign up</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(auth)/business-sign-up')}>
          <View style={styles.inlineRow}>
            <Ionicons name="business-outline" size={20} color={FyndColors.Green} style={styles.authIcon} />
              <Text style={styles.signInButtonText}>Business Sign up</Text>
          </View>        
        </TouchableOpacity>

    </View>
  )
}

export default ChooseAuth

const styles = StyleSheet.create({
    signInButton: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: FyndColors.Yellow,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 15,
        alignItems: 'center',
        maxWidth: maxWidth,
        paddingHorizontal: 20,
      },
      inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      signInButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
      },
      authIcon: {
        marginRight: 8,
      },
      
})