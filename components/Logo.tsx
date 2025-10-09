import { Image, Text, View } from "react-native";

const Logo = ({ width = 50, height = 55, textStyles = 'text-4xl' }) => {
  return (
    <View className="flex p-2">
      <Text className="flex">
        <Image
          style={{ width, height, resizeMode: 'contain' }}
          resizeMode="contain"
          alt="Spelling Galaxy Logo"
          source={require('@/assets/images/icon.png')}
        />
        <View className="flex-row px-1 py-1.5">
          <Text className={`flex text-gray-600 ${textStyles} font-medium`}>Spelling</Text><Text className={`flex text-purple-500 ${textStyles} font-medium`}>Galaxy</Text>
        </View>
      </Text>
    </View>
  );
}

export default Logo;
