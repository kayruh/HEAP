import { Text, SafeAreaView, View, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import FyndBanner from '@/components/fyndBanner'
import FavouritesScreen from '@/components/favourtiesScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';

// users need to login to see their lists
// if not log in -> prompt to log in
// else show fav lists
// how to do backend? send to specific user's account

const Favourites = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');

  const handleCreateList = () => {
    console.log('New List:', { newListName, newListDesc });
    // Here you would send to backend or update your list state
    setModalVisible(false);
    setNewListName('');
    setNewListDesc('');
  };

  return (
    <View>
      <FyndBanner />
      <FavouritesScreen />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={{ color: '#fff' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCreateList} style={styles.createBtn}>
                <Text style={{ color: '#fff' }}>Create</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#852333',
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
    backgroundColor: '#852333',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
});