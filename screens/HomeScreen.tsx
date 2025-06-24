import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MainLayout from './MainLayout';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NewTokens from './NewTokens';
import FooterNote from './FooterNote';


interface SimpleToken {
  name: string;
  priceUsd: number;
  liquidityUsd: number;
  priceChange24h: number;
  marketCap: number;
  pairAddress: string;
}

const formatNumber = (val: number) => {
  if (val >= 1_000_000_000_000) return `$${(val / 1_000_000_000_000).toFixed(2)}T`;
  if (val >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(2)}B`;
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
  return `$${val.toFixed(2)}`;
};

const HomeScreen = () => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState<'top75' | 'new' | 'fav'>('top75');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tokens, setTokens] = useState<SimpleToken[]>([]);
  const [loading, setLoading] = useState(true);

  const [volume, setVolume] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [mcap, setMcap] = useState(0);
  const [txns, setTxns] = useState(125000); // fake txns (CoinGecko doesn't return txns)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=75&page=1&sparkline=false`
        );
        const data = await res.json();

        const mapped: SimpleToken[] = data.map((coin: any) => ({
          name: coin.name,
          priceUsd: coin.current_price,
          liquidityUsd: coin.total_volume,
          priceChange24h: coin.price_change_percentage_24h,
          marketCap: coin.market_cap || 0,
          pairAddress: coin.id,
        }));

        setTokens(mapped);

        // Calculate summary stats
        const totalVolume = mapped.reduce((sum: number, c: SimpleToken) => sum + (c.liquidityUsd || 0), 0);
        const totalLiquidity = totalVolume; // fallback same as volume for now
        const totalMcap = mapped.reduce((sum: number, c: SimpleToken) => sum + (c.marketCap || 0), 0);

        setVolume(totalVolume);
        setLiquidity(totalLiquidity);
        setMcap(totalMcap);
      } catch (err) {
        console.error('Failed to fetch tokens:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const filteredData =
    activeTab === 'fav'
      ? tokens.filter((t) => favorites.includes(t.pairAddress))
      : tokens;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

 const renderRow = ({ item }: { item: SimpleToken }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('TokenDetail', { pairAddress: item.pairAddress })
    }
  >
    <View style={styles.tokenRow}>
      <View style={styles.tokenNameCol}>
        <View style={styles.tokenNameWithStar}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(item.pairAddress)}
          >
            <Ionicons
              name={favorites.includes(item.pairAddress) ? 'star' : 'star-outline'}
              size={16}
              color={
                favorites.includes(item.pairAddress)
                  ? '#FFD700'
                  : isDark
                  ? '#aaa'
                  : '#555'
              }
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tokenPriceCol}>
        <Text style={styles.tokenValue}>${item.priceUsd.toFixed(4)}</Text>
      </View>
      <View style={styles.tokenMCCol}>
        <Text style={styles.tokenValue}>{formatNumber(item.liquidityUsd)}</Text>
      </View>
      <View style={styles.tokenChangeCol}>
        <Text
          style={[
            styles.tokenValue,
            { color: item.priceChange24h >= 0 ? '#00c851' : '#ff4444' },
          ]}
        >
          {item.priceChange24h.toFixed(2)}%
        </Text>
        
      </View>
      
    </View>
  </TouchableOpacity>
);


  const formatCompactNumber = (val: number) => {
  if (val >= 1_000_000_000_000) return (val / 1_000_000_000_000).toFixed(2) + 'T';
  if (val >= 1_000_000_000) return (val / 1_000_000_000).toFixed(2) + 'B';
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(2) + 'M';
  if (val >= 1_000) return (val / 1_000).toFixed(2) + 'K';
  return val.toString();
};


  return (
    <MainLayout currentScreen="Home">
      <View style={styles.headerWrapper}>
        <Text style={styles.logoText}>Dexora</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>24h Volume</Text>
          <Text style={styles.statValue}>{formatNumber(volume)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>24h Txns</Text>
          <Text style={styles.statValue}>{formatCompactNumber(txns)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text style={styles.statValue}>{formatNumber(mcap)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Liquidity</Text>
          <Text style={styles.statValue}>{formatNumber(liquidity)}</Text>
        </View>
      </View>

      <View style={styles.tabWrapperBox}>
        <View style={styles.tabBarCenteredFull}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'top75' && styles.activeTab]}
            onPress={() => setActiveTab('top75')}
          >
            <MaterialCommunityIcons name="fire" size={16} color="white" />
            <Text style={styles.tabText}> Top 75</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'new' && styles.activeTab]}
            onPress={() => setActiveTab('new')}
          >
            <MaterialCommunityIcons name="flash" size={16} color="white" />
            <Text style={styles.tabText}> New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'fav' && styles.activeTab]}
            onPress={() => setActiveTab('fav')}
          >
            <Ionicons name="star" size={16} color="white" />
            <Text style={styles.tabText}> Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>

     {(activeTab === 'top75' || activeTab === 'fav') && (
  <View style={styles.tokenHeaderRow}>
    <Text style={styles.headerText}>Token</Text>
    <Text style={styles.headerText}>Price</Text>
    <Text style={styles.headerText}>Liquidity</Text>
    <Text style={styles.headerText}>24h%</Text>
  </View>
)}


      <ScrollView style={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="#32cd32" style={{ marginTop: 60 }} />
  ) : activeTab === 'fav' && filteredData.length === 0 ? (
    <View style={{ alignItems: 'center', marginTop: 60 }}>
      <Ionicons name="star-outline" size={60} color={isDark ? '#555' : '#aaa'} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          marginTop: 12,
          color: isDark ? '#fff' : '#000',
        }}
      >
        No favorite tokens yet
      </Text>
      <Text
        style={{
          fontSize: 13,
          marginTop: 6,
          color: isDark ? '#aaa' : '#444',
          textAlign: 'center',
          paddingHorizontal: 40,
        }}
      >
        Click the star icon on a token to add it to your favorites.
      </Text>
      
    </View>
  ) : activeTab === 'new' ? (
    <NewTokens />
  ) : (
    <FlatList
      data={filteredData}
      renderItem={renderRow}
      keyExtractor={(item) => item.pairAddress}
      scrollEnabled={false}
    />
  )}
</ScrollView>
<FooterNote />

    </MainLayout>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 12 },
    headerWrapper: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
    logoText: { fontSize: 22, fontWeight: 'bold', color: '#32cd32' },
    tabWrapperBox: { alignItems: 'center', marginVertical: 10 },
    tabBarCenteredFull: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#111' : '#eaeaea',
      padding: 6,
      borderRadius: 30,
      width: '94%',
      justifyContent: 'space-around',
    },
    tabBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    activeTab: { backgroundColor: '#007bff' },
    tabText: { color: '#fff', fontSize: 14 },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12,
      paddingHorizontal: 6,
    },
    statCard: {
      width: '48%',
      backgroundColor: isDark ? '#1c1c1e' : '#f5f5f5',
      padding: 14,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statLabel: { fontSize: 13, color: isDark ? '#aaa' : '#444' },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
      marginTop: 6,
    },
    tokenHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: isDark ? '#333' : '#ccc',
      paddingHorizontal: 6,
    },
    headerText: {
      fontSize: 13,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
      width: '22%',
      textAlign: 'center',
    },
    tokenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: isDark ? '#333' : '#eee',
      paddingHorizontal: 6,
    },
    tokenNameCol: { width: '22%' },
    tokenNameWithStar: { flexDirection: 'row', alignItems: 'center' },
    tokenPriceCol: { width: '22%', alignItems: 'center' },
    tokenMCCol: { width: '22%', alignItems: 'center' },
    tokenChangeCol: { width: '22%', alignItems: 'center' },
    tokenValue: { fontSize: 13, color: isDark ? '#eee' : '#000' },
    tokenName: {
      fontSize: 13,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
    },
  });

export default HomeScreen;
