import { View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TopBanner() {
  return (
    <View className=" bg-yellow-300 h-16 flex-row items-center justify-between px-4">
      <Pressable>
        <Feather name="menu" size={24} color="black" /> 
      </Pressable>

      <Text className="text-xl font-bold text-black">FYND</Text>

      <View className="flex-row items-center space-x-3">
        <Pressable>
          <Feather name="search" size={22} color="black" />
        </Pressable>
        {/* <Image
          source={{ uri: 'https://example.com/profile.jpg' }}
          className="w-8 h-8 rounded-full"
        /> */}
      </View>
    </View>
  );
}

// sidebar
// search button -> search page 
// profile from DB