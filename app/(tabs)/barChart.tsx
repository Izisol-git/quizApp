import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import api from "@/api";
import { Attempt } from "@/types/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

export default function StatisticsScreen() {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchStatistics();
    }, []);
    const fetchStatistics = async (): Promise<void> => {
        try {
            const res = await api.get<{ attempts: Attempt[] }>(
                "/statistic-answers"
            );
            setAttempts(res.data.attempts);
        } catch (error) {
            console.log("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalAttempts = attempts.length;
    const totalCorrect = attempts.reduce(
        (sum, item) => sum + item.score,
        0
    );
    const totalQuestions = attempts.reduce(
        (sum, item) => sum + item.total_questions,
        0
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    return (
        <LinearGradient colors={['#181051', '#413c90']}  className="flex-1   px-4 pt-6">
            <SafeAreaView className="flex-1   relative">
                <View className="flex-row items-center mb-6">
                    <Ionicons
                        name="stats-chart"
                        size={28}
                        color="#4f46e5"
                    />
                    <Text className="text-2xl font-bold ml-2 text-white">
                        Statistika
                    </Text>
                </View>
                <View className="flex-row justify-between mb-6">
                    <SummaryCard
                        icon="clipboard-text-outline"
                        label="Urinishlar"
                        value={totalAttempts}
                        color="#4f46e5"
                    />
                    <SummaryCard
                        icon="check-circle-outline"
                        label="To‘g‘ri"
                        value={totalCorrect}
                        color="#16a34a"
                    />
                    <SummaryCard
                        icon="help-circle-outline"
                        label="Savollar"
                        value={totalQuestions}
                        color="#ea580c"
                    />
                </View>
                <FlatList
                    data={attempts}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                            <View className="flex-row items-center mb-2">
                                <MaterialCommunityIcons
                                    name="book-open-page-variant"
                                    size={22}
                                    color="#4f46e5"
                                />
                                <Text className="font-bold text-lg ml-2">
                                    {item.quiz.title}
                                </Text>
                            </View>
                            <View className="flex-row items-center mb-1">
                                <Ionicons
                                    name="person-outline"
                                    size={18}
                                    color="#6b7280"
                                />
                                <Text className="text-gray-600 ml-2">
                                    {item.full_name}
                                </Text>
                            </View>
                            <View className="flex-row items-center mb-1">
                                <Ionicons
                                    name="bar-chart-outline"
                                    size={18}
                                    color="#16a34a"
                                />
                                <Text className="ml-2">
                                    Natija:{" "}
                                    <Text className="font-semibold">
                                        {item.score} /{" "}
                                        {item.total_questions}
                                    </Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <Ionicons
                                    name="time-outline"
                                    size={16}
                                    color="#9ca3af"
                                />
                                <Text className="text-gray-500 text-sm ml-2">
                                    {new Date(
                                        item.created_at
                                    ).toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

function SummaryCard({
                         icon,
                         label,
                         value,
                         color,
                     }: {
    icon: string;
    label: string;
    value: number;
    color: string;
}) {
    return (
        <View className="bg-white flex-1 mx-1 rounded-2xl p-4 items-center shadow-sm border border-gray-100">
            <MaterialCommunityIcons
                name={icon as any}
                size={26}
                color={color}
            />
            <Text className="text-xl font-bold mt-2">
                {value}
            </Text>
            <Text className="text-gray-500 text-sm">
                {label}
            </Text>
        </View>
    );
}
