import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Switch,
  ScrollView,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import MainLayout from './MainLayout';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Theme } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

const MenuScreen = () => {
  const { theme, setTheme, isDark } = useTheme();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const themeOptions: Theme[] = ['light', 'dark', 'system'];

  const iconMap = {
    light: <Feather name="sun" size={22} color={theme === 'light' ? '#fff' : isDark ? '#ccc' : '#000'} />,
    dark: <Feather name="moon" size={22} color={theme === 'dark' ? '#fff' : isDark ? '#ccc' : '#000'} />,
    system: <Feather name="smartphone" size={22} color={theme === 'system' ? '#fff' : isDark ? '#ccc' : '#000'} />,
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <MainLayout currentScreen="Menu">
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Menu</Text>

        {/* Theme Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Theme</Text>
          <View style={styles.optionsRow}>
            {themeOptions.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.optionBtn, theme === mode && styles.activeOptionBtn]}
                onPress={() => setTheme(mode)}
              >
                {iconMap[mode]}
                <Text style={[styles.optionText, theme === mode && styles.activeOptionText]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <View style={styles.cardItem}>
            <Text style={styles.itemText}>Auto-refresh</Text>
            <Switch value={true} disabled />
          </View>
        </View>

        {/* Social */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Social</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => openLink('https://x.com/Kris1z0')} style={styles.socialBtn}>
              <FontAwesome name="twitter" size={20} color="#1DA1F2" />
              <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://t.me/Kinggamer02')} style={styles.socialBtn}>
              <FontAwesome name="telegram" size={20} color="#0088cc" />
              <Text style={styles.socialText}>Telegram</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://discord.com/users/kris1z0')} style={styles.socialBtn}>
              <FontAwesome name="commenting" size={20} color="#7289da" />
              <Text style={styles.socialText}>Discord</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => navigation.navigate('Legal', { type: 'disclaimer' })}
          >
            <Text style={styles.legalText}>Disclaimer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => navigation.navigate('Legal', { type: 'terms' })}
          >
            <Text style={styles.legalText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => navigation.navigate('Legal', { type: 'privacy' })}
          >
            <Text style={styles.legalText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#000' : '#fff',
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 24,
      color: isDark ? '#fff' : '#000',
      textAlign: 'center',
    },
    card: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#333' : '#ccc',
      marginBottom: 20,
      padding: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: isDark ? '#fff' : '#000',
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    optionBtn: {
      alignItems: 'center',
      padding: 10,
    },
    activeOptionBtn: {
      backgroundColor: '#007bff',
      borderRadius: 8,
    },
    optionText: {
      marginTop: 6,
      fontSize: 14,
      color: isDark ? '#ccc' : '#444',
    },
    activeOptionText: {
      color: '#fff',
    },
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    itemText: {
      fontSize: 14,
      color: isDark ? '#fff' : '#000',
    },
    socialBtn: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    socialText: {
      marginTop: 4,
      fontSize: 12,
      color: isDark ? '#ccc' : '#000',
    },
    legalText: {
      fontSize: 14,
      color: isDark ? '#1e90ff' : '#007bff',
    },
  });

export default MenuScreen;
