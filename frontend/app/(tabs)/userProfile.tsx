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
import { SignOutButton } from '@/components/SignOutButton';
import { useInteractionApi } from '@/api/interaction';
import ReviewCard from '@/components/reviewCard';
import EventCard from '@/components/eventCard2';

const userProfile = () => {
    const router = useRouter();
    const { user } = useUser();

    const [activeTab, setActiveTab] = useState('favs'); //default selected tab

    const [modalVisible, setModalVisible] = useState(false); // for creating new events

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [userLists, setUserLists] = useState<string[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [showFavListModal, setShowFavListModal] = useState(false); // to manage addFav modal

    // get reviews that users gave
    const [userReviews, setUserReviews] = useState<any[]>([]);

    const {getAccountReviews} = useInteractionApi();
    useEffect(() => {
      const fetchUserReviews = async () => {
        try {
          if (user) {
            const userReviews = await getAccountReviews(user.username);
            setUserReviews(userReviews);
            console.log('Fetched user reviews:', userReviews);
          }
        } catch (err) {
          console.error('Error fetching user reviews:', err);
        }
      };
    
      fetchUserReviews();
    }, [user]);

    // for LIKED tabs
    // separate items into liked events and liked businesses
    // const { getEventLikeCheck, getBusinessLikeCheck } = useInteractionApi();

    // const [likedEvents, setLikedEvents] = useState<EventItem[]>([]);
    // const [likedBusinesses, setLikedBusinesses] = useState<BusinessItem[]>([]);

    // const [allItems, setAllItems] = useState<(EventItem | BusinessItem)[]>([]);


    // useEffect(() => {
    //   const fetchLikes = async () => {
    //     if (!user?.username) return;

    //     const eventResults: EventItem[] = [];
    //     const bizResults: BusinessItem[] = [];

    //     for (const item of allItems) {
    //       try {
    //         if (item.type === "event") {
    //           const liked = await getEventLikeCheck(user.username, item.uuid);
    //           if (liked) eventResults.push(item);
    //         } else if (item.type === "business") {
    //           const liked = await getBusinessLikeCheck(user.username, item.username);
    //           if (liked) bizResults.push(item);
    //         }
    //       } catch {
    //         // if 404, not liked → ignore
    //       }
    //     }

    //     setLikedEvents(eventResults);
    //     setLikedBusinesses(bizResults);
    //   };

    //   fetchLikes();
    // }, [user?.username, allItems]);


    // determines what is in each tab
    const renderTabContent = () => {
        if (activeTab === 'favs') {
          return (
            <View style={styles.tabContent}>
            <>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        if (!user) {
                          setShowLoginModal(true);
                        } else {
                            setShowFavListModal(true);
                        }
                      }}
                    >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                        +  Create a new list
                    </Text>
                    
                    </TouchableOpacity>

                    <Favourites />
                </>
            </View>
          )
        }
        if (activeTab === 'list') {
          return (
            // <View style={styles.tabContent}>
            //   <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
            //     <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            //       Liked Events
            //     </Text>
            //     {likedEvents.length === 0 ? (
            //       <Text>No liked events yet.</Text>
            //     ) : (
            //       <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            //         {likedEvents.map(ev => (
            //           <EventCard key={ev.uuid} item={ev} />
            //         ))}
            //       </View>
            //     )}

            //     <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 20 }}>
            //       Liked Businesses
            //     </Text>
            //     {likedBusinesses.length === 0 ? (
            //       <Text>No liked businesses yet.</Text>
            //     ) : (
            //       <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            //         {likedBusinesses.map(biz => (
            //           <EventCard key={biz.username} item={biz} />
            //         ))}
            //       </View>
            //     )}
            //   </ScrollView>
            // </View>
            <Text>
              Display user's liked events and biz separately
            </Text>
          )
        }
        if (activeTab === 'reviews') {
          return (
            <View style={styles.tabContent}>
              {userReviews.length > 0 ? (
                <FlatList
                  data={userReviews}
                  keyExtractor={(item, index) => item.id?.toString() ?? `${item.username}_${index}`}
                  renderItem={({ item }) => (
                    <ReviewCard
                      username={item.username || 'Anonymous'}
                      reviewText={item.review || 'No review text'}
                      datePosted={item.created_at || new Date().toISOString()}
                      biz_username={item.business_username}
                      images={item.images || []}
                    />
                  )}
                />
              ) : (
                <Text>No reviews yet</Text>
              )}
            </View>
          );
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

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        onPress={() => router.push('/editProfile')}
                        style={styles.translucentButton}>
                        <Text style={styles.translucentButtonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.translucentButton}>
                        <SignOutButton/>
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
              onPress={() => setActiveTab('favs')}
              style={[styles.tabButton, activeTab === 'favs' && styles.activeTab]}>
              <Ionicons name="list" size={20} color={activeTab === 'favs' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('list')}
              style={[styles.tabButton, activeTab === 'list' && styles.activeTab]}>
              <Ionicons name="heart" size={20} color={activeTab === 'list' ? FyndColors.Yellow : FyndColors.Green} />
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

export default userProfile;

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
    backgroundColor: FyndColors.Purple,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or 'center' if you want them centered
    gap: 10, // for spacing (if gap doesn't work on older RN, use marginRight)
    marginTop: 10,
  },
  
  translucentButton: {
    backgroundColor: 'rgba(240, 230, 140, 0.4)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flex: 1, // allows buttons to take equal width
    alignItems: 'center',
  },
  
  translucentButtonText: {
    color: '#000',
    fontWeight: 600,
    fontSize: 14,
  },
  
});
