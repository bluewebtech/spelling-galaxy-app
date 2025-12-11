import React, { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import InputButton from "@/components/common/InputButton";
import ProfilePersonal from "@/components/forms/profile/ProfilePersonal";
import ProfileSettings from "@/components/forms/profile/ProfileSettings";
import Separator from "@/components/common/Separator";
import { getAccountMaster, updateMasterAccount } from "@/db/queries";
import { Account, Personal, Settings } from "@/types";

export default function ProfileTab() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const floatRegex = /^-?\d*(\.\d*)?$/;

  const [personal, setPersonal] = useState<Personal>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [originalPersonal, setOriginalPersonal] = useState<Personal>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [settings, setSettings] = useState<Settings>({
    voice: "",
    pitch: "",
    rate: "",
  });

  const [originalSettings, setOriginalSettings] = useState<Settings>({
    voice: "",
    pitch: "",
    rate: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [isDisabled, setIsDisabled] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const queryAccount = (await getAccountMaster()) as Account | null;

      if (queryAccount) {
        const newPersonal: Personal = {
          firstName: queryAccount.first_name || "",
          lastName: queryAccount.last_name || "",
          email: queryAccount.email || "",
        };

        const newSettings: Settings = {
          voice: queryAccount.voice || "",
          pitch: queryAccount.pitch?.toString() || "",
          rate: queryAccount.rate?.toString() || "",
        };

        setPersonal(newPersonal);
        setOriginalPersonal(newPersonal);
        setSettings(newSettings);
        setOriginalSettings(newSettings);
      }
    } catch (error) {
      console.error("Error loading account:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  useEffect(() => {
    const disabled =
      personal.firstName.trim().length === 0 ||
      personal.lastName.trim().length === 0 ||
      personal.email.trim().length === 0 ||
      !isValidEmail;

    setIsDisabled(disabled);
  }, [personal, isValidEmail, originalPersonal]);

  const onFirstNameChange = (value: string) => setPersonal((prev) => ({ ...prev, firstName: value }));

  const onLastNameChange = (value: string) => setPersonal((prev) => ({ ...prev, lastName: value }));

  const onEmailChange = (value: string) => {
    setPersonal((prev) => ({ ...prev, email: value }));
    setIsValidEmail(emailRegex.test(value));
  };

  const onVoiceChange = (value: string) =>
    setSettings((prev) => ({ ...prev, voice: value }));

  const onPitchChange = (value: string) => {
    if (floatRegex.test(value)) setSettings((prev) => ({ ...prev, pitch: value }));
  };

  const onRateChange = (value: string) => {
    if (floatRegex.test(value)) setSettings((prev) => ({ ...prev, rate: value }));
  };

  const onSave = async () => {
    try {
      const result = await updateMasterAccount({
        first_name: personal.firstName,
        last_name: personal.lastName,
        email: personal.email,
        voice: settings.voice,
        pitch: settings.pitch.toString(),
        rate: settings.rate.toString(),
      });

      if (result?.changes) {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Your profile has been saved.",
        });
        setOriginalPersonal(personal);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to save profile.",
      });
    } finally {
      Keyboard.dismiss();
    }
  };

  const onCancel = async () => {
    await loadData();
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white py-3"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <ProfilePersonal
            personal={personal}
            onFirstNameChange={onFirstNameChange}
            onLastNameChange={onLastNameChange}
            onEmailChange={onEmailChange}
          />
          <Separator />
          <ProfileSettings
            settings={settings}
            onVoiceChange={onVoiceChange}
            onPitchChange={onPitchChange}
            onRateChange={onRateChange}
          />
          <View className="p-6 pt-0">
            <InputButton className="mb-4" label="Save" color="purple" disabled={isDisabled} onPress={onSave} />
            <InputButton label="Cancel" color="gray" onPress={onCancel} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};
