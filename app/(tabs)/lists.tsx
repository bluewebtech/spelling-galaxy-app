import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';

export default function Lists() {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  const onOpenModal = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const onSpeak = () => {
    if (text.trim().length > 0) {
      Speech.speak(text, {
        language: 'en',
        pitch: 1.5,
        rate: 1.0,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onOpenModal}>
          <Text style={styles.buttonText}>Open Bottom Modal</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Enter text to speak:</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type something..."
        />
        <TouchableOpacity style={styles.button} onPress={onSpeak}>
          <Text style={styles.buttonText}>Speak</Text>
        </TouchableOpacity>

        <Modal transparent visible={visible} animationType="none">
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={styles.title}>Bottom Modal</Text>
                <Text>This modal slides up from the bottom!</Text>
                <TouchableOpacity style={styles.button} onPress={onCloseModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8200db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#8200db',
    padding: 20,
    elevation: 5,
    paddingBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  button: {
    backgroundColor: '#8200db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});