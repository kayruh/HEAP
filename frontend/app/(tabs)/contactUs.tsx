import React from 'react';
import { View, Text, Linking, ScrollView } from 'react-native';
import FyndBanner from '@/components/fyndBanner';
import { TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ContactUs = () => {
  const router = useRouter();

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/yourusername'); // add our IG username
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:your@email.com'); // add our email address
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/settings')}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Contact Us</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
            <FontAwesome name="instagram" size={28} color="#852333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
            <FontAwesome name="envelope" size={28} color="#852333"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Get lost, FYND more.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4DFB2',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',  // centers vertically
    alignItems: 'center',      // centers horizontally
    paddingVertical: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 30, // works in RN 0.71+, otherwise use marginHorizontal
  },
  icon: {
    marginHorizontal: 15,
    padding: 10,
    color: '#852333',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 18,
    backgroundColor: '#852333', // same color as FYND text in banner. or #6E1725 for bg banner color
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

export default ContactUs;

// this page can be a detailed contact us page?? since links to our IG and email alrdy in our story page?