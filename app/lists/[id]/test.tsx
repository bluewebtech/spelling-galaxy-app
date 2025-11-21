import React, { useCallback, useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";

import { getList, getAccountMasterSettings } from '@/db/queries';
import { useSayWord } from '@/hooks/useSpeech';
import useStoreLayout from '@/store/layout';
import { List, Settings } from '@/types';

export default function ListTest() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const { id } = useLocalSearchParams();

  const [list, setList] = useState<List[]>([]);

  const [settings, setSettings] = useState<Settings>({
    voice: "",
    pitch: "",
    rate: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const queryList = await getList(Number(id));
      const querySettings = await getAccountMasterSettings();

      if (queryList) {
        const list: any = queryList;
        list.words = JSON.parse(list.words);
        setList(list);
        storeSetLayoutTitle(list.title);

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

  const onSayWord = (word: string) => {
    useSayWord(word, settings);
  };

  const onNextWord = () => {
    console.log('onNextWord');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center p-5 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mt-20 mb-5 py-2">
        <TouchableOpacity onPress={() => onSayWord(list.words[0].word)}>
          <View className="border-4 border-purple-500 rounded-3xl p-2">
            <Ionicons
              size={60}
              name="volume-medium-outline"
              color="#8200db"
            />
          </View>
        </TouchableOpacity>
      </View >
      <View className="py-4 w-full">
        <TextInput className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-50 p-4 rounded-md focus:bg-white focus:border-purple-500" />
      </View>
      <View className="w-full">
        <TouchableOpacity
          className="p-3 my-2 rounded-md border-2 bg-blue-800 border-blue-300"
          onPress={onNextWord}
        >
          <Text className="text-center text-white font-semibold text-xl">Next Word</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView >
  );
};
