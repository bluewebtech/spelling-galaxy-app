import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal as NativeModal, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: (event: boolean) => void;
}

export default function Modal({ children, show, onClose }: ModalProps) {
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
      <Animated.View className="absolute top-0 bottom-0 w-full bg-purple-300 p-5">
        <View className="mt-20">
          {children}
        </View>
        <TouchableOpacity className="p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400" onPress={() => onClose(false)}>
          <Text className="text-center text-white font-semibold text-xl">Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </NativeModal>
  );
}
