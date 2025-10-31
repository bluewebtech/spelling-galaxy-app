import * as Speech from "expo-speech";
import { Settings } from '@/types';

export const useSayWord = (word: string, settings: Settings) => {
  Speech.stop();
  Speech.speak(word, {
    voice: settings.voice,
    pitch: Number(settings.pitch),
    rate: Number(settings.rate),
  });
};
