import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Text, View } from 'react-native';

import InputButton from "@/components/common/InputButton";

interface DeleteModalProps {
  id: number | null | undefined;
  message: string;
  show: boolean;
  onDelete: (event: number) => void;
  onCancel: (event: boolean) => void;
}

export default function DeleteModal({ id, message, show, onDelete, onCancel }: DeleteModalProps) {
  const [visible, setVisible] = useState(show);

  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    setVisible(show);

    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [show]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Animated.View className="py-12 w-full h-screen bg-white p-5">
        <View className="flex-1 justify-center items-center bg-white">
          <View className="py-2">
            <Text className="text-purple-700 font-semibold text-4xl">Delete?</Text>
          </View>
          <View className="py-2">
            <Text className="text-xl">{message}</Text>
          </View>
          <View className="flex-row justify-between gap-4 items-center py-5 w-full">
            <InputButton label="Yes" color="purple" onPress={() => onDelete(id)} />
            <InputButton label="Cancel" color="gray" onPress={() => onCancel(false)} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};
