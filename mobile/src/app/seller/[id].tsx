import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';

export default function SellerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [seller, setSeller] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerData() {
      if (!id) return;
      try {
        // Fetch seller profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (profileError) throw profileError;
        setSeller(profileData);

        // Fetch seller listings
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select('*, listing_images(url)')
          .eq('seller_id', id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (listingsError) throw listingsError;
        if (listingsData) setListings(listingsData);

      } catch (err) {
        console.error('Error fetching seller:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSellerData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#e20020" />
      </View>
    );
  }

  if (!seller) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500 text-lg">Vendeur introuvable</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: seller.username || 'Profil', headerShadowVisible: false }} />
      
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center p-6 bg-gray-50 border-b border-gray-100">
          <Image 
            source={{ uri: seller.avatar_url || 'https://via.placeholder.com/150' }} 
            className="w-24 h-24 rounded-full mb-3 border-2 border-white shadow-sm" 
          />
          <Text className="text-2xl font-bold text-black mb-1">{seller.username}</Text>
          <Text className="text-gray-500 mb-4">{seller.bio || 'Aucune biographie.'}</Text>
          
          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-black px-6 py-2.5 rounded-full">
              <Text className="text-white font-bold">Suivre</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-300 bg-white px-6 py-2.5 rounded-full">
              <Text className="text-black font-bold">Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Listings Grid */}
        <View className="p-4">
          <Text className="text-lg font-bold text-black mb-4">
            Dressing ({listings.length})
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {listings.length > 0 ? (
              listings.map((item, idx) => (
                <View key={item.id || idx} className="w-[48%] mb-4">
                  <ProductCard product={item} />
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center w-full my-6">Ce vendeur n'a aucun article en vente.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
