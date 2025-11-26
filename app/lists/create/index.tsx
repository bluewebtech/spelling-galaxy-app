import React, { useState, useEffect } from "react";
import { TextInput, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import Separator from "@/components/common/Separator";
import { createList } from "@/db/queries";
import { List, Word } from '@/types';

export default function ListCreate() {
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

  const onUpdateTitle = (t: string) => {
    setList(prev => {
      const updated = { ...prev, title: t };
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
      const cleanedWords = list.words.filter(w => w.word.trim().length > 0);
      const cleanedList: List = { ...list, words: cleanedWords };
      const result = await createList(cleanedList);

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
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 mt-3 mb-2 flex-row justify-between items-center ">
            <View className="flex-1 py-2">
              <Text className="my-2 text-black font-semibold">Title</Text>
              <TextInput
                value={list.title}
                onChangeText={onUpdateTitle}
                placeholder="Enter title"
                className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-300 p-3 rounded-md focus:bg-white focus:border-purple-500"
              />
            </View>
          </View>
          <Separator />
          <View className="px-6 flex-row justify-between items-center">
            <View className="flex-1 py-2">
              <Text className="mb-1 text-black font-semibold">Words</Text>
              {list.words.map((item: Word, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center my-3 bg-purple-50 border-2 border-purple-50 p-3 rounded-md"
                >
                  <TextInput
                    value={item.word}
                    onChangeText={(t) => onUpdateWord(index, t)}
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
          <View className="px-6 mt-6 mb-2 flex-row justify-between items-center">
            <TouchableOpacity
              className="p-3 rounded-md border-2 bg-blue-800 border-blue-300"
              onPress={onAddWord}
            >
              <Text className="text-center text-white font-semibold text-xl">Add Word</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 mx-5 py-3 px-6 rounded-md border-2 ${isDisabled
                ? "bg-purple-400 border-purple-200"
                : "bg-purple-700 border-purple-400"
                }`}
              disabled={isDisabled}
              onPress={onSave}
            >
              <Text className="text-center text-white font-semibold text-xl">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 px-6 bg-gray-400 rounded-md border-2 border-gray-200"
              onPress={() => router.push(`/lists`)}
            >
              <Text className="text-center text-white font-semibold text-xl">Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}
