import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Platform, ToastAndroid, Alert } from 'react-native';




const dummyData = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  name: ['ZebraToken', 'LunaSwap', 'PepeX', 'TigerFi', 'RocketETH', 'MoonDAO', 'BabySol', 'AlphaVerse', 'MetaShiba', 'DegenChain'][i % 10],
  symbol: ['ZEB', 'LUNA', 'PEPX', 'TGR', 'RCKT', 'MDAO', 'BSOL', 'ALPH', 'MSHB', 'DGN'][i % 10],
  logo: 'https://i.imgur.com/tVZ9q3a.png',
  caLink: `0xAbCdEf1234567890${i.toString().padStart(4, '0')}`,
  caUrl: `https://dexscreener.com/eth/0xAbCdEf1234567890${i.toString().padStart(4, '0')}`,
  twitter: ['@zebracrypto', '@lunaswap', '@pepextoken', '@tigerfi', '@rocketeth', '@moondao', '@babysolcoin', '@alphaverse', '@metashiba', '@degenchain'][i % 10],
  description: ['Powering DeFi with speed.', 'Cross-chain swaps made simple.', 'Memecoin with a mission.', 'Unleash the tiger in your wallet.', 'Fueling the ETH moon mission.', 'Decentralized autonomous dreams.', 'Tiny token, big impact.', 'The next-gen metaverse gateway.', 'Where meme meets meta.', 'Built for true degens.'][i % 10],
  launched: `${Math.floor(Math.random() * 10) + 1}h ago`,
}));

const NewTokens = () => {
  const [visibleTokens, setVisibleTokens] = useState(dummyData.slice(0, 10));

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    [10, 20].forEach((min, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleTokens((prev) => [
            ...prev,
            ...dummyData.slice((index + 1) * 10, (index + 2) * 10),
          ]);
        }, min * 60 * 1000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

 const copyToClipboard = (text: string) => {
  Clipboard.setStringAsync(text);
  
  if (Platform.OS === 'android') {
    ToastAndroid.show('CA Copied!', ToastAndroid.SHORT);
  } else {
    Alert.alert('Copied', 'Contract address copied to clipboard!');
  }
};



  const shortenCA = (ca: string) => `${ca.slice(0, 6)}...${ca.slice(-4)}`;

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <View style={styles.tokenCol}>
        <Image source={{ uri: item.logo }} style={styles.tokenLogo} />
        <View>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
        </View>
      </View>

      <View style={styles.tradeCol}>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.caUrl)}
          style={styles.tradeBtn}
        >
          <Text style={styles.tradeText}>TRADE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => copyToClipboard(item.caLink)}
          style={styles.copyBtn}
        >
          <Text style={styles.copyText}>{shortenCA(item.caLink)}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.twitter}>{item.twitter}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.launched}>{item.launched}</Text>
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={{ minWidth: 900 }}>
        <View style={styles.header}>
  <Text style={[styles.headerCell, { flex: 1 }]}>Token</Text>
  <Text style={[styles.headerCell, { flex: 1 }]}>Trade/CA</Text>
  <Text style={[styles.headerCell, { flex: 1 }]}>Twitter</Text>
  <Text style={[styles.headerCell, { flex: 2 }]}>Description</Text>
  <Text style={[styles.headerCell, { flex: 1 }]}>Launched</Text>
</View>


        <FlatList
          data={visibleTokens}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
headerCell: {
  color: '#aaa',
  fontWeight: '600',
  fontSize: 12,
  textAlign: 'center',
},
  row: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  tokenCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 6,
  },
  tokenName: {
    color: '#fff',
    fontWeight: '600',
  },
  tokenSymbol: {
    color: '#888',
    fontSize: 10,
  },
  tradeCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tradeBtn: {
    borderColor: '#00c265',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  tradeText: {
    color: '#00c265',
    fontSize: 12,
    fontWeight: '600',
  },
  copyBtn: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  copyText: {
    color: '#fff',
    fontSize: 11,
  },
twitter: {
  flex: 1,
  color: '#1DA1F2',
  fontSize: 12,
  textAlign: 'center',
},
  desc: {
    flex: 2,
    color: '#ccc',
    fontSize: 11,
    paddingHorizontal: 6,
    textAlign: 'center',
  },
launched: {
  flex: 1,
  color: '#aaa',
  fontSize: 11,
  textAlign: 'center',
},
});

export default NewTokens;
