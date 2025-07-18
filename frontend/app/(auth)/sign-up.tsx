import * as React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Image } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import FyndColors from '@/components/fyndColors';

const maxWidth= 300; // for styling

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  // to bring user back to page they were from before signin/signup
  const { redirectTo } = useLocalSearchParams<{
    redirectTo?: string;
  }>();
  const safeRedirect = redirectTo && !redirectTo.includes('/(auth)') ? redirectTo : '/';

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
        router.replace(safeRedirect)
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

  // verification page codes
  const CELL_COUNT = 6;


  if (pendingVerification) {
    // verification 6 box constants:
    // const [value, setValue] = React.useState('');
    // const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    // const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={FyndColors.Yellow} />
        </TouchableOpacity>

        <>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
              source={require('../../assets/FYND_logo/yellow.png')}
              style={styles.logo}/>
            </View>
            {/* style this (verify email text) !! */}
            <Text style={{textAlign:'center', fontWeight:'bold', 
                            fontSize:15, marginBottom: 15, color:'#fff'}}>Verify your email</Text> 

            {/* same as sign in/up pages input style */}
            <View style={styles.inputWrapper}> 
              <TextInput
                value={code}
                placeholder="Enter your verification code"
                onChangeText={(code) => setCode(code)}
                style={styles.inputField}
              />
            </View>

            {/* <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[styles.vcell, isFocused && styles.vfocusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <Text style={styles.vcellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                  </View>
              )}
            /> */}

            <TouchableOpacity style={styles.signUpButton} onPress={onVerifyPress}>
              <Text style={styles.signUpButtonText}>Verify</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
        </>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={FyndColors.Yellow} />
        </TouchableOpacity>
      <>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
            source={require('../../assets/FYND_logo/yellow.png')}
            style={styles.logo}/>
          </View>

        <Text style={styles.header}>Welcome to FYND!</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} style={styles.icon}/>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor={'white'} // so dark/light mode can see
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
              placeholderTextColor={'white'} // so dark/light mode can see
              onChangeText={(username) => setUsername(username)}
              style={styles.inputField}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} style={styles.icon} />
            <TextInput
              value={password}
              placeholder="Enter password"
              placeholderTextColor={'white'} // so dark/light mode can see
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.inputField}
            />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
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
        </ScrollView>
      </KeyboardAvoidingView>
      </>
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
    backgroundColor: FyndColors.Purple, // background colour
    paddingTop: 40,
    paddingHorizontal: '5%',
    position: 'relative',
  },
  // buttons
  backButton: {
    position: 'absolute',
    top: 55,
    left: 15,
    // backgroundColor: FyndColors.Yellow,
    // borderRadius: 20,
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
      color:'#fff', //white
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 20,
  },
  descText:{
      color:'#fff',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 10,
  },

  // input elements
  input: {
    width: "95%",
    maxWidth: maxWidth,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: FyndColors.Yellow,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#95518F', // make it slightly lighter/darker than bg
    color: '#000', // ensure text is visible
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: FyndColors.Yellow,
    borderRadius: 8,
    backgroundColor: '#95518F',
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
    maxWidth: maxWidth,
  },
  icon: {
    marginRight: 8,
    color:FyndColors.Yellow,
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
    maxWidth: maxWidth,
  },

  // sign up elements
  signUpButton: {
    width: "95%",
    maxWidth: maxWidth, // means button wont span whole screen
    alignSelf: "center",
    backgroundColor: FyndColors.Yellow,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // words below sign up button
  othersContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  othersText: {
    color: '#fff',
    fontSize: 14,
  },
  otherLink: {
    color: FyndColors.Yellow,
    fontWeight: 'bold',
  },

  // footer
  footerText: {
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 14,
    color: 'white', 
  },

  // verification
  vContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: FyndColors.Purple,
  },
  vtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  vsubtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'center',
  },
  vcell: {
    width: 48,
    height: 60,
    lineHeight: 60,
    fontSize: 24,
    borderWidth: 2,
    borderColor: FyndColors.Yellow,
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vcellText: {
    fontSize: 24,
    color: '#fff',
  },
  vfocusCell: {
    borderColor: '#007AFF',
  },

  //logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
})