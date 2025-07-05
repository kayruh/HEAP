import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [GoogleMapsLink, setLink] = React.useState('')
  const [StreetName, setStreetName] = React.useState('')
  const [StreetNo, setStreetNo] = React.useState('')
  const [UnitNo, setUnitNo] = React.useState('')
  const [Postal, setPostal] = React.useState('')
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
        unsafeMetadata: { 
          accountType: 'business',
          GoogleMapsLink,
          StreetName,
          StreetNo,
          UnitNo,// might have to change this to server side code
          Postal // need to add business type later to help with filtering business types
          // need to add Tags as an array for filtering purposes
         }
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
    <View className='bg-white'>
      <>
        <Text>Sign up</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Enter username"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
         <TextInput
          value={GoogleMapsLink}
          placeholder="Enter Google Maps Link"
          onChangeText={(GoogleMapsLink) => setLink(GoogleMapsLink)}
        />
         <TextInput
          value={StreetName}
          placeholder="Enter Street Name"
          onChangeText={() => setStreetName(StreetName)}
        />
        <TextInput
          value={StreetNo}
          placeholder="Enter Street No"
          onChangeText={() => setStreetNo(StreetNo)}
        />
        <TextInput
          value={UnitNo}
          placeholder="Enter Unit No"
          onChangeText={() => setUnitNo(UnitNo)}
        />
        <TextInput
          value={Postal}
          placeholder="Enter Postal"
          onChangeText={() => setPostal(Postal)}
        />


        {/* add business type button drop down here */}

        
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
      </>
    </View>
  )
}