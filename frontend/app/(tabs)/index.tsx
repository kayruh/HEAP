import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {
  const { user } = useUser()

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  )
}

//this needs to be done, need a google maps api
//and need to find a way to build on top of the api
//should have a search button on top
