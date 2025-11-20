import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

type DropdownItem = { label: string; value: string };

interface CustomDropdownProps {
  data: DropdownItem[];
  defaultValue: DropdownItem;
  onSelect: (item: DropdownItem) => void;
  placeholder: string;
}

export default function CustomDropdown({ data, defaultValue, onSelect }: CustomDropdownProps) {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  useEffect(() => {
    if (defaultValue) setSelectedItem(defaultValue);
  }, [defaultValue]);

  const onToggleDropdown = () => setVisible(!visible);

  const onClose = () => setVisible(false);

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        className="text-lg caret-black text-black leading-[19px] bg-purple-50 border-2 border-purple-50 p-3 rounded-md"
        onPress={onToggleDropdown}
      >
        <Text>{selectedItem ? selectedItem.label : defaultValue.label}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Animated.View className="mt-5 py-12 w-full h-screen bg-white">
          <View className="absolute top-5 right-5 z-10">
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                size={25}
                color="#ffffff"
                className="mt-5 bg-purple-500 rounded-full p-2"
                name="close-circle-outline"
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="mx-4 p-5 border-b border-purple-500"
                onPress={() => onSelectItem(item)}
              >
                <Text className="font-semibold">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};
