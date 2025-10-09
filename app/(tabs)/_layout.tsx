import React, { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import "../../global.css";

const isAuthenticated: boolean = true;

const platform = Platform.OS;

export default function TabLayout() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState(height >= width ? 'Portrait' : 'Landscape');

  useEffect(() => {
    if (height >= width) {
      setOrientation('Portrait');
    } else {
      setOrientation('Landscape');
    }
  }, [width, height]);

  return (
    <Tabs screenOptions={{
      headerShown: false,
      headerStatusBarHeight: 0,
      tabBarActiveTintColor: '#8200db',
      tabBarInactiveTintColor: '#7c7c7cff',
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
  );
}
