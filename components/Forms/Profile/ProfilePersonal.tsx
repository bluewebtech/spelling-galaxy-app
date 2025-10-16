import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import { updateMasterAccountProfile } from '@/db/queries';

type ProfilePersonalProps = {
  profile: {
    first_name: string;
    last_name: string;
    email: string;
  };
  onChildEvent: () => Promise<void>;
}

export default function ProfilePersonal(props: ProfilePersonalProps) {
  const [firstName, setFirstName] = useState(props.profile.first_name);
  const [lastName, setLastName] = useState(props.profile.last_name);
  const [email, setEmail] = useState(props.profile.email);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clone, setClone] = useState({
    firstName: props.profile.first_name,
    lastName: props.profile.last_name,
    email: props.profile.email,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (props.profile) {
      setFirstName(props.profile.first_name);
      setLastName(props.profile.last_name);
      setEmail(props.profile.email);
    }
  }, [props.profile]);

  useEffect(() => {
    setIsDisabled(firstName.length === 0 || lastName.length === 0 || email.length === 0 || !isValidEmail);
  }, [firstName, lastName, email, isValidEmail]);

  const validateEmail = (email: string) => {
    setEmail(email);
    setIsValidEmail(emailRegex.test(email));
  };

  const onSave = async () => {
    try {
      const account = await updateMasterAccountProfile(firstName, lastName, email);

      if (account.changes) {
        setClone({
          firstName: firstName,
          lastName: lastName,
          email: email,
        });

        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: 'Your profile has been saved'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Failed to save profile'
      });
    }
  }

  const onCancel = async () => {
    setFirstName(clone.firstName);
    setLastName(clone.lastName);
    setEmail(clone.email);

    await props.onChildEvent();
  };

  return (
    <View className="px-6 py-2">
      <View className="mb-2 items-left">
        <Text className="text-2xl font-semibold text-purple-500">Profile</Text>
      </View>
      <View className="py-2">
        <Text className="text-gray-800 mb-1">First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          className="outline-none border border-gray-800 p-2 text-gray-800 rounded-md"
          placeholder="First Name"
          placeholderTextColor="#999"
        />
      </View>
      <View className="py-2">
        <Text className="text-gray-800 mb-1">Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          className="outline-none border border-gray-800 p-2 text-gray-800 rounded-md"
          placeholder="Last Name"
          placeholderTextColor="#999"
        />
      </View>
      <View className="py-2">
        <Text className="text-gray-800 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={validateEmail}
          className="outline-none border border-gray-800 p-2 text-gray-800 rounded-md"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          placeholder="Email Address"
          placeholderTextColor="#999"
        />
      </View>
      <View className="flex-row justify-between">
        <View className="flex w-1/2 pr-2">
          <TouchableOpacity disabled={isDisabled} className="bg-purple-600 p-2 mt-4 rounded-md disabled:bg-purple-400" onPress={onSave}>
            <Text className="text-center text-white font-semibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-1/2 pl-2">
          <TouchableOpacity disabled={isDisabled} className="bg-purple-400 p-2 mt-4 rounded-md disabled:bg-purple-200" onPress={onCancel}>
            <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
