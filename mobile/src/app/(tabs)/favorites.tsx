import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 48) / 2; // 2 columns with padding

const MOCK_FAVORITES = [
  {
    id: '1',
    title: 'Veste Jean Levis',
    price: '15 000 F',
    brand: 'Levis',
    size: 'L',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Robe Wax Imprimée',
    price: '18 500 F',
    brand: 'Fait main',
    size: 'M',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZusfGJlKeN62rRqotnk6wJrBc8BMt2iFzlJoV1p_NgKgFgQe2ObQxrBgH8KhPdHcTCxtzH-Mtm-D9iMXq3WjrfJLAw2GW4LQPfZ-ypqixIPO3wZVvSS1V_LIonDslAvLMC6iwiX8A4HSRqwURa72WDMkR58q1MOfHOY09oXgiOq8hth1bKid9hK8c7353hm3mpMB5ddGOUjaBibk9PX5h_q95NdlCr2VT7Ga-CTOxhWbzO9Bj79Bo',
  },
  {
    id: '3',
    title: 'Sneakers Air Max 95',
    price: '35 000 F',
    brand: 'Nike',
    size: '43',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Pull en Laine Épaisse',
    price: '12 000 F',
    brand: 'Vintage',
    size: 'XL',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Sac Banane',
    price: '8 000 F',
    brand: 'Nike',
    size: 'Unique',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Veste Cuir Véritable',
    price: '45 000 F',
    brand: 'Mango',
    size: 'M',
    image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop',
  }
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Articles');

  return (
    <SafeAreaViewContext style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header */}
      <View className="bg-white flex-row justify-between items-center px-4 py-4 z-50">
        <View className="w-8" /> {/* Spacer for centering */}
        <Text className="font-display text-xl text-black">Mes Favoris</Text>
        <TouchableOpacity className="w-8 items-end">
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-[#eeeeee]">
        {['Articles', 'Recherches', 'Vendeurs'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab ? 'border-black' : 'border-transparent'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-display text-[13px] uppercase tracking-wide ${activeTab === tab ? 'text-black' : 'text-[#848484]'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        
        {activeTab === 'Articles' ? (
          <View className="px-4 py-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-display text-lg font-bold text-black">{MOCK_FAVORITES.length} articles sauvegardés</Text>
              <TouchableOpacity className="flex-row items-center gap-1 border border-[#e2e2e2] px-3 py-1.5 rounded-full">
                <Text className="font-label text-xs text-black">Récents</Text>
                <Feather name="chevron-down" size={14} color="black" />
              </TouchableOpacity>
            </View>

            {/* Grid */}
            <View className="flex-row flex-wrap justify-between">
              {MOCK_FAVORITES.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  className="mb-6"
                  style={{ width: GRID_ITEM_WIDTH }}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <View className="aspect-[4/5] bg-[#eeeeee] rounded-xl overflow-hidden mb-2 relative border border-[#e2e2e2]">
                    <Image 
                      source={{ uri: item.image }} 
                      className="w-full h-full"
                      style={{ resizeMode: 'cover' }}
                    />
                    
                    {/* Favorite Button (Filled Heart) */}
                    <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                      <MaterialIcons name="favorite" size={18} color="#FF4313" />
                    </TouchableOpacity>

                    {/* Brand / Size Overlay at bottom */}
                    <View className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <View className="flex-row justify-between items-end">
                        <Text className="font-label text-white text-[10px] uppercase font-bold" numberOfLines={1}>{item.brand}</Text>
                        <View className="bg-white/20 px-1.5 py-0.5 rounded-sm">
                          <Text className="font-label text-white text-[10px]">{item.size}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  <View>
                    <Text className="font-display text-sm font-bold text-black">{item.price}</Text>
                    <Text className="font-body text-xs text-[#5d5f5f] truncate mt-0.5" numberOfLines={1}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-32 px-6">
            <Feather name="inbox" size={48} color="#cccccc" />
            <Text className="font-display text-lg text-black mt-4 mb-2 text-center">Rien à afficher</Text>
            <Text className="font-body text-sm text-[#848484] text-center leading-relaxed">
              Tu n'as pas encore ajouté de {activeTab.toLowerCase()} en favoris.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaViewContext>
  );
}
