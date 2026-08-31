import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  
  // Try to use the first image from listing_images
  const coverImage = product.listing_images && product.listing_images.length > 0 
    ? product.listing_images[0].url 
    : 'https://placehold.co/400x500/eaeaea/a0a0a0?text=Pas+d%27image';

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl overflow-hidden shadow-sm m-1 flex-1 border border-outline-variant/30"
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View className="relative aspect-[3/4] w-full">
        <Image 
          source={{ uri: coverImage }} 
          className="w-full h-full object-cover"
        />
        <TouchableOpacity className="absolute top-2 right-2 p-1.5 bg-white/70 rounded-full">
          <Ionicons name="heart-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <Text className="font-bold text-sm text-black" numberOfLines={1}>{product.title}</Text>
        <Text className="font-bold text-base text-primary mt-1">{product.price.toLocaleString('fr-FR')} FCFA</Text>
        <Text className="text-xs text-gray-500 mt-0.5">{product.brand || 'Sans marque'} • {product.size || 'Taille unique'}</Text>
      </View>
    </TouchableOpacity>
  );
}
