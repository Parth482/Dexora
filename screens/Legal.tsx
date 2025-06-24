import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import type { RootStackParamList } from '../types';
import { Feather } from '@expo/vector-icons';

type LegalRouteProp = RouteProp<RootStackParamList, 'Legal'>;

type Props = {
  route: LegalRouteProp;
};

const legalContent = {
  disclaimer: {
    title: 'Disclaimer',
    body: `This application is intended for informational and educational purposes only. We do not provide financial advice. Users are solely responsible for their investment decisions. Always conduct your own research before making any financial commitment. The app developers are not liable for any losses or damages resulting from the use of this application.`
  },
  terms: {
    title: 'Terms & Conditions',
    body: `By using this application, you agree not to misuse, manipulate, or reverse-engineer any part of the platform. You are expected to use the application lawfully and respectfully. We reserve the right to update, suspend, or terminate any features or services without prior notice. Continued usage of the app constitutes your agreement to the latest terms.`
  },
  privacy: {
    title: 'Privacy Policy',
    body: `We respect your privacy. This application does not collect, store, or transmit any personal or sensitive user data. Your activity remains on your device. We do not use any tracking, analytics, or third-party data tools. Your privacy is our priority.`
  }
};

const LegalPage = ({ route }: Props) => {
  const { type } = route.params;
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const navigation = useNavigation();

  const content = legalContent[type];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{content.title}</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Text style={styles.bodyText}>{content.body}</Text>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderColor: isDark ? '#333' : '#ccc',
      backgroundColor: isDark ? '#000' : '#fff',
    },
    backBtn: {
      paddingRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    contentWrapper: {
      padding: 16,
    },
    bodyText: {
      fontSize: 16,
      color: isDark ? '#eee' : '#111',
      lineHeight: 24,
    },
  });

export default LegalPage;
