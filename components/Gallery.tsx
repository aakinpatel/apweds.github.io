import React from 'react';
import { Camera, Smartphone, UploadCloud } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const UPLOAD_LINK = "https://forms.google.com/your-form-id-here"; 

const Gallery: React.FC = () => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(UPLOAD_LINK)}&bgcolor=FFFBF5&color=600000`;

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-wedding-50 opacity-50 pattern-overlay-dark pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-wedding-200">
            
            {/* Left Side: Text & Context */}
            <div className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6 text-wedding-500">
                 <Camera className="w-6 h-6" />
                 <span className="uppercase tracking-widest text-xs font-bold">Guest Lens</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl text-wedding-800 mb-6 leading-tight">
                Capture Our Moments
              </h2>
              
              <p className="text-wedding-600 text-lg mb-8 font-light leading-relaxed">
                We would love to see the wedding through your eyes! Please snap photos and videos throughout the events and upload them directly to our digital album.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-wedding-50 rounded-full flex items-center justify-center flex-shrink-0 text-wedding-500 mt-1">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-wedding-800">1. Snap</h4>
                    <p className="text-sm text-wedding-600">Take candid photos and videos during the ceremonies.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-wedding-50 rounded-full flex items-center justify-center flex-shrink-0 text-wedding-500 mt-1">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-wedding-800">2. Share</h4>
                    <p className="text-sm text-wedding-600">Scan the QR code or use the link to upload instantly to our drive.</p>
                  </div>
                </div>
              </div>

              <a 
                href={UPLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-wedding-800 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-wedding-900 transition-all shadow-lg md:hidden"
              >
                Upload Photos Now
              </a>
            </div>

            {/* Right Side: QR Code Area */}
            <div className="w-full md:w-2/5 bg-wedding-800 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-wedding-700 rounded-full opacity-50 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-wedding-700 rounded-full opacity-50 blur-3xl"></div>

               <ScrollReveal animation="zoom-in" delay={300}>
                 <div className="bg-[#FFFBF5] p-4 rounded-sm shadow-2xl transform rotate-2 transition-transform hover:rotate-0 duration-500 mb-6">
                   <img 
                     src={qrCodeUrl} 
                     alt="Upload QR Code" 
                     className="w-48 h-48 object-contain mix-blend-multiply"
                   />
                 </div>
               </ScrollReveal>

               <h3 className="text-wedding-100 font-serif text-2xl mb-2">Scan to Upload</h3>
               <p className="text-wedding-300 text-xs uppercase tracking-widest">Save directly to Google Drive</p>
               
               <div className="mt-8 pt-8 border-t border-white/10 w-full">
                  <p className="text-wedding-200/60 text-[10px] uppercase tracking-widest">
                    Powered by Google Drive
                  </p>
               </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Gallery;