import { Stack } from 'expo-router';
import React, { useState } from 'react';
import SplashScreen from '@/components/Splash';

export default function Layout() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
