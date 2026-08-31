import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const categories = [
  'Homme', 'Femme', 'Enfant', 'Chaussures', 'Accessoires', 'Beauté'
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaViewContext style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity className="mr-3">
          <Feather name="message-circle" size={24} color="#1b1b1b" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center bg-[#f3f3f3] rounded-full px-3 py-2">
          <Feather name="search" size={18} color="#616363" />
          <TextInput 
            placeholder="Chercher un article, une marque..."
            placeholderTextColor="#848484"
            className="flex-1 ml-2 font-body text-black text-[14px] p-0"
          />
        </View>
        
        <TouchableOpacity className="ml-3">
          <Feather name="shopping-bag" size={24} color="#1b1b1b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-white pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Categories Capsules */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {categories.map((category, index) => (
              <TouchableOpacity key={index} className="border border-[#d1d1d1] bg-[#f5f5f5] rounded-full px-6 py-3 mr-3 mb-1">
                <Text className="font-display text-[12px] uppercase tracking-[1.5px] text-[#1b1b1b]">{category}</Text>
              </TouchableOpacity>
            ))}
            <View className="w-4" />
          </ScrollView>
        </View>

        {/* Commercial Banners */}
        <View className="mb-10">
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {/* Banner 1 */}
            <View style={{ width: width - 32, height: 200, marginHorizontal: 16 }} className="bg-black rounded-xl overflow-hidden relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1550614000-4b95d46626cb?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-60"
                style={{ resizeMode: 'cover' }}
              />
              <View className="p-6 justify-center h-full">
                <Text className="font-display text-2xl text-white mb-2 uppercase">NOUVELLE{'\n'}COLLECTION</Text>
                <TouchableOpacity className="bg-white px-4 py-2 self-start rounded-full">
                  <Text className="font-label-caps text-black text-xs uppercase">Découvrir</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Banner 2 */}
            <View style={{ width: width - 32, height: 200, marginHorizontal: 16 }} className="bg-black rounded-xl overflow-hidden relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-60"
                style={{ resizeMode: 'cover' }}
              />
              <View className="p-6 justify-center h-full">
                <Text className="font-display text-2xl text-white mb-2 uppercase">SNEAKERS{'\n'}PREMIUM</Text>
                <TouchableOpacity className="bg-white px-4 py-2 self-start rounded-full">
                  <Text className="font-label-caps text-black text-xs uppercase">Voir la sélection</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Banner 3 */}
            <View style={{ width: width - 32, height: 200, marginHorizontal: 16 }} className="bg-black rounded-xl overflow-hidden relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-60"
                style={{ resizeMode: 'cover' }}
              />
              <View className="p-6 justify-center h-full">
                <Text className="font-display text-2xl text-white mb-2 uppercase">VINTAGE{'\n'}ARCHIVES</Text>
                <TouchableOpacity className="bg-white px-4 py-2 self-start rounded-full">
                  <Text className="font-label-caps text-black text-xs uppercase">Acheter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Drops de la semaine */}
        <View className="mb-12">
          <View className="px-4 mb-4 flex-row justify-between items-end">
            <Text className="font-display text-3xl uppercase tracking-tighter text-black">
              Drops{'\n'}<Text className="text-[#FF4313]">Semaine</Text>
            </Text>
            <TouchableOpacity>
              <Text className="font-label text-sm underline decoration-black">Voir Tout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 pb-2">
            {/* Drop Card 1 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-[#FF4313] self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-white font-label-caps text-xs uppercase">Exclusif</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Dakar Street x Off</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Sneakers Limitées - Dispo Jeudi</Text>
              </View>
            </View>

            {/* Drop Card 2 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1523398002811-999aa8d9511e?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-white self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-black font-label-caps text-xs uppercase">Nouveau</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Orange Vibes Collection</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Apparel & Accessoires</Text>
              </View>
            </View>

            {/* Drop Card 3 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1608228079968-c7681eaef81a?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-[#FF4313] self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-white font-label-caps text-xs uppercase">Hot</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Urban Utility</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Vêtements techniques</Text>
              </View>
            </View>

            {/* Drop Card 4 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-white self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-black font-label-caps text-xs uppercase">Restock</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Classics Reborn</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Les essentiels de retour</Text>
              </View>
            </View>

            {/* Drop Card 5 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-[#FF4313] self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-white font-label-caps text-xs uppercase">Collab</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Runners Edition</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Performance & Style</Text>
              </View>
            </View>

            {/* Drop Card 6 */}
            <View className="w-[280px] h-[350px] bg-black rounded-lg overflow-hidden mr-4 relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop' }} 
                className="absolute w-full h-full opacity-80"
                style={{ resizeMode: 'cover' }}
              />
              <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
                <View className="bg-white self-start px-2 py-1 mb-2 rounded-sm">
                  <Text className="text-black font-label-caps text-xs uppercase">Bientôt</Text>
                </View>
                <Text className="font-display text-xl text-white mb-1 uppercase">Retro Vibes</Text>
                <Text className="font-body text-sm text-[#e2e2e2]">Capsule Vintage 90s</Text>
              </View>
            </View>
            <View className="w-4" />
          </ScrollView>
        </View>

        {/* Top Boutiques */}
        <View className="mb-12 bg-[#f9f9f9] py-8 relative">
          <Text className="font-display text-2xl px-4 mb-6 uppercase text-center text-black">Top Boutiques</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
            
            <View className="items-center mr-6">
              <View className="w-[70px] h-[70px] rounded-full border-2 border-black p-1">
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} className="w-full h-full rounded-full" />
              </View>
              <Text className="font-label-caps text-xs text-black uppercase text-center mt-2">Sneaker{'\n'}Boyz</Text>
            </View>
            
            <View className="items-center mr-6">
              <View className="w-[70px] h-[70px] rounded-full p-1">
                <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} className="w-full h-full rounded-full" />
              </View>
              <Text className="font-label-caps text-xs text-[#5e5e5e] uppercase text-center mt-2">Dakar{'\n'}Thrift</Text>
            </View>

            <View className="items-center mr-6">
              <View className="w-[70px] h-[70px] rounded-full p-1">
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/46.jpg' }} className="w-full h-full rounded-full" />
              </View>
              <Text className="font-label-caps text-xs text-[#5e5e5e] uppercase text-center mt-2">Raw{'\n'}Denim</Text>
            </View>

            <View className="items-center mr-6">
              <View className="w-[70px] h-[70px] rounded-full p-1">
                <Image source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }} className="w-full h-full rounded-full" />
              </View>
              <Text className="font-label-caps text-xs text-[#5e5e5e] uppercase text-center mt-2">Ice{'\n'}Block</Text>
            </View>

            <View className="items-center mr-8">
              <View className="w-[70px] h-[70px] rounded-full bg-[#eeeeee] flex items-center justify-center">
                <Feather name="arrow-right" size={24} color="#5e5e5e" />
              </View>
              <Text className="font-label-caps text-xs text-[#5e5e5e] uppercase text-center mt-2">Plus</Text>
            </View>
          </ScrollView>
        </View>

        {/* Suggéré pour toi */}
        <View className="px-4 pb-24">
          <Text className="font-display text-3xl uppercase mb-6 text-black">
            Suggéré{'\n'}<Text className="text-black/20">Pour Toi</Text>
          </Text>
          
          <View className="flex-row justify-between mb-4">
            {/* Product Card 1 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Y-3 Runner 4D</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Taille 42 - 44</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">125K</Text>
              </View>
            </View>
            
            {/* Product Card 2 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Chaos Hoodie</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Taille L - XL</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">45K</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            {/* Product Card 3 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1525171254930-643fc658b64e?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Tech Vest 01</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Unique</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">60K</Text>
              </View>
            </View>
            
            {/* Product Card 4 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Baggy Cargos</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Taille 32 - 34</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">35K</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            {/* Product Card 5 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Nylon Jacket</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Taille M</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">80K</Text>
              </View>
            </View>
            
            {/* Product Card 6 */}
            <View className="w-[48%]">
              <View className="aspect-square bg-[#eeeeee] rounded-md overflow-hidden mb-3 relative">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop' }} className="w-full h-full" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                  <Feather name="heart" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="font-label text-sm uppercase mb-1 text-black">Cotton Tee</Text>
                  <Text className="font-body text-xs text-[#5e5e5e]">Taille L</Text>
                </View>
                <Text className="font-display text-md font-bold text-black">20K</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="border border-[#d1d1d1] bg-[#f5f5f5] rounded-full py-3 mt-4 items-center">
            <Text className="font-display text-[12px] uppercase tracking-[1.5px] text-[#1b1b1b]">Voir Plus</Text>
          </TouchableOpacity>
        </View>

        {/* Chaussures */}
        <View className="mb-12">
          <View className="px-4 mb-4 flex-row justify-between items-end">
            <Text className="font-display text-3xl uppercase tracking-tighter text-black">
              Chaussures
            </Text>
            <TouchableOpacity>
              <Text className="font-label text-sm underline decoration-black">Voir Tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 pb-2">
            {[
              { id: 1, name: 'Nike Air Max', price: '85K', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
              { id: 2, name: 'Yeezy Boost 350', price: '120K', img: 'https://images.unsplash.com/photo-1608228079968-c7681eaef81a?q=80&w=1000&auto=format&fit=crop' },
              { id: 3, name: 'Jordan 1 Retro', price: '150K', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop' },
              { id: 4, name: 'New Balance 550', price: '75K', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop' },
              { id: 5, name: 'Asics Gel-Kayano', price: '65K', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop' },
              { id: 6, name: 'Vans Old Skool', price: '35K', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop' },
              { id: 7, name: 'Puma RS-X', price: '55K', img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop' },
              { id: 8, name: 'Converse Chuck 70', price: '45K', img: 'https://images.unsplash.com/photo-1618354691498-842416b0a232?q=80&w=1000&auto=format&fit=crop' },
              { id: 9, name: 'Reebok Club C 85', price: '50K', img: 'https://images.unsplash.com/photo-1584514916296-654dbdbf6d3f?q=80&w=1000&auto=format&fit=crop' },
              { id: 10, name: 'Nike Dunk Low', price: '110K', img: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop' }
            ].map((item) => (
              <View key={item.id} className="w-[160px] mr-4">
                <View className="w-full aspect-square bg-[#f5f5f5] rounded-md overflow-hidden mb-3 relative">
                  <Image 
                    source={{ uri: item.img }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                  <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center shadow-sm">
                    <Feather name="heart" size={16} color="black" />
                  </TouchableOpacity>
                </View>
                <Text className="font-label text-sm uppercase mb-1 text-black truncate">{item.name}</Text>
                <Text className="font-body text-xs text-[#5e5e5e] mb-1">Taille 40-45</Text>
                <Text className="font-display text-md font-bold text-black">{item.price}</Text>
              </View>
            ))}
            <View className="w-4" />
          </ScrollView>
        </View>

        {/* Accessoires */}
        <View className="mb-12">
          <View className="px-4 mb-4 flex-row justify-between items-end">
            <Text className="font-display text-3xl uppercase tracking-tighter text-black">
              Accessoires
            </Text>
            <TouchableOpacity>
              <Text className="font-label text-sm underline decoration-black">Voir Tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 pb-2">
            {[
              { id: 1, name: 'Casquette Dakar', price: '15K', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop' },
              { id: 2, name: 'Sac Banane Tech', price: '25K', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop' },
              { id: 3, name: 'Lunettes Retro', price: '30K', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop' },
              { id: 4, name: 'Chaussettes Sport', price: '5K', img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=1000&auto=format&fit=crop' },
              { id: 5, name: 'Montre Vintage', price: '45K', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop' },
              { id: 6, name: 'Collier Acier', price: '20K', img: 'https://images.unsplash.com/photo-1599643478514-4a4e06d525cc?q=80&w=1000&auto=format&fit=crop' }
            ].map((item) => (
              <View key={item.id} className="w-[160px] mr-4">
                <View className="w-full aspect-square bg-[#f5f5f5] rounded-md overflow-hidden mb-3 relative">
                  <Image 
                    source={{ uri: item.img }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                  <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center shadow-sm">
                    <Feather name="heart" size={16} color="black" />
                  </TouchableOpacity>
                </View>
                <Text className="font-label text-sm uppercase mb-1 text-black truncate">{item.name}</Text>
                <Text className="font-body text-xs text-[#5e5e5e] mb-1">Unique</Text>
                <Text className="font-display text-md font-bold text-black">{item.price}</Text>
              </View>
            ))}
            <View className="w-4" />
          </ScrollView>
        </View>

        {/* Preference Update Banner */}
        <View className="mb-12">
          <TouchableOpacity 
            onPress={() => router.push('/onboarding')}
            className="flex-row bg-black overflow-hidden h-[120px]"
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop' }} 
              className="w-[35%] h-full"
              style={{ resizeMode: 'cover' }}
            />
            <View className="flex-1 justify-center p-5">
              <Text className="font-display text-white text-xl mb-3">Changer de préférence ?</Text>
              <View className="flex-row items-center">
                <Text className="font-label text-white text-sm mr-2">Mettre à jour</Text>
                <Feather name="arrow-right" size={14} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaViewContext>
  );
}
