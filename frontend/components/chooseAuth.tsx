import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from './fyndColors';

const maxWidth= 300; // for styling

interface ChooseAuthProps {
  buttonColor?: string;
  textColor?: string;
  iconColor?: string;
}

const ChooseAuth: React.FC<ChooseAuthProps> = ({
  buttonColor = FyndColors.Yellow,
  textColor = FyndColors.Green,
  iconColor = FyndColors.Green,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View>
      <TouchableOpacity style={[styles.signInButton, {backgroundColor: buttonColor }]} 
        onPress={() => router.push({ pathname: '/(auth)/sign-in', 
        params: { redirectTo: pathname } })}>
        <View style={styles.inlineRow}>
          <Ionicons name="person-outline" size={20} color={iconColor} style={styles.authIcon} />
          <Text style={[styles.signInButtonText, { color: textColor }]}>Sign in</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.signInButton, {backgroundColor: buttonColor }]} 
        onPress={() => router.push({ pathname: '/(auth)/sign-up', 
        params: { redirectTo: pathname } })}>       
         <View style={styles.inlineRow}>
          <Ionicons name="person-add-outline" size={20} color={iconColor} style={styles.authIcon} />
          <Text style={[styles.signInButtonText, { color: textColor }]}>Sign up</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.signInButton, {backgroundColor: buttonColor }]} 
        onPress={() => router.push({ pathname: '/(auth)/business-sign-up', 
        params: { redirectTo: pathname } })}>      
          <View style={styles.inlineRow}>
          <Ionicons name="business-outline" size={20} color={iconColor} style={styles.authIcon} />
          <Text style={[styles.signInButtonText, { color: textColor }]}>Business Sign up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseAuth

const styles = StyleSheet.create({
    signInButton: {
        width: "100%",
        alignSelf: "center",
        // backgroundColor: FyndColors.Yellow,
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