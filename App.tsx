
import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EventTimeline from './components/EventTimeline';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Travel from './components/Travel';
import ScrollReveal from './components/ScrollReveal';
import { WEDDING_DETAILS } from './constants';

// ============================================================================
// IMAGE CONFIGURATION
// ============================================================================

/**
 * OPTION 1: GOOGLE DRIVE (Recommended)
 */
const GOOGLE_DRIVE_ID = "1NdwgFPDHR88BlPOOrs3GsvI57mwfnOIu";

/**
 * OPTION 2: DIRECT URL OR LOCAL FILE
 */
const BACKUP_IMAGE_URL = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// ============================================================================

const InfoSection: React.FC = () => {
  const getDriveUrl = (idOrUrl: string) => {
    if (!idOrUrl) return BACKUP_IMAGE_URL;
    if (idOrUrl.startsWith('http') || idOrUrl.startsWith('./') || idOrUrl.startsWith('/')) {
      return idOrUrl;
    }
    return `https://drive.google.com/thumbnail?id=${idOrUrl}&sz=w1000`;
  };

  const initialImage = GOOGLE_DRIVE_ID 
    ? getDriveUrl(GOOGLE_DRIVE_ID)
    : BACKUP_IMAGE_URL;

  const [imgSrc, setImgSrc] = useState(initialImage);

  const handleImageError = () => {
    if (imgSrc !== BACKUP_IMAGE_URL) {
      console.warn("Primary image failed to load. Switching to backup image.");
      setImgSrc(BACKUP_IMAGE_URL);
    }
  };

  return (
    <section id="story" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative border accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-wedding-200 via-wedding-400 to-wedding-200 opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
             <ScrollReveal animation="fade-up">
               {/* The Arch Shape */}
               <div 
                 className="aspect-[3/4] w-full bg-wedding-100 relative rounded-t-full border-4 border-double border-wedding-200 shadow-2xl p-3 group transition-transform duration-500 hover:-translate-y-2"
               >
                 <div className="w-full h-full relative overflow-hidden rounded-t-full">
                   <img 
                      src={imgSrc}
                      alt="Aakin & Palak" 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      onError={handleImageError}
                   />
                 </div>
               </div>
             </ScrollReveal>
          </div>
          <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
            <ScrollReveal animation="slide-left" delay={200}>
              <span className="text-wedding-500 font-serif italic tracking-wider text-lg">How it all began</span>
              <h2 className="font-serif text-5xl md:text-6xl text-wedding-800 mb-6 mt-2">Our Story</h2>
              <div className="w-24 h-1 bg-wedding-400 mx-auto md:mx-0 mb-8"></div>
              <p className="text-wedding-700 leading-loose mb-6 text-lg font-light whitespace-pre-line">
                {WEDDING_DETAILS.story}
              </p>
              <div className="font-serif italic text-2xl text-wedding-500 mt-8 border-t border-wedding-200 pt-6 inline-block">
                {WEDDING_DETAILS.couple.hashtag}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const QASection: React.FC = () => (
  <section id="qa" className="py-24 bg-wedding-50 relative overflow-hidden">
    <div className="absolute inset-0 pattern-overlay pointer-events-none"></div>
    <div className="container mx-auto px-6 max-w-4xl relative z-10">
      <ScrollReveal animation="fade-up">
        <div className="text-center mb-16">
          <span className="text-wedding-400 uppercase tracking-[0.2em] text-sm font-semibold">Need to know</span>
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-800 mt-2 mb-6">Questions & Answers</h2>
          <div className="flex justify-center items-center gap-4 opacity-60">
             <div className="h-px w-12 bg-wedding-800"></div>
             <div className="w-2 h-2 rotate-45 bg-wedding-500"></div>
             <div className="h-px w-12 bg-wedding-800"></div>
          </div>
        </div>
      </ScrollReveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {WEDDING_DETAILS.faqs.map((faq, idx) => (
          <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
            <div className="bg-white p-8 shadow-lg border-t-4 border-wedding-500 rounded-sm hover:-translate-y-1 transition-transform duration-300 h-full">
              <h4 className="font-serif text-xl text-wedding-800 mb-3 font-semibold">{faq.question}</h4>
              <p className="text-wedding-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal animation="fade-in" delay={400}>
        <div className="text-center mt-16">
          <p className="font-serif text-2xl text-wedding-800 italic">
            Get in touch with Aakin and Palak
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen font-sans selection:bg-wedding-300 selection:text-wedding-900">
        <Navigation />
        <Hero />
        <InfoSection />
        <Gallery />
        <EventTimeline />
        <Travel />
        <QASection />
        <RSVPForm />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
