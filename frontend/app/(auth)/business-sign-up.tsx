import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';   // expo install lucide-react-native

// ----------  PRE-SET TAGS ----------
const PRESET_TAGS = [
  'cafe',
  'bakery',
  'art',
  'performance',
  'singing',
  'clothing',
  'nails',
  'food truck',
  'handmade',
  'home-based',
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
    className={`px-4 py-2 rounded-full flex-row items-center
      ${selected ? 'bg-indigo-600' : 'border border-zinc-400'}
    `}
    style={{ marginRight: 8, marginBottom: 8 }}   // keeps wrap-gap consistent
  >
    {selected && (
      <Check size={14} color="white" strokeWidth={3} style={{ marginRight: 4 }} />
    )}
    <Text className={selected ? 'text-white font-medium' : 'text-black'}>
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
    <View className="flex-1 bg-white p-4">
      <Text className="text-center mb-4 font-semibold">Step {step}/4</Text>

      {/* ---------- STEP 1 ---------- */}
      {step === 1 && (
        <>
          <Text className="text-xl font-bold mb-3">Business details</Text>

          <TextInput
            placeholder="Business name"
            value={businessName}
            onChangeText={setBusinessName}
            className="border rounded-xl p-3 mb-4"
          />

          <Text className="mb-2 font-medium">Choose tags</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
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
            className={`py-3 rounded-xl mt-auto ${
              businessName && selectedTags.length
                ? 'bg-black'
                : 'bg-zinc-400'
            }`}
          >
            <Text className="text-white text-center">Next</Text>
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
  );
}
