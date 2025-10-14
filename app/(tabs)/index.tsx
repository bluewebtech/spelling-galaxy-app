import React, { useState } from "react";
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountMaster } from '@/db/queries';
import { Profile } from '@/types';

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
    }, [])
  );

  const defineProfile = async () => {
    const account = await getAccountMaster();

    if (account as Profile) {
      const profile = account as Profile;
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
    }
  };

  return (
    <View className="flex-1 items-center">
      <Text>Hello, {firstName} {lastName}</Text>
    </View>
  );
}
