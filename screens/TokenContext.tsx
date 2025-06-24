import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyTokens } from '../dummyTokens';

const TokenContext = createContext<any>(null);

export const TokenProvider = ({ children }: any) => {
  const [topTokens, setTopTokens] = useState([]);
  const [dummyVisible, setDummyVisible] = useState(dummyTokens.slice(0, 10));

  useEffect(() => {
    fetchTop75();
    const timers = [10, 20].map((min, index) =>
      setTimeout(() => {
        setDummyVisible(dummyTokens.slice(0, (index + 2) * 10));
      }, min * 60 * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const fetchTop75 = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=75&page=1&sparkline=false'
      );
      const data = await res.json();
      const formatted = data.map((item: any) => ({
        symbol: item.symbol.toUpperCase(),
        name: item.name,
        price: item.current_price,
        mc: item.market_cap.toLocaleString(),
        change24h: item.price_change_percentage_24h?.toFixed(2),
        isDummy: false,
      }));
      setTopTokens(formatted);
    } catch (e) {
      console.error('Failed to fetch top 75', e);
    }
  };

  return (
    <TokenContext.Provider value={{ topTokens, dummyVisible }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenData = () => useContext(TokenContext);
