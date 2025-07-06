import React from 'react';
import { View, Text, Linking, ScrollView } from 'react-native';
import FyndBanner from '@/components/fyndBanner';
import { TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactUs = () => {
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/yourusername'); // add our IG username
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:your@email.com'); // add our email address
  };

  return (
    <SafeAreaView style={{ flex: 1, 
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4DFB2' }}>
      <ScrollView>
      {/* <FyndBanner /> */}
        <View>

          <Text style={{fontWeight:'bold', fontSize:12, marginTop:20}}>Contact Us</Text>

          <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleInstagramPress} style={styles.icon}>
              <FontAwesome name="instagram" size={25} color="#C13584" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEmailPress} style={styles.icon}>
                <FontAwesome name="envelope" size={25} color="#333" />
              </TouchableOpacity>
            </View> 

            <Text style={styles.footerText}>Get lost, FYND more.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ContactUs;

// this page can be a detailed contact us page?? since links to our IG and email alrdy in our story page?