import React, { useCallback, useEffect, useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getAccountMasterSettings } from '@/db/queries';
import { useSayWord } from '@/hooks/useSpeech';
import useStoreLayout from '@/store/layout';
import useStoreList from '@/store/list';
import useStoreTest from '@/store/test';
import { Settings } from '@/types';

export default function ListTest() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const list = useStoreList((state) => state.list);

  const word = useStoreTest((state) => state.word);

  const wordKey = useStoreTest((state) => state.wordKey);

  const lastWordKey = useStoreTest((state) => state.lastWordKey);

  const setWord = useStoreTest((state) => state.setWord);

  const setWordKey = useStoreTest((state) => state.setWordKey);

  const setLastWordKey = useStoreTest((state) => state.setLastWordKey);

  const setSubmission = useStoreTest((state) => state.setSubmission);

  const [submissionWord, setSubmissionWord] = useState<string>("");

  const [settings, setSettings] = useState<Settings>({
    voice: "",
    pitch: "",
    rate: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const isLastWord = wordKey !== null && lastWordKey !== null && wordKey + 1 === lastWordKey;

  const loadData = useCallback(async () => {
    const querySettings = await getAccountMasterSettings();
    const settings: any = querySettings;
    setSettings(settings);

    if (list) {
      setWordKey(0);
      setLastWordKey(list.words.length);
      setWord(list.words[wordKey ?? 0]);
      storeSetLayoutTitle(`Test - ${list.title}`);
    }

  }, []);

  useEffect(() => {
    setIsDisabled(submissionWord.trim().length === 0);
  }, [submissionWord]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const onSayWord = () => {
    if (list) {
      useSayWord(list.words[wordKey ?? 0].word, settings);
    }
  };

  const onSayWordSlower = () => {
    if (list) {
      const setting = { ...settings };
      setting.rate = "0.1";
      useSayWord(list.words[wordKey ?? 0].word, setting);
    }
  };

  const onNextWord = () => {
    if (!list || wordKey === null) return;

    setSubmission({
      testWord: word.word,
      submissionWord: submissionWord,
    });

    if (isLastWord) {
      setSubmissionWord("");
      router.replace(`/lists/${list.id}/results`);
      return;
    }

    const nextWordKey = wordKey + 1;
    setWordKey(nextWordKey);
    setWord(list.words[nextWordKey]);
    setSubmissionWord("");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center p-5 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {list && (
        <Text className="text-xl font-semibold text-purple-800 mt-16 mb-2">
          Word {(wordKey ?? 0) + 1} of {lastWordKey}
        </Text>
      )}
      <View className="mt-20 mb-5 py-2 flex-row justify-between items-center">
        <TouchableOpacity className="mx-5" onPress={() => onSayWord()}>
          <View className="bg-purple-700 rounded-3xl p-2">
            <Ionicons
              size={60}
              name="volume-medium-outline"
              color="white"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mx-5" onPress={() => onSayWordSlower()}>
          <View className="bg-purple-200 rounded-3xl p-2">
            <Ionicons
              size={60}
              name="pulse-outline"
              color="#8200db"
            />
          </View>
        </TouchableOpacity>
      </View >
      <View className="py-4 w-full">
        <TextInput
          className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-300 p-4 rounded-md focus:bg-white focus:border-purple-500"
          value={submissionWord}
          onChangeText={setSubmissionWord}
        />
      </View>
      <View className="w-full">
        <TouchableOpacity
          disabled={isDisabled}
          className={`p-3 rounded-md border-2 ${isDisabled ? "bg-blue-200 border-blue-100" : "bg-blue-800 border-blue-300"
            }`}
          onPress={onNextWord}
        >
          <Text className="text-center text-white font-semibold text-xl">
            {isLastWord ? "Finish" : "Next Word"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView >
  );
};
