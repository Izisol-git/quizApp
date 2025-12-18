import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Quiz } from '@/types/types'; 


interface QuizCardProps {
  quiz: Quiz;
  onPress: (route:string) => void;
}

export default function QuizCard({ quiz, onPress }: QuizCardProps) {

  return (
    <TouchableOpacity
      onPress={() => onPress(quiz.id.toString())}
      activeOpacity={0.6}
      className="bg-white  rounded-2xl p-4 shadow-md mb-4 flex-row justify-between border-2 border-gray-200 "
    >
        <View className="w-3/4"> 
            <View className="flex-row items-center mb-2">
                <Ionicons name="book-outline" size={24} color="#6C63FF" />
                <Text
                    className="ml-2 text-lg font-semibold  "
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {quiz?.title}
                </Text>
            </View> 
            <Text
                className="text-gray-600   mb-4"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {quiz?.description}
            </Text> 
            <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={20} color="#6C63FF" />
                <Text className="ml-1 text-gray-700  ">
                    {quiz?.questions_count} savol
                </Text>
            </View>
        </View>
        <Image source={require('@/assets/images/matem.png')} />
    </TouchableOpacity>
  );
}
