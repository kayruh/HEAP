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
import AddReview from '@/components/addReview';
import ReviewCard from '@/components/reviewCard';
import BizEventCard from '@/components/bizEventCard';
import { useInteractionApi } from '@/api/interaction';

// FOR BIZ USERS (THEIR PROFILE PG)

const businessProfile = () => {
    const router = useRouter();
    const { user } = useUser(); // how to check if it is biz acc???

    const [activeTab, setActiveTab] = useState('home'); //default selected tab

    const [modalVisible, setModalVisible] = useState(false); // for creating new events

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [userLists, setUserLists] = useState<string[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [showReviewModal, setShowReviewModal] = useState(false); // for adding reviews
    
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
                  {user?.firstName ?? user?.username} 
                </Text> 

                {/* biz username */}
                <Text style={styles.profileHandle}>                  
                  @{user?.username}
                </Text>

                {/* biz description (they can write themselves) */}
                <Text style={styles.profileDescription}>biz description </Text>
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
                {/* Post 2: event card */}
                      <BizEventCard businessId={user?.id ?? ''} />
                    </View>
                  </View>
          )}

          {activeTab === 'list' && (
            <View>
              <Text>Events list content here</Text>
              <View style={styles.feedSection}>
                <BizEventCard businessId={user?.id ?? ''} />
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={{ padding: 20 }}>
              <Text>Reviews ppl have given this biz</Text>
              {/* Replace with real fetched data later !!!*/}
              {[
                { username: 'user123', reviewText: 'Great store!', datePosted: '2025-07-14' },
                { username: 'cheryl_88', reviewText: 'Loved the selection of vintage clothes.', datePosted: '2025-07-12' },
              ].map((review, index) => (
                <ReviewCard
                  key={index}
                  username={review.username}
                  reviewText={review.reviewText}
                  datePosted={review.datePosted}
                />
              ))}
            </View>
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

//if not user then business profile might have to change this within _layout.tsx within (tabs) group