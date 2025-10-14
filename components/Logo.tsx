import { Image, Text, View } from "react-native";

const Logo = ({ width = 50, height = 50, textStyles = 'text-4xl', withLabel = true }) => {
  return (
    <View className="flex p-2">
      <Text className="flex">
        <Image
          style={{ width, height, resizeMode: 'contain' }}
          resizeMode="contain"
          alt="Spelling Galaxy Logo"
          source={require('@/assets/images/galaxy.png')}
        />
        {withLabel ?
          <View className="flex-row px-1 py-1.5">
            <Text className={`flex text-gray-600 ${textStyles} font-medium`}>Spelling</Text><Text className={`flex text-purple-500 ${textStyles} font-medium`}>Galaxy</Text>
          </View>
          : null}
      </Text>
    </View>
  );
}

export default Logo;
