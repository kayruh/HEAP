// import * as React from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
// import { useSignUp } from '@clerk/clerk-expo';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Check } from 'lucide-react-native';   // expo install lucide-react-native
// import { Ionicons } from '@expo/vector-icons';
// import { KeyboardAvoidingView } from 'react-native';
// import FyndColors from '@/components/fyndColors';

// const maxWidth= 300; // for styling

// const LIGHT_PURPLE_BORDER = 'rgba(208, 155, 206, 0.4)' // for tags

// // ----------  PRE-SET TAGS ----------
// const PRESET_TAGS = [ // keep in multiples of 3
//   'Cafe',
//   'Bakery',
//   'Art',
//   'Performance',
//   'Clothing',
//   'Nails',
//   'Food truck',
//   'Handmade',
//   'Home-based',
// ];

// /* ------------------------------------------------------------------ */
// /*                               TagChip                              */
// /* ------------------------------------------------------------------ */

// type TagChipProps = {
//   tag: string;
//   selected: boolean;
//   onPress: () => void;
// };

// const TagChip: React.FC<TagChipProps> = ({ tag, selected, onPress }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     activeOpacity={0.8}
//     style={{
//       flexBasis: '30%', // ⬅️ ensures 3 per row (adjust to 48% for 2 per row)
//       paddingHorizontal: 12,
//       paddingVertical: 10,
//       borderRadius: 9999,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: 10,
//       borderWidth: selected ? 0 : 1,
//       borderColor: selected ? 'transparent' : LIGHT_PURPLE_BORDER,
//       backgroundColor: selected ? FyndColors.Yellow : 'transparent'}}
//   >
//     {selected && (
//       <Check size={14} color='#8B4789' strokeWidth={3} style={{ marginRight: 4 }} />
//     )}
//     <Text style={{ 
//       color: selected ? '#8B4789' : '#F0E68C', 
//       fontWeight: selected ? '700' : '500' 
//     }}>
//       {tag}
//     </Text>
//   </TouchableOpacity>
// );

// /* ------------------------------------------------------------------ */
// /*                           BusinessSignUp                           */
// /* ------------------------------------------------------------------ */

// export default function BusinessSignUp() {

//   // to bring user back to page they were from before signin/signup
//   const { redirectTo } = useLocalSearchParams<{
//     redirectTo?: string;
//   }>();
//   const safeRedirect = redirectTo && !redirectTo.includes('/(auth)') ? redirectTo : '/';

//   // -------- Clerk --------
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   // -------- UI state --------
//   const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
//   const [loading, setLoading] = React.useState(false);

//   // -------- Form state --------
//   const [businessName, setBusinessName] = React.useState('');
//   const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

//   const [googleMapsLink, setGoogleMapsLink] = React.useState('');
//   const [streetName, setStreetName] = React.useState('');
//   const [streetNo, setStreetNo] = React.useState('');
//   const [unitNo, setUnitNo] = React.useState('');
//   const [postal, setPostal] = React.useState('');

//   const [email, setEmail]       = React.useState('');
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

// //   const [customTags,   setCustomTags]   = React.useState<string[]>([]);  // custom tags
// // const [customTagInp, setCustomTagInp] = React.useState('');

//   const [code, setCode] = React.useState('');

//   // -------- helpers --------
//   const toggleTag = (tag: string) =>
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );

//   // const addCustomTag = () => {
//   // const t = customTagInp.trim();
//   // if (
//   //   !t ||
//   //   selectedTags.includes(t) ||
//   //   PRESET_TAGS.includes(t) ||
//   //   customTags.includes(t)
//   // ) return;

// //   setCustomTags([...customTags, t]);   // keep for display
// //   setSelectedTags(prev => [...prev, t]);
// //   setCustomTagInp('');
// // };

//   // -------- Step 3: create Clerk account --------
//   const handleCredentialsSubmit = async () => {
//     if (!isLoaded) return;
//     setLoading(true);
//     try {
//       await signUp.create({
//         emailAddress: email,
//         password,
//         username,
//         unsafeMetadata: {
//           accountType: 'business',
//           businessName,
//           tags: selectedTags,
//           googleMapsLink,
//           streetName,
//           streetNo,
//           unitNo,
//           postal,
//         },
//       });
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
//       setStep(4);
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//       // TODO: toast / error banner
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------- Step 4: verify --------
//   const handleVerify = async () => {
//     if (!isLoaded) return;
//     setLoading(true);
//     try {
//       const res = await signUp.attemptEmailAddressVerification({ code });
//       if (res.status === 'complete') {
//         await setActive({ session: res.createdSessionId });
//         router.replace(safeRedirect);
//       }
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================  RENDER  ======================= */
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* this back arrow stays in all pages, ??? decide what to do */}
//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//         <Ionicons name="chevron-back" size={22} color={FyndColors.Yellow}/>
//       </TouchableOpacity>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}>

//       <ScrollView
//             contentContainerStyle={styles.container}
//             keyboardShouldPersistTaps="handled"
//           >

//     <View>
//     <Text style={styles.header}>Welcome to FYND Business!</Text>
//       <Text style={styles.stepText}>Step {step}/4</Text>

//       {/* ---------- STEP 1 ---------- */}
//       {step === 1 && (
//         <>
//           <Text style={styles.descText}>Business details</Text>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Business name"
//             placeholderTextColor={'white'}
//             value={businessName}
//             onChangeText={setBusinessName}
//             style={styles.inputField}
//           />
//           </View>

//           <Text style={styles.descText}>Choose tags</Text>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'space-between', // ⬅️ space out tags evenly across the row
//               paddingHorizontal: 8, 
//               paddingTop: 5,
//               paddingBottom: 10, }}
//           >
//             {PRESET_TAGS.map((tag) => (
//               <TagChip
//                 key={tag}
//                 tag={tag}
//                 selected={selectedTags.includes(tag)}
//                 onPress={() => toggleTag(tag)}
//               />
//             ))}
//           </ScrollView>

//           <TouchableOpacity
//             disabled={!businessName || selectedTags.length === 0}
//             onPress={() => setStep(2)}
//             style={[
//               styles.nextButton,
//               {backgroundColor:
//                   businessName && selectedTags.length > 0 ? FyndColors.Yellow : 'rgba(161, 161, 170, 0.3)', // translucent grey
//               },
//             ]}
//           >
//             <View style={styles.nextContainer}>
//               <Text style={styles.nextLink}>Next</Text>
//             </View>
//           </TouchableOpacity>
//         </>
//       )}

//       {/* ---------- STEP 2 ---------- */}
//       {step === 2 && (
//         <>
//           <Text style={styles.descText}>Location</Text>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Google Maps link"
//             placeholderTextColor={'white'}
//             value={googleMapsLink}
//             onChangeText={setGoogleMapsLink}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Street name"
//             placeholderTextColor={'white'}
//             value={streetName}
//             onChangeText={setStreetName}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Street No"
//             placeholderTextColor={'white'}
//             value={streetNo}
//             onChangeText={setStreetNo}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Unit No"
//             placeholderTextColor={'white'}
//             value={unitNo}
//             onChangeText={setUnitNo}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Postal code"
//             placeholderTextColor={'white'}
//             value={postal}
//             onChangeText={setPostal}
//             style={styles.inputField}
//           />          
//           </View>


//           <View>
//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={() => setStep(1)}
//             >
//               <Text style={styles.nextLink}>Back</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={() => setStep(3)}
//             >
//               <Text style={styles.nextLink}>Next</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}

//       {/* ---------- STEP 3 ---------- */}
//       {step === 3 && (
//         <>
//           <Text style={styles.descText}>Account credentials</Text>

//           <View style={styles.inputWrapper}>
//           <Ionicons name="mail-outline" size={20} style={styles.icon}/>
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor={'white'}
//             value={email}
//             autoCapitalize="none"
//             onChangeText={setEmail}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <Ionicons name="at-outline" size={20} style={styles.icon}/>
//           <TextInput
//             placeholder="Username"
//             placeholderTextColor={'white'}
//             value={username}
//             autoCapitalize="none"
//             onChangeText={setUsername}
//             style={styles.inputField}
//           />
//           </View>

//           <View style={styles.inputWrapper}>
//           <Ionicons name="key-outline" size={20} style={styles.icon} />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor={'white'}
//             value={password}
//             secureTextEntry
//             onChangeText={setPassword}
//             style={styles.inputField}
//           />
//           </View>


//           <View>
//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={() => setStep(2)}
//             >
//               <Text style={styles.nextLink}>Back</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={handleCredentialsSubmit}
//             >
//               <Text style={styles.nextLink}>
//                 {loading ? '...' : 'Send code'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}

//       {/* ---------- STEP 4 ---------- */}
//       {step === 4 && (
//         <>
//           <Text style={styles.descText}>Verify your email</Text>

//           <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="6-digit code"
//             placeholderTextColor={'white'}
//             value={code}
//             keyboardType="numeric"
//             onChangeText={setCode}
//             style={styles.inputField}
//           />
//           </View>

//           <View>
//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={() => setStep(3)}
//             >
//               <Text style={styles.nextLink}>Back</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.nextButton}
//               onPress={handleVerify}
//             >
//               <Text style={styles.nextLink}>
//                 {loading ? 'Verifying…' : 'Verify & finish'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       </View>
//     </ScrollView>
//     </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   // for all elements on page
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 5,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: FyndColors.Purple,
//     paddingHorizontal: 20,
//   },
//   // buttons
//   backButton: {
//     position: 'absolute',
//     top: 55,
//     left: 15,
//     // backgroundColor: FyndColors.Yellow,
//     // borderRadius: 20,
//     padding: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     zIndex: 10,
//   },
//   // texts:
//   header:{
//       color: 'white',
//       textAlign:'center',
//       fontWeight: 'bold',
//       fontSize: 24,
//       marginBottom: 10,
//   },
//   descText:{
//       color:'white',
//       textAlign:'center',
//       fontWeight: 'bold',
//       fontSize: 15,
//       marginBottom: 10,
//   },
//   stepText:{
//     color:FyndColors.Yellow,
//     textAlign:'center',
//     fontWeight: 'bold',
//     fontSize: 17,
//     marginBottom: 10,
// },

//   // input elements
//   input: {
//     width: "95%",
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: FyndColors.Yellow,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: '#95518F', // lighter purple, slightly lighter than bg
//     color: '#000', // ensure text is visible
//     maxWidth: maxWidth,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: FyndColors.Yellow,
//     borderRadius: 8,
//     backgroundColor: '#95518F', // slightly lighter than bg
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     width: '95%',
//     alignSelf: 'center',
//     maxWidth: maxWidth,
//   },
//   icon: {
//     marginRight: 8,
//     color: FyndColors.Yellow,
//   },
//   inputField: {
//     flex: 1,
//     paddingVertical: 12,
//     color: '#fff',
//     maxWidth: maxWidth,
//   },
 
//   nextButton: {
//     paddingVertical: 12,
//     borderRadius: 20,
//     marginTop: 5,
//     width: "30%",
//     alignSelf: "center",
//     backgroundColor: FyndColors.Yellow,
//     marginBottom: 15,
//     alignItems: 'center',
//     maxWidth: maxWidth,
//   },
//   nextContainer: {
//     alignItems: 'center',
//   },
//   nextLink: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   // footer
//   footerText: {
//     position: 'absolute',
//     fontWeight: 'bold',
//     bottom: 30,
//     alignSelf: 'center',
//     fontSize: 14,
//     color: 'white', 
//   },
// })

import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Check } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import FyndColors from '@/components/fyndColors';

/* ------------------------------------------------------------------ */
/*                       constants / helpers                           */
/* ------------------------------------------------------------------ */

const maxWidth = 300;
const LIGHT_PURPLE_BORDER = 'rgba(208, 155, 206, 0.4)';

// ----------  PRE-SET TAGS ----------
const PRESET_TAGS = [
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
      flexBasis: '30%',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 9999,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderWidth: selected ? 0 : 1,
      borderColor: selected ? 'transparent' : LIGHT_PURPLE_BORDER,
      backgroundColor: selected ? FyndColors.Yellow : 'transparent',
    }}
  >
    {selected && (
      // <Check
      //   size={14}
      //   color="#8B4789"
      //   strokeWidth={3}
      //   style={{ marginRight: 4 }}
      // />
      <Text>check</Text>
    )}
    <Text
      style={{
        color: selected ? '#8B4789' : '#F0E68C',
        fontWeight: selected ? '700' : '500',
      }}
    >
      {tag}
    </Text>
  </TouchableOpacity>
);

/* ------------------------------------------------------------------ */
/*                           BusinessSignUp                           */
/* ------------------------------------------------------------------ */

export default function BusinessSignUp() {
  /* -------- navigation helpers -------- */
  const { redirectTo } = useLocalSearchParams<{ redirectTo?: string }>();
  const safeRedirect =
    redirectTo && !redirectTo.includes('/(auth)') ? redirectTo : '/';
  const router = useRouter();

  /* -------- Clerk -------- */
  const { isLoaded, signUp, setActive } = useSignUp();

  /* -------- UI state -------- */
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = React.useState(false);

  /* -------- Form state -------- */
  const [businessName, setBusinessName] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // 🆕 custom-tag state
  const [customTags, setCustomTags] = React.useState<string[]>([]);
  const [customTagInp, setCustomTagInp] = React.useState('');

//   React.useEffect(() => {
//   console.log('[Sign-up] selectedTags →', selectedTags);
// }, [selectedTags]);

  const [googleMapsLink, setGoogleMapsLink] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [streetNo, setStreetNo] = React.useState('');
  const [unitNo, setUnitNo] = React.useState('');
  const [postal, setPostal] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [code, setCode] = React.useState('');

  /* -------- helpers -------- */
  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  /* 🆕 add a custom tag */
  const addCustomTag = () => {
    const t = customTagInp.trim();
    if (
      !t ||
      selectedTags.includes(t) ||
      PRESET_TAGS.includes(t) ||
      customTags.includes(t)
    )
      return;

    setCustomTags([...customTags, t]);
    setSelectedTags(prev => [...prev, t]);
    setCustomTagInp('');
  };

  /* -------- Step 3: create Clerk account -------- */
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
    } finally {
      setLoading(false);
    }
  };

  /* -------- Step 4: verify -------- */
  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === 'complete') {
        await setActive({ session: res.createdSessionId });
        router.replace(safeRedirect);
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={22} color={FyndColors.Yellow} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
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
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    paddingTop: 5,
                    paddingBottom: 10,
                  }}
                >
                  {PRESET_TAGS.map(tag => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      selected={selectedTags.includes(tag)}
                      onPress={() => toggleTag(tag)}
                    />
                  ))}

                  {/* 🆕 render custom tags */}
                  {customTags.map(tag => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      selected={selectedTags.includes(tag)}
                      onPress={() => toggleTag(tag)}
                    />
                  ))}
                </ScrollView>

                {/* 🆕 custom-tag input */}
                <Text style={styles.descText}>Add a custom tag</Text>
                <View style={styles.tagInputRow}>
                  <TextInput
                    style={styles.tagInput}
                    placeholder="e.g. Vegan"
                    placeholderTextColor="#F0E68C"
                    value={customTagInp}
                    onChangeText={setCustomTagInp}
                    onSubmitEditing={addCustomTag}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={addCustomTag}
                    disabled={!customTagInp.trim()}
                    style={{ marginLeft: 8 }}
                  >
                    <Ionicons
                      name="add-circle"
                      size={28}
                      color={
                        customTagInp.trim()
                          ? FyndColors.Yellow
                          : 'rgba(208,155,206,0.4)'
                      }
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  disabled={!businessName || selectedTags.length === 0}
                  onPress={() => setStep(2)}
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor:
                        businessName && selectedTags.length > 0
                          ? FyndColors.Yellow
                          : 'rgba(161, 161, 170, 0.3)',
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
          <Text style={styles.descText}>Location</Text>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Google Maps link"
            placeholderTextColor={'white'}
            value={googleMapsLink}
            onChangeText={setGoogleMapsLink}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Street name"
            placeholderTextColor={'white'}
            value={streetName}
            onChangeText={setStreetName}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Street No"
            placeholderTextColor={'white'}
            value={streetNo}
            onChangeText={setStreetNo}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Unit No"
            placeholderTextColor={'white'}
            value={unitNo}
            onChangeText={setUnitNo}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Postal code"
            placeholderTextColor={'white'}
            value={postal}
            onChangeText={setPostal}
            style={styles.inputField}
          />          
          </View>


          <View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(1)}
            >
              <Text style={styles.nextLink}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(3)}
            >
              <Text style={styles.nextLink}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ---------- STEP 3 ---------- */}
      {step === 3 && (
        <>
          <Text style={styles.descText}>Account credentials</Text>

          <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} style={styles.icon}/>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'white'}
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <Ionicons name="at-outline" size={20} style={styles.icon}/>
          <TextInput
            placeholder="Username"
            placeholderTextColor={'white'}
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
            style={styles.inputField}
          />
          </View>

          <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={'white'}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.inputField}
          />
          </View>


          <View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(2)}
            >
              <Text style={styles.nextLink}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleCredentialsSubmit}
            >
              <Text style={styles.nextLink}>
                {loading ? '...' : 'Send code'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ---------- STEP 4 ---------- */}
      {step === 4 && (
        <>
          <Text style={styles.descText}>Verify your email</Text>

          <View style={styles.inputWrapper}>
          <TextInput
            placeholder="6-digit code"
            placeholderTextColor={'white'}
            value={code}
            keyboardType="numeric"
            onChangeText={setCode}
            style={styles.inputField}
          />
          </View>

          <View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(3)}
            >
              <Text style={styles.nextLink}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleVerify}
            >
              <Text style={styles.nextLink}>
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

/* ------------------------------------------------------------------ */
/*                                styles                              */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: FyndColors.Purple,
    paddingHorizontal: 20,
  },
  /* buttons */
  backButton: {
    position: 'absolute',
    top: 55,
    left: 15,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  /* texts */
  header: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  descText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  stepText: {
    color: FyndColors.Yellow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
  },
  /* input elements */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: FyndColors.Yellow,
    borderRadius: 8,
    backgroundColor: '#95518F',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
    maxWidth: maxWidth,
  },
  icon: {
    marginRight: 8,
    color: FyndColors.Yellow,
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
    maxWidth: maxWidth,
  },
  /* 🆕 custom-tag input styles */
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    maxWidth: maxWidth,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: LIGHT_PURPLE_BORDER,
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#F0E68C',
  },
  /* nav buttons */
  nextButton: {
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 5,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: FyndColors.Yellow,
    marginBottom: 15,
    alignItems: 'center',
    maxWidth: maxWidth,
  },
  nextContainer: { alignItems: 'center' },
  nextLink: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
