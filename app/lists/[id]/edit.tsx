import React, { useCallback, useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "@expo/vector-icons/Ionicons";

import Separator from "@/components/common/Separator";
import { getList, getAccountMasterSettings } from '@/db/queries';
import { useSayWord } from '@/hooks/useSpeech';
import useStoreLayout from '@/store/layout';
import { List, Settings } from '@/types';

export default function ListEdit() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const { id } = useLocalSearchParams();

  const [list, setList] = useState<List[]>([]);

  const [isDisabled, setIsDisabled] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const queryList = await getList(Number(id));

      if (queryList) {
        const list: any = queryList;
        list.words = JSON.parse(list.words);
        setList(list);
        storeSetLayoutTitle(`Edit - ${list.title}`);
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

  const onAdd = () => {
    console.log('onAdd');
  };

  const onSave = () => {
    console.log('onSave');
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 mt-3 mb-2 flex-row justify-between items-center ">
            <View className="flex-1 py-2">
              <Text className="my-2 text-black font-semibold">Title</Text>
              <TextInput value={list.title} className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-300 p-3 rounded-md focus:bg-white focus:border-purple-500" />
            </View>
          </View>
          <Separator />
          <View className="px-6 flex-row justify-between items-center ">
            <View className="flex-1 py-2">
              <Text className="mb-1 text-black font-semibold">Words</Text>
              {list.words?.map((item: string, key: number) => (
                <View key={key} className="flex-row items-center my-2 bg-purple-50 border-2 border-purple-300 p-3 rounded-md">
                  <TextInput
                    defaultValue={item.word}
                    className="flex-1 text-lg text-black caret-black leading-[19px]"
                  />
                  <Ionicons size={20} name="remove-circle-outline" color="red" />
                </View>
              ))}
            </View>
          </View>
          <View className="px-6">
            <TouchableOpacity
              className="p-3 my-2 rounded-md border-2 bg-blue-800 border-blue-300"
              onPress={onAdd}
            >
              <Text className="text-center text-white font-semibold text-xl">Add Word</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-3 my-2 rounded-md border-2 ${isDisabled ? "bg-purple-400 border-purple-200" : "bg-purple-600 border-purple-400"}`}
              disabled={isDisabled}
              onPress={onSave}
            >
              <Text className="text-center text-white font-semibold text-xl">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} className="p-3 my-2 bg-gray-400 rounded-md border-2 border-gray-200">
              <Text className="text-center text-white font-semibold text-xl">Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
