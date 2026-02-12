
export enum AppStage {
  ONBOARDING = 'ONBOARDING',
  MATCH_SELECTION = 'MATCH_SELECTION',
  OFFERS = 'OFFERS',
  SEAT_MAP = 'SEAT_MAP',
  ESSENTIALS = 'ESSENTIALS',
  CHECKOUT = 'CHECKOUT',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  MY_TICKETS = 'MY_TICKETS',
  IN_GAME = 'IN_GAME',
  POST_MATCH = 'POST_MATCH'
}

export enum Persona {
  DIE_HARD = 'DIE_HARD',
  FRIENDS_OUTING = 'FRIENDS_OUTING',
  BIG_GAMES = 'BIG_GAMES'
}

export interface Match {
  id: string;
  opponent: string;
  stadium: string;
  league: string;
  round: string;
  date: string;
  isBigGame: boolean;
  status: 'AVAILABLE' | 'SELLING_FAST' | 'SOLD_OUT';
}

export interface TicketOffer {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  tag?: string;
  isSoldOut?: boolean;
}

export interface HospitalityPackage extends TicketOffer {
  category: 'WESTVIEW' | 'DUGOUT' | 'PLATINUM' | 'CUSTOM';
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: string;
}
