import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 20,
        borderLeftColor: '#51cf17',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
      }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        marginTop: 20,
        borderLeftColor: '#cf1717',
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
      }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{
      height: 60,
      width: '100%',
      backgroundColor: 'tomato',
    }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default function Flash() {
  return (<Toast config={toastConfig} />)
};