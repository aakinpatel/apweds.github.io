import React, { useEffect, useState } from 'react';
import { WEDDING_DETAILS } from '../constants';
import Countdown from './Countdown';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRSVPClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('rsvp');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-wedding-900 overflow-hidden">
      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wedding-800/50 via-wedding-900/80 to-wedding-900 pointer-events-none"></div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center text-white px-4 max-w-6xl mx-auto w-full pt-32 pb-24 md:pb-16">
        
        {/* Decorative Ganesh / Om */}
        <div className={`mb-6 md:mb-10 opacity-80 drop-shadow-lg min-h-[80px] md:min-h-[96px] flex items-center justify-center transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <span className="font-serif text-5xl md:text-7xl text-wedding-300 block">
             ૐ
           </span>
        </div>
        
        <p className={`font-serif text-lg md:text-xl italic tracking-widest mb-4 md:mb-6 text-wedding-200 drop-shadow-md font-light transition-all duration-1000 delay-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We cordially invite you to celebrate the union of
        </p>
        
        <h1 className={`font-serif text-5xl md:text-8xl lg:text-9xl mb-8 font-medium leading-tight md:leading-none drop-shadow-2xl text-wedding-50 tracking-wide transition-all duration-1000 delay-500 ease-out ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <span className="block md:inline">Aakin</span>
          <span className="block md:inline text-wedding-300 text-4xl md:text-7xl py-2 md:py-0 md:px-6 font-light">&</span>
          <span className="block md:inline">Palak</span>
        </h1>
        
        <div className={`flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12 opacity-90 transition-all duration-1000 delay-700 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-[1px] w-12 md:w-40 bg-gradient-to-r from-transparent via-wedding-300 to-transparent"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-wedding-300 shadow-[0_0_15px_rgba(212,175,55,0.9)]"></div>
          <div className="h-[1px] w-12 md:w-40 bg-gradient-to-r from-transparent via-wedding-300 to-transparent"></div>
        </div>

        <div className={`transition-all duration-1000 delay-800 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-serif text-3xl md:text-6xl tracking-wide text-wedding-100 drop-shadow-md mb-2 md:mb-4">
            {WEDDING_DETAILS.date}
          </p>
          <p className="font-sans text-[10px] md:text-sm uppercase tracking-[0.4em] text-wedding-300 mt-4 font-semibold px-4">
            {WEDDING_DETAILS.location.venue} • {WEDDING_DETAILS.location.address.split(',')[1]}
          </p>
        </div>
        
        <div className={`transition-all duration-1000 delay-900 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <Countdown />
        </div>
        
        <div className={`mt-8 md:mt-12 transition-all duration-1000 delay-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="#rsvp" 
            onClick={handleRSVPClick}
            className="group relative inline-block px-12 py-4 md:px-16 md:py-5 overflow-hidden rounded-sm border border-wedding-300/50 backdrop-blur-sm transition-all duration-500 hover:border-wedding-200 hover:bg-wedding-800/30"
          >
            <span className="relative z-10 font-serif text-lg md:text-xl text-wedding-100 tracking-[0.2em]">
              R.S.V.P.
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-wedding-600/20 to-wedding-500/20 transition-transform duration-700 ease-out"></div>
          </a>
        </div>
      </div>

      <div className="relative z-10 pb-8 flex flex-col items-center animate-pulse-slow text-wedding-300/60 gap-3 pointer-events-none shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-light">Scroll to Begin</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-wedding-300 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;