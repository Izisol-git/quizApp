import { Tabs } from 'expo-router';
import React from 'react';  
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 
import { HapticTab } from '@/components/haptic-tab';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet } from 'react-native';
import { Background } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';




export default function TabLayout() {
  const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
          tabBarStyle: [
              {
                  position: 'absolute',
                  height: 80  ,
                  borderRadius: 20,
                  marginHorizontal: 20,
                  marginBottom: Platform.OS === 'android' ? insets.bottom + 10 : 30,
                  paddingBottom: insets.bottom,
                  paddingTop: 20,
                  borderWidth: 2,
                  shadowColor: '#000',
                  shadowOpacity: 0.40,
                  shadowRadius: 60,
                  shadowOffset: { width: 0, height: 5 },
                  elevation: 6,
                  backgroundColor: Colors['light'].background, // optional
              }
          ],
        tabBarItemStyle:[
           style.tabBarItem,
        ]
      }}>
      <Tabs.Screen
        name="index"
        options={{ 
          title:'' ,
          tabBarIcon: ({ color }) =>     <Ionicons style={{margin:0, padding:0}}  name="home"  size={28} color={color} /> ,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      /> 
      <Tabs.Screen
        name="barChart"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="chart-simple" color={color} />,
        }}
      />
      {/* <Tabs.Screen*/}
      {/*  name="profile"*/}
      {/*  options={{*/}
      {/*    title: '',*/}
      {/*    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,*/}
      {/*  }}*/}
      {/*/>*/}
    </Tabs>
  );
}



const style = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    paddingBottom: 0,
    borderTopWidth: 0,
    paddingTop:20, 
    padding:0,
    minHeight:80,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },

    // Android shadow
    elevation: 6,
  },
  tabBarItem:{
    margin:0,
    padding:0,
  }
})