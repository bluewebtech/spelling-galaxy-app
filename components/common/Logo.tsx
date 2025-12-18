import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function useUnscramble(text: string) {
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    let frame = 0;
    const iterations = text.length * 3;

    const interval = setInterval(() => {
      if (frame >= iterations) {
        setDisplay(text);
        setDone(true);
        clearInterval(interval);
        return;
      }

      const revealCount = Math.floor((frame / iterations) * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (i < revealCount) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

      setDisplay(scrambled);
      frame++;
    }, 18);

    return () => clearInterval(interval);
  }, []);

  return display;
}

export default function Logo({ width = 50, height = 50, textStyles = 'text-4xl', withLabel = true }) {
  const spelling = useUnscramble("Spelling");
  const galaxy = useUnscramble("Galaxy");

  return (
    <View className="flex mt-2 px-4">
      <Text className="flex">
        <Image
          style={{ width, height, resizeMode: 'contain' }}
          resizeMode="contain"
          alt="Spelling Galaxy Logo"
          source={require('@/assets/images/galaxy.png')}
        />
        {withLabel ?
          <View className="flex-row mt-0.5 px-1 py-1.5">
            <Text className={`flex text-gray-600 ${textStyles} font-medium`}>{spelling}</Text>
            <Text className={`flex text-purple-500 ${textStyles} font-medium`}>{galaxy}</Text>
            {/* <Text className="ml-1 px-2 h-5 bg-blue-500 rounded-2xl text-white text-sm font-semibold">BETA</Text> */}
          </View>
          : null}
      </Text>
    </View>
  );
};
