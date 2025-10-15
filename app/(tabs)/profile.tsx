import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import Separator from "@/components/Separator";
import ProfilePersonal from "@/components/Forms/Profile/ProfilePersonal";
import ProfileSettings from "@/components/Forms/Profile/ProfileSettings";
import { getAccountMaster } from '@/db/queries';
import { Profile } from '@/types';

export default function ProfileTab() {
  const [account, setAccount] = useState({
    first_name: "",
    last_name: "",
    email: ""
  } as Profile);

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
    }, [])
  );

  const defineProfile = async () => {
    const queryAccount = await getAccountMaster() as Profile | null;

    if (queryAccount) {
      setAccount({
        first_name: queryAccount.first_name,
        last_name: queryAccount.last_name,
        email: queryAccount.email,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView
        extraHeight={100} // Add extra padding if needed
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* <View className="items-center pt-12 pb-6 bg-purple-600">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=8" }}
          className="w-28 h-28 rounded-full border-4 border-white"
          style={{ objectFit: "cover" }}
        />
        <Text className="text-2xl font-semibold text-white mt-3">{firstName} {lastName}</Text>
        <Text className="text-blue-100">{email}</Text>
      </View> */}
          <ProfilePersonal account={account} onChildEvent={defineProfile} />
          <Separator />
          <ProfileSettings />
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};