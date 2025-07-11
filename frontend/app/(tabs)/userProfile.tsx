import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FyndBanner from '@/components/fyndBanner'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import ChooseAuth from '@/components/chooseAuth';
import { SignOutButton } from '@/components/SignOutButton';

// if not logged in, what will this page show?

const Green = '#556B2F';
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

const UserProfile = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
      <View>
        <FyndBanner />
          <ScrollView contentContainerStyle={styles.contentContainer}>
          <SignedIn>
          {/* Profile Picture */}
          <View style={styles.profileImageWrapper}>
            <Image
            source={{ 
              uri: user?.imageUrl }}
              style={styles.profileImage}
            />    
          </View>

          {/* User Name */}
          <Text style={styles.userName}>@{user?.username}</Text>

          {/* User Info Rows */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NAME</Text>
            <Text style={styles.infoValue}>{user?.firstName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>BIRTHDAY</Text>
            <Text style={styles.infoValue}>{user?.unsafeMetadata?.DOB
              ? new Date(String(user.unsafeMetadata.DOB))
                  .toLocaleDateString('en-GB', {
                    day:   'numeric',
                    month: 'long',
                    year:  'numeric',
                  })
              : 'Not set'
            }</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>GENDER</Text>
            <Text style={styles.infoValue}>{user?.unsafeMetadata?.gender 
              ? String(user.unsafeMetadata.gender) 
              : 'Not set'}</Text>
          </View>

          <Text style={styles.editProfileButton} onPress={() => router.push('/editProfile')}>Edit profile</Text>
          
          <SignOutButton/>

          {/* Privacy & Security Link */}
          <Text style={styles.privacyLink}>PRIVACY & SECURITY</Text>

          </SignedIn>

          <SignedOut>
            {/* sign in & sign out buttons component */}
            <View>
            <ChooseAuth/>
            </View>
          </SignedOut>

        </ScrollView>


            </View>
          );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 250,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imageText: {
    color: '#999',
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  underlineWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
    width: '100%',
  },
  underlineLine: {
    height: 1,
    backgroundColor: '#000',
    width: '60%',
    position: 'absolute',
    top: 5,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  paragraph: {
    fontSize: 16,
    color: '#3F3528',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
    profileImageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Purple,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  userHandle: {
    fontSize: 12,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#aaa',
    paddingBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  privacyLink: {
    marginTop: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    width: '80%',
    marginBottom: 20,
  },
  editProfileButton: {
    color: Green,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    // borderRadius:22,
    // backgroundColor: 'red', 
    // padding:10, // to make it look like button
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    // backgroundColor: '#fff', // optional, for full white background
  },
});

export default UserProfile;

//more backend side but when user logs it should ensure that businessprofile.tsx should not 
//be shown to the user and vice versa for the businesses
//this can leave to the end not important yet