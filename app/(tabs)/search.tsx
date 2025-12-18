import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import {useRouter} from "expo-router";
import QuizCard from "@/components/quizCard";
import api from "@/api";
import {Quiz} from "@/types/types";
import { LinearGradient } from 'expo-linear-gradient';


function Search() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        fetchData('');
    }, []);
    const fetchData = async (searchText:string) => {
        try {
            setLoading(true);
            const res = await api.get(`/quiz/search?q=${searchText}`);
            // console.log(res);
            setData(res.data.quizzes);
            // setData(); 
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const onSearch = (text:string) => {
        setQuery(text);
        fetchData(text);
    };
    return (
        <LinearGradient 
            colors={['#181051', '#413c90']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SafeAreaView className="flex-1 px-4">
                <View className="px-4 pt-4 flex-1">
                    <Text className="text-white text-2xl font-bold mb-3">
                        Search Quiz
                    </Text> 
                    <TextInput
                        value={query}
                        onChangeText={onSearch}
                        placeholder="Quiz qidirish..."
                        placeholderTextColor="#9CA3AF"
                        className="bg-[#22196B] text-white rounded-xl px-4 py-3 mb-4"
                    /> 
                    {loading ? (
                        <ActivityIndicator color="#fff" size="large" />
                    ) : (
                        <FlatList
                            data={data}
                            keyExtractor={(item:Quiz, index) => item.id?.toString() || index.toString()}
                            renderItem={({ item }) => <QuizCard quiz={item} onPress={() => router.push(`/quiz/${item.id}`)} />}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
        
    );
}

export default Search;