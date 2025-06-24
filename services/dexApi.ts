type DexPair = {
  pairAddress: string;
  baseToken: { symbol: string };
  quoteToken: { symbol: string };
  priceUsd: string;
  liquidity?: { usd: string };
  volume?: { h24: string };
  fdv?: string;
  txCount?: { h24: string };
};

export const getSummaryStats = async () => {
  const res = await fetch('https://api.dexscreener.com/latest/dex/search?q=eth');

  const json = await res.json();
  const pairs: DexPair[] = json.pairs;

  let totalVolume = 0;
  let totalMarketCap = 0;
  let totalLiquidity = 0;
  let totalTxs = 0;
  let activeCoins = 0;

  pairs.forEach((pair) => {
    const volume = parseFloat(pair.volume?.h24 || '0');
    const liquidity = parseFloat(pair.liquidity?.usd || '0');
    const marketCap = parseFloat(pair.fdv || '0');
    const txCount = parseFloat(pair.txCount?.h24 || '0');


    totalVolume += volume;
    totalLiquidity += liquidity;
    totalMarketCap += marketCap;
    totalTxs += txCount;

    if (txCount > 5) activeCoins++;
  });

  return {
    totalVolume,
    totalLiquidity,
    totalMarketCap,
    totalTxs,
    activeCoins,
    coinLaunches: pairs.length,
    lifetimeVolume: totalVolume * 20,
  };
};
