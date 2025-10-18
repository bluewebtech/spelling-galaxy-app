import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import ProfilePersonal from "@/components/Forms/Profile/ProfilePersonal";
import ProfileSettings from "@/components/Forms/Profile/ProfileSettings";
import Separator from "@/components/Separator";
import { getAccountMaster, updateMasterAccountProfile } from '@/db/queries';
import { Account, Profile, Settings } from '@/types';
import Toast from 'react-native-toast-message';

export default function ProfileTab() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [voice, setVoice] = useState<string>("");
  const [pitch, setPitch] = useState<string>("");
  const [rate, setRate] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [clone, setClone] = useState({
  //   firstName: props.profile.first_name,
  //   lastName: props.profile.last_name,
  //   email: props.profile.email,
  // });

  const [profile, setProfile] = useState({ first_name: "", last_name: "", email: "" } as Profile);
  const [settings, setSettings] = useState({ voice: "", pitch: "", rate: "" } as Settings);

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
    }, [])
  );

  useEffect(() => {
    setIsDisabled(firstName.length === 0 || lastName.length === 0 || email.length === 0 || !isValidEmail);
  }, [firstName, lastName, email, isValidEmail]);

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

  const onFirstNameChange = async (event: any): Promise<void> => {
    setFirstName(event);
  };

  const onLastNameChange = async (event: any): Promise<void> => {
    setLastName(event);
  };

  const onEmailChange = async (event: any): Promise<void> => {
    setEmail(event);
    setIsValidEmail(emailRegex.test(email));
  };

  const onVoiceChange = async (event: string): Promise<void> => {
    settings.voice = event;
    setVoice(event);
  }

  const onPitchChange = async (event: string): Promise<void> => {
    setPitch(event);
  }

  const onRateChange = async (event: string): Promise<void> => {
    setRate(event);
  }

  const onSave = async () => {
    console.log(firstName, lastName, email);
    // try {
    //   const account = await updateMasterAccountProfile(firstName, lastName, email);

    //   if (account.changes) {
    //     setClone({
    //       firstName: firstName,
    //       lastName: lastName,
    //       email: email,
    //     });

    //     Toast.show({
    //       type: 'success',
    //       text1: 'Success!',
    //       text2: 'Your profile has been saved'
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error!',
    //     text2: 'Failed to save profile'
    //   });
    // }

    Keyboard.dismiss();
  }

  const onCancel = async () => {
    // setFirstName(clone.firstName);
    // setLastName(clone.lastName);
    // setEmail(clone.email);
    // Keyboard.dismiss();
    // await props.onChildEvent();
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <ProfilePersonal profile={profile} onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange} onEmailChange={onEmailChange} />
          <Separator />
          <ProfileSettings settings={settings} onVoiceChange={onVoiceChange} onPitchChange={onPitchChange} onRateChange={onRateChange} />
          <View className="p-6 pt-0">
            <View className="flex">
              <TouchableOpacity className="bg-purple-600 p-3 mt-4 rounded-md" disabled={isDisabled} onPress={onSave}>
                <Text className="text-center text-white font-semibold text-xl">Save</Text>
              </TouchableOpacity>
            </View>
            <View className="flex">
              <TouchableOpacity className="bg-purple-400 p-3 mt-4 rounded-md" onPress={onCancel}>
                <Text className="text-center text-white font-semibold text-xl">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
