import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getMasterSampleLists } from '@/db/queries';
import { List } from '@/types';

export default function Lists() {
  const [selected, setSelected] = useState<number | null>(null);
  const [masterList, setMasterList] = useState([]) as any[];

  const loadData = useCallback(async () => {
    try {
      const queryMasterSampleLists = await getMasterSampleLists();

      if (queryMasterSampleLists) {
        const masterListTitles: any[] = queryMasterSampleLists;
        setMasterList(masterListTitles);
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <KeyboardAvoidingView className="flex-1 bg-white px-4 pt-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1 items-center">
            <View className="flex-row">
              <TouchableOpacity className="w-full bg-purple-600 p-2 rounded-lg">
                <Text className="text-center text-white font-semibold text-lg">Create Spelling List</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1 justify-center items-center mt-5">
            {masterList.map((list: List) => (
              <TouchableOpacity
                key={list.id}
                onPress={() => setSelected(list.id)}
                className="w-full p-2 mb-4 font-semibold rounded-lg border bg-white border-black">
                <Text className="text-lg text-center font-semibold text-black">{list.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}
