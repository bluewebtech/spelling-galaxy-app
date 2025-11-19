import { Stack } from "expo-router";

export default function ListItemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" />
      <Stack.Screen name="edit" />
    </Stack>
  );
};
