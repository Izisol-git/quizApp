import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

interface QuizStartPageProps {
    id:number,
    onPress: () => void;
}

export default function QuizStartPage({id , onPress}:QuizStartPageProps) {
  const [fullName, setFullName] = useState("");
  // const [started, setStarted] = useState(false);

  // if (started) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-white px-4">
  //       <Text className="text-2xl font-bold mb-2">Quiz boshlandi 🎉</Text>
  //       <Text className="text-base text-gray-600">
  //         Omad, {fullName}!
  //       </Text>
  //       {/* Shu joydan quiz savollari boshlanadi */}
  //     </View>
  //   );
  // }

  return (
    <View className="flex-1 justify-center bg-white px-4">
      <Text className="text-3xl font-bold text-center mb-4">
        Quizga xush kelibsiz
      </Text>

      <Text className="text-base text-gray-600 text-center mb-6">
        Davom etish uchun ism va familiyangizni kiriting
      </Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Ism Familiya"
        className="border border-gray-300 rounded-2xl px-4 py-3 text-base mb-4"
      />

      <Pressable
        disabled={!fullName.trim()}
        onPress={onPress}
        className={`rounded-2xl py-3 items-center ${
          fullName.trim() ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text className="text-white text-base font-semibold">
          Davom etish
        </Text>
      </Pressable>
    </View>
  );
}
