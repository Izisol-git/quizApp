import api from '@/api';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, Pressable, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import {LinearGradient} from "expo-linear-gradient";

export default function QuizDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(true);
  const [fullName, setFullName] = useState("");
  const [attempt_id, setAttempt_id] = useState<number | null>(null);
  const [question_Id, setQuestion_Id] = useState<number>(0);
  const [question, setQuestion] = useState<any>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [resalt, setResalt] = useState<number | null>(null);
  const [count, setCount] = useState<number>(1);
  const insets = useSafeAreaInsets();
  const handleSelect = (optionId: number) => {
    setSelected(optionId);
  };


  const SendName = async () => {
    if (!fullName.trim() || fullName.trim().length < 3) return;
    setLoading(true);
    try {
      const startRes = await api.post(`/quiz/${id}/start`, { full_name: fullName });
      setAttempt_id(startRes.data.attempt_id);
      const questionIdRes = await api.get(`/get-question-id/${id}`);
      const questionId = questionIdRes.data.question_id;
      setQuestion_Id(questionIdRes.data.question_id)
      const questionRes = await api.get(`/quiz/${id}/${questionId}`);
      setQuestion(questionRes.data.question);
      setTotal(questionRes.data.total_questions);
      setLoading(false);
      // console.log(questionRes);
      setStarted(false);
    } catch (err) {
      console.log('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const GetNextQuestion =async ()=>{
    if(question_Id){
        const nextQuestion_Id = question_Id+1
        try {
          const res = await api.get(`/quiz/${id}/${nextQuestion_Id}`);
          // console.log(res)
          setQuestion_Id((prev)=> prev + 1)
          setQuestion(res.data.question);
        } catch (err) {
          console.log('API Error:', err);
        } finally {
          
        }
    }
    
  }

  const checkInfo =async (option_id:number)=>{
    if(attempt_id && option_id &&  question_Id){
        const obj = {
          attempt_id: attempt_id,
          question_id: question_Id,
          selected_option_id: option_id
        }
        try {
          const res = await api.post(`/attempts/answer` , obj );
          // console.log(res)
          setResalt(res.data.correct_option_id)
        } catch (err) {
          console.log('API Error:', err);
        } finally {
        }
    }
  }

  // if (loading) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-[#181051]">
  //       <ActivityIndicator size="large" color="#fff" />
  //     </View>
  //   );
  // }


  if (started) {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        className="bg-[#181051]"
      >
        <LinearGradient colors={['#181051', '#413c90']} className="flex-1">
            <SafeAreaView>
                <TouchableOpacity onPress={() => router.back()} className="flex-row gap-2 px-6 pt-6">
                    <Ionicons name="chevron-back" size={24} color="white" />
                    <Text className="text-xl text-gray-400">Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <View className="flex-1 justify-center px-4">
                <Text className="text-3xl font-bold text-center mb-4 text-white">
                    Quizga xush kelibsiz
                </Text>
                <Text className="text-base text-gray-300 text-center mb-6 ">
                    Davom etish uchun ism va familiyangizni kiriting
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Ism Familiya"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-2xl px-4 py-3 text-base mb-4 text-white"
                />
                <Pressable
                    disabled={!fullName.trim() || fullName.trim().length < 3}
                    onPress={SendName}
                    className={`rounded-2xl py-3 items-center ${
                        fullName.trim().length >= 3 ? "bg-indigo-500" : "bg-gray-600"
                    }`}
                >
                    <Text className="text-white text-base font-semibold">
                        Davom etish
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }

  if (!question) {
    return (
      <>
        <SafeAreaView>
          <TouchableOpacity onPress={() => router.back()} className="flex-row gap-2 px-6 pt-6">
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text className="text-xl text-gray-400">Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View className="flex-1 justify-center items-center bg-[#181051]">
          <Text className="text-lg text-gray-300">Savol topilmadi</Text>
        </View>
      </>
    );
  }

  return (
    <LinearGradient colors={['#181051', '#413c90']} className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <SafeAreaView className="p-6">
            <View className="flex-row justify-between items-center">
              <TouchableOpacity onPress={() => router.back()} className="flex-row gap-2">
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text className="text-xl text-gray-400">Back</Text>
              </TouchableOpacity>
              <Text className="text-gray-400">{count} / {total}</Text>
            </View>
            <View className="w-full h-4 bg-gray-400 rounded-lg mt-6">
              <View
                style={{
                  width: `${total ? (count / total) * 100 : 0}%`,
                }}
                className={`h-4 bg-green-400 rounded-lg w-0`}>

              </View>
            </View>
            <Text className="text-white font-bold text-xl mt-8">
              Savol
            </Text>
            <Text className="text-white text-center font-bold text-xl my-4">
              {question.question_text}
            </Text>
            <View className="space-y-3 mb-6">
              {question.options?.map((option: any) => {
                const isSelected = selected === option.id;
                const bgColor =
                  selected !== null
                    ? option.id == resalt
                      ? "bg-green-400/60 border-2 border-green-600"
                      : (isSelected && resalt)
                      ? "bg-red-600"
                      : "bg-[#9087E5]"
                    : "bg-[#9087E5]";

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => {
                      checkInfo(option.id)
                      handleSelect(option.id)
                    }}
                    disabled={resalt ? true : false}
                    className={`p-6 mb-4  rounded-2xl flex-row justify-between  ${bgColor}`}
                  >
                    <Text className="text-white">{option.option_text}</Text>
                    {
                      option.id === resalt ?
                       <Ionicons
                        name={"checkbox" }
                        size={24}
                        color="white"
                        />
                      : !isSelected ?
                      <Ionicons
                        name={"square-outline" }
                        size={24}
                        color="white"
                        />: isSelected ?
                        <AntDesign name="close-circle" size={24} color="white" />
                        : ''
                    }
                  </Pressable>
                );
              })}
            </View>
          </SafeAreaView>
        </ScrollView>
        <View style={{
            position:'absolute',
            bottom:insets.bottom ,
            left:0,
            right:0,
            padding:24
        }}  >
          <Pressable
            disabled={selected === null}
            onPress={() => {
              if (selected === null) return
              GetNextQuestion()
              setResalt(null)
              setSelected(null)
              setCount(prev => {
                if (total && prev < total) {
                  return prev + 1
                }
                return prev
              })
              if(count === total && attempt_id !== null){
                router.push({
                  pathname: '/quiz/resaltPage/[attempt_id]',
                  params: { attempt_id },
                });
              }
            }}
            className={`py-4 rounded-2xl items-center ${
              selected === null
                ? 'bg-[#9087E5]/40'
                : 'bg-[#9087E5]'
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              {count === total ? 'Finish' : 'Next Question 👍'}
            </Text>
          </Pressable>
        </View>
  </LinearGradient>

  );
}
