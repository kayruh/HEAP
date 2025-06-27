import { View, Text, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { Card, Button, Image, Badge, Rating,} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CAROUSEL_ITEM_WIDTH = width * 0.85;

// for all events section
const EventCard = ({ item }: { item: any }) => {
  return (
    <Card containerStyle={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.isNew && (
          <Badge
            value="NEW"
            status="error"
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
          />
        )}
        <Icon
          name="favorite-border"
          size={24}
          color="#666"
          style={styles.favoriteIcon}
        />
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Rating
            imageSize={16}
            readonly
            startingValue={item.rating}
            style={styles.rating}
          />
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
        </View>
        
        <Button
          title="Add to Cart"
          buttonStyle={styles.addToCartButton}
          titleStyle={styles.addToCartText}
          onPress={() => console.log('Product added:', item.name)}
        />
      </View>
    </Card>
  );
}

// change product -> event
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      scrollView: {
        flex: 1,
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
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 8,
    },
    addToCartText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default EventCard