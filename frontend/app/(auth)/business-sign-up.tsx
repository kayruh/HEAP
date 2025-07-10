import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';   // expo install lucide-react-native
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';

const maxWidth= 300; // for styling

const Green = '#556B2F'; // colors
const Yellow = '#F0E68C';
const Purple = '#8B4789';
const Grey = '#708090';

const LIGHT_PURPLE_BORDER = 'rgba(208, 155, 206, 0.4)' // for tags

// ----------  PRE-SET TAGS ----------
const PRESET_TAGS = [ // keep in multiples of 3
  'Cafe',
  'Bakery',
  'Art',
  'Performance',
  'Clothing',
  'Nails',
  'Food truck',
  'Handmade',
  'Home-based',
];

/* ------------------------------------------------------------------ */
/*                               TagChip                              */
/* ------------------------------------------------------------------ */

type TagChipProps = {
  tag: string;
  selected: boolean;
  onPress: () => void;
};

const TagChip: React.FC<TagChipProps> = ({ tag, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      flexBasis: '30%', // ⬅️ ensures 3 per row (adjust to 48% for 2 per row)
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 9999,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderWidth: selected ? 0 : 1,
      borderColor: selected ? 'transparent' : LIGHT_PURPLE_BORDER,
      backgroundColor: selected ? Yellow : 'transparent'}}
  >
    {selected && (
      <Check size={14} color='#8B4789' strokeWidth={3} style={{ marginRight: 4 }} />
    )}
    <Text style={{ 
      color: selected ? '#8B4789' : '#F0E68C', 
      fontWeight: selected ? '700' : '500' 
    }}>
      {tag}
    </Text>
  </TouchableOpacity>
);

/* ------------------------------------------------------------------ */
/*                           BusinessSignUp                           */
/* ------------------------------------------------------------------ */

export default function BusinessSignUp() {
  // -------- Clerk --------
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // -------- UI state --------
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = React.useState(false);

  // -------- Form state --------
  const [businessName, setBusinessName] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const [googleMapsLink, setGoogleMapsLink] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [streetNo, setStreetNo] = React.useState('');
  const [unitNo, setUnitNo] = React.useState('');
  const [postal, setPostal] = React.useState('');

  const [email, setEmail]       = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [code, setCode] = React.useState('');

  // -------- helpers --------
  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  // -------- Step 3: create Clerk account --------
  const handleCredentialsSubmit = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
        username,
        unsafeMetadata: {
          accountType: 'business',
          businessName,
          tags: selectedTags,
          googleMapsLink,
          streetName,
          streetNo,
          unitNo,
          postal,
        },
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setStep(4);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      // TODO: toast / error banner
    } finally {
      setLoading(false);
    }
  };

  // -------- Step 4: verify --------
  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === 'complete') {
        await setActive({ session: res.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  /* =======================  RENDER  ======================= */
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#000"/>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>

      <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >

    <View>
    <Text style={styles.header}>Welcome to FYND Business!</Text>
      <Text style={styles.stepText}>Step {step}/4</Text>

      {/* ---------- STEP 1 ---------- */}
      {step === 1 && (
        <>
          <Text style={styles.descText}>Business details</Text>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Business name"
            placeholderTextColor={'white'}
            value={businessName}
            onChangeText={setBusinessName}
            style={styles.inputField}
          />
          </View>

          <Text style={styles.descText}>Choose tags</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between', // ⬅️ space out tags evenly across the row
              paddingHorizontal: 8, 
              paddingTop: 5 }}
          >
            {PRESET_TAGS.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                selected={selectedTags.includes(tag)}
                onPress={() => toggleTag(tag)}
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            disabled={!businessName || selectedTags.length === 0}
            onPress={() => setStep(2)}
            style={[
              styles.nextButton,
              {backgroundColor:
                  businessName && selectedTags.length > 0 ? Yellow : 'rgba(161, 161, 170, 0.5)', // translucent grey
              },
            ]}
          >
            <View style={styles.nextContainer}>
              <Text style={styles.nextLink}>Next</Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      {/* ---------- STEP 2 ---------- */}
      {step === 2 && (
        <>
          <Text className="text-xl font-bold mb-2">Location</Text>

          <TextInput
            placeholder="Google Maps link"
            value={googleMapsLink}
            onChangeText={setGoogleMapsLink}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Street name"
            value={streetName}
            onChangeText={setStreetName}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Street No"
            value={streetNo}
            onChangeText={setStreetNo}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Unit No"
            value={unitNo}
            onChangeText={setUnitNo}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Postal"
            value={postal}
            onChangeText={setPostal}
            className="border rounded-xl p-3 mb-6"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="py-3 px-6 rounded-xl border"
              onPress={() => setStep(1)}
            >
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black py-3 px-6 rounded-xl"
              onPress={() => setStep(3)}
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ---------- STEP 3 ---------- */}
      {step === 3 && (
        <>
          <Text className="text-xl font-bold mb-2">Account credentials</Text>

          <TextInput
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Username"
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
            className="border rounded-xl p-3 mb-3"
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            className="border rounded-xl p-3 mb-6"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="py-3 px-6 rounded-xl border"
              onPress={() => setStep(2)}
            >
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black py-3 px-6 rounded-xl"
              onPress={handleCredentialsSubmit}
            >
              <Text className="text-white">
                {loading ? '...' : 'Send code'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ---------- STEP 4 ---------- */}
      {step === 4 && (
        <>
          <Text className="text-xl font-bold mb-2">Verify your email</Text>

          <TextInput
            placeholder="6-digit code"
            value={code}
            keyboardType="numeric"
            onChangeText={setCode}
            className="border rounded-xl p-3 mb-6 tracking-widest"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="py-3 px-6 rounded-xl border"
              onPress={() => setStep(3)}
            >
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black py-3 px-6 rounded-xl"
              onPress={handleVerify}
            >
              <Text className="text-white">
                {loading ? 'Verifying…' : 'Verify & finish'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  // for all elements on page
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Purple,
    paddingHorizontal: 20,
  },
  // buttons
  backButton: {
    position: 'absolute',
    top: 55,
    left: 18,
    backgroundColor: Yellow,
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  // texts:
  header:{
      color: 'white',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 10,
  },
  descText:{
      color:'white',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 10,
  },
  stepText:{
    color:Yellow,
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
},

  // input elements
  input: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Yellow,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#95518F', // lighter purple, slightly lighter than bg
    color: '#000', // ensure text is visible
    maxWidth: maxWidth,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Yellow,
    borderRadius: 8,
    backgroundColor: '#95518F', // slightly lighter than bg
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
    maxWidth: maxWidth,
  },
  icon: {
    marginRight: 8,
    color: Yellow,
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
    maxWidth: maxWidth,
  },
 
  nextButton: {
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    backgroundColor: Yellow,
    marginBottom: 15,
    alignItems: 'center',
    maxWidth: maxWidth,
  },
  nextContainer: {
    alignItems: 'center',
  },
  nextLink: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // footer
  footerText: {
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 30,
    alignSelf: 'center',
    fontSize: 14,
    color: 'white', 
  },
})