import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import SplashScreen from '@/components/Splash';

export default function Layout() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
        <StatusBar style="auto" />
        <View className="flex items-center border-b border-gray-100">
          <Logo width={30} height={35} textStyles="text-lg" />
        </View>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
