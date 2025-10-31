import React, { useEffect, useState, useCallback } from "react";
import { Text, TextInput, View } from "react-native";
import * as Speech from "expo-speech";
import Ionicons from "@expo/vector-icons/Ionicons";
import Dropdown from "@/components/common/DropDown";
import { useSayWord } from '@/hooks/useSpeech';

type ProfileSettingsProps = {
  settings: {
    voice: string;
    pitch: string;
    rate: string;
  };
  onVoiceChange: (event: string) => Promise<void>;
  onPitchChange: (event: string) => Promise<void>;
  onRateChange: (event: string) => Promise<void>;
};

const SAMPLE_WORD = "Spelling Galaxy";

export default function ProfileSettings({
  settings,
  onVoiceChange,
  onPitchChange,
  onRateChange,
}: ProfileSettingsProps) {
  const [voices, setVoices] = useState<{ label: string; value: string }[]>([]);

  const [voice, setVoice] = useState(settings.voice);

  const [pitch, setPitch] = useState(settings.pitch);

  const [rate, setRate] = useState(settings.rate);

  const [defaultVoice, setDefaultVoice] = useState<{ label: string; value: string } | null>(null);

  useEffect(() => {
    defineVoices();
  }, []);

  useEffect(() => {
    setVoice(settings.voice);
    setPitch(settings.pitch);
    setRate(settings.rate);
  }, [settings]);

  const defineVoices = useCallback(async () => {
    try {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      const englishVoices = availableVoices
        .filter((item) => item.language.includes("en-US"))
        .sort((a, b) => {
          if (a.quality === b.quality) return a.name.localeCompare(b.name);
          return a.quality === "Enhanced" ? -1 : 1;
        })
        .map((item) => ({
          label: `${item.name} (${item.language})`,
          value: item.identifier,
        }));

      setVoices(englishVoices);

      const saved = englishVoices.find((v) => v.value === settings.voice);
      setDefaultVoice(saved || englishVoices[0] || null);
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  }, [settings.voice]);

  const handleVoiceChange = async (newVoice: string) => {
    setVoice(newVoice);
    await onVoiceChange(newVoice);
    useSayWord(SAMPLE_WORD, { voice: newVoice, pitch, rate });
  };

  const onVoiceSample = () => {
    useSayWord(SAMPLE_WORD, { voice, pitch, rate });
  };

  const dropdownValue =
    voices.find((v) => v.value === voice) ||
    defaultVoice ||
    { label: "Select Voice", value: "" };

  return (
    <View className="px-6 py-2">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-2xl font-semibold text-purple-500">Settings</Text>
        <Ionicons
          size={30}
          name="volume-medium-outline"
          color="#000000"
          onPress={onVoiceSample}
        />
      </View>
      <View className="py-2">
        <Text className="mb-1 text-black font-semibold">Voice Preference</Text>
        <Dropdown
          data={voices}
          defaultValue={dropdownValue}
          placeholder="Select Voice"
          onSelect={(item: any) => handleVoiceChange(item.value)}
        />
      </View>
      <View className="flex-row py-2">
        <View className="flex-1 py-2 pr-2">
          <Text className="mb-1 text-black font-semibold">Voice Pitch</Text>
          <TextInput
            value={pitch.toString()}
            keyboardType="decimal-pad"
            onChangeText={onPitchChange}
            className="text-lg caret-black text-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
        <View className="flex-1 py-2 pl-2">
          <Text className="mb-1 text-black font-semibold">Voice Rate</Text>
          <TextInput
            value={rate.toString()}
            keyboardType="decimal-pad"
            onChangeText={onRateChange}
            className="text-lg caret-black text-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
      </View>
    </View>
  );
};
