import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import useStoreLayout from '@/store/layout';
import useStoreList from '@/store/list';
import useStoreTest from "@/store/test";

export default function Results() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const list = useStoreList((state) => state.list);

  const submissions = useStoreTest((state) => state.submissions);

  useFocusEffect(
    React.useCallback(() => {
      storeSetLayoutTitle(`Test - ${list.title}`);
    }, [])
  );


  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row rounded-md border-2 border-green-600">
          <View className="p-3">
            <Text className="font-semibold text-green-600">Correct</Text>
          </View>
          <View className="p-3 bg-green-600">
            <Text className="font-semibold text-white">9</Text>
          </View>
        </View>
        <View className="flex-row rounded-md border-2 border-red-600">
          <View className="p-3">
            <Text className="font-semibold text-red-600">Incorrect</Text>
          </View>
          <View className="p-3 bg-red-600">
            <Text className="font-semibold text-white">1</Text>
          </View>
        </View>
        <View className="flex-row rounded-md border-2 border-purple-600">
          <View className="p-3">
            <Text className="font-semibold text-purple-600">Score</Text>
          </View>
          <View className="p-3 bg-purple-600">
            <Text className="font-semibold text-white">100%</Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-purple-600">Word</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-purple-600">Your Word</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      <View className="flex-row justify-between items-left mb-5">
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="size-4 grow">
          <Text className="font-semibold text-gray-600">Adventure</Text>
        </View>
        <View className="flex-none">
          <Ionicons
            size={25}
            name="checkmark-circle-outline"
            color="green"
          />
        </View>
      </View>
      {submissions.map((s, index) => {
        const correct = s.testWord.trim().toLowerCase() === s.submissionWord.trim().toLowerCase();

        return (
          <View
            key={index}
            className="p-4 mb-3 rounded-xl border border-purple-200 bg-purple-50"
          >
            <Text className="text-lg font-semibold text-purple-900">
              Word {index + 1}
            </Text>
            <Text className="mt-1">Correct Word: {s.testWord}</Text>
            <Text>Your Answer: {s.submissionWord}</Text>
            <Text className={`mt-2 font-bold ${correct ? "text-green-600" : "text-red-600"}`}>
              {correct ? "Correct ✓" : "Incorrect ✗"}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
