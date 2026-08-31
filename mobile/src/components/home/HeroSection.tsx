import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function HeroSection({ toggleState, setToggleState }: { toggleState: 'acheter' | 'vendre', setToggleState: (val: 'acheter' | 'vendre') => void }) {
  const isAcheter = toggleState === 'acheter';

  return (
    <View className={`w-full py-10 px-4 items-center justify-center ${isAcheter ? 'bg-[#ff4313]' : 'bg-[#00a6fb]'}`}>
      
      {/* Toggle Button */}
      <View className="flex-row bg-white/20 rounded-full p-1 w-48 mb-6 relative">
        <View 
          className="absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm"
          style={{ left: isAcheter ? 4 : '50%' }}
        />
        <TouchableOpacity 
          className="flex-1 py-1.5 z-10 items-center justify-center"
          onPress={() => setToggleState('acheter')}
        >
          <Text className={`font-bold text-sm ${isAcheter ? 'text-primary' : 'text-white'}`}>Acheter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 py-1.5 z-10 items-center justify-center"
          onPress={() => setToggleState('vendre')}
        >
          <Text className={`font-bold text-sm ${!isAcheter ? 'text-primary' : 'text-white'}`}>Vendre</Text>
        </TouchableOpacity>
      </View>

      {/* Headline */}
      <Text className="text-4xl text-white font-bold text-center mb-2 leading-tight">
        {isAcheter ? 'Trouve tes\npépites.' : 'Vends tes\npépites.'}
      </Text>
      
      <Text className="text-white/90 text-center mb-6 text-base">
        Ensemble, rendons la mode circulaire.
      </Text>

      {/* Action Button */}
      <TouchableOpacity className="bg-primary px-8 py-3.5 rounded-full mb-8">
        <Text className="text-white font-bold text-base">{isAcheter ? 'Découvrir' : 'Sell now'}</Text>
      </TouchableOpacity>

      {/* Stats Cards */}
      <View className="flex-row justify-between w-full mb-8 gap-2">
        {isAcheter ? (
          <>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">1M+</Text>
              <Text className="text-gray-500 text-[10px] text-center">Articles en vente</Text>
            </View>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">10K+</Text>
              <Text className="text-gray-500 text-[10px] text-center">Nouveautés / jour</Text>
            </View>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">Sécurité</Text>
              <Text className="text-gray-500 text-[10px] text-center">Protection Addikt</Text>
            </View>
          </>
        ) : (
          <>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">Sécurité</Text>
              <Text className="text-gray-500 text-[10px] text-center">Protection Addikt</Text>
            </View>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">Publie vite</Text>
              <Text className="text-gray-500 text-[10px] text-center">Annonces auto</Text>
            </View>
            <View className="bg-white/90 rounded-xl p-3 items-center flex-1">
              <Text className="font-bold text-primary text-sm mb-1">Expédie facile</Text>
              <Text className="text-gray-500 text-[10px] text-center">Sans imprimante</Text>
            </View>
          </>
        )}
      </View>

      {/* Image Collage (Simplified for mobile) */}
      <View className="h-64 w-full items-center justify-center mt-4">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600' }}
          className="w-40 h-56 rounded-2xl absolute z-10"
          style={{ transform: [{ rotate: '0deg' }, { scale: 1.05 }] }}
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600' }}
          className="w-36 h-52 rounded-2xl absolute -left-4 z-0 opacity-80"
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600' }}
          className="w-36 h-52 rounded-2xl absolute -right-4 z-0 opacity-80"
          style={{ transform: [{ rotate: '15deg' }] }}
        />
      </View>
    </View>
  );
}
