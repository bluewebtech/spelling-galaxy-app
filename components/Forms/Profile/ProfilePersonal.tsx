import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Toast from 'react-native-toast-message';
import { updateMasterAccount } from '@/db/queries';

interface ProfilePersonalProps {
  firstNameProp: string;
  lastNameProp: string;
  emailProp: string;
}

export default function ProfilePersonal({ firstNameProp, lastNameProp, emailProp }: ProfilePersonalProps) {
  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [email, setEmail] = useState(emailProp);

  const onSave = async () => {
    try {
      const account = await updateMasterAccount(firstName, lastName, email);

      if (account.changes) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: `${firstName}, your profile has been saved`
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save profile'
      });
    }
  }

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <View className="p-6">
      <View className="mb-2 items-left">
        <Text className="text-2xl font-semibold text-purple-500">Profile</Text>
      </View>
      <View className="py-2">
        <Text className="text-gray-500 mb-1">First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
          placeholder="First Name"
          placeholderTextColor="#999"
        />
      </View>
      <View className="py-2">
        <Text className="text-gray-500 mb-1">Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
          placeholder="Last Name"
          placeholderTextColor="#999"
        />
      </View>
      <View className="py-2">
        <Text className="text-gray-500 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="outline-none border border-gray-400 p-2 text-gray-500 rounded-md"
          keyboardType="email-address"
          placeholder="Email Address"
          placeholderTextColor="#999"
        />
      </View>
      <View className="flex-row justify-between">
        <View className="flex w-1/2 pr-2">
          <TouchableOpacity
            onPress={onSave}
            className="bg-purple-600 p-2 mt-4 rounded-md"
          >
            <Text className="text-center text-white font-semibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-1/2 pl-2">
          <TouchableOpacity
            onPress={onCancel}
            className="bg-purple-400 p-2 mt-4 rounded-md"
          >
            <Text className="text-center text-white font-semibold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
