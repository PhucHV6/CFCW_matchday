
import { Persona, TicketOffer, AddOn, Match, HospitalityPackage } from './types';

export const MATCHES: Match[] = [
  { id: 'm1', opponent: 'Manchester City', stadium: 'Stamford Bridge', league: 'Barclays WSL', round: '14', date: 'SUN 24 MAR • 12:30', isBigGame: true, status: 'SELLING_FAST' },
  { id: 'm2', opponent: 'West Ham United', stadium: 'Kingsmeadow', league: 'Barclays WSL', round: '15', date: 'SAT 30 MAR • 15:00', isBigGame: false, status: 'AVAILABLE' },
  { id: 'm3', opponent: 'Arsenal', stadium: 'Stamford Bridge', league: 'Champion League', round: 'Semifinals', date: 'SUN 14 APR • 18:45', isBigGame: true, status: 'SOLD_OUT' },
  { id: 'm4', opponent: 'Brighton', stadium: 'Kingsmeadow', league: 'Barclays WSL', round: '16', date: 'SUN 21 APR • 14:00', isBigGame: false, status: 'AVAILABLE' },
  { id: 'm5', opponent: 'Liverpool', stadium: 'Stamford Bridge', league: 'Barclays WSL', round: '17', date: 'SUN 05 MAY • 14:30', isBigGame: false, status: 'AVAILABLE' }
];

export const HOSPITALITY_PACKAGES: HospitalityPackage[] = [
  {
    id: 'h-westview',
    category: 'WESTVIEW',
    title: 'Westview',
    description: 'The modern premium standard at the Bridge.',
    price: 155,
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=400',
    benefits: [
      'Luxury padded seats in Westview (West Stand Upper Tier)',
      'Selection of food and beverage available to purchase within the Westview Market Hall'
    ],
    tag: 'Modern Premium'
  },
  {
    id: 'h-dugout',
    category: 'DUGOUT',
    title: 'Dugout Club',
    description: 'Immerse yourself in the technical area atmosphere.',
    price: 295,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400',
    benefits: [
      "Padded seats situated next to the players' tunnel and behind the home dugout",
      'Post-match first-team player meet and greet*',
      'Reserved area to greet the team as they arrive'
    ],
    tag: 'Behind the Scenes'
  },
  {
    id: 'h-platinum',
    category: 'PLATINUM',
    title: 'Platinum',
    description: 'The ultimate matchday hospitality tradition.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400',
    benefits: [
      'Luxury padded seats in the East Stand middle tier on the half-way line',
      'Pre-match three-course dining',
      'A complimentary bar including beer, wine'
    ],
    tag: 'All-Inclusive'
  },
  {
    id: 'h-custom',
    category: 'CUSTOM',
    title: 'Mix-and-Match Package',
    description: 'Build your own bespoke Chelsea experience.',
    price: 185,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400',
    benefits: [
      'Select a combination of dining and drinking option',
      'Choice of premium seating across all stands',
      'Pre-match and post-match experience add-ons'
    ],
    tag: 'Bespoke'
  }
];

export const OFFERS_BY_PERSONA: Record<Persona, TicketOffer[]> = {
  [Persona.DIE_HARD]: [
    {
      id: 'bridge-pass',
      title: 'The Bridge Pass',
      description: 'The definitive 4-match bundle for the season at Stamford Bridge.',
      price: 85,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      benefits: ['Guaranteed Adjacent Seats', '500 Loyalty Points', 'Digital Match Program'],
      tag: 'Best for Superfans',
      isSoldOut: true
    },
    {
      id: 'kingsmeadow-season',
      title: 'Kingsmeadow Full Season',
      description: 'Every home match, including all cup games at Kingsmeadow.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
      benefits: ['All WSL Home Games', 'Exclusive Training Access', '10% Megastore Discount'],
      isSoldOut: true
    }
  ],
  [Persona.FRIENDS_OUTING]: [
    {
      id: 'squad-bundle',
      title: 'The Blue Squad Bundle',
      description: 'Groups of 4+ get discounted entry and hospitality perks.',
      price: 65,
      image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800',
      benefits: ['4 Block Seats Together', '4 Beer/Soft Drink Vouchers', 'Social Photo Feature'],
      tag: 'Groups Save 15%'
    }
  ],
  [Persona.BIG_GAMES]: [
    {
      id: 'bg-ticket',
      title: 'Ticket Only',
      description: 'General admission seating for the match.',
      price: 45,
      image: 'https://images.unsplash.com/photo-1574619858303-28adc8139d0d?auto=format&fit=crop&q=80&w=800',
      benefits: ['Official Digital Ticket', 'Standard Stadium Access']
    },
    {
      id: 'bg-member',
      title: 'Membership Exclusive',
      description: 'Priority seating and member-only lounge access.',
      price: 65,
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
      benefits: ['Member Priority Seating', '15% Megastore Discount', 'True Blue Digital Pack'],
      tag: 'Best Value'
    },
    {
      id: 'bg-hospitality',
      title: 'Chelsea Hospitality',
      description: 'The ultimate matchday experience in Westview or the Executive Suites.',
      price: 155,
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
      benefits: ['Executive Padded Seating', 'Pre-match Fine Dining', 'Complimentary Bar'],
      tag: 'VIP'
    }
  ]
};

export const ADD_ONS: AddOn[] = [
  { id: 'burger-beer', name: 'Burger & Beer Combo', description: 'Pre-order for Triple Jump POS collection', price: 12, originalPrice: 15, icon: 'fa-burger' },
  { id: 'fast-track', name: 'Fast Track Entry', description: 'Priority lane at Gate 3 & 7', price: 5, originalPrice: 7, icon: 'fa-bolt' },
  { id: 'scarf', name: 'Limited Edition Scarf', description: 'Matchday exclusive souvenir', price: 18, originalPrice: 22, icon: 'fa-mitten' }
];
