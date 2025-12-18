import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
              
         
      {children} 
    </Stack>
  );
}
