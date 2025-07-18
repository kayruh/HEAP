// import React, { useState } from 'react';
// import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';
// import FyndColors from './fyndColors';
// import { useInteractionApi } from '@/api/interaction';

// type AddReviewProps = {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (reviewData: {
//     reviewText: string;
//     image?: string;
//   }) => void;
//   username: string | undefined;
// };

// const AddReview = ({ visible, onClose, onSubmit, username }: AddReviewProps) => {
//   const { upsertReview, uploadReviewImage} = useInteractionApi()

//   const [reviewText, setReviewText] = useState('');
//   const [image, setImage] = useState<string | undefined>();

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//       base64: true,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     onSubmit({ reviewText, image });
//     setReviewText('');
//     setImage(undefined);
//     onClose();
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.modal}>
//           <Text style={styles.title}>Write a Review</Text>
//           <Text style={styles.username}>@{username}</Text>

//           <TextInput
//             placeholder="Share your thoughts..."
//             value={reviewText}
//             onChangeText={setReviewText}
//             multiline
//             style={styles.input}
//           />

//           {image && <Image source={{ uri: image }} style={styles.preview} />}

//           <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
//             <Ionicons name="image-outline" size={20} color={FyndColors.Green} />
//             <Text style={styles.imageButtonText}>Upload Photo</Text>
//           </TouchableOpacity>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity onPress={onClose} style={styles.cancel}>
//               <Text style={{ color: '#999' }}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
//               <Text style={{ color: 'white' }}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default AddReview;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   modal: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: FyndColors.Purple,
//     marginBottom: 8,
//   },
//   username: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 12,
//   },
//   input: {
//     minHeight: 100,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     textAlignVertical: 'top',
//     marginBottom: 10,
//   },
//   imageButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   imageButtonText: {
//     color: FyndColors.Green,
//     marginLeft: 6,
//   },
//   preview: {
//     width: '100%',
//     height: 180,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancel: {
//     padding: 10,
//   },
//   submit: {
//     backgroundColor: FyndColors.Green,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
// });


/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from './fyndColors';

import { useInteractionApi } from '@/api/interaction';   // 🆕 backend hooks

type Props = {
  visible: boolean;
  onClose: () => void;
  username: string;               // business username (passed from [username].tsx)
  onSubmit?: () => void;          // optional refresh callback
};

export default function AddReview({
  visible,
  onClose,
  username,
  onSubmit,
}: Props) {
  /* ───────────────────────── state ───────────────────────── */
  const [reviewText, setReviewText] = useState('');
  const [photoUri,   setPhotoUri]   = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  /* ─────────────────── backend helpers ───────────────────── */
  const {
    upsertReview,          // POST /interaction/upsertReview
    uploadReviewImage,     // POST /interaction/uploadReviewImage/:review_uuid
  } = useInteractionApi();

  /* ───────────────────── image picker ─────────────────────── */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!res.canceled && res.assets.length) {
      setPhotoUri(res.assets[0].uri);
    }
  };

  /* ───────────────────── submit review ────────────────────── */
  const handleSubmit = async () => {
    if (!reviewText.trim()) return;          // no empty reviews
    setSubmitting(true);
    setError(null);

    try {
      /* 1️⃣  Save / update the review text */
      // uuid is null on first write; backend returns { uuid } either way
      const { uuid } = await upsertReview({
        uuid: undefined,
        business_username: username,
        review: reviewText.trim(),
      });

      /* 2️⃣  Optional: upload a photo */
      if (photoUri) {
        await uploadReviewImage(uuid, photoUri);   // helper builds FormData
      }

      /* 3️⃣  Let parent refresh + reset local UI */
      onSubmit?.();
      setReviewText('');
      setPhotoUri(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error ?? 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ────────────────────── UI modal ───────────────────────── */
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* header */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Write a review</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color={FyndColors.Green} />
            </TouchableOpacity>
          </View>

          {/* textarea */}
          <TextInput
            multiline
            placeholder="Share your experience…"
            placeholderTextColor="#888"
            style={styles.textarea}
            value={reviewText}
            onChangeText={setReviewText}
          />

          {/* selected photo */}
          {photoUri && (
            <Image source={{ uri: photoUri }} style={styles.preview} />
          )}

          {/* error */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* footer buttons */}
          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.iconBtn} onPress={pickImage}>
              <Ionicons name="image" size={22} color={FyndColors.Green} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitBtn,
                {
                  backgroundColor:
                    reviewText.trim() ? FyndColors.Purple : '#ccc',
                },
              ]}
              disabled={submitting || !reviewText.trim()}
              onPress={handleSubmit}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitTxt}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* ─────────────────────── styles ─────────────────────────── */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '700', color: FyndColors.Green },
  textarea: {
    minHeight: 100,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    color: '#333',
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  iconBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: FyndColors.Green,
    borderRadius: 8,
  },
  submitBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  submitTxt: { color: '#fff', fontWeight: '700' },
  error: { color: 'red', marginTop: 8 },
});
