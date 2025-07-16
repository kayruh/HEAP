import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Button,} from 'react-native';
import FyndColors from './fyndColors';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { getAccountFolders } from '@/api/interaction'; 

type AddBookmarkProps = {
  visible: boolean;
  onClose: () => void;
  onSelectList: (listName: string) => void;
  onCreateNewList: (newListName: string) => void;
};

const AddBookmark = ({
  visible,
  onClose,
  onSelectList,
  onCreateNewList,
}: AddBookmarkProps) => {
  const { user } = useUser()

  const [creatingNewList, setCreatingNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [favouriteLists, setFavouriteLists] = useState<string[]>([]); // Local state to hold folder names

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getAccountFolders(); 
        setFavouriteLists(data.map((folder: any) => folder.folder_name)); // Extract folder names
      } catch (err) {
        console.error('Error fetching folders:', err);
      }
    };
    if (visible) {
      fetchFolders(); // only fetch when modal becomes visible
    }
  }, [visible]);

  const handleCreateList = () => {
    if (newListName.trim() !== '') {
      onCreateNewList(newListName.trim());
      setNewListName('');
      setCreatingNewList(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add to Favourites</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {!creatingNewList && (
            <>
              <FlatList
                data={favouriteLists}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      onSelectList(item);
                      onClose();
                    }}
                  >
                    <Text style={styles.listText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                style={styles.createNewButton}
                onPress={() => setCreatingNewList(true)}
              >
                <Text style={styles.createNewText}>+ Create New List</Text>
              </TouchableOpacity>
            </>
          )}

          {creatingNewList && (
            <View style={styles.createNewListContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter list name"
                value={newListName}
                onChangeText={setNewListName}
              />
              <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={() => setCreatingNewList(false)} />
                <Button title="Save" onPress={handleCreateList} />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddBookmark

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: FyndColors.Purple,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  createNewButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  createNewText: {
    color: FyndColors.Green,
    fontWeight: 'bold',
    fontSize: 16,
  },
  createNewListContainer: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
