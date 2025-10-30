import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal as NativeModal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  show: boolean;
  onClose: (event: boolean) => void;
}

export default function Modal({ title, children, show, onClose }: ModalProps) {
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
    <NativeModal visible={visible} transparent animationType="fade">
      <Animated.View className="py-12 w-full h-screen bg-white p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex">
            {title !== '' && (
              <View className="mt-8">
                <Text className="font-semibold text-4xl">{title}</Text>
              </View>
            )}
          </View>
          <View className="flex">
            <TouchableOpacity className="mt-8" onPress={() => onClose(false)}>
              <Ionicons
                size={35}
                name="close-circle-outline"
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>{children}</View>
      </Animated.View>
    </NativeModal>
  );
}
