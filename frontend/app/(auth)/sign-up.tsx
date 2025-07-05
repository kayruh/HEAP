import * as React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        unsafeMetadata: { accountType: 'user' }
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/settings')}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      <>

        <View style={styles.container}>
        <Text style={styles.header}>Welcome to FYND!</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} style={styles.icon}/>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(email) => setEmailAddress(email)}
              style={styles.inputField}
            />
          </View>
          
          <View style={styles.inputWrapper}>
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

          <TouchableOpacity style={styles.signUpButton}onPress={onSignUpPress}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.othersContainer}>
            <Text style={styles.othersText}>
              Already have an account?{' '}
              <Text style={styles.otherLink} onPress={() => router.push('/sign-in')}>
                Sign in
              </Text>
            </Text>

            <Text style={styles.othersText}>
              Create a business account{' '}
              <Text style={styles.otherLink} onPress={() => router.push('/business-sign-up')}>
                Business Sign up
              </Text>
            </Text>
          </View>

      </View>

      <Text style={styles.footerText}>Get lost, FYND more.</Text>
      </>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // for all elements on page
  container: {
    marginTop: '50%', // start halfway down the screen
    paddingLeft: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F4DFB2', // beige background
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
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
  },
  icon: {
    marginRight: 8,
    color:'#a84c3a',
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },

  // sign up elements
  signUpButton: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: '#6E1725', // same as your border color for consistency
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#F4DFB2',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // words below sign up button
  othersContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  othersText: {
    color: '#000',
    fontSize: 14,
  },
  otherLink: {
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