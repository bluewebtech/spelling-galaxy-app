import { Text, TextInput, View, } from "react-native";

type ProfilePersonalProps = {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onFirstNameChange: (event: string) => Promise<void>;
  onLastNameChange: (event: string) => Promise<void>;
  onEmailChange: (event: string) => Promise<void>;
}

export default function ProfilePersonal(props: ProfilePersonalProps) {
  return (
    <View className="px-6 py-2">
      <View className="mb-2 items-left">
        <Text className="text-2xl font-semibold text-purple-500">Personal Information</Text>
      </View>
      <View className="flex-row">
        <View className="flex-1 py-2 pr-2">
          <Text className="mb-1 text-black font-semibold">First Name</Text>
          <TextInput
            defaultValue={props.personal.firstName}
            onChangeText={props.onFirstNameChange}
            className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
        <View className="flex-1 py-2 pl-2">
          <Text className="mb-1 text-black font-semibold">Last Name</Text>
          <TextInput
            defaultValue={props.personal.lastName}
            onChangeText={props.onLastNameChange}
            className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
      </View>
      <View className="py-3">
        <Text className="mb-1 text-black font-semibold">Email</Text>
        <TextInput
          defaultValue={props.personal.email}
          onChangeText={props.onEmailChange}
          className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
      </View>
    </View>
  );
}
