import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css'
import * as NavigationBar from 'expo-navigation-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(
             '#ffffff'
        );

        NavigationBar.setButtonStyleAsync(
            'light'
        );
    }, [colorScheme]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="quiz" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>

            <StatusBar
                style={'light'}
                // backgroundColor={'#ffffff'}
            />
        </ThemeProvider>
    );
}
