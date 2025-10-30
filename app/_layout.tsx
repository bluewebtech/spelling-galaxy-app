import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { usePathname } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '@/components/common/Logo';
import SplashScreen from '@/components/common/Splash';
import Toast from '@/components/common/Toast';

export default function Layout() {
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const isBasePath = useMemo(() => {
    return pathname === '/';
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
        <StatusBar style="auto" />
        {isBasePath && (
          <View className="flex-row items-center justify-between">
            <View className="flex">
              <Logo width={30} height={35} textStyles="text-2xl" />
            </View>
            <View className="flex px-6">
              <Ionicons size={25} name="alert-circle-outline" color="#333333" />
            </View>
          </View>
        )}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
