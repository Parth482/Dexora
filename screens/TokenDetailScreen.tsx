import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import FooterNote from './FooterNote';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type TokenDetailRouteProp = RouteProp<RootStackParamList, 'TokenDetail'>;

const TokenDetailScreen = () => {
  const route = useRoute<TokenDetailRouteProp>();
  const { pairAddress } = route.params;

  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenDetail = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${pairAddress}`);
        const data = await res.json();
        setTokenData(data);
      } catch (err) {
        console.error('Failed to fetch token details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetail();
  }, [pairAddress]);

  if (loading || !tokenData) {
    return <ActivityIndicator style={{ marginTop: 60 }} size="large" color="#32cd32" />;
  }

  const {
    name,
    symbol,
    market_data,
    description,
    links,
  } = tokenData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.tokenTitle}>${symbol.toUpperCase()}</Text>
          <Ionicons name="star-outline" size={22} color="#fff" />
        </View>
        <Text style={styles.tokenName}>{name}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`https://www.coingecko.com/en/coins/${pairAddress}`)}>
          <Text style={styles.copyText}>View on CoinGecko</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricCard}>
        <Text style={styles.label}>Market Cap</Text>
        <Text style={styles.metricValue}>${market_data.market_cap.usd.toLocaleString()}</Text>
      </View>

      <View style={styles.metricCard}>
        <Text style={styles.label}>24h Volume</Text>
        <Text style={styles.metricValue}>${market_data.total_volume.usd.toLocaleString()}</Text>
      </View>

      <View style={styles.metricCard}>
        <Text style={styles.label}>Liquidity</Text>
        <Text style={styles.metricValue}>${market_data.total_volume.usd.toLocaleString()}</Text>
      </View>

      <View style={styles.metricCard}>
        <Text style={styles.label}>Price Change</Text>
        <Text style={styles.metricValue}>
          24h: {market_data.price_change_percentage_24h.toFixed(2)}% | 7d: {market_data.price_change_percentage_7d?.toFixed(2) || 'N/A'}%
        </Text>
      </View>

      {/* CHART FIXED IN CARD */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Price (Sample Data)</Text>
        <View style={{ overflow: 'hidden', borderRadius: 12 }}>
          <LineChart
            data={{
              labels: ['6h', '5h', '4h', '3h', '2h', '1h'],
              datasets: [{
                data: [0.08, 0.09, 0.11, 0.10, 0.112, 0.113]
              }]
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#1c1c1e',
              backgroundGradientFrom: '#1c1c1e',
              backgroundGradientTo: '#2c2c2e',
              decimalPlaces: 4,
              color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`,
              labelColor: () => '#ccc',
              propsForDots: { r: '3', strokeWidth: '2', stroke: '#32cd32' },
            }}
            bezier
          />
        </View>
      </View>

      {description.en ? (
        <View style={styles.metricCard}>
          <Text style={styles.label}>About</Text>
          <Text style={styles.desc}>{description.en.split('. ')[0]}.</Text>
        </View>
      ) : null}

      {links.homepage[0] ? (
        <TouchableOpacity onPress={() => Linking.openURL(links.homepage[0])}>
          <Text style={styles.link}>{links.homepage[0]}</Text>
        </TouchableOpacity>
      ) : null}

      {/* FOOTER CARD */}
      <View style={styles.footerCard}>
        <Text style={styles.label}>Token Details</Text>
        <Text style={styles.footerItem}>Total Supply: 100,000,000</Text>
        <Text style={styles.footerItem}>Circulating Supply: 85,000,000</Text>
        <Text style={styles.footerItem}>Contract: 0x1234...abcd</Text>
      </View>
      <FooterNote />

    </ScrollView>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: isDark ? '#000' : '#fff' },
    headerCard: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 16 },
    tokenTitle: { fontSize: 20, color: '#32cd32', fontWeight: 'bold' },
    tokenName: { fontSize: 24, color: '#fff', fontWeight: '600', marginTop: 4 },
    copyText: { color: '#aaa', fontSize: 12, marginTop: 8, textDecorationLine: 'underline' },
    rowSpaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    metricCard: {
      backgroundColor: isDark ? '#1c1c1e' : '#f5f5f5',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    label: { fontSize: 14, color: isDark ? '#aaa' : '#444', marginBottom: 4 },
    metricValue: { fontSize: 18, fontWeight: '600', color: isDark ? '#fff' : '#000' },
    chartCard: { backgroundColor: '#1c1c1e', padding: 16, borderRadius: 12, marginBottom: 16 },
    chartTitle: { fontSize: 16, color: '#fff', marginBottom: 10 },
    desc: { color: isDark ? '#ddd' : '#333', fontSize: 14, marginTop: 4 },
    link: { color: '#007bff', fontSize: 14, marginTop: 12, textDecorationLine: 'underline' },
    footerCard: {
      backgroundColor: '#1c1c1e',
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    footerItem: { color: '#ccc', fontSize: 13, marginTop: 4 },
  });

export default TokenDetailScreen;
