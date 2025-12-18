import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityIndicator, Dimensions, Image,  RefreshControl,  ScrollView,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuizCard from '@/components/quizCard';
import { useCallback, useEffect, useState } from 'react';
import { Quiz } from '@/types/types';
import API from '@/api';
import { useRouter } from 'expo-router';
import {LinearGradient} from "expo-linear-gradient";
const { width, height } = Dimensions.get('window');


export default function HomeScreen() {
  const [allQuiz , setAllQuiz] = useState<Quiz[]>([])
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const fetchQuiz = async ()=>{
      setRefreshing(true)
    try{
      const res = await API.get('/all-quizzes')
      // console.log(res?.data.quizzes)
      setAllQuiz(res?.data.quizzes)
      setRefreshing(false)
    }catch(error){
      console.log(error)
    }finally{
      setRefreshing(false)
    }
  }
  useEffect(()=>{
    fetchQuiz()
  } , [])
  return (
      <LinearGradient
          colors={['#181051', '#413c90']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
      >
          <SafeAreaView
            style={styles.container}
          >
               <ScrollView
                   showsVerticalScrollIndicator={false}
                   style={{paddingBottom:300}}
                   refreshControl={
                    <RefreshControl
                     refreshing={refreshing} 
                     onRefresh={fetchQuiz}
                    />
                   }
               >
                   <ThemedView style={styles.profileContainer}>
                      <View>
                           <View style={styles.sun}>
                               <Ionicons name="sunny" size={24} color="#FFB3C0" />
                               <ThemedText style={styles.profileIcon}>
                                   GOOD MORNING
                               </ThemedText>
                           </View>
                           <ThemedText style={styles.profileName}>
                              Quiz Master
                           </ThemedText>
                       </View>
                       <Image
                           source={require('@/assets/images/logo.png')}
                           style={{ height: 68 , width: 55 }}
                      />
                   </ThemedView>
                   <View style={styles.imgBox}>
                       <Image
                           source={require('@/assets/images/BgImg.png')}
                           style={styles.bgImg}
                       />
                       <Image
                           source={require('@/assets/images/profile.png')}
                           style={styles.Imgprofile}
                       />
                       <Image
                           source={require('@/assets/images/profile-girl.png')}
                           style={styles.ImgprofileGirl}
                       />
                       <View style={styles.imgBoxTitle} >
                           <Text style={styles.imgBoxText}>Do‘stlaringizni taklif qiling va bonus ballar oling!</Text>
                           <TouchableOpacity
                               style={styles.btn}
                           >
                               <Image source={require('@/assets/images/findFriendsIcon.png')} />
                               <Text style={styles.imgBtnText}>
                                   Taklif qilish
                               </Text>
                           </TouchableOpacity>
                       </View>
                   </View>
                   {/* {
                    refreshing ? 
                          ""
                    : */}
                    <View style={styles.quizs}>

                       <Text style={styles.quizsTitle}>
                           Live Quizzes
                       </Text>
                       {allQuiz?.length === 0 ? (
                          <View className="flex-1 justify-center items-center bg-[#181051]">
                            <Text>Ma'lumot topilmadi</Text>
                          </View>
                        ) : (
                          allQuiz?.map(item => (
                            <QuizCard key={item.id} quiz={item} onPress={() => router.push(`/quiz/${item.id}`)} />
                          ))
                        )}

                       {/* <QuizCard /> */}
                   </View>
                   {/* } */}
               </ScrollView>

           </SafeAreaView>
       </LinearGradient>


  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      height:height,
    width:width,
    bottom: 0,
    left: 0,
    position: 'absolute',
      backgroundColor: 'transparent'
    // backgroundColor:'#181051'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color:'red'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  profileContainer:{
    marginTop:10,
    paddingHorizontal:20,
    backgroundColor:'transparent',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  profileName:{
    color:'white',
    fontSize:22
  },
  profileIcon:{
    color:'#FFB3C0'
  },
  sun:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom:6
  },
  imgBox:{
    position:'relative',
    marginTop:40,
  },
  bgImg:{
    width: 377,
    height: 232 ,
    borderRadius:20,
    marginLeft:'auto',
    marginRight:'auto',
  },
  ImgprofileGirl:{
    position:'absolute',
    bottom:20,
    right:20,
  },
  Imgprofile:{
    position:'absolute',
    top:20,
    left:20,
  },
  imgBoxText:{
    textAlign:'center',
    fontSize:24,
    color:'white',
    fontWeight:600,
    lineHeight:26,
  },
  imgBoxTitle:{
    width:'65%',
    marginLeft:'auto',
    marginRight:'auto',
    position:'absolute',
    top:'50%',
    left:'50%',
    transform: [
    { translateX: '-50%' },
    { translateY: '-50%' }
  ],
  },
  btn:{
    minWidth:200,
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor:'#fff',
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:25,
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginTop:15,
  },
  imgBtnText:{
    textAlign:'center',
    fontSize:24,
    color:'#C15151',
    fontWeight:600,
    lineHeight:26,
  },
  quizs:{
    minHeight:height/2,
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    backgroundColor:'white',
    marginTop:40,
    padding:20,
    paddingBottom:100
  },
  quizsTitle:{
    color:'#C15151',
    fontSize:22,
    fontWeight:700,
    marginBottom:10,
  },
  scrollBox:{
    paddingBottom:100
  }
});
