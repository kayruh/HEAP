import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FyndBanner from '@/components/fyndBanner';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useClerk, useUser } from '@clerk/clerk-expo';
import FyndColors from '@/components/fyndColors';
import CreateNewEvent from '@/components/createNewEvent';
import AddBookmark from '@/components/addBookmark';
import LoginModal from '@/components/loginModal';
import AddReview from '@/components/addReview';
import ReviewCard from '@/components/reviewCard';
import BizEventCard from '@/components/bizEventCard';
import { useBusinessApi } from '@/api/business';
import { useLocalSearchParams } from 'expo-router'
import { useClerkApi } from '@/api/clerk';
import { useInteractionApi } from '@/api/interaction';

// BIZ DISPLAY PAGE FOR USERS TO SEE WHEN SEARCHING

const businessProfile = () => {
    const { getBusinessInfo, countEvents, getBusinessImages, getEvents } = useBusinessApi();
    const { getAvatar } = useClerkApi();
    const { getBusinessLikeCount, getBusinessReviews } = useInteractionApi()
    

    const { username } = useLocalSearchParams<{ username: string }>();

    const router = useRouter();
    const { user } = useUser(); // how to check if it is biz acc???

    const [activeTab, setActiveTab] = useState('home'); //default selected tab

    const [modalVisible, setModalVisible] = useState(false); // for creating new events

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [userLists, setUserLists] = useState<string[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [showReviewModal, setShowReviewModal] = useState(false); // for adding reviews
    const [data, setData] = useState('')
    const [avatar, setAvatar] = useState('')
    const [likeCount, setLikeCount] = useState('0')
    const [eventCounter ,setEventCounter] = useState('0')
    const [images, setImages] = useState([])
    const [reviews, setReviews] = useState([])


      useEffect(() => {
    if (typeof username === 'string') {
      (async () => {
        try {
          const data = await getBusinessInfo(username);
          const avatar = await getAvatar(username);
          const likeCount = await getBusinessLikeCount(username);
          const eventCounter = await countEvents(username)
          const images = await getBusinessImages(username)
          const reviews = await getBusinessReviews(username)


          setData(data)
          setAvatar(avatar)
          setLikeCount(likeCount)
          setEventCounter(eventCounter)
          setImages(images)
          setReviews(reviews)
          
        } 
        catch (e) {
          console.log(e)
        }
      })();
    } 
  }, [username]);

    console.log(reviews)
    // console.log(events)
    // Mocked favourite lists – REPLACE with real data from DB or API !!!!!
    // const favouriteLists = ['My Favourites', 'Thrift Shops', 'To Visit Again'];

    // Handle bookmarking
    const handleAddToFavourite = (listName: string) => {
      console.log(`Bookmarking business to: ${listName}`);
      // TODO: Save business ID to this list in backend
    };


    return (
        <View style={styles.container}>
          <FyndBanner />

        <ScrollView contentContainerStyle={styles.contentContainer}>
      
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: avatar }}
                  style={styles.profileImage}
                />
              </View>

              <View style={styles.profileInfo}>
                {/* // NAME of biz. if no name input, replace w username*/}
                <Text style={styles.profileName}> 
                  {data.name} 
                </Text> 

                {/* biz username */}
                <Text style={styles.profileHandle}>                  
                  @{username}
                </Text>

                {/* biz description (they can write themselves) */}
                <Text style={styles.profileDescription}>{data.description}</Text>

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
                      style={styles.iconButton}
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
              <Text style={styles.statNumber}>{likeCount}</Text>
              <Text style={styles.statLabel}>FOLLOWERS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{eventCounter}</Text>
              <Text style={styles.statLabel}>EVENTS</Text>
            </View>
            {/* <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>SAVES</Text>
            </View> */}
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

            <TouchableOpacity
              onPress={() => setActiveTab('reviews')}
              style={[styles.tabButton, activeTab === 'reviews' && styles.activeTab]}>
              <Ionicons name="star" size={20} color={activeTab === 'reviews' ? FyndColors.Yellow : FyndColors.Green} />
            </TouchableOpacity>
          </View>

          {activeTab === 'home' && 
                  (
          <View>

            <View style={styles.feedSection}>
              {images.length === 0 ? (
                <Text style={{ color: '#666', textAlign: 'center' }}>
                  No photos yet
                </Text>
              ) : (
                images.map(uri => (
                  <Image
                    key={uri}
                    source={{ uri }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                ))
              )}
            </View>
          </View>
        )
          }

          {activeTab === 'list' && (
            <View>
              {/* <Text>Events list content here</Text> */}
              <View style={styles.feedSection}>
                <BizEventCard username={username} />
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={{ padding: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: FyndColors.Purple,
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
                onPress={() => {
                  if (!user) {
                    setShowLoginModal(true);
                  } else {
                    setShowReviewModal(true);
                  }
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                  Write a Review
                </Text>
              </TouchableOpacity>

              {reviews.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#666' }}>
                  No reviews yet
                </Text>
              ) : (
                reviews.map((r: any) => (
                  <ReviewCard
                    key={r.uuid}                  /* uuid comes from DB */
                    username={r.username}
                    reviewText={r.review}
                    datePosted={r.created_at}
                  />
                ))
              )}
            </View>
          )}
      </ScrollView>

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
            setTimeout(() => router.push('../(auth)/sign-in')); // delay navigation slightly
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

        <AddReview
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          username={username}
          onSubmit={(reviewData) => {
            console.log('Review submitted:', reviewData);
            // Send to backend here with user ID or username
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