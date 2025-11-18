import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Separator from "@/components/common/Separator";
import { getAccountMaster, getMasterK12Lists } from '@/db/queries';
import { Account, List } from '@/types';

export default function App() {
  const [firstName, setFirstName] = useState("");

  const [masterList, setMasterList] = useState([]) as any[];

  const [hasAccount, setHasAccount] = useState(false);

  const groupBy = (list: List) => {
    const items = [];

    for (const item of list) {
      const rowIndex = item.group_id;

      if (!items[rowIndex]) {
        items[rowIndex] = [];
      }

      items[rowIndex].push(item);
    }

    return items;
  }

  const loadData = useCallback(async () => {
    try {
      const queryK12ListTitles = await getMasterK12Lists();

      if (queryK12ListTitles) {
        const masterListTitles: any[] = groupBy(queryK12ListTitles);
        setMasterList(masterListTitles);
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      defineProfile();
    }, [loadData])
  );

  const defineProfile = async () => {
    const account = await getAccountMaster();

    if (account && typeof account === "object" && "first_name" in account) {
      setHasAccount((account as Account).first_name !== "");
      const profile = account as Account;
      setFirstName(profile.first_name || "");
    } else {
      setHasAccount(false);
      setFirstName("");
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white pt-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1">
            <View className="flex items-left p-4 w-full">
              {hasAccount ? (
                <View className="flex-row justify-center">
                  <Text className="flex mr-1 text-3xl font-semibold text-black">Welcome back,</Text>
                  <Text className="flex text-3xl font-semibold text-purple-500">{firstName}!</Text>
                </View>
              ) : (
                <View className="flex-row justify-center">
                  <Text className="flex mr-1 text-3xl font-semibold text-black">Welcome to</Text>
                  <Text className="flex mr-1 text-3xl font-medium text-gray-600">Spelling</Text>
                  <Text className="flex text-3xl font-medium text-purple-500">Galaxy!</Text>
                </View>
              )}
              <View className="flex-row justify-center py-4">
                <Text className="flex text-gray-500 font-medium text-xl">Your journey to better spelling starts here.</Text>
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row mt-2">
                  <TouchableOpacity className="w-full p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400">
                    <Text className="text-center text-white font-semibold text-xl">Create Your First List</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Separator />
          <View className="flex items-left p-2 rounded-xl bg-white w-full">
            <View className="flex-row justify-center">
              <Text className="flex mr-2 text-3xl font-semibold text-purple-500">K12</Text>
              <Text className="flex text-3xl font-semibold text-black">Lists</Text>
            </View>
            <View className="flex-row justify-center mb-3 p-3">
              <Text className="flex text-gray-500 font-semibold text-xl">Select a pre-populated list by grade.</Text>
            </View>
            {masterList.length ? (
              <View className="items-center">
                {masterList.map((list: List[], listIndex: number) => (
                  <View
                    key={listIndex}
                    className="flex flex-row flex-wrap justify-center items-center"
                  >
                    {list.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/lists/${item.id}`)}
                        className="mx-2"
                      >
                        <View
                          style={{ borderWidth: 10, borderColor: item.color }}
                          className="rounded-full justify-center items-center p-1"
                        >
                          <View className="w-12 h-12 bg-white rounded-full justify-center items-center">
                            <Text className="text-black text-xl font-semibold">
                              {item.acronym}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <View className="flex-row px-2">
                <Text className="flex text-purple-600 text-lg">No lists available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView >
  );
};
