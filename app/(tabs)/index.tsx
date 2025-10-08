import { View, Text } from 'react-native';
import Logo from '@/components/Logo';

export default function Tab() {
  return (
    <View className="flex-1 justify-center items-center">
      <Logo />
      <Text>Home</Text>
    </View>
  );
}
