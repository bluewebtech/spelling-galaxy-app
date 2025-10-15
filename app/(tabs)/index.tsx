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
    setHasAccount(account !== null);

    if (account as Profile) {
      const profile = account as Profile;
      setFirstName(profile.first_name || "");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-4"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="flex-1 items-center">
            <View className="flex items-center mt-4 p-8 rounded-xl bg-purple-50 border border-purple-200 w-full">
              {hasAccount ? (
                <View className="flex-row">
                  <Text className="flex mr-1 text-3xl font-medium text-gray-600">Welcome back,</Text>
                  <Text className="flex text-3xl font-medium text-purple-500">{firstName}!</Text>
                </View>
              ) : (
                <View className="flex-row">
                  <Text className="flex mr-1 text-3xl font-medium text-gray-800">Welcome to</Text>
                  <Text className="flex mr-1 text-3xl font-medium text-gray-600">Spelling</Text>
                  <Text className="flex text-3xl font-medium text-purple-500">Galaxy!</Text>
                </View>
              )}
              <View className="flex-row mt-5">
                <Text className="flex text-gray-600 text-lg">Your journey to better spelling starts here.</Text>
              </View>
            </View>
          </View>

          <View className="flex-1 items-center">
            <View className="flex-row mt-5">
              <TouchableOpacity className="w-full bg-purple-600 p-3 rounded-lg">
                <Text className="text-center text-white font-semibold text-lg">Create Your First Spelling List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView >
  );
}
