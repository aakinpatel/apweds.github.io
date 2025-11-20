
import React, { useState } from 'react';
import { RSVPFormData, LoadingState } from '../types';
import ScrollReveal from './ScrollReveal';

// =============================================================================
// 1. GOOGLE SHEETS SETUP INSTRUCTIONS
// =============================================================================
// 1. Create a Google Sheet with the following columns in this EXACT order:
//    Col A: Timestamp
//    Col B: FirstName
//    Col C: LastName
//    Col D: Email
//    Col E: PhoneNumber  <-- NEW FIELD
//    Col F: GuestSide
//    Col G: Attending
//    Col H: Guests
//    Col I: Message
//
// 2. Go to Extensions > Apps Script
// 3. Paste the code below into the script editor:
/*
  function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p = e.parameter;
    // The order here MUST match the column order in your spreadsheet
    sheet.appendRow([
      new Date(),     // A: Timestamp
      p.firstName,    // B: FirstName
      p.lastName,     // C: LastName
      p.email,        // D: Email
      p.phoneNumber,  // E: PhoneNumber
      p.guestSide,    // F: GuestSide
      p.attending,    // G: Attending
      p.guests,       // H: Guests
      p.message       // I: Message
    ]);
    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
  }
*/
// 4. Save. 
// 5. Click "Deploy" > "New deployment" > Select type: "Web app"
// 6. Set "Who has access" to "Anyone" (CRITICAL STEP)
// 7. Copy the Web App URL and paste it below inside the quotes.
// =============================================================================

const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbwfYzHonYNeT13g_6lix1UJQRpp7lcrlVZo2ClLDHpNoghhorCLUIIFpCcwQlZ1kMdF-Q/exec';

const SUCCESS_PHRASES = [
  "Jay Umiya Maa!",       // Kadva Patel Kuldevi Greeting
  "Dhanyavad!",           // Thank you
  "Aabhar!",              // Gratitude
  "Padharo!",             // Welcome
  "Vela Aavjo!",          // Come early/soon (Mehsani style)
  "Zarur Aavjo!",         // Do come
  "Tamari Raah Joishu!",  // We will wait for you
  "Harakh Thi Aavjo!",    // Come with joy
  "Swaagat Che!",         // You are welcome
  "Khushi Thai!",         // Very happy
  "Maliye Tyaare!",       // See you then
  "Hao, Jarur Aavjo!",    // Yes, do come (Mehsani colloquial)
  "Gher Jeve Gher!",      // Feel at home
  "Utsav Ma Malishu!",    // Will meet at the celebration
  "Jay Ambe!"             // General Gujarati Greeting
];

const DECLINE_PHRASES = [
  "Tamari Yaad Aavshe!",  // We will miss you
  "Miss Karishu!",        // We will miss you (Colloquial)
  "Fari Malishu!",        // We will meet again
  "Dil Thi Aabhar!",      // Thank you from the heart (for letting us know)
  "Koi Vandho Nahi!",     // No problem
  "Khushi Rajo!",         // Stay happy
  "Yaad Karjo!",          // Remember us
];

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    attending: 'yes',
    guests: 1,
    message: '',
    guestSide: ''
  });

  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [successTitle, setSuccessTitle] = useState('Dhanyavad!');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Enforce numbers only and max 10 characters
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'guests') {
      // Allow empty string for better typing experience
      if (value === '') {
        setFormData(prev => ({ ...prev, [name]: '' }));
      } else {
        const numVal = parseInt(value);
        // Only update if it's a valid number and <= 15
        if (!isNaN(numVal) && numVal <= 15) {
          setFormData(prev => ({ ...prev, [name]: numVal }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(LoadingState.LOADING);
    
    // Select appropriate phrase list based on attendance
    const phraseList = formData.attending === 'yes' ? SUCCESS_PHRASES : DECLINE_PHRASES;
    const randomPhrase = phraseList[Math.floor(Math.random() * phraseList.length)];

    // If the user hasn't updated the URL yet, simulate success for demo purposes
    if (GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') || GOOGLE_SCRIPT_URL === '') {
      console.warn("Google Script URL not set. Simulating success.");
      setTimeout(() => {
        setSuccessTitle(randomPhrase);
        setStatus(LoadingState.SUCCESS);
      }, 1500);
      return;
    }

    try {
      // Create form data compatible with Google Apps Script
      const formParams = new FormData();
      formParams.append('firstName', formData.firstName);
      formParams.append('lastName', formData.lastName);
      formParams.append('email', formData.email);
      formParams.append('phoneNumber', `'${formData.phoneNumber}`); // Prefix with ' to prevent Excel formatting issues
      formParams.append('guestSide', formData.guestSide);
      formParams.append('attending', formData.attending);
      
      // Ensure guests is a valid number for the payload (default to 1 if empty)
      const finalGuests = formData.guests === '' ? 1 : formData.guests;
      formParams.append('guests', finalGuests.toString());
      
      formParams.append('message', formData.message);

      // We use no-cors because Google Scripts handles redirects that standard fetch doesn't like
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formParams,
        mode: 'no-cors' 
      });

      setSuccessTitle(randomPhrase);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Error sending RSVP:", error);
      setStatus(LoadingState.ERROR);
    }
  };

  if (status === LoadingState.SUCCESS) {
    return (
      <section id="rsvp" className="py-24 bg-wedding-50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-white p-12 rounded-sm shadow-xl border-t-4 border-wedding-500 animate-fade-in-up">
            <h3 className="font-serif text-3xl text-wedding-800 mb-4">{successTitle}</h3>
            <p className="text-wedding-600 mb-6 font-sans">
              {formData.attending === 'yes' 
                ? "Your RSVP has been received. We look forward to celebrating with you!" 
                : "Your response has been received. We will miss your presence at the celebration."}
            </p>
            <button 
              onClick={() => {
                 setStatus(LoadingState.IDLE);
                 setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    attending: 'yes',
                    guests: 1,
                    message: '',
                    guestSide: ''
                 });
              }}
              className="text-sm uppercase tracking-widest text-wedding-500 border-b border-wedding-500 hover:text-wedding-700 transition-colors"
            >
              Submit another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (status === LoadingState.ERROR) {
    return (
      <section id="rsvp" className="py-24 bg-wedding-50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
           <div className="bg-white p-12 rounded-sm shadow-xl border-t-4 border-red-800 animate-fade-in-up">
            <h3 className="font-serif text-3xl text-red-900 mb-4">Something went wrong</h3>
            <p className="text-wedding-600 mb-6">
              We couldn't send your RSVP. Please check your connection and try again.
            </p>
            <button 
              onClick={() => setStatus(LoadingState.IDLE)}
              className="text-sm uppercase tracking-widest text-wedding-500 border-b border-wedding-500 hover:text-wedding-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 bg-wedding-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full pattern-overlay-dark opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <span className="text-wedding-400 uppercase tracking-[0.3em] text-xs font-bold">Joyfully Invite You</span>
            <h2 className="font-serif text-5xl text-wedding-800 my-4">R.S.V.P.</h2>
            <div className="w-20 h-1 bg-wedding-300 mx-auto mb-4"></div>
            <p className="text-wedding-600 font-sans">Please respond by May 1st, 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 shadow-2xl rounded-sm border border-wedding-100 relative">
            {/* Corner decorative elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-wedding-300 m-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-wedding-300 m-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-wedding-300 m-2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-wedding-300 m-2"></div>

            {/* First Name / Last Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              <div>
                <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b-2 border-wedding-100 py-2 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-900 bg-transparent placeholder-wedding-200 font-serif text-lg"
                  placeholder="Aakin"
                />
              </div>
              <div>
                <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Last Name</label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b-2 border-wedding-100 py-2 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-900 bg-transparent placeholder-wedding-200 font-serif text-lg"
                  placeholder="Patel"
                />
              </div>
            </div>

            {/* Email / Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div>
                <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b-2 border-wedding-100 py-2 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-900 bg-transparent placeholder-wedding-200 font-serif text-lg"
                  placeholder="guest@example.com"
                />
              </div>
              <div>
                <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Phone Number</label>
                <div className="flex items-baseline border-b-2 border-wedding-100 focus-within:border-wedding-500 transition-colors">
                  <span className="text-wedding-400 font-serif text-lg mr-2 select-none">+1</span>
                  <input
                    required
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full py-2 focus:outline-none bg-transparent text-wedding-900 placeholder-wedding-200 font-serif text-lg"
                    placeholder="5551234567"
                  />
                </div>
              </div>
            </div>

            {/* Guest Side Selection */}
            <div className="mb-10">
              <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-4 font-bold">Are you a guest of?</label>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <label className={`flex-1 flex items-center cursor-pointer p-4 border rounded-sm transition-all duration-300 ${formData.guestSide === 'groom' ? 'border-wedding-500 bg-wedding-50 ring-1 ring-wedding-500' : 'border-wedding-100 hover:border-wedding-300 hover:bg-wedding-50/50'}`}>
                  <input 
                    type="radio" 
                    name="guestSide" 
                    value="groom" 
                    onChange={handleChange} 
                    checked={formData.guestSide === 'groom'} 
                    className="hidden"
                    required
                  />
                  <div className={`w-5 h-5 border border-wedding-400 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${formData.guestSide === 'groom' ? 'border-wedding-800' : ''}`}>
                     <div className={`w-3 h-3 bg-wedding-800 rounded-full transition-transform duration-300 ${formData.guestSide === 'groom' ? 'scale-100' : 'scale-0'}`}></div>
                  </div>
                  <span className={`font-serif text-lg transition-colors ${formData.guestSide === 'groom' ? 'text-wedding-900' : 'text-wedding-600'}`}>The Groom</span>
                </label>

                <label className={`flex-1 flex items-center cursor-pointer p-4 border rounded-sm transition-all duration-300 ${formData.guestSide === 'bride' ? 'border-wedding-500 bg-wedding-50 ring-1 ring-wedding-500' : 'border-wedding-100 hover:border-wedding-300 hover:bg-wedding-50/50'}`}>
                  <input 
                    type="radio" 
                    name="guestSide" 
                    value="bride" 
                    onChange={handleChange} 
                    checked={formData.guestSide === 'bride'} 
                    className="hidden"
                    required
                  />
                  <div className={`w-5 h-5 border border-wedding-400 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${formData.guestSide === 'bride' ? 'border-wedding-800' : ''}`}>
                     <div className={`w-3 h-3 bg-wedding-800 rounded-full transition-transform duration-300 ${formData.guestSide === 'bride' ? 'scale-100' : 'scale-0'}`}></div>
                  </div>
                  <span className={`font-serif text-lg transition-colors ${formData.guestSide === 'bride' ? 'text-wedding-900' : 'text-wedding-600'}`}>The Bride</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div>
                <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Will you attend?</label>
                <div className="relative">
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    className="w-full border-b-2 border-wedding-100 py-2 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-900 bg-transparent appearance-none font-serif text-lg"
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>
                  <div className="absolute right-0 top-3 pointer-events-none text-wedding-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
              {formData.attending === 'yes' && (
                <div className="animate-fade-in-up">
                  <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Total Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border-b-2 border-wedding-100 py-2 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-900 bg-transparent font-serif text-lg"
                  />
                </div>
              )}
            </div>

            <div className="mb-12">
              <label className="block text-wedding-800 text-xs uppercase tracking-widest mb-2 font-bold">Message to the Couple</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full border border-wedding-200 p-4 focus:outline-none focus:border-wedding-500 transition-colors text-wedding-700 bg-wedding-50 rounded-sm resize-none font-serif text-lg"
                placeholder="Leave a note..."
              />
            </div>

            <button
              type="submit"
              disabled={status === LoadingState.LOADING}
              className="w-full bg-wedding-800 text-white py-5 uppercase tracking-[0.25em] text-sm font-bold hover:bg-wedding-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg hover:shadow-xl border border-wedding-300"
            >
              {status === LoadingState.LOADING ? 'Sending...' : 'Confirm Attendance'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RSVPForm;
