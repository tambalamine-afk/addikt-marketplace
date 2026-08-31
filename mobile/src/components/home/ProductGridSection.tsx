import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductCard from '../ProductCard';

export default function ProductGridSection({ 
  title, 
  listings, 
  isLoading 
}: { 
  title: string, 
  listings: any[], 
  isLoading: boolean 
}) {
  return (
    <View className="w-full px-4 py-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-primary">{title}</Text>
        <TouchableOpacity className="border border-primary/20 px-3 py-1.5 rounded-full">
          <Text className="text-primary text-xs font-bold">Tout voir</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#e20020" className="my-6" />
      ) : (
        <View className="flex-row flex-wrap justify-between">
          {listings && listings.length > 0 ? (
            listings.map((item, idx) => (
              <View key={item.id || idx} className="w-[48%] mb-4">
                <ProductCard product={item} />
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center w-full my-6">Aucun article pour le moment</Text>
          )}
        </View>
      )}
    </View>
  );
}
