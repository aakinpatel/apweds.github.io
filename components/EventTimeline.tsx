
import React from 'react';
import { EVENTS } from '../constants';
import { Clock, MapPin, Wine, Music, Heart } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const EventTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ring': return <Heart className="w-6 h-6 text-white" />;
      case 'cheers': return <Wine className="w-6 h-6 text-white" />;
      case 'party': return <Music className="w-6 h-6 text-white" />;
      case 'ganesh': return <span className="text-white text-2xl font-serif leading-none">ૐ</span>;
      case 'garrix': return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-white"
        >
          {/* Martin Garrix Style + x */}
          <path d="M3 12h6M6 9v6" /> {/* Plus */}
          <path d="M14 9l6 6M20 9l-6 6" /> {/* X */}
        </svg>
      );
      case 'dance': return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-white"
        >
          <path d="M5 19L19 5" strokeWidth="2" />
          <path d="M5 5L19 19" strokeWidth="2" />
          <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="20" cy="4" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="4" cy="4" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none"/>
          <path d="M8 16L9 15" />
          <path d="M15 9L16 8" />
          <path d="M8 8L9 9" />
          <path d="M15 15L16 16" />
        </svg>
      );
      default: return <Clock className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="events" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-wedding-800 mb-4">The Events</h2>
            <p className="text-wedding-600 italic font-serif text-lg">A celebration of love, laughter, and happily ever after.</p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-wedding-200 hidden md:block"></div>

          <div className="space-y-12">
            {EVENTS.map((event, index) => (
              <div key={event.id} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0">
                  <ScrollReveal 
                    animation={index % 2 === 0 ? 'slide-left' : 'slide-right'} 
                    delay={index * 100}
                    className="h-full"
                  >
                    <div className={`bg-wedding-50 p-8 rounded-lg border border-wedding-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} h-full`}>
                      <h3 className="font-serif text-2xl text-wedding-800 mb-2">{event.title}</h3>
                      <div className={`flex items-center gap-2 text-wedding-500 text-sm uppercase tracking-wider font-medium mb-3 justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <p className="text-wedding-600 mb-4">{event.description}</p>
                      <div className={`flex items-center gap-2 text-wedding-400 text-sm italic justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Icon Center */}
                <ScrollReveal animation="zoom-in" delay={index * 100 + 200} className="absolute left-1/2 transform -translate-x-1/2 hidden md:block z-10">
                  <div className="w-12 h-12 rounded-full bg-wedding-400 border-4 border-white flex items-center justify-center shadow-md">
                    {getIcon(event.icon)}
                  </div>
                </ScrollReveal>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
