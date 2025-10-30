import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListModal from '@/components/common/ListModal';
import { getMasterSampleLists } from '@/db/queries';
import { List } from '@/types';

export default function Lists() {
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
    <KeyboardAvoidingView className="flex-1 bg-white mt-3 px-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {selectedListId && (
        <ListModal listId={selectedListId} show={showModal} onClose={onCloseModal} />
      )}
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1 items-center">
            <View className="flex-row">
              <TouchableOpacity className="w-full p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400">
                <Text className="text-center text-white font-semibold text-xl">Create List</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1 justify-center items-center mt-4">
            {masterList.map((list: List) => (
              <TouchableOpacity
                key={list.id}
                onPress={() => router.push(`/lists/${list.id}`)}
                className="w-full p-3 mb-4 font-semibold rounded-md border bg-white border-black">
                <Text className="text-center text-black font-semibold text-xl">{list.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}
