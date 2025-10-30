import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

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

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity className="text-lg caret-black text-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black" onPress={onToggleDropdown}>
        <Text>{selectedItem ? selectedItem.label : defaultValue.label}</Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <Animated.View className="mt-5 py-12 w-full h-screen bg-white">
          <TouchableOpacity className="flex-1 justify-content-center align-items-center" onPress={onToggleDropdown}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectItem(item)} className="p-4 border-b border-purple-500">
                  <Text className="font-semibold">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};
