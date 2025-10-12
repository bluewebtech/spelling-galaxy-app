import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Dimensions } from "react-native";
import Logo from '@/components/Logo';

const { width, height } = Dimensions.get("window");

const NUM_STARS = 500;
const STAR_MIN = 1.5;
const STAR_MAX = 4.5;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function makeStars() {
  const stars = [];
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      id: i,
      left: random(0, width),
      top: random(0, height),
      size: random(STAR_MIN, STAR_MAX),
      speed: random(1200, 4200),
      delay: random(0, 3000),
      maxOpacity: random(0.6, 1),
    });
  }
  return stars;
}

export default function Splash({ onFinish }) {
  const starsData = useMemo(() => makeStars(), []);
  const animsRef = useRef(
    starsData.map(() => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.9),
    }))
  );
  const anims = animsRef.current;

  useEffect(() => {
    const loops = starsData.map((s, i) => {
      const { opacity, scale } = anims[i];
      const seq = Animated.sequence([
        Animated.delay(s.delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: s.maxOpacity * 0.6,
            duration: Math.max(200, s.speed * 0.25),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.05,
            duration: Math.max(200, s.speed * 0.25),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: s.maxOpacity,
            duration: Math.max(120, s.speed * 0.15),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.9,
            duration: Math.max(120, s.speed * 0.15),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.08,
            duration: Math.max(300, s.speed * 0.4),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.85,
            duration: Math.max(300, s.speed * 0.4),
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(Math.max(200, s.speed * 0.1)),
      ]);

      return Animated.loop(seq, { resetBeforeIteration: true });
    });

    loops.forEach((l) => l.start());

    return () => {
      loops.forEach((l) => l.stop());
      anims.forEach(({ opacity, scale }) => {
        opacity.stopAnimation();
        scale.stopAnimation();
        opacity.setValue(0);
        scale.setValue(0.9);
      });
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-purple-800">
      {starsData.map((s, i) => {
        const { opacity, scale } = anims[i];
        const animatedStyle = {
          position: "absolute",
          left: s.left - s.size / 2,
          top: s.top - s.size / 2,
          width: s.size,
          height: s.size,
          borderRadius: s.size / 2,
          backgroundColor: "rgba(255,255,220,1)",
          transform: [{ scale }],
          opacity,
        };

        return <Animated.View key={s.id} style={animatedStyle} />;
      })}

      <View className="p-2 rounded-3xl shadow-lg bg-purple-200">
        <Logo />
      </View>
    </View>
  );
}
