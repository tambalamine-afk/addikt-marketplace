import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function TopBoutiquesSection({ boutiques }: { boutiques: any[] }) {
  if (!boutiques || boutiques.length === 0) return null;

  return (
    <View className="w-full px-4 py-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-primary">Top Boutik</Text>
        <TouchableOpacity className="border border-primary/20 px-3 py-1.5 rounded-full">
          <Text className="text-primary text-xs font-bold">Tout voir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
        {boutiques.map((seller, idx) => (
          <TouchableOpacity 
            key={idx} 
            className="bg-white border border-outline-variant/50 rounded-2xl p-3 shadow-sm mr-4 w-72"
          >
            {/* 4 Images Grid */}
            <View className="flex-row flex-wrap justify-between mb-3">
              {[0, 1, 2, 3].map(imgIdx => {
                const imgUrl = seller.images?.[imgIdx] || (seller.listings && seller.listings[imgIdx]?.listing_images?.[0]?.url);
                return (
                  <View key={imgIdx} className="w-[48%] aspect-square bg-surface-container rounded-lg mb-2 overflow-hidden">
                    {imgUrl ? (
                      <Image source={{ uri: imgUrl }} className="w-full h-full object-cover" />
                    ) : (
                      <View className="w-full h-full bg-gray-100 items-center justify-center" />
                    )}
                  </View>
                );
              })}
            </View>

            {/* Profile Info */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Image 
                  source={{ uri: seller.avatar_url || 'https://via.placeholder.com/100' }} 
                  className="w-8 h-8 rounded-full border border-gray-200" 
                />
                <View className="ml-2">
                  <Text className="font-bold text-sm text-primary" numberOfLines={1}>{seller.username || seller.handle || 'Boutique'}</Text>
                  <Text className="text-xs text-gray-500">@{seller.username ? seller.username.toLowerCase().replace(/\s+/g, '') : 'boutique'}</Text>
                </View>
              </View>
              <View className="bg-primary px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold">VOIR</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
