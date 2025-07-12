import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';

const OurStory = () => {
  const router = useRouter();

  // contact us elements
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/yourusername'); // add our IG username
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:your@email.com'); // add our email address
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cute black back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/settings')}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Image Placeholder */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>[ Image ]</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>FYNDing Our Path</Text>

        {/* Diamond underline */}
        <View style={styles.underlineWrapper}>
          <View style={styles.underlineLine} />
        </View>

        {/* Story Text */}
        <Text style={styles.paragraph}>
          Fynd started with a simple vision: 
          to create spaces where exploration, connection, and creativity meet. 
          We’re built on shared stories, local gems, and meaningful moments.
        </Text>

        <Text style={styles.paragraph}>
          From humble beginnings to a thriving community, 
          our journey is shaped by passion and people. 
          With every step, we aim to leave footprints of impact, inclusion, and joy.
        </Text>

        <Text style={styles.paragraph}>
          Thanks for walking this path with us. The story continues with you.
        </Text>

        <Text style={{fontWeight:'bold', fontSize:12, marginTop:20}}>Contact Us</Text>
        <View style={styles.iconRow}>
            <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
            <FontAwesome name="instagram" size={25} color="#852333" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
              <FontAwesome name="envelope" size={25} color="#852333" />
            </TouchableOpacity>
          </View> 

        <Text style={styles.footerText}>Get lost, FYND more.</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

// #C13584 ig logo colour (rainbow)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4DFB2', // beige background
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
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
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 250,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imageText: {
    color: '#999',
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  underlineWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
    width: '100%',
  },
  underlineLine: {
    height: 1,
    backgroundColor: '#000',
    width: '60%',
    position: 'absolute',
    top: 5,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  paragraph: {
    fontSize: 16,
    color: '#3F3528',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  icon: {
    padding: 10,
    color:'#a84c3a',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',   // put items side by side
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0.71, // if using React Native 0.71+, or replace with margin
  },
});

export default OurStory;
