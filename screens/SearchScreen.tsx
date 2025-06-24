import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainLayout from './MainLayout';
import { useTheme } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { dummyTokens } from '../dummyTokens';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const [query, setQuery] = useState('');
  const [topTokens, setTopTokens] = useState<any[]>([]);
  const [visibleDummy, setVisibleDummy] = useState(dummyTokens.slice(0, 10));
  const [favs, setFavs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const popularTokens = ['ETH', 'BTC', 'SOL', 'DOGE'];

  // Fetch top 75
  useEffect(() => {
    (async () => {
      const top = await fetchTopTokens();
      setTopTokens(top);
      setLoading(false);
    })();
  }, []);

  // Gradual dummy load
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    [10, 20].forEach((min, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleDummy(dummyTokens.slice(0, (index + 2) * 10));
        }, min * 60 * 1000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggleFav = (symbol: string) => {
    setFavs((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const combinedTokens = [...topTokens, ...visibleDummy];

  const filtered =
    query.trim().length === 0
      ? combinedTokens.filter((token) => popularTokens.includes(token.symbol))
      : combinedTokens.filter(
          (token) =>
            token.symbol.toLowerCase() === query.toLowerCase() ||
            token.name.toLowerCase().includes(query.toLowerCase())
        );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TokenDetail', { pairAddress: item.id })}
      style={styles.tokenRow}
    >
      <View style={styles.tokenInfo}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.sub}>MC: {item.mc}</Text>
        <Text style={[styles.sub, { color: item.change24h >= 0 ? '#0f0' : '#f55' }]}>
          {item.change24h >= 0 ? '+' : ''}
          {item.change24h}%
        </Text>
      </View>
      <Ionicons
        name={favs.includes(item.symbol) ? 'star' : 'star-outline'}
        size={24}
        color={favs.includes(item.symbol) ? '#facc15' : isDark ? '#aaa' : '#666'}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <MainLayout currentScreen="Search">
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00cc99" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout currentScreen="Search">
      <View style={styles.container}>
        <TextInput
          placeholder="Search by name or contract address"
          placeholderTextColor={isDark ? '#888' : '#999'}
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
        />

        {filtered.length > 0 ? (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.symbol + item.name}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.noResult}>
            <Ionicons name="search-outline" size={64} color={isDark ? '#555' : '#ccc'} />
            <Text style={styles.noText}>No token found</Text>
          </View>
        )}
      </View>
    </MainLayout>
  );
};

const fetchTopTokens = async () => {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=75&page=1&sparkline=false'
    );
    const data = await res.json();
    return data.map((item: any) => ({
      id: item.id, // Required for TokenDetail screen
      symbol: item.symbol.toUpperCase(),
      name: item.name,
      price: item.current_price,
      mc: item.market_cap.toLocaleString(),
      change24h: item.price_change_percentage_24h?.toFixed(2),
      isDummy: false,
    }));
  } catch (err) {
    console.error('Fetch top tokens failed:', err);
    return [];
  }
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#000' : '#fff',
    },
    searchBar: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: isDark ? '#1a1a1a' : '#eee',
      color: isDark ? '#fff' : '#000',
      marginBottom: 16,
    },
    tokenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
    },
    tokenInfo: {
      flex: 1,
    },
    symbol: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
    },
    name: {
      fontSize: 12,
      color: isDark ? '#aaa' : '#444',
    },
    priceBlock: {
      alignItems: 'flex-end',
      marginRight: 10,
    },
    price: {
      fontWeight: '600',
      fontSize: 14,
      color: isDark ? '#fff' : '#000',
    },
    sub: {
      fontSize: 11,
      color: isDark ? '#999' : '#555',
    },
    noResult: {
      flex: 1,
      alignItems: 'center',
      marginTop: 80,
    },
    noText: {
      marginTop: 10,
      fontSize: 16,
      color: isDark ? '#666' : '#888',
    },
  });

export default Search;
