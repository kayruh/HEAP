import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import FyndBanner from '@/components/fyndBanner';

const ContactUs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FyndBanner />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4DFB2' }}>
        <Text style={{ fontSize: 18, color: '#333' }}>
          Contact Us
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;