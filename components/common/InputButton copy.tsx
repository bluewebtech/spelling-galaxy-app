import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

type InputButtonProps = {
  label: string;
  color: 'purple' | 'blue' | 'gray';
  disabled?: boolean;
  className?: string;
  onPress: () => void;
};

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export default function InputButton({ label, color = "purple", disabled = false, className, onPress }: InputButtonProps) {
  const [display, setDisplay] = useState(label);
  const [done, setDone] = useState(false);

  const styles = {
    purple: {
      border: "border-purple-400",
      background: ['#6f3ef4', '#8200db', '#6f3ef4'],
    },
    blue: {
      border: "border-blue-400",
      background: ['#005ed1', '#1a00db', '#005ed1'],
    },
    gray: {
      border: "border-gray-400",
      background: ['#9c9c9c', '#737373', '#9c9c9c'],
    },
  };

  useEffect(() => {
    if (done) return;

    let frame = 0;
    const iterations = label.length * 3;

    const interval = setInterval(() => {
      if (frame >= iterations) {
        setDisplay(label);
        setDone(true);
        clearInterval(interval);
        return;
      }

      const revealCount = Math.floor((frame / iterations) * label.length);

      const scrambled =
        label
          .split("")
          .map((char, i) => {
            if (i < revealCount) return char;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("");

      setDisplay(scrambled);
      frame++;
    }, 18); // speed

    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity
      className={`flex-1 rounded-2xl border-2 ${styles[color].border} ${className}`}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        colors={styles[color].background}
        start={{ x: 0.12, y: 0.82 }}
        end={{ x: 0.88, y: 0.18 }}
        style={{ padding: 10, borderRadius: 10 }}
      >
        <Text className="text-center text-white font-semibold text-xl">
          {display}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
