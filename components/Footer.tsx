import React from 'react';
import { WEDDING_DETAILS } from '../constants';
import { Heart } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wedding-900 text-wedding-200 py-12 text-center">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <h2 className="font-serif text-3xl mb-4 text-white">{WEDDING_DETAILS.couple.names}</h2>
          <p className="uppercase tracking-widest text-xs mb-8 opacity-70">{WEDDING_DETAILS.date}</p>
          <p className="font-serif italic text-lg mb-8 max-w-md mx-auto">
            "We are so excited to celebrate this special day with our favorite people."
          </p>
          <div className="text-xs opacity-40 flex items-center justify-center gap-1">
            &copy; 2024 Aakin & Palak Wedding. Designed with <Heart className="w-3 h-3 fill-current text-red-400" />
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;