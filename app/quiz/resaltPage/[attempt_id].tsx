import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '@/api';
import React, { useEffect, useState } from 'react';
import { QuizResult } from '@/types/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function ResultPage() {
    const { attempt_id } = useLocalSearchParams<{ attempt_id: string }>();
    const router = useRouter();
    const [result, setResult] = useState<QuizResult>();
    const [loading, setLoading] = useState(true);
    const insets = useSafeAreaInsets();


    useEffect(() => {
        api
            .post('/quiz/finish', { attempt_id })
            .then(res => setResult(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#181051]">
                <ActivityIndicator size="large" color="#fff" />
                <Text className="mt-3 text-gray-300">Natija yuklanmoqda...</Text>
            </View>
        );
    }

    const percentage = result?.percentage ?? 0;
    const status =
        percentage >= 80 ? 'Ajoyib 🔥' : percentage >= 50 ? 'Yaxshi 🙂' : 'Yana urinib ko‘r 💪';

    return (
        <LinearGradient colors={['#181051', '#413c90']} className="flex-1">
            <SafeAreaView className="flex-1 px-6  relative">
                {/* HEADER */}
                <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="flex-row gap-2x pt-6">
                    <Ionicons name="chevron-back" size={26} color="white" />
                    <Text className="text-xl text-gray-400">Back</Text>
                </TouchableOpacity>

                {/* HERO */}
                <View className="items-center mt-10">
                    <View className="w-44 h-44 rounded-full bg-white/10 items-center justify-center border border-white/20">
                        <Text className="text-5xl font-extrabold text-white">
                            {percentage}%
                        </Text>
                        <Text className="text-gray-300 mt-1">Natija</Text>
                    </View>

                    <Text className="text-white text-xl font-bold mt-6">
                        {status}
                    </Text>
                    <Text className="text-gray-300 mt-1">
                        {result?.full_name}
                    </Text>
                </View>

                {/* STATS CARD */}
                <View className="bg-white rounded-3xl p-6 mt-10 shadow-xl">
                    <View className="flex-row justify-between mb-4">
                        <Stat label="To‘g‘ri" value={result?.correct} color="text-green-600" />
                        <Stat label="Noto‘g‘ri" value={result?.wrong} color="text-red-500" />
                        <Stat label="Jami" value={result?.total} />
                    </View>

                    {/* PROGRESS */}
                    <View className="h-3 bg-gray-200 rounded-full overflow-hidden mt-4">
                        <View
                            style={{ width: `${percentage}%` }}
                            className="h-full bg-indigo-600 rounded-full"
                        />
                    </View>
                </View>

                {/* ACTIONS */}
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: insets.bottom,
                    }}
                    className="p-6 bg-transparent"
                >
                    {/*<Pressable*/}
                    {/*    onPress={() => router.push(`/quiz/${item.id}`)}*/}
                    {/*    className="bg-white py-4 rounded-2xl items-center mb-3 flex-row justify-center gap-3  "*/}
                    {/*>*/}

                    {/*    <Entypo name="retweet" size={20} color="#4338ca" />*/}
                    {/*    <Text className="text-indigo-700 font-semibold text-lg">*/}
                    {/*        Qayta urinib ko‘rish*/}
                    {/*    </Text>*/}
                    {/*</Pressable>*/}

                    <Pressable
                        onPress={() => router.replace('/(tabs)')}
                        className="bg-indigo-500 py-4 rounded-2xl items-center justify-center flex-row gap-3"
                    >
                        <FontAwesome name="home" size={20} color="white" />
                        <Text className="text-white font-semibold text-lg">
                            Bosh sahifa
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

function Stat({
                  label,
                  value,
                  color = 'text-gray-800',
              }: {
    label: string;
    value?: number;
    color?: string;
}) {
    return (
        <View className="items-center flex-1">
            <Text className={`text-2xl font-bold ${color}`}>{value}</Text>
            <Text className="text-gray-500 text-sm mt-1">{label}</Text>
        </View>
    );
}
 