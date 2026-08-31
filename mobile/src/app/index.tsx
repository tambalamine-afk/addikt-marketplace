import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const gender = await AsyncStorage.getItem('@user_gender');
        // TEMP: Force onboarding to show by ignoring the saved gender
        if (false && gender) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      } catch (e) {
        router.replace('/(tabs)');
      } finally {
        setIsReady(true);
      }
    }
    
    checkOnboarding();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  return null;
}
