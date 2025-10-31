import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function List() {
  const [isDisabled, setIsDisabled] = useState(true);

  // const [masterList, setMasterList] = useState<any[]>([]);

  // const [selectedListId, setSelectedListId] = useState<number | null>(null);

  // const [showModal, setShowModal] = useState(false);

  // const loadData = useCallback(async () => {
  //   try {
  //     const queryMasterSampleLists = await getMasterSampleLists();

  //     if (queryMasterSampleLists) {
  //       const masterListTitles: any[] = queryMasterSampleLists;
  //       setMasterList(masterListTitles);
  //     }
  //   } catch (error) {
  //     console.error("Error loading list:", error);
  //   }
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadData();
  //   }, [])
  // );

  const onSave = async () => {
    console.log('onSave');
  };

  const onCancel = async () => {
    console.log('onCancel');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 py-2">
            <View className="mb-2 items-left">
              <Text className="text-2xl font-semibold text-purple-500">Edit List</Text>
            </View>
            <View className="flex-row">
              <View className="flex-1 py-2 pr-2">
                <Text className="mb-1 text-black font-semibold">Title</Text>
                <TextInput
                  // defaultValue={personal.firstName}
                  // onChangeText={onFirstNameChange}
                  className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
                />
              </View>
            </View>
          </View>
          <View className="p-6 pt-0">
            <TouchableOpacity
              className={`p-3 mt-2 rounded-md border-2 ${isDisabled ? "bg-purple-400 border-purple-200" : "bg-purple-600 border-purple-400"}`}
              disabled={isDisabled}
              onPress={onSave}
            >
              <Text className="text-center text-white font-semibold text-xl">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-400 p-3 mt-4 rounded-md border-2 border-gray-200" onPress={onCancel}>
              <Text className="text-center text-white font-semibold text-xl">Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
