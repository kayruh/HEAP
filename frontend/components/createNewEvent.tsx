import React, { useState } from 'react';
import { Modal, TextInput, View, Text, TouchableOpacity, Platform, StyleSheet,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FyndColors from './fyndColors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (event: { name: string; description: string; date: Date }) => void;
};

const CreateNewEvent: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    onSave({ name: eventName, description: eventDescription, date: eventDate });
    onClose();
    setEventName('');
    setEventDescription('');
    setEventDate(new Date());
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Event</Text>

          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={styles.modalInput}
          />

          <TextInput
            placeholder="Description"
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline
            style={[styles.modalInput, { height: 80 }]}
          />

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>{eventDate.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={eventDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || eventDate;
                setShowDatePicker(false);
                setEventDate(currentDate);
              }}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalCancel}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.modalSave}>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNewEvent;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  datePickerButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  datePickerText: {
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalCancel: {
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalSave: {
    backgroundColor: FyndColors.Green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
