export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface MarketData {
  crop: string;
  price: number;
  date: string;
  predicted?: number;
}

export interface Listing {
  id: string;
  farmerName: string;
  location: string;
  crop: string;
  quantity: string;
  price: string;
  image?: string;
}
