import { Boat, Booking, Statistic } from './types';

export const BOATS: Boat[] = [
  {
    id: '1',
    name: 'Azure Dream',
    type: 'Luxury Yacht',
    capacity: 12,
    pricePerHour: 450,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800',
    status: 'available',
  },
  {
    id: '2',
    name: 'Ocean Whisper',
    type: 'Catamaran',
    capacity: 20,
    pricePerHour: 320,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    status: 'booked',
  },
  {
    id: '3',
    name: 'Sea Breeze',
    type: 'Speedboat',
    capacity: 6,
    pricePerHour: 180,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    status: 'available',
  },
  {
    id: '4',
    name: 'Midnight Sun',
    type: 'Luxury Yacht',
    capacity: 10,
    pricePerHour: 550,
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798156?auto=format&fit=crop&q=80&w=800',
    status: 'maintenance',
  },
  {
    id: '5',
    name: 'Coral Reef',
    type: 'Catamaran',
    capacity: 15,
    pricePerHour: 280,
    image: 'https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&q=80&w=800',
    status: 'available',
  },
  {
    id: '6',
    name: 'Wave Runner',
    type: 'Speedboat',
    capacity: 4,
    pricePerHour: 150,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    status: 'booked',
  },
];

export const RECENT_BOOKINGS: Booking[] = [
  {
    id: '1',
    boatId: '1',
    customerName: 'James Smith',
    customerAvatar: 'https://i.pravatar.cc/150?u=james',
    date: 'Mar 18, 2023',
    status: 'success',
    amount: 1980.0,
  },
  {
    id: '2',
    boatId: '2',
    customerName: 'George Holoster',
    customerAvatar: 'https://i.pravatar.cc/150?u=george',
    date: 'Mar 10, 2023',
    status: 'process',
    amount: 880.0,
  },
  {
    id: '3',
    boatId: '3',
    customerName: 'Daniela Gordienko',
    customerAvatar: 'https://i.pravatar.cc/150?u=daniela',
    date: 'Mar 21, 2023',
    status: 'failed',
    amount: 1240.0,
  },
];

export const STATS: Statistic[] = [
  { name: 'Payment at the store', value: 9560, color: '#60A5FA' },
  { name: 'Money transaction', value: 5250, color: '#1F2937' },
];

export const CUSTOMERS = [
  { id: '1', name: 'James Smith', email: 'james@example.com', bookings: 12, status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=james' },
  { id: '2', name: 'George Holoster', email: 'george@example.com', bookings: 5, status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=george' },
  { id: '3', name: 'Daniela Gordienko', email: 'daniela@example.com', bookings: 1, status: 'New', avatar: 'https://i.pravatar.cc/150?u=daniela' },
  { id: '4', name: 'Elena Gilbert', email: 'elena@example.com', bookings: 8, status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=elena' },
  { id: '5', name: 'Damon Salvatore', email: 'damon@example.com', bookings: 15, status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=damon' },
];

export const NOTIFICATIONS = [
  { id: '1', title: 'New Booking', message: 'Sea Breeze has been booked for Oct 28.', time: '2 mins ago', type: 'booking' },
  { id: '2', title: 'Maintenance Alert', message: 'Midnight Sun requires engine check.', time: '1 hour ago', type: 'alert' },
  { id: '3', title: 'Payment Received', message: 'Invoice #8821 has been paid.', time: '3 hours ago', type: 'payment' },
  { id: '4', title: 'Customer Feedback', message: 'James Smith left a 5-star review.', time: '5 hours ago', type: 'review' },
];
