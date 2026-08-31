import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState('Women');

  const categories = [
    "Women's Homepage",
    "Bags",
    "Clothing",
    "Shoes",
    "Jewelry",
    "Watches",
    "Accessories"
  ];

  return (
    <SafeAreaViewContext style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center justify-between z-50">
        <TouchableOpacity>
          <Feather name="bell" size={24} color="#1b1b1b" />
        </TouchableOpacity>
        
        <View className="flex-1 mx-4 flex-row items-center bg-[#f3f3f3] rounded-full px-3 py-2">
          <Feather name="search" size={18} color="#848484" />
          <TextInput 
            placeholder="Search for items, members..."
            placeholderTextColor="#848484"
            className="flex-1 ml-2 font-body text-black text-sm"
          />
        </View>

        <TouchableOpacity>
          <Feather name="shopping-bag" size={24} color="#1b1b1b" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 border-b border-[#e0e0e0]">
        {['Women', 'Men', 'Children'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            className={`mr-6 py-3 ${activeTab === tab ? 'border-b-2 border-black' : ''}`}
          >
            <Text className={`font-label text-base ${activeTab === tab ? 'text-black' : 'text-[#848484]'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Categories List */}
        <View className="px-4 pt-2 pb-4">
          {categories.map((item, index) => (
            <TouchableOpacity 
              key={item}
              className="flex-row justify-between items-center py-4 border-b border-[#f3f3f3]"
            >
              <Text className="font-body text-base text-black">{item}</Text>
              <Feather name="chevron-right" size={20} color="#848484" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Sections */}
        <View className="px-4 py-2 space-y-4">
          
          {/* New Arrivals */}
          <TouchableOpacity className="flex-row bg-[#f9f9f9] rounded-sm overflow-hidden mb-4">
            <View className="flex-1 p-5 justify-center">
              <Text className="font-display text-xl text-black mb-1">New Arrivals for You</Text>
              <Text className="font-body text-sm text-[#848484]">A daily drop, personalized for you</Text>
            </View>
            <View className="w-32 bg-[#222222] items-center justify-center min-h-[120px]">
              <Text className="font-display text-white text-2xl uppercase tracking-widest">NEW</Text>
            </View>
          </TouchableOpacity>

          {/* Designers */}
          <TouchableOpacity className="flex-row bg-[#f9f9f9] rounded-sm overflow-hidden mb-4">
            <View className="flex-1 p-5 justify-center">
              <Text className="font-display text-xl text-black mb-1">Designers</Text>
              <Text className="font-body text-sm text-[#848484]">A-Z of brands and official partners</Text>
            </View>
            <View className="w-32 min-h-[120px]">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop' }} 
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
            </View>
          </TouchableOpacity>

          {/* We Love */}
          <TouchableOpacity className="flex-row bg-[#f9f9f9] rounded-sm overflow-hidden mb-4">
            <View className="flex-1 p-5 justify-center">
              <Text className="font-display text-xl text-black mb-1">We Love</Text>
              <Text className="font-body text-sm text-[#848484]">The style team's top picks</Text>
            </View>
            <View className="w-32 min-h-[120px]">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500&auto=format&fit=crop' }} 
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
            </View>
          </TouchableOpacity>

          {/* Sale */}
          <TouchableOpacity className="flex-row bg-[#f9f9f9] rounded-sm overflow-hidden mb-8">
            <View className="flex-1 p-5 justify-center">
              <Text className="font-display text-xl text-black mb-1">Sale</Text>
              <Text className="font-body text-sm text-[#848484]">Up to 70% off</Text>
            </View>
            <View className="w-32 bg-[#8d9078] items-center justify-center min-h-[120px]">
              <Text className="font-display text-white text-2xl uppercase tracking-widest shadow-sm">SALE</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaViewContext>
  );
}
