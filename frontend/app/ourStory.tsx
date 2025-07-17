import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import FyndColors from '@/components/fyndColors';
import Socials from '@/components/socials';


const OurStory = () => {
  const router = useRouter();

  // contact us elements
  const handleInstagramPress = () => {
    Linking.openURL(Socials.Instgram); // add our IG username
  };

  const handleEmailPress = () => {
    Linking.openURL(Socials.Email); // add our email address
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleFooterPress = () => {
    Linking.openURL('https://i.pinimg.com/1200x/be/c6/da/bec6da692075ff2c83a801d44405b2f8.jpg'); 
    // Replace with your desired URL
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={FyndColors.Green} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FYND</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>FYNDING US</Text>
            <Text style={styles.logoSubtitle}>WHERE EXPLORATION MEETS CONNECTION</Text>
            
            {/* Hand-drawn illustration */}
            <View style={styles.illustrationContainer}>
              <Text style={styles.illustrationText}>work in progress but want to put like a rotating logo</Text>
            </View>
          </View>

          {/* About Us Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About Us</Text>
            <Text style={styles.aboutText}>
              Welcome to FYND - where every journey begins with curiosity and ends with discovery. 
              We're more than just a platform; we're a community of explorers, creators, and dreamers 
              who believe that the best experiences happen when you step off the beaten path.
            </Text>
            <Text style={styles.aboutText}>
              Founded on the belief that authentic connections and meaningful experiences shape who we are, 
              FYND brings together local gems, hidden treasures, and the stories that make each place unique. 
              Our mission is simple: to help you discover what matters most in a world full of possibilities.
            </Text>
          </View>
        </View>

        {/* FYNDing Us Image Section */}
        <View style={styles.fyndingUsContainer}>
          <Text style={styles.fyndingUsTitle}>FYNDing Us</Text>
          <TouchableOpacity onPress={handleFooterPress} activeOpacity={0.8} style={styles.footerImageContainer}>
            <ImageBackground 
              source={{ uri: 'https://i.pinimg.com/1200x/be/c6/da/bec6da692075ff2c83a801d44405b2f8.jpg' }}
              style={styles.footerImage}
              imageStyle={{ borderRadius: 15 }}
            >
              {/* Optional overlay text or content can go here */}
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Stay Connected Section */}
        <View style={styles.stayConnectedContainer}>
          <Text style={styles.footerTitle}>Stay Connected</Text>
          <Text style={styles.footerText}>
            Hit us up if you're vibing with the community or have something in the works. We're game.
          </Text>

          <View style={styles.contactRow}>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
                <FontAwesome name="instagram" size={25} color={FyndColors.Yellow} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
                <FontAwesome name="envelope" size={25} color={FyndColors.Yellow} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footerBottomText}>Get lost, FYND more.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FyndColors.Yellow
  },

  // header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: FyndColors.Yellow,
    paddingTop: 60,  
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FyndColors.Green,
  },
  headerSpacer: {
    width: 34, 
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
  // Main Content Styles
  scrollView: {
    flex: 1,
  },
  mainContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: FyndColors.Purple,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 8,
  },
  logoSubtitle: {
    fontSize: 14,
    color: FyndColors.Purple,
    marginTop: 10,
    letterSpacing: 1,
    marginBottom: 20,
  },
  
  // Illustration styles
  illustrationContainer: {
    width: 280,
    height: 200,
    backgroundColor: '#F8F6F0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: FyndColors.Purple,
    borderStyle: 'dashed',
  },
  illustrationText: {
    color: FyndColors.Purple,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // About Us Section
  aboutSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: FyndColors.Green,
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  aboutText: {
    fontSize: 17,
    color: FyndColors.Green,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 18,
  },

  // FYNDing Us Container 
  fyndingUsContainer: {
    backgroundColor: '#F8F6F0',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 30,
  },
  fyndingUsTitle: {
    color: FyndColors.Green,
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  
  // Stay Connected Container 
  stayConnectedContainer: {
    backgroundColor: FyndColors.Green,
    padding: 25,
  },
  
  // Footer Image Styles
  footerImageContainer: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  footerImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Footer Styles 
  footer: {
    backgroundColor: FyndColors.Green, 
    padding: 25,
    marginTop: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: 200, 
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FyndColors.Yellow,
    marginBottom: 10,
    textAlign: 'left',
  },
  footerText: {
    fontSize: 15,
    color: FyndColors.Yellow,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'left',
  },
  contactRow: {
    alignItems: 'center',
    marginBottom: 10,
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
  footerBottomText: {
    textAlign: 'center',
    color: FyndColors.Yellow,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
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
});

export default OurStory;