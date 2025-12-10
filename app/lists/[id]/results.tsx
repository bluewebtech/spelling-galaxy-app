import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import useStoreLayout from '@/store/layout';
import useStoreList from '@/store/list';
import useStoreTest from "@/store/test";

export default function ListResults() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const list = useStoreList((state) => state.list);

  const submissions = useStoreTest((state) => state.submissions);

  const resetSubmissions = useStoreTest((state) => state.resetSubmissions);

  useFocusEffect(
    React.useCallback(() => {
      storeSetLayoutTitle(`Test - ${list?.title ?? "Results"}`);
    }, [list])
  );

  const total = submissions.length;

  const correctCount = submissions.reduce((acc, submission) => {
    const correct = submission.testWord.trim().toLowerCase() === submission.submissionWord.trim().toLowerCase();
    return acc + (correct ? 1 : 0);
  }, 0);

  const incorrectCount = total - correctCount;

  const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  const onTryAgain = () => {
    resetSubmissions();
    router.replace(`/lists/${list?.id}/test`);
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row rounded-md border-2 border-green-600 overflow-hidden">
          <View className="p-3">
            <Text className="font-semibold text-green-600">Correct</Text>
          </View>
          <View className="p-3 bg-green-600">
            <Text className="font-semibold text-white">{correctCount}</Text>
          </View>
        </View>
        <View className="flex-row rounded-md border-2 border-red-600 overflow-hidden">
          <View className="p-3">
            <Text className="font-semibold text-red-600">Incorrect</Text>
          </View>
          <View className="p-3 bg-red-600">
            <Text className="font-semibold text-white">{incorrectCount}</Text>
          </View>
        </View>
        <View className="flex-row rounded-md border-2 border-purple-600 overflow-hidden">
          <View className="p-3">
            <Text className="font-semibold text-purple-600">Score</Text>
          </View>
          <View className="p-3 bg-purple-600">
            <Text className="font-semibold text-white">{scorePercent}%</Text>
          </View>
        </View>
      </View>
      <View className="flex-row w-full items-center mb-3">
        <Text className="flex-1 font-semibold text-lg text-purple-600 pr-2">Word</Text>
        <Text className="flex-1 font-semibold text-lg text-purple-600 pr-2">Your Word</Text>
        <View className="w-10" />
      </View>
      {submissions.map((submission, idx) => {
        const correct = submission.testWord.trim().toLowerCase() === submission.submissionWord.trim().toLowerCase();

        return (
          <View
            key={idx}
            className="flex-row w-full items-center mb-4 border-t-2 border-purple-500 pt-4"
          >
            <View className="flex-1 pr-2">
              <Text className="text-lg text-gray-700" numberOfLines={2} ellipsizeMode="tail">
                {submission.testWord}
              </Text>
            </View>
            <View className="flex-1 pr-2">
              <Text className="text-lg text-gray-700" numberOfLines={2} ellipsizeMode="tail">
                {submission.submissionWord}
              </Text>
            </View>
            <View className="w-10 items-end">
              <Ionicons
                size={20}
                name={correct ? "checkmark-circle-outline" : "close-circle-outline"}
                color="white"
                className={`p-1 rounded-full ${correct ? 'bg-green-600' : 'bg-red-600'}`}
              />
            </View>
          </View>
        );
      })}
      <View className="w-full">
        <TouchableOpacity
          className="p-3 rounded-md border-2 bg-blue-800 border-blue-300"
          onPress={onTryAgain}
        >
          <Text className="text-center text-white font-semibold text-xl">Try Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
