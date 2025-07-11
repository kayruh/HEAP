import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FyndBanner from '@/components/fyndBanner';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const businessProfile = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
      <View style={styles.container}>
        <FyndBanner />
        <ScrollView contentContainerStyle={styles.contentContainer}>
      
          {/* Profile Section */}
          <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80x80/D4A574/FFFFFF?text=WE+ARE' }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>WEARE.SG</Text>
              <Text style={styles.profileHandle}>@weare.sg</Text>
              <Text style={styles.profileDescription}>
                the COOLEST thrift store in Singapore.
              </Text>
            </View>
          </View>

          {/* Stats */}
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

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="home" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

          {/* Feed */}
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
                  source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhASExIRFhIWFR0WFhEXEhgWFRcWGRoYFhcXFRgdHSggGB4lHRYYIjEhJikrLi8vGB8zODMtNygtLisBCgoKDg0OGxAPGzclICIuLTEuLTUrLSstLS03LS03NystLSstLS0tLS0rLS0tNy0tLS0tLTctLS0tLS0tLS0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAEDAgj/xABNEAACAQMBAwcHBQwGCwAAAAAAAQIDBBEGBRIhBxMiMVGRoRRBYXGBksIyUnOisRUzNTZTYmNygrLB0SNEs+Lw8RYkJSc0QkNUZKPh/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACURAQEAAgECBgIDAAAAAAAAAAABAhEDBBMSISIxUWEFMiNB0f/aAAwDAQACEQMRAD8A10AHC6gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj2ltWhsqEXWqwpqTxFyeMtcWkSOwEbs/b9ttK45ujXp1J4zuxeXhYy/HxPjX1TZW9eUJXVGMoycZRcuKknhp+poaEwCP+7lv9zfKOfp8xnd53PRzndxn1rB+aG37a4tKlWFenKnT++TTzGGfnPzDQkgQj1fYr+t0PfC1hYP8ArdD3xoTYPjZ3cL63jUpzU4S6prin5uBy7b2xS2JaqpV3sOW6lFJybw3wTa8yYktuoi2TzqQBR7rlVsLaputXec4f+rtY9e9JZ9mTuseUGyvmt13HF4zK3nGPHhxk1jxL9rPetIuU1va1A9ISpqyxpVHGV1RUk2mnLimuDT4FNLJoELDV1jOWFd0PfwTFGrGvSUoyjKLWVKLymvQ/OLLB+gRd9qK12fcunVuKUJrGYylhrKyvA5/9MLDP/F0PfGqJwEZYahtdo3Cp0rilObTe7GWXhdbJMAACAAAAAAAAAAAAp3KtaeUaTlLz0qkJr1PMH4TLiQ2s6HlGlbyP6KT7sS/gTLqjOeR9Z1HV+gfjOH8isamnv6lvX/5NX+0kWXkhnu6nmu2hLwlBkFty1zs+Fx+VubnL9UoSj9sjafslcdnpVORmp6Oc71XbJbRezlb8nM8r79CrUl6d6LivqxiV3Zlzu8kF2vm1GvelCX8WaDQtvI9IKn822x/6+JSoY5oKmq2rrSMkpJyeYtZT6EutGrak0bb7Zs5KNOnTrY6FSEVHpY4KWODj/n5jKdB1Y0NW2kpyjGKk8yk1FLoS62+CNQlqWjtLV1rbUZxqKG/UnUi8x3lTlFRTXB/KecE5b2V16Ag6ekbZSWJJNNPrTU5Jr2EPymRVepZU2+Gak930pU4pv1bz7y42NqrOhup5W9KXVj5UpTx7N4oeuayrajS/J0VH1OcpSa7ox8Dp6DHxdRHL1mXh4aqlexjToRjFNdNNcX18ePWfutbRpQbWeEk+3HSTeG+Pid9vsye1FW3G1zNJ1uH/ADSWdyHtxLuOequet3jzxyvtR9D6MrljPef48X1SY5X+2yRe9FMwDXceb1XfJflG++Kl9rNs0xceV6etpPr5tRfrj0PhMV1/+Nt/9J8ET5aY+HKx9HhdyVoOsdNW8tGOtClThVp0oTU4xUW/k7yljrym/bggOSC/nS2xVoZfNzpue75lOOOkuxtSw+3C7Cy8oV+rTQkYZ6VaNOCXoW7OfhHHtOHkl2BK2o1Luosc5FRpJrD3M5lP1S6OPQvSRv03aULywQS1FRfndFZ9kpYLZyf7Lo3mjKHOUaU29/LlTi2+nLrfWVXlh/D1D6H45E/pDUdvsPQtF1KsN+O/iipJ1JPfk0lHr49vUL+sHuz9Mx2BygUZUs8xVpVWo5zuSju70U+zims8evsL4QGlV90Ng2NeXCSUqmOvjU38rPZxz7CfKZIAAVSAAAAAAAAAAAc+0qfP7OrR+dTku+LR0HuN7h/j/HEkYXya3Xk2oN5/9tV8Ib/wkttiy/3VWVTzqrv5+kc1/Ip2zLj7n3LfZTqw96nOmvFmqbZst3kkpx+ZbUZ+1bkn9rNb7lUjZdbnNA3lHzzuqMUv13/cNn2st3ZdddlOa+qzCdOVd67pUfNO7oS9xzXxm7bX47Lr/Rz/AHWRn7jC9E2sL3VFrTqQjOnKTUoSWYtbknxRpdLSlLYmsbWvQW7TnzkJU8tqMubck454pNJ8OrgZzye/jlZ/rv8Ackby4KUllLg+HDqfVw7/ABYzpQyzb1Tndv3cv0rj7iVP4DQ9P3/3T2bGrlNSlLDSx0VOSj9VIzGrxu67bfGvVl31Zs9L8Tj/ACW/TzvyOXokW/k8tlKwuajXCpV3P2YRUWu9yKcrV2MnRk8ulJ02+3ce6n7Vh+00LQlPm9K0Hj5W/P3qk2n3YKjqqh5PqS4Xzt2qv2o7v2wfebdFzb6rOfO2XVceuDG/C16ClnTFNfNlNd0n/MyTXy3tX3y/SfBE1Hk6nnZdePza8u6SjJfxMt1/+N1/9J8ETzueeHmzn29Hp7vjxv0+2tNoVtpXFvKpBwpOhHmIP8n8lzfpk4926a3oe+8v0naSby1TUJP86n0H+7n2lS5UNnqemrKsl97UYP8AVnFY8YrvPtyObQ5zZ9zQb4wmqkf1Zpp+MPrGF88WqG5Yfw9Q+h+KRLaV0hbbd0TScqcY15b+K8cqaanJLPmkuC4MieWH8PUPofjkXXk0/Eu2/b/tJC+WMHboyi7bS1rCXyoQ3X64ylF+KJojrq9Vtta1oRwucVWTWPNBJt+jpTXiSJnUAAISAAAAAAAAAAAex+UjwAfzfXsqspTfM1uLf/Rn2v8ANNw1BQzoKvBJt+R4UUsvKprCS685RYcvtYyXuWxgGmrOrT1FaN0qySrwbbpTSS3lxfDgbdqGt5PsK5lhvFKXBJtttNJJLrbbRI5fazwXLdGCaSc9k6ht61SjcbkJNyxQqN/JkuCxx6y8al19KtYzp2ttdb8lu87OjOKinwbjHGW+7BomRkXKUV3QEXb6PtVJOO7B5i001iUn1PiZ1VrOXONRy5SnKOJJ8JNyWerqzx9Rsx8a1pTrrpU4S9cE/tR1dJ1fYtut7cvUdP3tTfs59h0FbbFt4LqjSgvqoqHKFQ5ratGqsdKk4Sy0l0JZjx7f6Rl9SwjyUVLrSfrWTPg6jtcvckX5eHucfgqm8m83i7i11yhNYeVxUo46vzfEzfWFGpfalvJwpVnGVR4apTw0ko5XDq4G9pYPc+lleXm7nJc9e6/Fh28Jj8Kfqj/aHJtNqMm3RpSUd1729GVPhu4znKZQeT66qbG1JTcqVZU6n9FNulPCUmt2T6PUpY4+s24ZM5l5aaMh5V1O61LGMKdWW5Sim405SWW5SxlLHU13kvpLVdPYmmaVGdC8lUhvZjG2nh5k5LEmkupo0dPAy+1jxeWhmmm9r19v8oEK1SjUpwjSnCEXCWIx4PjJxSbfW/8A4SG1dcVbLWfkSo0nDnadPfcpb2Kipybx1ZW+XtvJ83SjKeXGOe3Cz3kbiH7ABVIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=' }}
                  style={styles.eventImage}
                />
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>STREET WEARE HOUSE</Text>
                <Text style={styles.eventDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                  aliquip ex ea commodo consequat.
                </Text>
                <View style={styles.eventDateContainer}>
                  <Text style={styles.eventDate}>7-12</Text>
                  <Text style={styles.eventMonth}>JULY 2025</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#8B2635',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#F0E6E6',
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderWidth: 3,
    borderColor: '#4A90E2',
    borderRadius: 50,
    padding: 3,
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B2635',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  actionButton: {
    backgroundColor: '#8B2635',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default businessProfile;
//if not user then business profile might have to change this within _layout.tsx within (tabs) group