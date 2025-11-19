import { TouchableOpacity } from 'react-native';
import { Stack, router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

import useStoreLayout from '@/store/layout';

export default function ListsLayout() {
  const storeLayoutTitle = useStoreLayout((state) => state.title);

  return (
    <Stack screenOptions={{
      headerLeft: () => (
        <TouchableOpacity className="ml-3" onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={25} color="#000000" style={{ fontSize: 20 }} />
        </TouchableOpacity>
      ),
    }}>
      <Stack.Screen name="index" options={{ title: 'Lists' }} />
      <Stack.Screen name="create" options={{ title: 'List - Create' }} />
      <Stack.Screen name="[id]" options={{ title: storeLayoutTitle }} />
    </Stack>
  );
};
