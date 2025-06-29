// import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Animated, Platform, Text, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'
import FyndBanner from '@/components/fyndBanner'

const SLOGAN = '   GET LOST FYND MORE   '.repeat(20) // Repeat to make it long enough !!!! IT DISAPPEARS

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
           <FyndBanner/>

          {/* Conveyor Belt Slogan */}
          <View style={styles.sloganBar}>
              <Animated.View
                  style={[
                    styles.sloganContent,
                    { transform: [{ translateX }] },
                  ]} >
                  <Text style={styles.sloganText}>{SLOGAN}</Text>
                  <Text style={styles.sloganText}>{SLOGAN}</Text>
                </Animated.View>
          </View>

          {/* Main Content */}
          <View style={styles.body}>
            <Text className='text-center pt-3'>Google maps here</Text>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffff',
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
  sloganContent: {
    flexDirection: 'row',
    width: '200%', // two slogans side by side
  },
  body: {
      flex: 1,
      backgroundColor: '#fff',
  },
});

// //this needs to be done, need a google maps api
// //and need to find a way to build on top of the api
// //should have a search button on top