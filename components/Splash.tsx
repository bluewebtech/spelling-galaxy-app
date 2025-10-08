import React, { useEffect } from 'react';
import { View } from 'react-native';
import Logo from '@/components/Logo';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-purple-100">
      <Logo />
    </View>
  );
}
