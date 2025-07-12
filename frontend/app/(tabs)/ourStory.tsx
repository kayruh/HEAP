import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import fyndColours from '@/components/fyndColours'; 

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
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/settings')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>FYNDING OUR PATH</Text>
      </View>

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
          We’re built on shared stories, local gems, and meaningful moments. Thanks for walking this path with us. The story continues with you.

        </Text>

        {/* Title */}
        <Text style={styles.title}>FYND your Journey with Us.</Text>
        <Text style={styles.paragraph}>
          Hit us up if you’re vibing with the community or have something in the works. We’re game.
        </Text>

        <Text style={styles.paragraph}>
        </Text>        

        <View style={styles.SocialsBlock}>
          <Text style={styles.SocialsTitle}>Stay Connected</Text>
          <Text style={styles.SocialsText}>
            Hit us up if you’re vibing with the community or have something in the works. We’re game.
          </Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>FYNDing Us</Text>
            <View style={styles.iconRow}>
            <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
            <FontAwesome name="instagram" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
              <FontAwesome name="envelope" size={25} color="white" />
            </TouchableOpacity>
          </View> 
          </View>
        </View>

        <Text style={styles.footerText}>Get lost, FYND more.</Text>


      </ScrollView>
    </SafeAreaView>
  );
};

// #3D6B3D  ig logo colour (rainbow)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A7C4A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 6,
  },
   safeArea: {
    flex: 1,
    backgroundColor: 'white', 
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
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
  SocialsBlock: {
  backgroundColor: '#3D6B3D',
  padding: 30,
  marginTop: 20,
  width: '100%',
  alignSelf: 'stretch',
  },
  SocialsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  SocialsText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10, 
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
    color:'#556B2F',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0.71, 
  },
});

export default OurStory;
