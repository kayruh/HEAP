// import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Animated, Platform, Text, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SLOGAN = '   GET LOST FYND MORE   '.repeat(20); // Repeat to make it long enough !!!! IT DISAPPEARS

export default function index() {
    // const { user } = useUser()

  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
      const animate = () => {
          scrollX.setValue(0);
          Animated.timing(scrollX, {
              toValue: screenWidth,
              duration: 40000,
              useNativeDriver: true,
          }).start(() => animate());
      };

      animate();
  }, [scrollX]);

  const translateX = scrollX.interpolate({
      inputRange: [0, screenWidth],
      outputRange: [0, -screenWidth],
  });

  return (
      <View style={styles.container}>
          {/* Top Header Bar */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                  <Ionicons name="menu" size={28} color="#a84c3a" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>FYND</Text>

              <TouchableOpacity onPress={() => navigation.navigate('search')}>
                  <Ionicons name="search" size={24} color="#a84c3a" />
              </TouchableOpacity>
          </View>

          {/* Conveyor Belt Slogan */}
          <View style={styles.sloganBar}>
              <Animated.Text
                  style={[
                      styles.sloganText,
                      { transform: [{ translateX }] },
                  ]}
              >
                  {SLOGAN}
              </Animated.Text>
          </View>

          {/* Main Content */}
          <View style={styles.body} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  header: {
      backgroundColor: '#6E1725',
      paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
      paddingBottom: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  headerTitle: {
      color: '#a84c3a',
      fontSize: 28,
      fontWeight: 'bold',
      letterSpacing: 2,
  },
  sloganBar: {
      backgroundColor: '#a84c3a',
      height: 20,
      overflow: 'hidden',
  },
  sloganText: {
      color: '#f7eac0',
      fontWeight: 'bold',
      fontSize: 11,
      letterSpacing: 1,
      lineHeight: 20,
      whiteSpace: 'nowrap',
  },
  body: {
      flex: 1,
      backgroundColor: '#fff',
  },
});

// //this needs to be done, need a google maps api
// //and need to find a way to build on top of the api
// //should have a search button on top