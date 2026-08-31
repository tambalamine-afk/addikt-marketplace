import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

// Optional: you can use expo-symbols or Ionicons
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { HomeIcon, SearchIcon, PublishIcon, FavIcon, ProfilIcon } from '../../components/Icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4313',
        tabBarInactiveTintColor: '#848484',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => <HomeIcon size={24} color={color as string} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, focused }) => <SearchIcon size={24} color={color as string} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: 'Publier',
          tabBarIcon: ({ color, focused }) => <PublishIcon size={28} color={color as string} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, focused }) => <FavIcon size={24} color={color as string} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => <ProfilIcon size={24} color={color as string} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
