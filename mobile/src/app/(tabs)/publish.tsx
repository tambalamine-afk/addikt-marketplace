import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const CONDITIONS = [
  { label: 'Neuf avec étiquette', color: '#1b1b1b' },
  { label: 'Très bon état', color: '#0099FF' },
  { label: 'Bon état', color: '#FFD700' },
  { label: 'Usé', color: '#FF4313' },
];

const DEPARTMENTS = ['Femmes', 'Hommes', 'Enfants', 'Sneakers', 'Beauté'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille unique'];

export default function PublishScreen() {
  // Use array of 5 exactly. Null means empty.
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const pickImage = async (indexToFill: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = [...images];
      newImages[indexToFill] = result.assets[0].uri;
      setImages(newImages);
    }
  };

  const handlePublish = () => {
    router.push('/sell/success');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="bg-white flex-row items-center justify-between px-4 py-4 border-b border-[#eeeeee]">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="x" size={24} color="#1b1b1b" />
        </TouchableOpacity>
        <Text className="font-display text-lg uppercase tracking-wide">Vendre un article</Text>
        <View className="w-6" /> {/* Spacer */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
          
          {/* Photos Section */}
          <View className="p-4 mb-6 mt-2">
            <Text className="font-display text-xl uppercase mb-2">Photos</Text>
            <Text className="font-body text-sm text-[#5d5f5f] mb-4">
              Ajoute jusqu'à 5 photos. La première sera ta photo de couverture.
            </Text>
            
            <View className="flex-row justify-between">
              {images.map((uri, index) => {
                const isCover = index === 0;
                return (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => pickImage(index)}
                    className="w-[18%] aspect-square rounded-2xl border border-dashed border-[#cccccc] bg-[#f3f3f3] items-center justify-center relative overflow-hidden"
                  >
                    {uri ? (
                      <Image source={{ uri }} className="w-full h-full" style={{ resizeMode: 'cover' }} />
                    ) : (
                      isCover ? (
                        <Feather name="camera" size={20} color="#1b1b1b" style={{ marginBottom: 12 }} />
                      ) : (
                        <Feather name="plus" size={20} color="#1b1b1b" />
                      )
                    )}
                    
                    {isCover && (
                      <View className="absolute bottom-0 left-0 right-0 bg-[#2b2b2b] py-1.5 items-center rounded-b-xl">
                        <Text className="font-display text-[8px] text-white uppercase font-bold tracking-wider">Couverture</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Form Fields */}
          <View className="px-4 pb-32">
            
            {/* Title */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">Titre de l'annonce</Text>
              <View className="bg-[#f3f3f3] rounded-xl px-4 py-3 h-[52px] justify-center">
                <TextInput
                  className="font-body text-[15px] text-black"
                  placeholder="Ex: Robe wax imprimé, taille M"
                  placeholderTextColor="#848484"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Description (Added for completeness but styled properly) */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">Description</Text>
              <View className="bg-[#f3f3f3] rounded-xl px-4 py-3 h-32">
                <TextInput
                  className="font-body text-[15px] text-black flex-1"
                  placeholder="Décris ton article en détails..."
                  placeholderTextColor="#848484"
                  multiline
                  textAlignVertical="top"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            {/* Department */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">Département</Text>
              <View className="flex-row flex-wrap gap-3">
                {DEPARTMENTS.map((dep) => (
                  <TouchableOpacity 
                    key={dep}
                    onPress={() => setCategory(dep)}
                    className={`px-5 py-2.5 rounded-full border ${category === dep ? 'border-black bg-black' : 'border-[#cccccc] bg-white'}`}
                  >
                    <Text className={`font-label text-sm ${category === dep ? 'text-white' : 'text-black'}`}>{dep}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Size */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">Taille</Text>
              <View className="flex-row flex-wrap gap-3">
                {SIZES.map((s) => (
                  <TouchableOpacity 
                    key={s}
                    onPress={() => setSize(s)}
                    className={`px-5 py-2.5 rounded-full border ${size === s ? 'border-black bg-black' : 'border-[#cccccc] bg-white'}`}
                  >
                    <Text className={`font-label text-sm ${size === s ? 'text-white' : 'text-black'}`}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Condition */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">État</Text>
              <View className="flex-row flex-wrap gap-3">
                {CONDITIONS.map((cond) => (
                  <TouchableOpacity 
                    key={cond.label}
                    onPress={() => setCondition(cond.label)}
                    className={`px-5 py-2.5 rounded-full border flex-row items-center gap-2 ${condition === cond.label ? 'border-black bg-black' : 'border-[#cccccc] bg-white'}`}
                  >
                    <View 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: cond.color, opacity: condition === cond.label ? 0.8 : 1 }} 
                    />
                    <Text className={`font-label text-sm ${condition === cond.label ? 'text-white' : 'text-black'}`}>{cond.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price */}
            <View className="mb-8">
              <Text className="font-display text-lg uppercase mb-3 text-black">Prix de vente</Text>
              <View className="bg-[#f3f3f3] rounded-xl px-4 py-3 h-[52px] flex-row items-center w-48">
                <TextInput
                  className="flex-1 font-body text-[15px] text-black h-full"
                  placeholder="0"
                  placeholderTextColor="#848484"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
                <Text className="font-display text-[15px] text-black font-bold ml-2">F</Text>
              </View>
            </View>
            
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] p-4 flex-row justify-between items-center pb-8 pt-4 shadow-lg shadow-black/10">
        <TouchableOpacity className="w-[48%] py-4 rounded-full border border-black items-center justify-center">
          <Text className="font-display text-xs text-black uppercase font-bold tracking-wide">Brouillon</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handlePublish}
          className="w-[48%] py-4 rounded-full items-center justify-center bg-[#FF4313]"
        >
          <Text className="font-display text-xs text-white uppercase font-bold tracking-wide">Publier</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}
