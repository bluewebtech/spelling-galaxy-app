import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type InputButtonProps = {
  label: string;
  color: 'purple' | 'blue' | 'gray';
  disabled?: boolean;
  className?: string;
  onPress: () => void;
};

export default function InputButton({ label, color = "purple", disabled = false, className, onPress }: InputButtonProps) {
  const styles = {
    purple: {
      border: "border-purple-400",
      background: ['#6f3ef4', '#8200db'],
    },
    blue: {
      border: "border-blue-400",
      background: ['#005ed1', '#1a00db'],
    },
    gray: {
      border: "border-gray-400",
      background: ['#9c9c9c', '#737373'],
    },
  };

  return (
    <TouchableOpacity
      className={`flex-1 rounded-md border-2 ${styles[color].border} ${className}`}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        colors={styles[color].background}
        start={{ x: 0.12, y: 0.82 }}
        end={{ x: 0.88, y: 0.18 }}
        style={{ padding: 10 }}
      >
        <Text className="text-center text-white font-semibold text-xl">
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
