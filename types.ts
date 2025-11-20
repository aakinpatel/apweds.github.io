
export interface EventDetail {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  icon: 'ring' | 'cheers' | 'dinner' | 'party' | 'ganesh' | 'dance' | 'garrix';
}

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
  guestSide: 'groom' | 'bride' | '';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface TravelOption {
  name: string;
  type: 'hotel' | 'transport';
  description: string;
  address: string;
  priceRange?: string;
  bookingUrl: string;
}

export interface Activity {
  title: string;
  description: string;
  location: string;
}
