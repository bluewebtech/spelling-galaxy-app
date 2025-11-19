import { Stack } from "expo-router";

export default function ListCreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'List - Create' }} />
    </Stack>
  );
};
