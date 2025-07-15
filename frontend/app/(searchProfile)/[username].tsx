import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FyndBanner from '@/components/fyndBanner';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import FyndColors from '@/components/fyndColors';
import CreateNewEvent from '@/components/createNewEvent';
import AddBookmark from '@/components/addBookmark';
import LoginModal from '@/components/loginModal';

const businessProfile = () => {
    const router = useRouter();
    const { user } = useUser(); // how to check if it is biz acc???

    const [activeTab, setActiveTab] = useState('home'); //default selected tab

    const [modalVisible, setModalVisible] = useState(false); // for creating new events

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [userLists, setUserLists] = useState<string[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Mocked favourite lists – REPLACE with real data from DB or API
    const favouriteLists = ['My Favourites', 'Thrift Shops', 'To Visit Again'];

    // Handle bookmarking
    const handleAddToFavourite = (listName: string) => {
      console.log(`Bookmarking business to: ${listName}`);
      // TODO: Save business ID to this list in backend
    };

    // TO CHECK IF USER HAS ALRDY BOOKMARKED PROFILE
    // useEffect(() => {
    //   if (user) {
    //     checkIfBookmarked(user.id, businessId).then((result) => {
    //       setIsBookmarked(result);
    //     });
    //   }
    // }, [user]);

    return (
        <View style={styles.container}>
          <FyndBanner />

        <ScrollView contentContainerStyle={styles.contentContainer}>
      
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

                {/* biz description (they can write themselves) */}
                <Text style={styles.profileDescription}> the COOLEST thrift store in Singapore. </Text>

                {/* Icons on the right side of the name */}
                <View style={styles.iconRow}>
                  <TouchableOpacity style={styles.iconButton}
                    onPress={() => console.log('Follow pressed')}>
                    <Ionicons name="person-add-outline" size={20} color={FyndColors.Green} />
                  </TouchableOpacity>

                  <TouchableOpacity
                      onPress={() => {
                        if (!user) {
                          setShowLoginModal(true);
                        } else {
                          setShowBookmarkModal(true);
                        }
                      }}
                    >
                      <Ionicons
                        name={isBookmarked ? "bookmark" : "bookmark-outline"}
                        size={20}
                        color={FyndColors.Green}
                      />
                    </TouchableOpacity>
                </View>

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
              onPress={() => setActiveTab('home')}
              style={[styles.tabButton, activeTab === 'home' && styles.activeTab]}>
              <Ionicons name="grid-outline" size={20} color={activeTab === 'home' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('list')}
              style={[styles.tabButton, activeTab === 'list' && styles.activeTab]}>
              <Ionicons name="list" size={20} color={activeTab === 'list' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => setActiveTab('add')}
              style={[styles.tabButton, activeTab === 'add' && styles.activeTab]}>
              <Ionicons name="add" size={28} color={activeTab === 'add' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => setActiveTab('reviews')}
              style={[styles.tabButton, activeTab === 'reviews' && styles.activeTab]}>
              <Ionicons name="star" size={20} color={activeTab === 'reviews' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>
          </View>

          {/* renders what is in each tab */}
          {activeTab === 'home' && (
            <View>
              <Text>Home content here</Text>

              {/* Feed. how can biz users upload more photos??*/}
                <View style={styles.feedSection}>
                {/* Post 1 */}
                <View style={styles.postContainer}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/350x300/8B4513/FFFFFF?text=Vintage+Items' }}
                    style={styles.postImage}
                  />
                  <Image
                    source={{ uri: 'https://via.placeholder.com/350x300/228B22/FFFFFF?text=People+Shopping' }}
                    style={styles.postImage}
                  />
                </View>
                {/* Post 2 */}
                <View style={styles.postContainer}>
                  <View style={styles.eventCard}>
                    <View style={styles.eventImageContainer}>
                      <Image
                        source={{ uri: 'data:image/jpeg;base64,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' }}
                        style={styles.eventImage}
                      />
                    </View>
                    <View style={styles.eventDetails}>
                      <Text style={styles.eventTitle}>STREET WEARE HOUSE</Text>
                      <Text style={styles.eventDescription}>
                        event description, location, time etc.
                      </Text>
                      <View style={styles.eventDateContainer}>
                        <Text style={styles.eventDate}>7-12</Text>
                        <Text style={styles.eventMonth}>JULY 2025</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          {activeTab === 'list' && (
            <View>
              <Text>Events list content here</Text>
            </View>
          )}
          {/* {activeTab === 'add' && (
            <View><Text>Add something content here</Text></View>
          )} */}
          {activeTab === 'reviews' && (
            <View><Text>Reviews here</Text></View>
            // how are people gg to give reviews?
          )}

      </ScrollView>

      {/* add button, under events tab (ONLY for biz users, to create event) */}
      {activeTab === 'list' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={28} color={FyndColors.Yellow} />
        </TouchableOpacity>
        )}

        <CreateNewEvent
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={(event) => {
            console.log('New event data:', event);
            // TODO: Save to DB or state
          }}/>

        <AddBookmark
          visible={showBookmarkModal}
          onClose={() => setShowBookmarkModal(false)}
          favouriteLists={userLists}
          onSelectList={(listName) => {
            console.log('Saved to:', listName);
            // Save to DB here
          }}
          onCreateNewList={(newName) => {
            // Save new list to DB here
            setUserLists((prev) => [...prev, newName]); // Update local state
          }}
        />

        <LoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSignIn={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-in'), 5); // delay navigation slightly
          }}
          onSignUp={() => {
            setShowLoginModal(false); 
            setTimeout(() => router.push('../(auth)/sign-up'), 5);
          }}
          onBizSignUp={
            () => {
              setShowLoginModal(false); 
              setTimeout(() => router.push('../(auth)/business-sign-up'), 5);
          }}
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
    fontSize: 18,
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
    bottom: 100, // more spacing from the bottom
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
  
});

export default businessProfile;

//if not user then business profile might have to change this within _layout.tsx within (tabs) group