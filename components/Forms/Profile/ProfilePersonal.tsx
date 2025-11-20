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

export default function ProfilePersonal({
  personal,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
}: ProfilePersonalProps) {
  return (
    <View className="px-6 py-2">
      <View className="mb-2 items-left">
        <Text className="text-2xl font-semibold text-purple-500">Personal Information</Text>
      </View>
      <View className="flex-row">
        <View className="flex-1 py-2 pr-2">
          <Text className="mb-1 text-black font-semibold">First Name</Text>
          <TextInput
            className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-50 p-3 rounded-md focus:bg-white focus:border-purple-500"
            defaultValue={personal.firstName}
            onChangeText={onFirstNameChange}
          />
        </View>
        <View className="flex-1 py-2 pl-2">
          <Text className="mb-1 text-black font-semibold">Last Name</Text>
          <TextInput
            className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-50 p-3 rounded-md focus:bg-white focus:border-purple-500"
            defaultValue={personal.lastName}
            onChangeText={onLastNameChange}
          />
        </View>
      </View>
      <View className="py-3">
        <Text className="mb-1 text-black font-semibold">Email</Text>
        <TextInput
          className="text-lg text-black caret-black leading-[19px] bg-purple-50 border-2 border-purple-50 p-3 rounded-md focus:bg-white focus:border-purple-500"
          defaultValue={personal.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          onChangeText={onEmailChange}
        />
      </View>
    </View>
  );
};
