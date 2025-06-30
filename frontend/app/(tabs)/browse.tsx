import { View, Text, SafeAreaView, ScrollView, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import TopBanner from '@/components/topBanner';
import EventCarousel from '@/components/eventCarousel';
import EventCard from '@/components/eventCard';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FyndBanner from '@/components/fyndBanner'

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;

// replace following data with database data (events)
// dynamically code events
// WHATS HOT events:
const featuredDeals = [
  {
    id: 1,
    title: 'Summer Collection',
    subtitle: 'Up to 50% OFF',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    color: '#FF6B6B',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Styles',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
    color: '#4ECDC4',
  },
  {
    id: 3,
    title: 'Weekend Special',
    subtitle: 'Limited Time',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    color: '#45B7D1',
  },
];

// ALL events
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    isNew: true,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    isNew: false,
  },
  {
    id: 3,
    name: 'Phone Case',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300',
    isNew: true,
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
    isNew: false,
  },
];

const browse = () => {

  // const [search, setSearch] = React.useState('');
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
      <FyndBanner />
    
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        <Text style={styles.sectionTitle}>What's Happening</Text>
        <Text style={styles.sectionDescription}>Description of this tab?</Text>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffff" />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      
          {/* Featured Deals Section */}
          <View>
            <Text style={styles.sectionTitle}> {'\n'}
              What's Hot </Text>
            <EventCarousel data={featuredDeals} />
          </View>

          <View style={{paddingLeft:3}}>
            <Button 
                  title="Discover more"
                  type="solid"
                  buttonStyle={styles.discoverMoreButton}
                titleStyle={styles.discoverMoreText}
                  onPress={() => console.log('Discover more pressed')}
                />
          </View>

          {/* All events */}
          <Text>{'\n'}</Text>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                All events</Text>
              <Button
                title="Filter"
                type="clear"
                titleStyle={styles.viewAllText}
                onPress={() => console.log('Filter pressed')}
              />
            </View>
            
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <EventCard key={product.id} item={product} />
              ))}
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },

  // Section Styles
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingLeft: 3,
    paddingTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingLeft: 3,
  },
  sectionDescription: {
    fontSize: 14,
    paddingLeft: 3,
    color: 'black',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Product Card Styles
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  
  // Info Card Styles
  featureItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },

  // Discover more button styling
  discoverMoreButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    paddingVertical: 6,
    width: '33%',
    paddingTop: 8,
    paddingLeft: 12,
},
  discoverMoreText: {
    fontSize: 12,
    fontWeight: '600',
},
});

export default browse

// to do, add a horizontal carousel that fits maybe 1/3 the screen to show whats popular
//below that add a vertical scrollable to show all events that are happening. 
// ^ create event card component to render how each event card will look like (take from DB)
//add a filter button