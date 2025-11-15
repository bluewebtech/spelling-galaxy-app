import { Image, Text, View } from "react-native";

export default function Logo({ width = 50, height = 50, textStyles = 'text-4xl', withLabel = true }) {
  return (
    <View className="flex mt-2 px-4">
      <Text className="flex">
        <Image
          style={{ width, height, resizeMode: 'contain' }}
          resizeMode="contain"
          alt="Spelling Galaxy Logo"
          source={require('@/assets/images/galaxy.png')}
        />
        {withLabel ?
          <View className="flex-row mt-0.5 px-1 py-1.5">
            <Text className={`flex text-gray-800 ${textStyles} font-medium`}>Spelling</Text><Text className={`flex text-purple-500 ${textStyles} font-medium`}>Galaxy</Text>
            {/* <Text className="ml-1 px-2 h-5 bg-blue-500 rounded-2xl text-white text-sm font-semibold">BETA</Text> */}
          </View>
          : null}
      </Text>
    </View>
  );
};
