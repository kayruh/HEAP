import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from './fyndColors';
import { useRouter } from 'expo-router';

type LoginModalProps = {
    visible: boolean;
    onClose: () => void;
    onSignIn: () => void;
    onBizSignUp: () => void;
    onSignUp: () => void;
  };
  

const LoginModal = ({visible, onClose, onSignIn, onBizSignUp, onSignUp}: LoginModalProps) => {
    const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>You're not signed in</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.message}>
            Sign in or create an account to save this to your favourites.
          </Text>

          <TouchableOpacity style={styles.button} 
            onPress={onSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} 
            onPress={onBizSignUp}>
            <Text style={styles.buttonText}>Business Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondary]} 
            onPress={onSignUp}>
            <Text style={[styles.buttonText, styles.secondaryText]}>Create Account</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: FyndColors.Purple,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginVertical: 20,
  },
  button: {
    backgroundColor: FyndColors.Green,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: FyndColors.Green,
  },
  secondaryText: {
    color: FyndColors.Green,
  },
});
