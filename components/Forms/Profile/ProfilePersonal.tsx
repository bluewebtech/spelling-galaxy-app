import { Text, TextInput, View, } from "react-native";

type ProfilePersonalProps = {
  profile: {
    first_name: string;
    last_name: string;
    email: string;
  };
  onFirstNameChange: (event: string) => Promise<void>;
  onLastNameChange: (event: string) => Promise<void>;
  onEmailChange: (event: string) => Promise<void>;
}

export default function ProfilePersonal(props: ProfilePersonalProps) {
  // const onSave = async () => {
  //   try {
  //     const account = await updateMasterAccountProfile(firstName, lastName, email);

  //     if (account.changes) {
  //       setClone({
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //       });

  //       Toast.show({
  //         type: 'success',
  //         text1: 'Success!',
  //         text2: 'Your profile has been saved'
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error!',
  //       text2: 'Failed to save profile'
  //     });
  //   }

  //   Keyboard.dismiss();
  // }

  // const onCancel = async () => {
  //   setFirstName(clone.firstName);
  //   setLastName(clone.lastName);
  //   setEmail(clone.email);
  //   Keyboard.dismiss();
  //   await props.onChildEvent();
  // };

  return (
    <View className="px-6 py-2">
      <View className="mb-2 items-left">
        <Text className="text-2xl font-semibold text-purple-500">Personal Information</Text>
      </View>
      <View className="flex-row">
        <View className="flex-1 py-2 pr-2">
          <Text className="mb-1 text-black font-semibold">First Name</Text>
          <TextInput
            defaultValue={props.profile.first_name}
            onChangeText={props.onFirstNameChange}
            className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
        <View className="flex-1 py-2 pl-2">
          <Text className="mb-1 text-black font-semibold">Last Name</Text>
          <TextInput
            defaultValue={props.profile.last_name}
            onChangeText={props.onLastNameChange}
            className="text-lg text-black caret-black leading-[19px] bg-gray-100 border-2 border-gray-100 p-3 rounded-md focus:bg-white focus:border-black"
          />
        </View>
      </View>
      <View className="py-3">
        <Text className="mb-1 text-black font-semibold">Email</Text>
        <TextInput
          defaultValue={props.profile.email}
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
