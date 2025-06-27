import { View, Text, SafeAreaView, ScrollView, Button, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination,} from "react-native-reanimated-carousel";
import TopBanner from '@/components/topBanner';
import EventCarousel from '@/components/eventCarousel';
import { SearchBar } from 'react-native-screens';
import EventCard from '@/components/eventCard';
import { StatusBar } from 'react-native';

// const data = [...new Array(6).keys()];
// const width = Dimensions.get("window").width;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;

// replace following data with database data (events)
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

  const [search, setSearch] = React.useState('');
  return (
    
    <SafeAreaView>
      <TopBanner/>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

      <Text className='text-2xl font-bold pl-3 pt-3'>What's Happening</Text>
      <Text className='text-sm pl-3'>Description of this tab</Text>


      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      
          {/* Featured Deals Section */}
          <View>
            <Text className='text-lg font-bold pl-3'> {'\n'}
              What's Hot </Text>
            <EventCarousel data={featuredDeals} />
          </View>

          {/* All events */}
          <View className="mt-2">
            <Text> </Text>
            <Button
              title="Discover more"
              onPress={() => Alert.alert('Simple Button pressed')}/>
        </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text className='text-lg font-bold pl-3'>All events</Text>
              <Button
                title="View All"
                type="clear"
                titleStyle={styles.viewAllText}
                onPress={() => console.log('View all pressed')}
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
    </SafeAreaView>
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
  
  // Search Styles
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInputContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
  },
  searchInput: {
    fontSize: 16,
  },

  // Section Styles
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Carousel Styles
  carouselContainer: {
    paddingLeft: 20,
  },
  carouselItemWrapper: {
    marginRight: 20,
  },
  carouselCard: {
    width: CAROUSEL_ITEM_WIDTH,
    height: 180,
    borderRadius: 16,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  carouselContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  carouselTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  carouselSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  carouselButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  carouselButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  carouselImage: {
    width: 100,
    height: '100%',
    opacity: 0.3,
  },

  // Product Card Styles
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 60) / 2,
    borderRadius: 12,
    margin: 10,
    padding: 0,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  badgeText: {
    fontSize: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 4,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 35,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Info Card Styles
  infoCard: {
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});

export default browse

// to do, add a horizontal carousel that fits maybe 1/3 the screen to show whats popular
//below that add a vertical scrollable to show all events that are happening. 
// ^ create event card component to render how each event card will look like (take from DB)
//add a filter button
