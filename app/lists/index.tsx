import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import InputButton from "@/components/common/InputButton";
import ListModal from '@/components/common/ListModal';
import Separator from "@/components/common/Separator";
import { getLists } from '@/db/queries';
import useStoreLayout from '@/store/layout';
import { List } from '@/types';

export default function Lists() {
  const storeSetLayoutTitle = useStoreLayout((state) => state.setTitle);

  const [list, setList] = useState<any[]>([]);

  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const queryLists = await getLists();

      if (queryLists) {
        const listTitles: any[] = queryLists;
        setList(listTitles);
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
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {selectedListId && (
        <ListModal
          listId={selectedListId}
          show={showModal}
          onClose={onCloseModal}
        />
      )}
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="px-6 mt-6 mb-2">
            <InputButton label="Create List" color="purple" onPress={() => router.push(`/lists/create`)} />
          </View>
          <Separator />
          {list.length ? <View className="flex mt-3 px-6">
            {list.map((list: List) => (
              <TouchableOpacity
                key={list.id}
                onPress={() => router.push(`/lists/${list.id}/list`)}
                className="flex-row justify-between items-center p-3 mb-6 font-semibold rounded-2xl border-2 bg-white border-purple-700">
                <Text className="text-purple-700 font-semibold text-xl">{list.title}</Text>
                <Text className="p-2 text-white text-center font-semibold text-md bg-purple-700 rounded-full w-9">{list.total_words}</Text>
              </TouchableOpacity>
            ))}
          </View>
            :
            <View className="flex-row justify-center py-4">
              <Text className="flex text-black font-medium text-xl">There are no lists available</Text>
            </View>}
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
