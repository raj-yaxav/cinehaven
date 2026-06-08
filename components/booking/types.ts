export interface Room {
  _id: string;
  name: string;
  category?: string;
  basePrice?: number;
  originalPrice?: number;
  pricePerExtraPerson?: number;
  capacity: { min: number; max: number };
  images?: string[];
  features?: string[];
  occasions?: string[];
  videoUrl?: string;
  screenSize?: string;
  soundSystem?: string;
}

export interface Slot {
  _id: string;
  start: string;
  end: string;
  priceOverride?: number;
  originalPrice?: number;
}

export interface AddOn {
  _id: string;
  name: string;
  price: number;
}
