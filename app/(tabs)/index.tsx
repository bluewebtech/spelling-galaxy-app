import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Separator from "@/components/common/Separator";
import { getAccountMaster, getMasterK12Lists } from '@/db/queries';
import { List, Personal } from '@/types';

export default function App() {
  const [firstName, setFirstName] = useState("");

  const [masterList, setMasterList] = useState([]) as any[];

  const [hasAccount, setHasAccount] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const queryK12ListTitles = await getMasterK12Lists();

      if (queryK12ListTitles) {
        const masterListTitles: any[] = queryK12ListTitles;
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

    if (account && typeof account === "object" && "firstName" in account) {
      setHasAccount((account as Personal).firstName !== "");
      const profile = account as Personal;
      setFirstName(profile.firstName || "");
    } else {
      setHasAccount(false);
      setFirstName("");
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white px-4 pt-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1 mb-4">
            <View className="flex items-left p-4 rounded-xl bg-gray-100 border-2 border-gray-200 w-full">
              {hasAccount ? (
                <View className="flex-row">
                  <Text className="flex mr-1 text-lg font-semibold text-gray-800">Welcome back,</Text>
                  <Text className="flex text-lg font-semibold text-purple-500">{firstName}!</Text>
                </View>
              ) : (
                <View className="flex-row">
                  <Text className="flex mr-1 text-lg font-semibold text-gray-800">Welcome to</Text>
                  <Text className="flex mr-1 text-lg font-semibold text-gray-600">Spelling</Text>
                  <Text className="flex text-lg font-semibold text-purple-500">Galaxy!</Text>
                </View>
              )}
              <View className="flex-row mt-2">
                <Text className="flex text-purple-600 text-lg">Your journey to better spelling starts here.</Text>
              </View>
              <View className="flex-1 items-center">
                <View className="flex-row mt-2">
                  <TouchableOpacity className="w-full p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400">
                    <Text className="text-center text-white font-semibold text-xl">Create Your First List</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Separator />
          <View className="flex-1 mt-2">
            <View className="flex items-left p-4 rounded-xl bg-white w-full">
              <View className="flex-row px-2">
                <Text className="flex mr-1 text-lg font-semibold text-gray-800">K12 Lists</Text>
              </View>
              {masterList.length ? (
                <View className="flex flex-row flex-wrap justify-between">
                  <View className="flex-row mb-3 px-2">
                    <Text className="flex mr-1 text-lg text-gray-800">Select a pre-populated list by grade to start.</Text>
                  </View>
                  {masterList.map((list: List) => (
                    <TouchableOpacity style={{ backgroundColor: list.color }} className="bg-white rounded-full p-5 w-[30%] aspect-square mb-4 justify-center items-center" key={list.id}>
                      <View className="flex items-center justify-center w-20 h-20 rounded-full bg-white">
                        <Text className="text-black text-2xl font-semibold">{list.acronym}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View className="flex-row px-2">
                  <Text className="flex text-purple-600 text-lg">No lists available</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView >
  );
}
