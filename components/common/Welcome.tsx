import React, { useCallback, useState, useRef } from "react";
import {
  Text,
  View,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import InputButton from "@/components/common/InputButton";
import { getAccountMaster, hasOwnLists } from "@/db/queries";
import { Account, List } from "@/types";

export default function Welcome() {
  const [firstName, setFirstName] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [hasList, setHasList] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      defineProfile();
      defineHasOwnList();
    }, [])
  );

  const defineProfile = async () => {
    const queryAccount = await getAccountMaster();

    if (queryAccount && typeof queryAccount === "object" && "first_name" in queryAccount) {
      setHasAccount((queryAccount as Account).first_name !== "");
      const profile = queryAccount as Account;
      setFirstName(profile.first_name || "");
    } else {
      setHasAccount(false);
      setFirstName("");
    }
  };

  const defineHasOwnList = async () => {
    const queryHasOwnLists = await hasOwnLists();

    if (
      queryHasOwnLists &&
      typeof queryHasOwnLists === "object" &&
      "total" in queryHasOwnLists &&
      typeof (queryHasOwnLists as any).total === "number"
    ) {
      setHasList((queryHasOwnLists as { total: number }).total > 0);
    } else {
      setHasList(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex items-left p-4 w-full">
        {hasAccount ? (
          <View className="flex-row justify-center">
            <Text className="flex mr-1 text-3xl font-semibold text-black">
              Welcome back,
            </Text>
            <Text className="flex text-3xl font-semibold text-purple-700">
              {firstName}!
            </Text>
          </View>
        ) : (
          <View className="flex-row justify-center">
            <Text className="flex mr-1 text-3xl font-semibold text-black">
              Welcome to
            </Text>
            <Text className="flex mr-1 text-3xl font-medium text-gray-600">
              Spelling
            </Text>
            <Text className="flex text-3xl font-medium text-purple-500">
              Galaxy!
            </Text>
          </View>
        )}
        <View className="flex-row justify-center py-4">
          <Text className="flex text-gray-500 font-medium text-xl">
            Your journey to better spelling starts here.
          </Text>
        </View>
        <View className="flex-1 justify-center">
          <View className="flex-row mt-2">
            {hasList ? (
              <InputButton
                label="View Your Lists"
                color="purple"
                onPress={() => router.push(`/lists`)}
              />
            ) : (
              <InputButton
                label="Create A List"
                color="purple"
                onPress={() => router.push(`/lists/create`)}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
