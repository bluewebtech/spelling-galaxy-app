import "@/global.css";
import '@expo/metro-runtime';
import { Link } from 'expo-router';
import { TouchableOpacity, Image, Text, TextInput, View } from "react-native";

const SignIn = () => {
  return (
    <View className="flex">
      <View className="flex">
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
                  <TextInput className="block w-full p-4 outline-none text-purple-500 font-semibold placeholder:text-purple-300 rounded-md border-4 border-solid border-purple-300 hover:border-purple-400 focus:border-purple-500" type="email" name="email" id="email" placeholder="Email" required />
                </View>
              </View>
              <View>
                <View className="mt-5 relative">
                  {/* <EyeIcon className="absolute right-4 cursor-pointer h-full w-8 text-purple-800" @click="onShowPassword" /> */}
                  <TextInput secureTextEntry={true} id="password" placeholder="Password"
                    className="block w-full p-4 outline-none text-purple-500 font-semibold placeholder:text-purple-300 rounded-md border-4 border-solid border-purple-300 hover:border-purple-400 focus:border-purple-500" />
                </View>
              </View>
              <View className="justify-between mt-5">
                <View className="flex items-center">
                  <TouchableOpacity className="w-full focus:outline-hidden group inline-flex items-center justify-center rounded-md border-4 border-purple-400 bg-purple-800 px-4 py-3 transition duration-200 ease-in-out hover:border-purple-800">
                    <Text className="font-semibold text-white text-lg">Sign In</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex items-center mt-5 p-3 pl-0">
                  <Link href="/" className="text-lg text-purple-600 hover:text-purple-500">Forgot Password</Link>
                </View>
              </View>
              <View className="flex-row mt-5">
                <Text className="grow mt-3 mr-5 border-t border-solid border-purple-400"></Text>
                <Text className="text-purple-500">or</Text>
                <Text className="grow mt-3 ml-5 border-t border-solid border-purple-400"></Text>
              </View>
              <View className="flex mt-5 items-center">
                <Link href="/" className="text-purple-600 hover:text-purple-500">
                  <View className="text-lg">
                    <Text className="mr-2 text-purple-600 text-lg hover:text-purple-500">Don't have an account?</Text>
                  </View>
                  <View className="text-lg text-purple-800">
                    <Text className="text-purple-600 font-bold text-lg hover:text-purple-500">Sign Up</Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignIn;
