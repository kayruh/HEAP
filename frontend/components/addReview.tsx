import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from './fyndColors';

type AddReviewProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reviewData: {
    reviewText: string;
    image?: string;
  }) => void;
  username: string | undefined;
};

const AddReview = ({ visible, onClose, onSubmit, username }: AddReviewProps) => {
  const [reviewText, setReviewText] = useState('');
  const [image, setImage] = useState<string | undefined>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({ reviewText, image });
    setReviewText('');
    setImage(undefined);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Write a Review</Text>
          <Text style={styles.username}>@{username}</Text>

          <TextInput
            placeholder="Share your thoughts..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            style={styles.input}
          />

          {image && <Image source={{ uri: image }} style={styles.preview} />}

          <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
            <Ionicons name="image-outline" size={20} color={FyndColors.Green} />
            <Text style={styles.imageButtonText}>Upload Photo</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={{ color: '#999' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
              <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: FyndColors.Purple,
    marginBottom: 8,
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  input: {
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: FyndColors.Green,
    marginLeft: 6,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    padding: 10,
  },
  submit: {
    backgroundColor: FyndColors.Green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
