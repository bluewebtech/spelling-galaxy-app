import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ListModal from '@/components/common/ListModal';
import Separator from "@/components/common/Separator";
import { getMasterSampleLists } from '@/db/queries';
import useStoreLayout from '@/store/layout';
import { List } from '@/types';

export default function Lists() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const [masterList, setMasterList] = useState<any[]>([]);

  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);

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
      storeSetLayoutTitle('Lists');
    }, [])
  );

  const onOpenModal = (list: List) => {
    if (list.id) {
      setSelectedListId(list.id);
      setShowModal(true);
    }
  };

  const onCloseModal = (event: boolean) => {
    setShowModal(event);
    setSelectedListId(null);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {selectedListId && (
        <ListModal listId={selectedListId} show={showModal} onClose={onCloseModal} />
      )}
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-6 mt-4 mb-2">
            <TouchableOpacity onPress={() => router.push(`/lists/create`)} className="w-full p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400">
              <Text className="text-center text-white font-semibold text-xl">Create List</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          {masterList.length ? <View className="flex mt-3 px-6">
            {masterList.map((list: List) => (
              <TouchableOpacity
                key={list.id}
                onPress={() => router.push(`/lists/${list.id}/list`)}
                className="flex-row justify-between items-center p-3 mb-4 font-semibold rounded-md border-2 bg-white border-black">
                <Text className="text-black font-semibold text-xl">{list.title}</Text>
                <Text className="p-1 text-black font-semibold text-md bg-purple-200 rounded-full">{list.total_words}</Text>
              </TouchableOpacity>
            ))}
          </View>
            :
            <View className="flex-row justify-center py-4">
              <Text className="flex text-gray-500 font-medium text-xl">There are no lists available</Text>
            </View>}
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
