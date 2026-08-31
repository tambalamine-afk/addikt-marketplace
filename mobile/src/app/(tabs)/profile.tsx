import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const GRID_ITEM_SIZE = width / 3;

const ACTIVE_LISTINGS = [
  { id: '1', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400&auto=format&fit=crop' },
  { id: '2', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop' },
  { id: '3', image: 'https://images.unsplash.com/photo-1622445270947-32dc23bd576e?q=80&w=400&auto=format&fit=crop' },
  { id: '4', image: 'https://images.unsplash.com/photo-1551028719-01c1eb5a8fce?q=80&w=400&auto=format&fit=crop' },
  { id: '5', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop' },
  { id: '6', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop' },
  { id: '7', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop' },
  { id: '8', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop' },
  { id: '9', image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=400&auto=format&fit=crop' },
  { id: '10', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400&auto=format&fit=crop' },
  { id: '11', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop' },
  { id: '12', image: 'https://images.unsplash.com/photo-1489987707023-afc82760773b?q=80&w=400&auto=format&fit=crop' },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Shop');

  return (
    <SafeAreaViewContext style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header */}
      <View className="bg-white flex-row justify-between items-center px-4 py-3 z-50">
        <View className="w-8" /> {/* Spacer */}
        <View className="flex-row items-center gap-1">
          <Text className="font-display text-lg text-black lowercase">sneakerhead_sn</Text>
          <MaterialIcons name="verified" size={16} color="#3b82f6" />
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.push('/(tabs)/publish')}>
            <Feather name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-[#eeeeee]">
        {['Boutique', 'Vendus', 'Achats', 'Favoris'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            className={`flex-1 py-3 items-center border-b-2 ${activeTab === tab ? 'border-black' : 'border-transparent'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-display text-sm ${activeTab === tab ? 'text-black' : 'text-[#848484]'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        <View className="pb-24">
          
          {/* Profile Stats */}
          <View className="flex-row items-center justify-between px-6 py-6 border-b border-[#eeeeee]">
            <View className="relative">
              <View className="w-20 h-20 rounded-full overflow-hidden border border-[#e2e2e2]">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }} 
                  className="w-full h-full"
                />
              </View>
              <View className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]">
                <MaterialIcons name="verified" size={20} color="#3b82f6" />
              </View>
            </View>

            <View className="items-center">
              <Text className="font-display text-lg font-bold text-black">79</Text>
              <Text className="font-label text-xs text-[#5d5f5f]">Abonnés</Text>
            </View>

            <View className="items-center">
              <Text className="font-display text-lg font-bold text-black">41</Text>
              <Text className="font-label text-xs text-[#5d5f5f]">Abonnements</Text>
            </View>

            <View className="items-center">
              <View className="flex-row items-center gap-1">
                <Text className="font-display text-lg font-bold text-black">5</Text>
                <MaterialIcons name="star" size={16} color="black" />
              </View>
              <Text className="font-label text-xs text-[#5d5f5f]">2 avis</Text>
            </View>
          </View>

          {/* Shop Stats Button */}
          <View className="px-4 py-4">
            <TouchableOpacity className="flex-row items-center justify-between bg-white border border-[#e2e2e2] rounded-xl px-4 py-4 shadow-sm">
              <View className="flex-row items-center gap-3">
                <Feather name="bar-chart-2" size={20} color="black" />
                <Text className="font-label text-sm text-black">Statistiques de la boutique</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#848484" />
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View className="px-4 pb-6">
            <View className="bg-[#F8F1EB] rounded-xl overflow-hidden flex-row" style={{ height: 140 }}>
              <View className="p-4 flex-1 justify-center">
                <Text className="font-display text-lg mb-2">Tu as d'autres pépites ?</Text>
                <Text className="font-body text-xs text-[#5d5f5f] mb-4">
                  Plus tu mets d'articles en ligne, plus tu as de chances de vendre rapidement.
                </Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/publish')}>
                  <Text className="font-display text-sm font-bold text-black">Lister un article</Text>
                </TouchableOpacity>
              </View>
              <View className="w-1/3 h-full relative">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop' }} 
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
                <TouchableOpacity className="absolute top-2 right-2 bg-white/50 p-1 rounded-full">
                  <Feather name="x" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Active Listings Header */}
          <View className="px-4 py-2 flex-row justify-between items-center border-b border-[#eeeeee]">
            <Text className="font-display text-lg font-bold">
              En ligne <Text className="font-body font-normal text-[#5d5f5f]">(12 annonces)</Text>
            </Text>
            <TouchableOpacity className="border border-[#e2e2e2] p-1.5 rounded-lg bg-white shadow-sm">
              <Feather name="sliders" size={18} color="black" />
            </TouchableOpacity>
          </View>

          {/* Grid */}
          <View className="flex-row flex-wrap bg-[#f9f9f9]">
            {ACTIVE_LISTINGS.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                className="border-r border-b border-[#eeeeee] relative"
                style={{ width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE }}
              >
                <Image 
                  source={{ uri: item.image }} 
                  className="w-full h-full"
                  style={{ resizeMode: 'cover' }}
                />
                {index === 0 && (
                  <View className="absolute inset-0 bg-black/50 items-center justify-center p-2">
                    <Text className="font-display text-white text-center text-xs mb-2 leading-tight">
                      Remets tes achats en vente
                    </Text>
                    <View className="bg-white rounded-full px-4 py-1.5 shadow-sm">
                      <Text className="font-display text-black text-xs font-bold">Revendre</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

    </SafeAreaViewContext>
  );
}
