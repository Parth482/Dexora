export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Menu: undefined;
    TokenDetail: { pairAddress: string };  
    Legal: { type: 'disclaimer' | 'terms' | 'privacy' }; 

};
export type Theme = 'light' | 'dark' | 'system';