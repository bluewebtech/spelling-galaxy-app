import React, { useCallback, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from "expo-speech";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "@expo/vector-icons/Ionicons";
import Separator from "@/components/common/Separator";
import { getList, getAccountMasterSettings } from '@/db/queries';
import { List, Settings } from '@/types';

export default function ListItem() {
  const { id } = useLocalSearchParams();

  const [list, setList] = useState<any[]>([]);

  const [settings, setSettings] = useState<Settings>({
    voice: "",
    pitch: "",
    rate: "",
  });

  const loadData = useCallback(async () => {
    try {
      const queryList = await getList(Number(id));
      const querySettings = await getAccountMasterSettings();

      if (queryList) {
        const list: any = queryList;
        list.words = JSON.parse(list.words);
        setList(list);

        const settings: any = querySettings;
        setSettings(settings);
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const onStartTest = async () => {
    console.log('onStartTest');
  };

  const onSayWord = (word: string) => {
    Speech.stop();
    Speech.speak(word, {
      voice: settings.voice,
      pitch: Number(settings.pitch),
      rate: Number(settings.rate),
    });
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 mt-4 mb-2">
            <View className="items-left">
              <Text className="text-2xl font-semibold text-purple-500">{list.title}</Text>
            </View>
          </View>
          <View className="mb-3 px-6">
            <TouchableOpacity
              className="p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400"
              onPress={onStartTest}
            >
              <Text className="text-center text-white font-semibold text-xl">Start Spelling Test</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <View className="flex-1 justify-center items-center mt-3 px-6">
            {list.words?.map((item: List, key: number) => (
              <TouchableOpacity
                key={key}
                className="w-full p-3 mb-4 font-semibold rounded-md border bg-white border-black"
                onPress={() => onSayWord(item.word)}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-center text-black font-semibold text-xl">{item.word}</Text>
                  <Ionicons
                    size={25}
                    name="volume-medium-outline"
                    color="#000000"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
