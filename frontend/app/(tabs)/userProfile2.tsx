import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FyndBanner from '@/components/fyndBanner';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import FyndColors from '@/components/fyndColors';
import LoginModal from '@/components/loginModal';
import Favourites from './favourites';
import { FlatList } from 'react-native';
import AddFavList from '@/components/addFavList';

const userProfile = () => {
    const router = useRouter();
    const { user } = useUser(); // how to check if it is biz acc???

    const [activeTab, setActiveTab] = useState('favs'); //default selected tab

    const [modalVisible, setModalVisible] = useState(false); // for creating new events

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [userLists, setUserLists] = useState<string[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [showFavListModal, setShowFavListModal] = useState(false); // to manage addFav modal

    // determines what is in each tab
    const renderTabContent = () => {
        if (activeTab === 'favs') {
          return (
            <View style={styles.tabContent}>
            <>
                <Text>Display user's fav lists here</Text>
                <Favourites />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowFavListModal(true)}
                    >
                    <Ionicons name="add" size={28} color="#fff" />
                    </TouchableOpacity>
                </>
            </View>
          )
        }
        if (activeTab === 'list') {
          return (
            <View style={styles.tabContent}>
                <Text>idk</Text>
            </View>
          )
        }
        if (activeTab === 'reviews') {
          return (
            <View style={styles.tabContent}><Text>Display reviews that user has GIVEN here</Text></View>
          )
        }
        return null
      }
    return (
        <View style={styles.container}>
          <FyndBanner />

        {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
        <FlatList
        data={[]}
        ListHeaderComponent={() => (
            <>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={styles.profileImage}
                />
              </View>

              <View style={styles.profileInfo}>
                {/* // NAME of biz. if no name input, replace w username*/}
                <Text style={styles.profileName}> 
                  {user?.firstName ?? 'NAME'} 
                </Text> 

                {/* biz username */}
                <Text style={styles.profileHandle}>                  
                  @{user?.username}
                </Text>

              </View>
            </View>
          </View>

          {/* Stats - do we want to include followers?*/}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12.1K</Text>
              <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>55</Text>
              <Text style={styles.statLabel}>EVENTS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>SAVES</Text>
            </View>
          </View>

          {/* navigation tab */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab('favs')}
              style={[styles.tabButton, activeTab === 'favs' && styles.activeTab]}>
              <Ionicons name="heart" size={20} color={activeTab === 'favs' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('list')}
              style={[styles.tabButton, activeTab === 'list' && styles.activeTab]}>
              <Ionicons name="list" size={20} color={activeTab === 'list' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reviews')}
              style={[styles.tabButton, activeTab === 'reviews' && styles.activeTab]}>
              <Ionicons name="star" size={20} color={activeTab === 'reviews' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>
          </View>

          {/* Render Tab Content */}
          {renderTabContent()}
          </>
        )}
      />

        <LoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSignIn={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-in'));
          }}
          onSignUp={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-up'));
          }}
          onBizSignUp={
            () => {
              setShowLoginModal(false); 
              setTimeout(() => router.push('../(auth)/business-sign-up'));
          }}
        />

        <AddFavList
        visible={showFavListModal}
        onClose={() => setShowFavListModal(false)}
        />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // change bg colour of WHOLE page
    position: 'relative', 
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // ✅ Add some space to scroll past bottom
  },
  profileSection: {
    // backgroundColor: '#fff',
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderWidth: 3,
    borderColor: FyndColors.Purple,
    borderRadius: 60,
    padding: 3,
    marginRight: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FyndColors.Green,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  feedSection: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  eventImageContainer: {
    marginRight: 16,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B2635',
    marginRight: 8,
  },
  eventMonth: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tabButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: FyndColors.Green,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: FyndColors.Purple,
    borderRadius: 28,
    padding: 12,
    zIndex: 10,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10, 
    },
  
  iconButton: {
    padding: 4,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  
});

export default userProfile;