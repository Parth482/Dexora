const BASE_URL = 'https://financialmodelingprep.com/api/v3';
const API_KEY = 'demo'; // You can use "demo" for limited requests

export const searchStock = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`);
  const data = await res.json();
  return data;
};
