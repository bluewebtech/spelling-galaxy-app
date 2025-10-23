import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAccountMaster, getMasterListTitles } from '@/db/queries';
import { Personal } from '@/types';

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [masterList, setMasterList] = useState([]) as any[];
  const [hasAccount, setHasAccount] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const queryMasterListTitles = await getMasterListTitles();

      if (queryMasterListTitles) {
        console.log(queryMasterListTitles);
        const masterListTitles: any[] = queryMasterListTitles;
        setMasterList(masterListTitles);
      }
    } catch (error) {
      console.error("Error loading account:", error);
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
          <View className="flex-1">
            <View className="flex items-left p-4 rounded-xl bg-gray-100 w-full">
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
                <Text className="flex text-purple-600 text-md">Your journey to better spelling starts here.</Text>
              </View>
              <View className="flex-1 items-center">
                <View className="flex-row mt-5">
                  <TouchableOpacity className="w-full bg-purple-600 p-2 rounded-lg">
                    <Text className="text-center text-white font-semibold text-lg">Create Your First Spelling List</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-1 mt-5">
            <View className="flex items-left p-4 rounded-xl border-2 border-gray-100 bg-white w-full">
              <View className="flex-row px-2">
                <Text className="flex mr-1 text-lg font-semibold text-gray-800">K12 Lists</Text>
              </View>
              {masterList.length ? (
                <View className="flex flex-row flex-wrap justify-between">
                  <View className="flex-row mb-3 px-2">
                    <Text className="flex mr-1 text-lg text-gray-800">Select a pre-populated list by grade to start.</Text>
                  </View>
                  {masterList.map(item => (
                    <TouchableOpacity style={{ backgroundColor: item.color }} className="bg-white rounded-full p-5 w-[30%] aspect-square mb-4 justify-center items-center" key={item.id}>
                      <View className="flex items-center justify-center w-20 h-20 rounded-full bg-white">
                        <Text className="text-black text-2xl font-semibold">{item.acronym}</Text>
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
