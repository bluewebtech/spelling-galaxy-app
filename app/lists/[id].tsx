import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function List() {
  // const [masterList, setMasterList] = useState<any[]>([]);

  // const [selectedListId, setSelectedListId] = useState<number | null>(null);

  // const [showModal, setShowModal] = useState(false);

  // const loadData = useCallback(async () => {
  //   try {
  //     const queryMasterSampleLists = await getMasterSampleLists();

  //     if (queryMasterSampleLists) {
  //       const masterListTitles: any[] = queryMasterSampleLists;
  //       setMasterList(masterListTitles);
  //     }
  //   } catch (error) {
  //     console.error("Error loading list:", error);
  //   }
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadData();
  //   }, [])
  // );

  return (
    <KeyboardAvoidingView className="flex-1 bg-white px-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1 items-center">
            <View className="flex-row">
              <TouchableOpacity className="w-full p-3 mt-2 rounded-md border-2 bg-purple-600 border-purple-400">
                <Text className="text-center text-white font-semibold text-xl">List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
