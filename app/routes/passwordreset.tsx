import "@/global.css";
import '@expo/metro-runtime';
import { Link } from 'expo-router';
import { ImageBackground, TouchableOpacity, Image, StyleSheet, Text, TextInput, View } from "react-native";

const PasswordReset = () => {
  return (
    <View className="flex">
      <View className="flex">
        <ImageBackground source={require('@/assets/images/background_blob.png')} resizeMode="cover" style={styles.image}>
          <View className="flex">
            <View
              className="w-full flex h-screen justify-center items-center flex-col px-6 lg:px-8">
              <View className="flex">
                <Link className="flex" aria-label="Home" href="/">
                  <Image
                    className="flex w-14"
                    alt="Spelling Galaxy Logo"
                    source={require('@/assets/images/galaxy.png')}
                  />
                  <View className="flex-row px-1 py-1.5">
                    <Text className="flex text-gray-600 text-4xl font-medium">Spelling</Text><Text className="flex text-purple-500 text-4xl font-medium">Galaxy</Text>
                  </View>
                </Link>
              </View>
              <View className="sm:mx-auto w-full sm:max-w-sm">
                <View>
                  <View className="mt-5">
                    <TextInput secureTextEntry={true} placeholder="Password"
                      className="block w-full p-4 outline-none text-purple-500 font-semibold placeholder:text-purple-300 rounded-md bg-white border-4 border-solid border-purple-300 hover:border-purple-400 focus:border-purple-500" />
                  </View>
                  <View className="mt-5">
                    <TextInput secureTextEntry={true} placeholder="Confirm Password"
                      className="block w-full p-4 outline-none text-purple-500 font-semibold placeholder:text-purple-300 rounded-md bg-white border-4 border-solid border-purple-300 hover:border-purple-400 focus:border-purple-500" />
                  </View>
                </View>
                <View className="justify-between mt-5">
                  <View className="flex items-center">
                    <TouchableOpacity className="w-full p-4 focus:outline-hidden group inline-flex items-center justify-center rounded-md border-4 border-purple-400 bg-purple-800 transition duration-200 ease-in-out hover:border-purple-800">
                      <Text className="font-semibold text-white text-lg">Reset Password</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex items-center mt-5 p-3 pl-0">
                    <Link href="/" className="text-lg text-purple-600 hover:text-purple-500">Go to Sign In</Link>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '80%',
  },
});

export default PasswordReset;
