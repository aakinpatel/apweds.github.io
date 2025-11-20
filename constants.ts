
import { EventDetail, TravelOption, Activity } from './types';

export const WEDDING_DETAILS = {
  couple: {
    names: "Aakin Patel & Palak Patel",
    headline: "Forever Begins Now",
    hashtag: "#AakinAndPalakPatel"
  },
  date: "July 19, 2026",
  location: {
    venue: "Ashyana Banquets",
    address: "1620 75th St, Downers Grove, IL 60516",
    mapUrl: "https://maps.google.com/?q=Ashyana+Banquets+Downers+Grove"
  },
  story: `We met online, but it never felt like strangers meeting - it felt like fate. What began as friendship turned into a connection that neither of us could ignore. When we finally met in Indianapolis, it was our true Bollywood moment - the spark was instant, the chemistry effortless, and the feeling undeniable. That's when we knew this was real.

Since 2023, distance has tested us, strengthened us, and proved that love always finds a way. We've become each other's strength and light through every challenge. Now, as we look toward 2026, we're ready to end the distance and begin the chapter destiny has always planned for us.`,
  faqs: [
    { question: "What is the dress code?", answer: "We encourage traditional Indian Formal or Black Tie. For the Sangeet, colorful Indian formal wear or Cocktail attire is recommended! For the Wedding Ceremony, please avoid wearing red (bride's color) or black." },
    { question: "Is the food vegetarian?", answer: "Yes, all meals served at the wedding events will be strictly vegetarian, with Jain options available upon request." },
    { question: "Are kids welcome?", answer: "We love your little ones! Please refer to your specific invitation card for family details." },
    { question: "Is there parking?", answer: "Yes, Ashyana Banquets provides ample complimentary parking for all guests." }
  ]
};

export const EVENTS: EventDetail[] = [
  {
    id: '1',
    title: 'Haldi',
    time: 'July 17, 2026 - 9:30 AM',
    location: 'Ashyana Banquets',
    description: 'A fun and colorful ceremony where turmeric paste is applied to the bride and groom for a radiant glow.',
    icon: 'party'
  },
  {
    id: '2',
    title: 'Grah Shanti',
    time: 'July 18, 2026 - 9:00 AM',
    location: 'Ashyana Banquets',
    description: 'A traditional pre-wedding ceremony to seek peace from the planets.',
    icon: 'ganesh'
  },
  {
    id: '3',
    title: 'Sangeet',
    time: 'July 18, 2026 - 6:30 PM',
    location: 'Ashyana Banquets',
    description: 'A festive night of musical performances and dancing in a pre-reception style celebration.',
    icon: 'garrix'
  },
  {
    id: '4',
    title: 'Wedding Ceremony',
    time: 'July 19, 2026 - 9:00 AM',
    location: 'Ashyana Banquets',
    description: 'Baraat assembly at 9:00 AM. Wedding Ceremony follows immediately.',
    icon: 'ring'
  }
];

export const TRAVEL_DETAILS = {
  hotels: [
    {
      name: "Hyatt Regency Lisle near Naperville",
      type: 'hotel',
      description: "Located conveniently near the venue. Mention 'Patel Wedding Block' for special rates.",
      address: "Lisle, IL",
      priceRange: "$$",
      bookingUrl: "https://www.hyatt.com/events/en-US/group-booking/LISLE/G-PPAP"
    },
    {
      name: "Chicago Marriott Suites",
      type: 'hotel',
      description: "Luxury suites for a comfortable stay. Shuttle service to Ashyana available.",
      address: "Downers Grove, IL",
      priceRange: "$$$",
      bookingUrl: "#"
    }
  ] as TravelOption[],
  activities: [
    {
      title: "Summer Nights Classic Car Show",
      description: "Live music and over 100 classic cars lining Main Street. Friday, July 17th, 6:00 PM - 9:00 PM.",
      location: "Downtown Downers Grove"
    },
    {
      title: "Naperville Farmers Market",
      description: "Fresh local produce, artisan cheeses, and handmade crafts. Saturday, July 18th, 7:00 AM - 12:00 PM.",
      location: "5th Avenue Station, Naperville"
    }
  ] as Activity[]
};

export const SYSTEM_INSTRUCTION = `You are ChaiGPT, a helpful and enthusiastic wedding assistant for ${WEDDING_DETAILS.couple.names}. 
Use the following details to answer guest questions:

Wedding Details:
- Date: ${WEDDING_DETAILS.date}
- Venue: ${WEDDING_DETAILS.location.venue}, ${WEDDING_DETAILS.location.address}
- Hashtag: ${WEDDING_DETAILS.couple.hashtag}

Events:
${EVENTS.map(e => `- ${e.title}: ${e.time} at ${e.location}. (${e.description})`).join('\n')}

FAQs:
${WEDDING_DETAILS.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n')}

Travel:
${TRAVEL_DETAILS.hotels.map(h => `- ${h.name} (${h.priceRange}): ${h.description}`).join('\n')}

Your tone should be polite, warm, and inviting. Use Indian greetings like "Namaste" occasionally. Keep answers concise.`;
