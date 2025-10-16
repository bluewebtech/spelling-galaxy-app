import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import * as Speech from 'expo-speech';
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateMasterAccountSettings } from '@/db/queries';

type ProfileSettingsProps = {
  settings: {
    voice: string;
    pitch: string;
    rate: string;
  };
  onChildEvent: () => Promise<void>;
}

export default function ProfileSettings(props: ProfileSettingsProps) {
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [voice, setVoice] = useState<string>(props.settings.voice);
  const [pitch, setPitch] = useState<string>(props.settings.pitch);
  const [rate, setRate] = useState<string>(props.settings.rate);
  const [clone, setClone] = useState({
    voice: props.settings.voice,
    pitch: props.settings.pitch,
    rate: props.settings.rate,
  });

  const floatRegex = /^-?\d*(\.\d*)?$/;

  useEffect(() => {
    defineVoices();

    if (props.settings) {
      setVoice(props.settings.voice);
      setPitch(props.settings.pitch);
      setRate(props.settings.rate);
    }
  }, [props.settings]);

  const defineVoices = async () => {
    const availableVoices = (await Speech.getAvailableVoicesAsync()).sort((a, b) => {
      if (a.quality === b.quality) {
        return a.name.localeCompare(b.name);
      }

      return a.quality === 'Enhanced' ? -1 : 1;
    });

    setVoices(availableVoices);
  };

  const onPitchChange = (pitch: any) => {
    if (floatRegex.test(pitch)) setPitch(pitch);
  };

  const onRateChange = (rate: any) => {
    if (floatRegex.test(rate)) setRate(rate);
  };

  const onSave = async () => {
    try {
      const account = await updateMasterAccountSettings(voice, Number(pitch), Number(rate));

      if (account.changes) {
        setClone({ voice, pitch, rate });

        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: 'Your settings has been saved'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Failed to save settings'
      });
    }
  }

  const onCancel = async () => {
    setVoice(clone.voice);
    setPitch(clone.pitch);
    setRate(clone.rate);

    await props.onChildEvent();
  };

  const onVoiceChange = (voice: any) => {
    setVoice(voice);
    Speech.stop();
    Speech.speak("Spelling Galaxy", {
      voice,
      pitch: Number(pitch),
      rate: Number(rate)
    });
  };

  const onVoiceSample = () => {
    Speech.stop();
    Speech.speak("Spelling Galaxy", {
      voice,
      pitch: Number(pitch),
      rate: Number(rate)
    });
  };

  return (
    <View className="px-6 py-2">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex">
          <Text className="text-2xl font-semibold text-purple-500">Settings</Text>
        </View>
        <View className="flex px-6">
          <Ionicons size={25} name="volume-medium-outline" color="#333333" onPress={onVoiceSample} />
        </View>
      </View>
      <View className="py-2">
        <Text className="text-gray-800 mb-1">Voice Preference</Text>
        <Picker
          selectedValue={voice}
          onValueChange={(itemValue) => onVoiceChange(itemValue)}>
          {voices.map((voice) => (
            <Picker.Item
              key={voice.identifier}
              label={`${voice.name} (${voice.language})${voice.quality === 'Enhanced' ? '' : ''}`}
              value={voice.identifier}
            />
          ))}
        </Picker>
      </View>
      <View className="flex-row">
        <View className="flex-1 py-2 pr-2">
          <Text className="text-gray-800 mb-1">Voice Pitch</Text>
          <TextInput
            value={pitch.toString()}
            keyboardType="decimal-pad"
            className="outline-none border border-gray-800 p-2 text-gray-800 rounded-md"
            placeholder="Voice Pitch"
            onChangeText={onPitchChange}
          />
        </View>
        <View className="flex-1 py-2 pl5-2">
          <Text className="text-gray-500 mb-1">Voice Rate</Text>
          <TextInput
            value={rate.toString()}
            keyboardType="decimal-pad"
            className="outline-none border border-gray-800 p-2 text-gray-800 rounded-md"
            placeholder="Voice Rate"
            onChangeText={onRateChange}
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="flex w-1/2 pr-2">
          <TouchableOpacity className="bg-purple-600 p-2 mt-4 rounded-md" onPress={onSave}>
            <Text className="text-center text-white font-semibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-1/2 pl-2">
          <TouchableOpacity className="bg-purple-400 p-2 mt-4 rounded-md" onPress={onCancel}>
            <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
