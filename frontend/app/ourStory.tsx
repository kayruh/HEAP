import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import FyndColors from '@/components/fyndColors';

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
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}> 
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.content}>
            {/* Image Placeholder */}
            <View style={styles.contentTop}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>[ Image ]</Text>
              </View>
            </View>
    
            <Text style={styles.title}>FYNDing Our Path</Text>
    
            <View style={styles.underlineWrapper}>
              <View style={styles.underlineLine} />
            </View>
    
            <Text style={styles.paragraph}>
              Fynd started with a simple vision: 
              to create spaces where exploration, connection, and creativity meet. 
              We’re built on shared stories, local gems, and meaningful moments. 
              Thanks for walking this path with us. The story continues with you.
            </Text>
          </View>
    
          <View style={styles.SocialsBlock}>
            <Text style={styles.SocialsTitle}>Stay Connected</Text>
            <Text style={styles.SocialsText}>
              Hit us up if you’re vibing with the community or have something in the works. We’re game.
            </Text>
    
            <View style={styles.contactRow}>
              <Text style={styles.contactText}>FYNDing Us</Text>
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
                  <FontAwesome name="instagram" size={25} color={FyndColors.Yellow}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
                  <FontAwesome name="envelope" size={25} color={FyndColors.Yellow}/>
                </TouchableOpacity>
              </View>
            </View>
    
            <Text style={styles.footerText}>Get lost, FYND more.</Text>
          </View>
        </ScrollView>
      </View>
    );
}

// #3D6B3D  ig logo colour (rainbow)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FyndColors.Yellow,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 70,
  },  
  pageWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },  
  backButton: {
    position: 'absolute',
    top: 55,
    left: 18,
    backgroundColor: FyndColors.Green,
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingTop: 20, 
    paddingHorizontal: 20,
    marginTop: 20, 
  },
  contentTop: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 250,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
    fontWeight: 800,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: FyndColors.Green,
    marginBottom: 6,
  },
  underlineWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  paragraph: {
    fontSize: 16,
    color: '#3F3528',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  SocialsBlock: {
    backgroundColor: FyndColors.Green,
    padding: 20,
  },
  SocialsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FyndColors.Yellow,
    marginBottom: 10,
    textAlign: 'left',
  },
  SocialsText: {
    fontSize: 15,
    color: FyndColors.Yellow,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'left',
  },
  contactRow: {
    alignItems: 'center',
  },
  contactText: {
    color: FyndColors.Yellow,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '700',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  icon: {
    padding: 10,
  },
  footerText: {
    textAlign: 'center',
    color: FyndColors.Yellow,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
  },
});


export default OurStory;
