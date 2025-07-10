import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const maxWidth = 300;
const screenWidth = Dimensions.get('window').width;

const Green = '#556B2F';
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

const editProfile = () => {
    const { user } = useUser();
    const router = useRouter()

    // user info
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    
    const [birthday, setBirthday] = React.useState<Date | null>(
      user?.unsafeMetadata?.DOB
    ? new Date(user.unsafeMetadata.DOB as string)
    : null
    );
    const [gender, setGender] = React.useState('');
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [avatar, setAvatar] = React.useState(user?.imageUrl)

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChoosePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
        if (!result.canceled) {
          setAvatar(result.assets[0].uri)
        }
    };
    

  const handleSaveChanges = async () => {
    console.log(user?.unsafeMetadata)
    try {
      // 1️⃣ Update first name
      if (name && name !== user?.firstName) {
        await user?.update({ firstName: name })
      }

      if (gender) {
        await user?.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            gender: gender
          }
        })
      }
      // 2️⃣ Update DOB in unsafeMetadata (merging existing fields)
      if (birthday) {
        await user?.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            DOB: birthday.toISOString(),
          }
        })
      }

      // 3️⃣ Upload new avatar if it’s changed
      if (avatar && avatar !== user?.imageUrl) {
        // fetch the URI and convert to Blob
        const response = await fetch(avatar)
        const blob = await response.blob()
        await user?.setProfileImage({ file: blob })
      }

      alert('Profile updated successfully!')
    } catch (err) {
      console.error('Error updating profile:', err)
      alert('Failed to update profile.')
    }
  }
    
      return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/userProfile')}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.contentContainer}>
    
            {/* Avatar */}
            <View style={styles.profileImageWrapper}>
              <Image source={{ uri: avatar }} style={styles.profileImage} />
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Text style={styles.editPic}>Edit picture or avatar</Text>
              </TouchableOpacity>
            </View>
    
            {/* Input fields */}
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.inputField}/>            
            </View> 

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    style={styles.inputField}/>            
            </View>    

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Gender</Text>
                <TextInput
                value={gender}
                onChangeText={setGender}
                placeholder="Gender"
                style={styles.inputField}
                />
            </View>    

            {/* Birthday picker */}
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Birthday</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputField}>
                    <Text>
                    {birthday
                        ? birthday.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            weekday: undefined, // exclude weekday
                        })
                        : 'Select Birthday'}
                    </Text>
                </TouchableOpacity>
                </View>

                {showDatePicker && Platform.OS === 'ios' && (
                <DateTimePicker
                    value={birthday || new Date()}
                    mode="date"
                    display='spinner' 
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false); // close after picking
                        if (selectedDate) setBirthday(selectedDate);
                    }}                   
                    style={{ width: '100%', alignSelf: 'center' }} // full width inline
                />
                )}

                {showDatePicker && Platform.OS === 'android' && (
                <DateTimePicker
                    value={birthday || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                    setShowDatePicker(false); // close after picking
                    if (selectedDate) setBirthday(selectedDate);
                    }}
                />
                )}
    
            {/* Save changes button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )
    }
    
const styles = StyleSheet.create({
    contentContainer: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    editPic: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 12,
    },
    inputField: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 4,
    maxWidth: maxWidth,
    },
    inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#555', // or any muted grey you want
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 18,
    maxWidth: maxWidth,
    },
    saveButton: {
    backgroundColor: Purple,
    paddingVertical: 14,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    maxWidth: maxWidth,
    },
    saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    },

    infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 8,
    maxWidth: maxWidth,
    },
    infoLabel: {
    width: 90, // Fixed width ensures input always starts at same position -> web how??
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    },
    infoValue: {
    fontSize: 14,
    color: '#333',
    },
    backButton: {
    position: 'absolute',
    top: 55,
    left: 18,
    backgroundColor: Green, // or same as save button?????
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
    },
});

export default editProfile