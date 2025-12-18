import {
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import K12List from "@/components/common/K12List";
import Welcome from "@/components/common/Welcome";
import Separator from "@/components/common/Separator";

export default function App() {
  return (
    <KeyboardAvoidingView className="flex-1 bg-white pt-4">
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Welcome />
          <Separator />
          <K12List />
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView >
  );
}
