import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import Toast from 'react-native-toast-message';

export default function ProfileSettings() {
  const defaultVoice = "com.apple.voice.compact.en-US.Samantha";
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [voice, setVoice] = useState<string>(defaultVoice);
  const [pitch, setPitch] = useState(1.0);
  const [rate, setRate] = useState(1.0);

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

  const onSave = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Personal Settings Saved'
    });
    console.log("Settings saved:", { voice, pitch, rate });
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  const onVoiceChange = (voice: any) => {
    setVoice(voice);
    Speech.stop();
    Speech.speak("Spelling Galaxy", { voice, pitch, rate });
  };

  return (
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
      <View className="flex-row">
        <View className="flex-1 py-2 pr-2">
          <Text className="text-gray-500 mb-1">Voice Pitch</Text>
          <TextInput
            value={pitch.toString()}
            onChangeText={text => setPitch(Number(text))}
            keyboardType="numeric"
            className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
            placeholder="Voice Pitch"
          />
        </View>
        <View className="flex-1 py-2 pl-2">
          <Text className="text-gray-500 mb-1">Voice Rate</Text>
          <TextInput
            value={rate.toString()}
            onChangeText={text => setRate(Number(text))}
            keyboardType="numeric"
            className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
            placeholder="Voice Rate"
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="flex w-1/2 pr-2">
          <TouchableOpacity
            onPress={onSave}
            className="bg-purple-600 p-2 mt-4 rounded-md"
          >
            <Text className="text-center text-white font-semibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-1/2 pl-2">
          <TouchableOpacity
            onPress={onCancel}
            className="bg-purple-400 p-2 mt-4 rounded-md"
          >
            <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
