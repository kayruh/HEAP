import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Green = '#556B2F';
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text style={styles.format}>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  format: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});