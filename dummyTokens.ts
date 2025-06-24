export const dummyTokens = Array.from({ length: 30 }, (_, i) => ({
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
