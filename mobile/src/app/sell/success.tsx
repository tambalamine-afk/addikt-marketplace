import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SuccessScreen() {
  const [boostEnabled, setBoostEnabled] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      
      {/* Top Banner (blurred item image representation) */}
      <View className="h-48 w-full bg-[#1b1b1b] relative overflow-hidden">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop' }}
          className="w-full h-full opacity-50 blur-md"
          style={{ resizeMode: 'cover' }}
        />
        <View className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF4313] rounded-full blur-3xl opacity-40" />
      </View>

      {/* Main Content Area overlapping the banner */}
      <View className="flex-1 px-4 -mt-12">
        
        {/* Title & Badge */}
        <View className="flex-row items-end justify-between mb-6">
          <Text className="font-display text-3xl uppercase text-black bg-white/90 p-2 rounded-lg">C'est en ligne !</Text>
          <View className="bg-[#FF4313] rounded-full px-3 py-1 flex-row items-center shadow-sm">
            <Feather name="check-circle" size={12} color="white" />
            <Text className="font-label-caps text-white text-[10px] ml-1 uppercase">Publié</Text>
          </View>
        </View>

        {/* Gamification Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 border border-[#e2e2e2] shadow-sm items-center">
          <View className="flex-row items-center border border-[#e2e2e2] rounded-full mb-4 bg-[#f9f9f9]">
            <View className="bg-black rounded-full px-4 py-2">
              <Text className="font-display text-white text-lg">1</Text>
            </View>
            <View className="px-4 py-2">
              <Text className="font-display text-[#848484] text-lg">3</Text>
            </View>
          </View>
          <Text className="font-display text-xl uppercase mb-2">Annonces en ligne</Text>
          <Text className="font-body text-sm text-center text-[#5d5f5f]">
            Tu es sur la bonne voie ! Une boutique bien remplie attire plus d'acheteurs sur Addikt.
          </Text>
        </View>

        {/* Boost Listing */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="font-display text-lg uppercase">Booster l'annonce</Text>
            <Feather name="help-circle" size={16} color="#848484" />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-body text-sm text-[#5d5f5f] flex-1 mr-4">
              Mets ton article en avant dans les recherches pour vendre plus vite. Frais de 12% uniquement si tu vends.
            </Text>
            <Switch
              trackColor={{ false: '#e2e2e2', true: '#FF4313' }}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#e2e2e2"
              onValueChange={setBoostEnabled}
              value={boostEnabled}
            />
          </View>
        </View>

        {/* Enhance (Expandable mockup) */}
        <View className="border-t border-[#e2e2e2] pt-4 mb-6">
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="font-display text-lg uppercase">Améliorer l'annonce</Text>
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Bottom Action Bar */}
      <View className="p-4 bg-white border-t border-[#e2e2e2] flex-row justify-between items-center pb-8 pt-4">
        <TouchableOpacity className="w-[48%] py-4 rounded-full bg-black items-center justify-center">
          <Text className="font-label text-xs text-white uppercase">Copier le lien</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/profile')}
          className="w-[48%] py-4 rounded-full border border-[#e2e2e2] bg-white items-center justify-center"
        >
          <Text className="font-label text-xs text-black uppercase">Terminé</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
