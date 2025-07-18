import { Text, SafeAreaView, View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import FyndBanner from '@/components/fyndBanner'
import FavouritesScreen from '@/components/favouritesScreen2';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import FyndColors from '@/components/fyndColors';
import { useInteractionApi } from '@/api/interaction';
import ChooseAuth from '@/components/chooseAuth';

type Props = {
    visible: boolean;
    onClose: () => void;
};

const AddFavList = ({ visible, onClose }: Props) => {
    const { user } = useUser();

  const { insertFolder } = useInteractionApi();
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateList = async () => {
        if (!newListName.trim()) {
          Alert.alert('Oops', 'A list needs a name.');
          return;
        }
    
        try {
          await insertFolder(newListName.trim(), newListDesc.trim());
    
          setRefreshKey(k => k + 1);
          onClose(); // close modal
          setNewListName('');
          setNewListDesc('');
        } catch (err: any) {
          const status = err?.response?.status;
          const message = err?.response?.data?.message;
    
          if (status === 409) {
            setErrorMsg(message);
          } else {
            setErrorMsg('Something went wrong. Please try again.');
          }
      };
    }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New List</Text>

          <TextInput
            placeholder="List Name"
            value={newListName}
            onChangeText={setNewListName}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={newListDesc}
            onChangeText={setNewListDesc}
            style={[styles.input, { height: 60 }]}
            multiline
          />
          {!!errorMsg && (
            <Text style={styles.errorText}>{errorMsg}</Text>
          )}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateList} style={styles.createBtn}>
              <Text style={{ color: '#fff' }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFavList

const styles = StyleSheet.create({
    addButton: {
      position: 'absolute',
      bottom: 110,
      right: 30,
      backgroundColor: FyndColors.Purple,
      borderRadius: 28,
      padding: 12,
      zIndex: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '85%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: '#f9f9f9',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelBtn: {
      backgroundColor: '#999',
      padding: 10,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
    },
    createBtn: {
      backgroundColor: FyndColors.Purple,
      padding: 10,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
    },
    errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  });