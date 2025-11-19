import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "@expo/vector-icons/Ionicons";

import Separator from "@/components/common/Separator";
import { getList, getAccountMasterSettings } from '@/db/queries';
import { useSayWord } from '@/hooks/useSpeech';
import useStoreLayout from '@/store/layout';
import { List, Settings } from '@/types';

export default function ListItem() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

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
        storeSetLayoutTitle(`List - ${list.title}`);

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
    useSayWord(word, settings);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 mt-6 mb-2 flex-row justify-between items-center ">
            <TouchableOpacity
              className="flex-1 p-3 rounded-md border-2 bg-blue-800 border-blue-300"
              onPress={onStartTest}
            >
              <Text className="text-center text-white font-semibold text-xl">Start Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-5 py-3 px-6 rounded-md border-2 bg-purple-600 border-purple-400"
              onPress={() => router.push(`/lists/${id}/edit`)}
            >
              <Text className="text-center text-white font-semibold text-xl">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 px-6 rounded-md border-2 bg-red-600 border-red-400"
              onPress={onStartTest}
            >
              <Text className="text-center text-white font-semibold text-xl">Delete</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <View className="flex-1 justify-center items-center mt-3 px-6">
            {list.words?.map((item: List, key: number) => (
              <TouchableOpacity
                key={key}
                className="w-full p-3 mb-4 font-semibold rounded-md border-2 bg-white border-black"
                onPress={() => onSayWord(item.word)}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-center text-black font-semibold text-xl">{item.word}</Text>
                  <Ionicons
                    size={25}
                    name="volume-medium-outline"
                    color="#8200db"
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
