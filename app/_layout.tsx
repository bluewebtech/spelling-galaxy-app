import React, { useEffect, useState } from 'react';
import { Platform, useWindowDimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import usePath from '@/hooks/usePath';
import Logo from '@/components/common/Logo';
import SplashScreen from '@/components/common/Splash';
import Toast from '@/components/common/Toast';
import { useSchema } from "@/db/schema";
import { useSeed } from "@/db/seed";
import "../global.css";

const isAuthenticated: boolean = true;

const platform = Platform.OS;

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  const { width, height } = useWindowDimensions();

  const [orientation, setOrientation] = useState(height >= width ? 'Portrait' : 'Landscape');

  useEffect(() => {
    useSchema();
    useSeed();
  }, []);

  useEffect(() => {
    setOrientation(height >= width ? 'Portrait' : 'Landscape');
  }, [width, height]);

  const [{ isBasePath }] = usePath();

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
        <Tabs screenOptions={{
          animation: 'fade',
          transitionSpec: {
            animation: 'timing',
            config: {
              duration: 250,
            },
          },
          headerShown: !isBasePath,
          headerLeft: () => (
            <TouchableOpacity className="ml-3" onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={25} color="#000000" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          ),
          headerStatusBarHeight: 0,
          tabBarActiveTintColor: '#8200db',
          tabBarInactiveTintColor: '#333333',
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: platform === 'android' ? 50 : 5,
            height: orientation === 'Landscape' ? platform === 'android' ? 90 : 60 : platform === 'android' ? 100 : 70,
            display: isAuthenticated ? 'flex' : 'none',
          },
          sceneStyle: {
            backgroundColor: "#ffffff",
          },
        }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Ionicons size={size} name="planet-outline" color={color} />,
            }}
          />
          <Tabs.Screen
            name="lists"
            options={{
              title: 'Lists',
              tabBarIcon: ({ color, size }) => <Ionicons size={size} name="list-circle-outline" color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => <Ionicons size={size} name="person-circle-outline" color={color} />,
            }}
          />
        </Tabs>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
