import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

type DropdownItem = { label: string; value: string };

interface CustomDropdownProps {
  data: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  placeholder: string;
}

export default function CustomDropdown({ data, onSelect, placeholder }: CustomDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const onToggleDropdown = () => setIsVisible(!isVisible);

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity className="text-lg caret-black text-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black" onPress={onToggleDropdown}>
        <Text>{selectedItem ? selectedItem.label : placeholder}</Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity className="flex-1 justify-content-center align-items-center" onPress={onToggleDropdown}>
          <View className='absolute top-12 bottom-4 w-full bg-white p-5'>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectItem(item)} className="p-4 border-b border-purple-500">
                  <Text className="font-semibold">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
