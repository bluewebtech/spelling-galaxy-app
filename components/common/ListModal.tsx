import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Modal from '@/components/common/Modal';

interface ListModalProps {
  listId: number;
  show: boolean;
  onClose: (event: boolean) => void;
}

export default function ListModal({ listId, show, onClose }: ListModalProps) {
  const [showModal, setShowModal] = useState(show);

  const onCloseModal = (event: boolean) => {
    setShowModal(event);
    onClose(event);
  };

  return (
    <Modal title="Hello World" show={showModal} onClose={onCloseModal}>
      {/* <View className="px-6 py-2">
            <View className="mb-2 items-left">
              <Text className="text-2xl font-semibold text-purple-500">Personal Information</Text>
            </View>
            <View className="flex-row">
              <View className="flex-1 py-2 pr-2">
                <Text className="mb-1 text-black font-semibold">First Name</Text>
                <TextInput
                  defaultValue={personal.firstName}
                  onChangeText={onFirstNameChange}
                  className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
                />
              </View>
              <View className="flex-1 py-2 pl-2">
                <Text className="mb-1 text-black font-semibold">Last Name</Text>
                <TextInput
                  defaultValue={personal.lastName}
                  onChangeText={onLastNameChange}
                  className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
                />
              </View>
            </View> */}
    </Modal>
  );
};