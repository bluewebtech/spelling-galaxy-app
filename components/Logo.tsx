import { Image, Text, View } from "react-native";

const Logo = ({ imageStyles = 'w-12', textStyles = 'text-4xl' }) => {
  return (
    <View className="flex">
      <Text className="flex">
        <Image
          className={`flex ${imageStyles}`}
          alt="Spelling Galaxy Logo"
          source={require('@/assets/images/galaxy.png')}
        />
        <View className="flex-row px-1 py-1.5">
          <Text className={`flex text-gray-600 ${textStyles} font-medium`}>Spelling</Text><Text className={`flex text-purple-500 ${textStyles} font-medium`}>Galaxy</Text>
        </View>
      </Text>
    </View>
  );
}

export default Logo;
