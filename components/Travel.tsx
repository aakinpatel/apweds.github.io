import React from 'react';
import { TRAVEL_DETAILS, WEDDING_DETAILS } from '../constants';
import { MapPin, Hotel, Sun, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Travel: React.FC = () => {
  return (
    <section id="travel" className="py-24 bg-wedding-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-wedding-800 mb-4">Travel & Stay</h2>
            <p className="text-wedding-600 italic font-serif text-lg">
              We've arranged block rates at the following hotels for your convenience.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Accommodation Column */}
          <ScrollReveal animation="slide-right" delay={100}>
            <div>
              <h3 className="font-serif text-2xl text-wedding-800 mb-8 flex items-center gap-2 border-b border-wedding-200 pb-4">
                <Hotel className="w-6 h-6" />
                Where to Stay
              </h3>
              
              <div className="space-y-6">
                {TRAVEL_DETAILS.hotels.map((hotel, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-sm shadow-sm border border-wedding-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-xl text-wedding-800 font-semibold">{hotel.name}</h4>
                      <span className="text-wedding-500 text-sm">{hotel.priceRange}</span>
                    </div>
                    <p className="text-wedding-600 text-sm mb-4">{hotel.description}</p>
                    <div className="flex items-center text-xs text-wedding-500 mb-4">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hotel.address}
                    </div>
                    <a 
                      href={hotel.bookingUrl}
                      className="inline-flex items-center text-xs uppercase tracking-widest text-wedding-800 border-b border-wedding-800 pb-1 hover:text-wedding-500 hover:border-wedding-500 transition-colors"
                    >
                      Book Room <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Activities Column */}
          <ScrollReveal animation="slide-left" delay={200}>
            <div>
              <h3 className="font-serif text-2xl text-wedding-800 mb-8 flex items-center gap-2 border-b border-wedding-200 pb-4">
                <Sun className="w-6 h-6" />
                Local Activities
              </h3>
              
              <div className="bg-white p-8 rounded-sm border border-wedding-100">
                <p className="text-wedding-600 mb-6">
                  While you're in town for our special day, we hope you take some time to explore the beautiful {WEDDING_DETAILS.location.venue.split(' ')[0]} area.
                </p>
                
                <ul className="space-y-6">
                  {TRAVEL_DETAILS.activities.map((activity, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1 h-full bg-wedding-300 rounded-full"></div>
                      <div>
                        <h5 className="font-serif text-lg text-wedding-800">{activity.title}</h5>
                        <p className="text-sm text-wedding-600">{activity.description}</p>
                        <span className="text-xs text-wedding-400 italic mt-1 block">{activity.location}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Travel;