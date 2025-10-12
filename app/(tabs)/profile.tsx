import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';

export default function Profile() {
  const defaultVoice = "com.apple.voice.compact.en-US.Samantha";
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [firstName, setFirstName] = useState("Peter");
  const [lastName, setLastName] = useState("Morrison");
  const [email, setEmail] = useState("peter@example.com");
  const [voice, setVoice] = useState<string>(defaultVoice);
  const [pitch, setPitch] = useState<number>(1.0);
  const [rate, setRate] = useState<number>(1.0);

  useEffect(() => {
    defineVoices();
  }, []);

  const defineVoices = async () => {
    const availableVoices = (await Speech.getAvailableVoicesAsync()).sort((a, b) => {
      if (a.quality === b.quality) {
        return a.name.localeCompare(b.name);
      }

      return a.quality === 'Enhanced' ? -1 : 1;
    });

    setVoices(availableVoices);
  };

  const onSavePersonInformation = () => {
    console.log("Profile saved:", { firstName, lastName, email });
  };

  const onCancelPersonInformation = () => {
    setFirstName("Peter");
    setLastName("Morrison");
    setEmail("peter@example.com");
  };

  const onSaveSettings = () => {
    console.log("Settings saved:", { voice, pitch, rate });
  };

  const onCancelSettings = () => {
    console.log('onCancelSettings');
  };

  const onVoiceChange = (voice: any) => {
    setVoice(voice);
    Speech.stop();
    Speech.speak("Spelling Galaxy", { voice, pitch, rate });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center pt-12 pb-6 bg-purple-600">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=8" }}
            className="w-28 h-28 rounded-full border-4 border-white"
            style={{ objectFit: "cover" }}
          />
          <Text className="text-2xl font-semibold text-white mt-3">{firstName} {lastName}</Text>
          <Text className="text-blue-100">{email}</Text>
        </View>
        <View className="p-6">
          <View className="mb-2 items-left">
            <Text className="text-2xl font-semibold text-purple-500">Personal Information</Text>
          </View>
          <View className="py-2">
            <Text className="text-gray-500 mb-1">First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>
          <View className="py-2">
            <Text className="text-gray-500 mb-1">Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>
          <View className="py-2">
            <Text className="text-gray-500 mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="#999"
            />
          </View>
          <View className="flex-row justify-between">
            <View className="flex w-1/2 pr-2">
              <TouchableOpacity
                onPress={onSavePersonInformation}
                className="bg-purple-600 p-2 mt-4 rounded-md"
              >
                <Text className="text-center text-white font-semibold text-lg">Save</Text>
              </TouchableOpacity>
            </View>
            <View className="flex w-1/2 pl-2">
              <TouchableOpacity
                onPress={onCancelPersonInformation}
                className="bg-purple-400 p-2 mt-4 rounded-md"
              >
                <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mx-6 my-4 border-2 border-dotted border-purple-300" />
        <View className="p-6">
          <View className="mb-2 items-left">
            <Text className="text-2xl font-semibold text-purple-500">Settings</Text>
          </View>
          <View className="py-2">
            <Text className="text-gray-500 mb-1">Voice Preference</Text>
            <Picker
              selectedValue={voice}
              onValueChange={(itemValue) => onVoiceChange(itemValue)}>
              {voices.map((voice) => (
                <Picker.Item
                  key={voice.identifier}
                  label={`${voice.name} (${voice.language})${voice.quality === 'Enhanced' ? ' 🌟' : ''}`}
                  value={voice.identifier}
                />
              ))}
            </Picker>
          </View>
          <View className="flex-row justify-between">
            <View className="flex w-1/2 pr-2">
              <TouchableOpacity
                onPress={onSaveSettings}
                className="bg-purple-600 p-2 mt-4 rounded-md"
              >
                <Text className="text-center text-white font-semibold text-lg">Save</Text>
              </TouchableOpacity>
            </View>
            <View className="flex w-1/2 pl-2">
              <TouchableOpacity
                onPress={onCancelSettings}
                className="bg-purple-400 p-2 mt-4 rounded-md"
              >
                <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
