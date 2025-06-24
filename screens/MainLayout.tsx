import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

interface Props {
  children: React.ReactNode;
  currentScreen: 'Home' | 'Search' | 'Menu';
}

export default function MainLayout({ children, currentScreen }: Props) {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <View style={{ flex: 1 }}>{children}</View>

      {/* Bottom Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather
            name="bar-chart"
            size={20}
            color={currentScreen === 'Home' ? '#007bff' : '#fff'}
          />
          <Text style={styles.footerText}>Screener</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.navigate('Search')}
        >
          <Feather
            name="search"
            size={20}
            color={currentScreen === 'Search' ? '#007bff' : '#fff'}
          />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.navigate('Menu')}
        >
          <MaterialIcons
            name="menu"
            size={20}
            color={currentScreen === 'Menu' ? '#007bff' : '#fff'}
          />
          <Text style={styles.footerText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#333' : '#ccc',
      backgroundColor: isDark ? '#000' : '#fff',
    },
    footerBtn: {
      alignItems: 'center',
    },
    footerText: {
      fontSize: 10,
      marginTop: 4,
      color: isDark ? '#fff' : '#000',
    },
  });
