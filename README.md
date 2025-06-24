# Dexora
Dexora is a mobile-first crypto token screener built using **React Native**, designed to replicate and enhance the core functionality of the web-based screener. It features token analytics, live prices, market cap, volume tracking, and more — all powered by CoinGecko API.
---

## 🚀 Features

- 🔥 Top 75 Tokens (Market Cap-wise)
- ✨ New Tokens (Live feed)
- ⭐ Add Favorites
- 📊 Token Detail Page with:
  - Market Cap, Volume, Price Movement
  - Price chart (sample)
  - About section and links
- 🔍 Search functionality with partial and exact match
- 📱 Clean and mobile-first UI (Light/Dark theme)
- 📌 Footer disclaimer: “Data is provided as-is…”

---

## 📦 Tech Stack

- **React Native + Expo**
- **TypeScript**
- `@react-navigation/native`
- `react-native-chart-kit`
- **CoinGecko API** (for token data)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dexora.git
cd dexora

### 2. Install Dependencies

npm install

### 3. start the app

npm start

This will launch the Expo DevTools. You can then:

Press i for iOS simulator

Press a for Android emulator

Or scan the QR code with Expo Go


Test Environment
Tested on:

✅ iPhone 14 Pro Max (Expo Go)

✅ Android emulator (Pixel 6)

✅ Web via Expo (limited)


/screens
  ├── HomeScreen.tsx
  ├── TokenDetailScreen.tsx
  ├── SearchScreen.tsx
  ├── MenuScreen.tsx
  ├── NewTokens.tsx
  ├── Legal.tsx
  ├── FooterNote.tsx

/contexts
  ├── ThemeContext.tsx
  ├── TokenContext.tsx

/services
  └── (optional API utils)

App.tsx
index.ts
dummyTokens.ts
types.ts

📄 Legal Notice
This project is for educational/demonstration purposes.
Data is fetched from public APIs and may not be fully accurate.
For feedback or issues, feel free to DM @Kris1z0

📬 Contact
Developer: Parth Joshi

Twitter: @Kris1z0

GitHub: Parth482




