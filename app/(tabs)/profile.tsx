import React, { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import ProfilePersonal from "@/components/Forms/Profile/ProfilePersonal";
import ProfileSettings from "@/components/Forms/Profile/ProfileSettings";
import Separator from "@/components/Separator";
import { getAccountMaster } from '@/db/queries';
import { Account, Profile, Settings } from '@/types';

export default function ProfileTab() {
  const [profile, setProfile] = useState({ first_name: "", last_name: "", email: "" } as Profile);
  const [settings, setSettings] = useState({ voice: "", pitch: "", rate: "" } as Settings);

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
    }, [])
  );

  const defineProfile = async () => {
    const queryAccount = await getAccountMaster() as Account | null;

    if (queryAccount) {
      setProfile({
        first_name: queryAccount.first_name,
        last_name: queryAccount.last_name,
        email: queryAccount.email,
      });

      setSettings({
        voice: queryAccount.voice,
        pitch: queryAccount.pitch,
        rate: queryAccount.rate,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView extraHeight={100}>
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
          <ProfilePersonal profile={profile} onChildEvent={defineProfile} />
          <Separator />
          <ProfileSettings settings={settings} onChildEvent={defineProfile} />
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};