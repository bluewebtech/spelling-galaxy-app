import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    const queryAccount = await getAccountMaster();
    if (queryAccount) setAccount(account);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        <ProfilePersonal firstNameProp={account.first_name} lastNameProp={account.last_name} emailProp={account.email} />
        <Separator />
        <ProfileSettings />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
