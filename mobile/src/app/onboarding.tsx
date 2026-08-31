import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleSelect = async (gender: string) => {
    try {
      await AsyncStorage.setItem('@user_gender', gender);
      // Navigation vers l'accueil principal
      router.replace('/(tabs)');
    } catch (e) {
      console.error('Failed to save gender preference', e);
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View className="flex-1 px-6 justify-center pb-12">
        <View className="items-center mb-12">
          <Text className="font-display text-4xl uppercase tracking-tighter text-black mb-3">Bienvenue</Text>
          <Text className="font-body text-center text-[#616363] text-sm px-4">
            Pour personnaliser votre expérience sur Addikt, veuillez sélectionner votre préférence.
          </Text>
        </View>

        <View className="flex-col">
          <TouchableOpacity 
            onPress={() => handleSelect('Femme')}
            className="w-full h-40 rounded-xl overflow-hidden relative mb-4 shadow-sm"
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' }} 
              className="absolute w-full h-full opacity-90"
              style={{ resizeMode: 'cover' }}
            />
            <View className="absolute w-full h-full bg-black/40 justify-center items-center">
              <Text className="font-display text-3xl text-white uppercase tracking-wider">Mode Femme</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleSelect('Homme')}
            className="w-full h-40 rounded-xl overflow-hidden relative shadow-sm"
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop' }} 
              className="absolute w-full h-full opacity-90"
              style={{ resizeMode: 'cover' }}
            />
            <View className="absolute w-full h-full bg-black/40 justify-center items-center">
              <Text className="font-display text-3xl text-white uppercase tracking-wider">Mode Homme</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          onPress={() => handleSelect('Mixte')}
          className="mt-10 items-center flex-row justify-center bg-[#f5f5f5] py-4 rounded-full"
        >
          <Text className="font-label text-xs uppercase text-black mr-2 tracking-[1px]">Explorer tout le catalogue</Text>
          <Feather name="arrow-right" size={14} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
