import { useSignIn } from '@clerk/clerk-expo'
import { Link, Stack, useRouter } from 'expo-router'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAvoidingView } from 'react-native'

const maxWidth= 300; // for styling

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      // const signInAttempt = await signIn.create({
      //   identifier: emailAddress,
      //   password,
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/settings')}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>

      <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >

      <View style={styles.container}>
        {/* insert FYND logo at the top  */}
        <Text style={styles.header}>Welcome back to FYND!</Text>

        {/* <Text style={styles.descText}>Sign in</Text> */}
        <View>

          <View style={styles.inputWrapper}>
            {/* <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            /> */}
            <Ionicons name="at-outline" size={20} style={styles.icon}/>
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="Enter username"
              onChangeText={(username) => setUsername(username)}
              style={styles.inputField}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} style={styles.icon} />
            <TextInput
              value={password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.inputField}
            />
          </View>

              <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
                <Text style={styles.signInButtonText}>Sign in</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have a FYND account?{' '}
                <Text style={styles.signUpLink} onPress={() => router.push('/sign-up')}>Sign up </Text>
                </Text>
              </View>

          </View>
        </View>

      <Text style={styles.footerText}>Get lost, FYND more.</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // for all elements on page
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F4DFB2', // background colour
    paddingHorizontal: 20,
  },
  // buttons
  backButton: {
    position: 'absolute',
    top: 55,
    left: 18,
    backgroundColor: '#852333', // same color as FYND text in banner. or #6E1725 for bg banner color
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  // texts:
  header:{
      color:'#000',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 20,
  },
  descText:{
      color:'#000',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 10,
  },

  // input elements
  input: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: '#6E1725', // example: deep red like your FYND button
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ECD3A3', // make it slightly lighter/darker than bg
    color: '#000', // ensure text is visible
    maxWidth: maxWidth,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6E1725',
    borderRadius: 8,
    backgroundColor: '#ECD3A3',
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
    maxWidth: maxWidth,
  },
  icon: {
    marginRight: 8,
    color:'#a84c3a',
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
    maxWidth: maxWidth,
  },

  // sign in elements
  signInButton: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: '#6E1725', // same as your border color for consistency
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center',
    maxWidth: maxWidth,
  },
  signInButtonText: {
    color: '#F4DFB2',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // sign up 
  signUpContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: '#000',
    fontSize: 14,
  },
  signUpLink: {
    color: '#852333',
    fontWeight: 'bold',
  },

  // footer
  footerText: {
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 30,
    alignSelf: 'center',
    fontSize: 14,
    color: '#000', // black
  },
})