export interface Boat {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerHour: number;
  image: string;
  status: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  boatId: string;
  customerName: string;
  customerAvatar: string;
  date: string;
  status: 'success' | 'process' | 'failed';
  amount: number;
}

export interface Statistic {
  name: string;
  value: number;
  color: string;
}
