import React, { useCallback, useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import InputButton from "@/components/common/InputButton";
import Separator from "@/components/common/Separator";
import { getList, updateList } from '@/db/queries';
import useStoreLayout from '@/store/layout';
import { List, Word } from '@/types';

export default function ListEdit() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const { id } = useLocalSearchParams();

  const [list, setList] = useState<List>({
    title: "",
    acronym: null,
    grade: null,
    color: null,
    words: [
      { word: "", definition: null },
      { word: "", definition: null },
      { word: "", definition: null },
      { word: "", definition: null },
      { word: "", definition: null },
    ],
    group: null,
  });


  const [isDisabled, setIsDisabled] = useState(true);

  const validateForm = (updatedList: List) => {
    const hasTitle = updatedList.title.trim().length > 0;
    const hasAtLeastOneWord = updatedList.words.some(w => w.word.trim().length > 0);

    setIsDisabled(!(hasTitle && hasAtLeastOneWord));
  };

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

  const onUpdateTitle = (title: string) => {
    setList(prev => {
      const updated = { ...prev, title };
      validateForm(updated);
      return updated;
    });
  };

  const onUpdateWord = (index: number, value: string) => {
    setList(prev => {
      const updatedWords = [...prev.words];
      updatedWords[index] = { ...updatedWords[index], word: value };

      const updatedList = { ...prev, words: updatedWords };

      validateForm(updatedList);

      return updatedList;
    });
  };

  const onAddWord = () => {
    setList(prev => {
      const updatedList = {
        ...prev,
        words: [...prev.words, { word: "", definition: null }],
      };

      validateForm(updatedList);
      return updatedList;
    });
  };

  const onRemoveWord = (index: number) => {
    setList(prev => {
      const updatedList = {
        ...prev,
        words: prev.words.filter((_, i) => i !== index),
      };

      validateForm(updatedList);
      return updatedList;
    });
  };

  const onSave = async () => {
    try {
      const cleanedWords = list.words
        .filter(item => item.word.trim().length > 0)
        .map(item => ({ ...item, word: item.word.trim() }));

      const seen = new Set();
      const uniqueWords = cleanedWords.filter(w => {
        const lower = w.word.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
      });

      const cleanedList: List = { ...list, words: uniqueWords };
      const result = await updateList(Number(id), cleanedList);

      if (result?.changes) {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Your list has been saved.",
        });

        setTimeout(() => router.push('/lists'), 500);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to save list.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="px-6 mt-3 mb-2 flex-row justify-between items-center ">
            <View className="flex-1 py-2">
              <Text className="my-2 text-black font-semibold">Title</Text>
              <TextInput
                value={list.title}
                onChangeText={onUpdateTitle}
                className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-300 p-4 rounded-2xl focus:bg-white focus:border-purple-500"
              />
            </View>
          </View>
          <Separator />
          <View className="px-6 flex-row justify-between items-center ">
            <View className="flex-1 py-2">
              <Text className="mb-1 text-black font-semibold">Words</Text>
              {list.words.map((item: Word, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center my-3 bg-purple-50 border-2 border-purple-300 p-3 rounded-2xl"
                >
                  <TextInput
                    value={item.word}
                    onChangeText={(word) => onUpdateWord(index, word)}
                    placeholder={`Word ${index + 1}`}
                    className="flex-1 text-lg text-black caret-black leading-[19px]"
                  />
                  <TouchableOpacity
                    onPress={() => onRemoveWord(index)}
                    className="p-1 bg-purple-700 rounded-full ml-3"
                  >
                    <Ionicons
                      size={25}
                      name="remove-circle-outline"
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View className="px-6 mt-6 mb-2 flex-row gap-4 justify-between items-center">
            <InputButton label="Add Word" color="blue" onPress={onAddWord} />
            <InputButton label="Save" color="purple" disabled={isDisabled} onPress={onSave} />
            <InputButton label="Cancel" color="gray" onPress={() => router.push(`/lists`)} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
