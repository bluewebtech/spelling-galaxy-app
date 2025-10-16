import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAccountMaster } from '@/db/queries';
import { Profile } from '@/types';

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
    }, [])
  );

  const defineProfile = async () => {
    const account = await getAccountMaster();
    console.log(account);

    if (account && typeof account === "object" && "first_name" in account) {
      setHasAccount((account as Profile).first_name !== "");
      const profile = account as Profile;
      setFirstName(profile.first_name || "");
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
                  <Text className="flex mr-1 text-lg font-medium text-gray-800">Welcome back,</Text>
                  <Text className="flex text-lg font-medium text-purple-500">{firstName}!</Text>
                </View>
              ) : (
                <View className="flex-row">
                  <Text className="flex mr-1 text-lg font-medium text-gray-800">Welcome to</Text>
                  <Text className="flex mr-1 text-lg font-medium text-gray-600">Spelling</Text>
                  <Text className="flex text-lg font-medium text-purple-500">Galaxy!</Text>
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
            <View className="flex items-left p-4 rounded-xl bg-purple-100 w-full">
              <View className="flex-row">
                <Text className="flex mr-1 text-lg font-medium text-gray-800">Popular Lists</Text>
              </View>
              <View className="flex-row mt-2">
                <Text className="flex text-purple-600 text-md">No lists available</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView >
  );
}
