import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  // Gallery from web
  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZusfGJlKeN62rRqotnk6wJrBc8BMt2iFzlJoV1p_NgKgFgQe2ObQxrBgH8KhPdHcTCxtzH-Mtm-D9iMXq3WjrfJLAw2GW4LQPfZ-ypqixIPO3wZVvSS1V_LIonDslAvLMC6iwiX8A4HSRqwURa72WDMkR58q1MOfHOY09oXgiOq8hth1bKid9hK8c7353hm3mpMB5ddGOUjaBibk9PX5h_q95NdlCr2VT7Ga-CTOxhWbzO9Bj79Bo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-TcpJa6ue5QDJldjy8eQx-BnePZTsKCFjwJXytB7_WgJUTSUAOUTJ96rlZnKoHZcfYZwHRnaSVRTDOizNKX0B_Ijdab2FneS6-3iEQHJuRaO9YzdTg2bzBcJ7AiFl21BUD3mFjBMUyLF1dN6YbqSQbYYO4LnPf6gbYWeeOlqnLyyztts6tnBcG5eacvrmCCDHO8LAfe__xz1BXhlpTs2bH29YZPFo_7zPiACOW36RlOlfo8sae3z',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCVMFhZMkP2hpnk1v-A_oZUOPN8eCbchax9a_A4yO-GuNrlwMXcNlAfdi1S61_uhk12PTfxIziw2giNaa9fPsMRDdfzvN2_VZAY9Qyc8b6sUq46Z_wrCejpjOnXxHMi9rezCVt1N6Qsn85-yTSPrmkVViEdveSiL_G32JnfgZ-vaHWqQKeh8Wn8wISZWbtD2384k-9vjnGSKc2o_Bicyzpj94bk-BYA6XfDhWr2se9RQhvDptA9T22n',
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="light" />
      
      {/* App Bar Overlay */}
      <View 
        className="absolute top-0 w-full z-50 flex-row justify-between items-center px-4"
        style={{ paddingTop: Math.max(insets.top, 16), paddingBottom: 16 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/30 items-center justify-center backdrop-blur-md"
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="flex-row gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-black/30 items-center justify-center backdrop-blur-md">
            <MaterialIcons name="favorite-border" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-black/30 items-center justify-center backdrop-blur-md">
            <Feather name="share" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
        
        {/* Gallery */}
        <View style={{ width, height: 530, backgroundColor: '#eeeeee', position: 'relative' }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((img, idx) => (
              <Image 
                key={idx}
                source={{ uri: img }}
                style={{ width, height: 530 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Pagination */}
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-center gap-2">
            {images.map((_, idx) => (
              <View 
                key={idx}
                className={`h-1.5 rounded-full ${idx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </View>
        </View>

        {/* Content Box (overlaps image slightly) */}
        <View className="bg-white -mt-6 rounded-t-3xl px-4 pt-6 pb-32">
          
          {/* Header (Title & Price) */}
          <View className="mb-6">
            <Text className="font-display text-2xl uppercase text-black mb-3 leading-snug">
              Robe Wax Imprimée "Dakar Night"
            </Text>
            
            <View className="flex-row items-end gap-3 mb-2">
              <Text className="font-display text-2xl font-bold text-black">18 500 F</Text>
              <Text className="font-display text-lg text-[#848484] line-through mb-0.5">22 000 F</Text>
              <View className="bg-[#FF4D00] px-2 py-1 rounded-sm mb-1 transform -rotate-3">
                <Text className="font-label text-white text-[10px] uppercase font-bold">-15%</Text>
              </View>
            </View>
            
            <Text className="font-body text-sm text-[#5d5f5f]">
              Taille M · Très bon état
            </Text>
          </View>

          {/* Reassurance Block */}
          <View className="bg-[#f3f3f3] p-4 rounded-xl flex-row items-start gap-3 mb-6 border border-[#e2e2e2]">
            <MaterialIcons name="verified-user" size={20} color="#0099FF" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="font-body text-sm text-[#4c4546] font-bold leading-tight mb-1">
                Vérifie toujours l'article en main propre avant de payer.
              </Text>
              <TouchableOpacity>
                <Text className="font-label text-xs text-black underline">En savoir plus</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description & Tags */}
          <View className="mb-6">
            <Text className="font-body text-[15px] text-[#4c4546] leading-relaxed mb-4">
              Magnifique robe longue en véritable wax hollandais. Coupe évasée, manches bouffantes, couleurs vibrantes parfaites pour la saison. Tissu de haute qualité qui tient au lavage.
            </Text>
            
            <View className="flex-row flex-wrap gap-2">
              {['#wax', '#maxi', '#été', '#dakar'].map((tag) => (
                <TouchableOpacity key={tag} className="px-4 py-2 border border-[#cfc4c5] rounded-full bg-white">
                  <Text className="font-label text-xs text-[#4c4546]">{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="h-[1px] bg-[#eeeeee] my-2 mb-6" />

          {/* Seller Profile Block */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-14 h-14 rounded-full overflow-hidden bg-[#eeeeee] border border-[#e2e2e2]">
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7dFp_KkAxEPK_P_ppYj28vXei2rCaxWwn7imZEnN9JrzteCDDx81SKxEH_m6MUfMGNFLk87XN1L1qQL4Wyz74z6guUDem4qsCxaaK1etD4PLWjBUCr5lrP3HrxoaMRmLzZLPefN51sBtk9sHEcmyWcCRrj3ireqMjZL19GXF5QwkSxH11LuPlGq-NIBomoo9qkXUpnGrdH9nyK6PvpgMCKmdVNAOewnx0QLE7ea9MXlhLLYGL3P4I' }}
                    className="w-full h-full"
                  />
                </View>
                <View>
                  <View className="flex-row items-center gap-1">
                    <Text className="font-label text-base text-black font-bold">Ibrahima N.</Text>
                    <MaterialIcons name="verified" size={16} color="#0099FF" />
                  </View>
                  <Text className="font-body text-xs text-[#5d5f5f] mt-0.5">42 vendus · Actif cette semaine</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="font-display text-lg font-bold">4.8</Text>
                <MaterialIcons name="star" size={18} color="#FFD700" />
              </View>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 py-3 border border-black rounded-full items-center">
                <Text className="font-label text-xs uppercase font-bold text-black">Voir la boutique</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-3 border border-black rounded-full items-center">
                <Text className="font-label text-xs uppercase font-bold text-black">Poser une question</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Reviews */}
          <View className="mb-8">
            <Text className="font-display text-lg uppercase font-bold text-black mb-4">Avis récents</Text>
            <View className="flex-col gap-3">
              
              <View className="bg-[#f3f3f3] p-4 rounded-xl border border-[#e2e2e2]">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row gap-0.5">
                    {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star" size={14} color="#FFD700" />)}
                  </View>
                  <Text className="font-label text-[10px] text-[#5d5f5f] uppercase">Awa D.</Text>
                </View>
                <Text className="font-body text-sm text-[#4c4546]">
                  Transaction parfaite, vendeuse très sympa. La robe est sublime !
                </Text>
              </View>

              <View className="bg-[#f3f3f3] p-4 rounded-xl border border-[#e2e2e2]">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row gap-0.5">
                    {[1,2,3,4].map(i => <MaterialIcons key={i} name="star" size={14} color="#FFD700" />)}
                    <MaterialIcons name="star-border" size={14} color="#FFD700" />
                  </View>
                  <Text className="font-label text-[10px] text-[#5d5f5f] uppercase">Moussa F.</Text>
                </View>
                <Text className="font-body text-sm text-[#4c4546]">
                  Conforme à la description, livraison rapide sur Dakar.
                </Text>
              </View>

            </View>
          </View>

          {/* Seller CTA (Publier une annonce similaire) */}
          <TouchableOpacity className="bg-[#f3f3f3] p-6 rounded-xl border border-dashed border-[#848484] items-center mb-8">
            <Text className="font-display text-sm uppercase text-black font-bold mb-2 text-center">
              Toi aussi tu as un article comme celui-ci?
            </Text>
            <Text className="font-label text-sm text-black underline font-bold">
              Publier une annonce similaire
            </Text>
          </TouchableOpacity>

          {/* Similar Items (Tu pourrais aimer) */}
          <View>
            <Text className="font-display text-lg uppercase font-bold text-black mb-4">Tu pourrais aimer</Text>
            <View className="flex-row flex-wrap justify-between">
              
              <TouchableOpacity className="w-[48%] mb-4">
                <View className="aspect-[4/5] bg-[#eeeeee] rounded-xl overflow-hidden mb-2 relative border border-[#e2e2e2]">
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDueR_WohvrEb8hRqAXsMaVfQD0obTD5kbJOHETkjiCY_C7mUQDA-7IU8u5RJocO7_6Da8aaciyTmyS5RZbxxIFsQClkDMRqqmre843n4dTlb-AIfGU5TszVL0QVw3RsiQY3aXTMaHt4dBadkqiliiPJ1_FKMABAavrjKzuUzCe7FSdSgUFzf5dE9Ux23Gz9LFWrSdnmpAiIDts-5xgDMHvirsvnJvemmvJSnJDhQBnwqEYTFXXdWsg' }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                  <View className="absolute top-2 left-2 bg-[#FF6B8B] px-2 py-1 rounded-sm">
                    <Text className="font-label text-white text-[10px] uppercase font-bold">Populaire</Text>
                  </View>
                  <View className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full items-center justify-center">
                    <MaterialIcons name="favorite-border" size={16} color="black" />
                  </View>
                </View>
                <View>
                  <Text className="font-label text-sm uppercase truncate mb-0.5">Jupe Midi Wax</Text>
                  <Text className="font-display text-sm font-bold text-black">14 000 F</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] mb-4">
                <View className="aspect-[4/5] bg-[#eeeeee] rounded-xl overflow-hidden mb-2 relative border border-[#e2e2e2]">
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3rFmzD65eOJP5KqozPGBJ47pRYWm5XH2rjZBc1fMUgL9BIka_ofzsBBEvSBfKbNzWrK5AZn0tJQVBNMrTR_gr9QpQIemVRnYj4cJsbsGGXchN-9Yqf1v8HGB-VkUOq6qEIF-HgjGM1YxkvN9iRYKCoaDRvCy2VaoRpSsFtt0ZI3riJDaMxdvp9ZSbkKNbh29T7a_42jnEc8sD4LGOYG4kYizVWquN1hMzdYooYzTd0FV3OO0dWwWD' }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                  <View className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full items-center justify-center">
                    <MaterialIcons name="favorite-border" size={16} color="black" />
                  </View>
                </View>
                <View>
                  <Text className="font-label text-sm uppercase truncate mb-0.5">Ensemble Ankara</Text>
                  <Text className="font-display text-sm font-bold text-black">28 000 F</Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </ScrollView>

      {/* Fixed Bottom Actions */}
      <View 
        className="absolute bottom-0 left-0 w-full bg-white border-t border-[#eeeeee] px-4 pt-4 flex-row gap-3"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <TouchableOpacity className="flex-1 py-4 bg-black rounded-full items-center justify-center">
          <Text className="text-white font-display font-bold uppercase text-xs tracking-wide">Envoyer un message</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-4 bg-white border border-black rounded-full items-center justify-center">
          <Text className="text-black font-display font-bold uppercase text-xs tracking-wide">Faire une offre</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
