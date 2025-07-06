import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'

const maxWidth = 300;

const editProfile = () => {
    const { user } = useUser();

    // user info
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
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
      }
    
      const handleSaveChanges = () => {
        // Call API or update local state ?????
        console.log({
          name,
          username,
          pronouns,
          birthday,
          avatar,
        })
        alert('Changes saved!')
      }
    
      return (
        <SafeAreaView style={{ flex: 1 }}>
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
                <Text>{birthday ? birthday.toDateString() : 'Select Birthday'}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                <DateTimePicker
                    value={birthday}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                    setShowDatePicker(false)
                    if (selectedDate) setBirthday(selectedDate)
                    }}
                />
                )}
            </View>    

    
            {/* Save changes button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
        borderColor: '#6E1725',
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
      },
      saveButton: {
        backgroundColor: '#6E1725',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
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
    })

export default editProfile