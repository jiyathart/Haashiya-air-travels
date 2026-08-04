import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquare, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface Testimonial {
  id: string;
  name: string;
  location: { en: string; ta: string };
  service: { en: string; ta: string };
  rating: number;
  date: { en: string; ta: string };
  avatarBg: string;
  initials: string;
  text: {
    en: string;
    ta: string;
  };
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Mohamed Jahir',
    location: { en: 'Mimisal', ta: 'மிமிசால்' },
    service: { en: 'Tatkal Passport & Dubai Visa', ta: 'தட்கல் பாஸ்போர்ட் & துபாய் விசா' },
    rating: 5,
    date: { en: '2 weeks ago', ta: '2 வாரங்களுக்கு முன்' },
    avatarBg: 'bg-emerald-600',
    initials: 'MJ',
    text: {
      en: 'I had an urgent job offer in Dubai and needed my Tatkal passport and PCC processed quickly. Mr. Haashiya handled all appointment slots and document checks smoothly at PSK Trichy. Everything was clear and stress-free!',
      ta: 'துபாயில் அவசர வேலை வாய்ப்பு கிடைத்ததால் தட்கல் பாஸ்போர்ட் மற்றும் PCC தேவைப்பட்டது. ஹாஷியா டிராவல்ஸ் திருச்சி PSK அப்பாயிண்ட்மெண்ட் முதல் அனைத்து ஆவணங்களையும் மிக விரைவாக முடித்துக்கொடுத்தனர். மிகவும் நம்பகமான சேவை!'
    }
  },
  {
    id: 't2',
    name: 'S. Kalyani',
    location: { en: 'Manamelkudi', ta: 'மணமேல்குடி' },
    service: { en: 'e-Sevai & Patta Transfer', ta: 'இ-சேவை & பட்டா மாறுதல்' },
    rating: 5,
    date: { en: '1 month ago', ta: '1 மாதத்திற்கு முன்' },
    avatarBg: 'bg-sky-600',
    initials: 'SK',
    text: {
      en: 'Visited for Patta transfer and Income Certificate for my son’s college admission. They checked all documents on the spot and submitted the application instantly. Got my certificate verified without multiple office visits.',
      ta: 'என் மகனின் கல்லூரி சேர்க்கைக்கான வருமான சான்றிதழ் மற்றும் பட்டா மாறுதலுக்குச் சென்றேன். ஆவணங்களை உடனுக்குடன் சரிபார்த்து விண்ணப்பித்தனர். அலுவலகங்களுக்கு அலையாமல் சான்றிதழ் கிடைத்தது.'
    }
  },
  {
    id: 't3',
    name: 'A. Syed Ibrahim',
    location: { en: 'Kattumavadi', ta: 'காட்டுமாவடி' },
    service: { en: 'Saudi Airline Ticket & Medical', ta: 'சவுதி ஏர் டிக்கெட் & மெடிக்கல்' },
    rating: 5,
    date: { en: '3 weeks ago', ta: '3 வாரங்களுக்கு முன்' },
    avatarBg: 'bg-amber-600',
    initials: 'SI',
    text: {
      en: 'Booked flights to Dammam with extra baggage allowance and got medical GAMCA appointment assistance. Best prices on East Coast Road with transparent charges and direct WhatsApp support.',
      ta: 'தம்மாம் செல்வதற்கான ஏர் டிக்கெட் மற்றும் GAMCA மருத்துவ அப்பாயிண்ட்மெண்ட் முன்பதிவு செய்தேன். ஈஸ்ட் கோஸ்ட் ரோட்டில் நியாயமான கட்டணத்தில் துல்லியமான வழிகாட்டுதல் கிடைத்தது.'
    }
  },
  {
    id: 't4',
    name: 'K. Selvakumar',
    location: { en: 'Aranthangi', ta: 'அறந்தாங்கி' },
    service: { en: 'New PAN Card & Correction', ta: 'புதிய பான் கார்டு & திருத்தம்' },
    rating: 5,
    date: { en: '1 month ago', ta: '1 மாதத்திற்கு முன்' },
    avatarBg: 'bg-indigo-600',
    initials: 'KS',
    text: {
      en: 'My Aadhaar-PAN link had a name spelling mismatch. Haashiya Air Travels rectified the correction request online within a few minutes and I got my updated e-PAN card promptly.',
      ta: 'என் ஆதார்-பான் இணைப்பில் பெயர் பிழை இருந்தது. ஆன்லைனில் உடனடியாக திருத்தம் செய்து இ-பான் கார்டைப் பெற உதவினர். மிக்க நன்றி!'
    }
  },
  {
    id: 't5',
    name: 'R. Farzana Begum',
    location: { en: 'Mimisal ECR', ta: 'மிமிசால் இசிஆர்' },
    service: { en: 'Marriage Registration & Attestation', ta: 'திருமண பதிவு & சான்றிதழ் சான்றொப்பம்' },
    rating: 5,
    date: { en: '2 months ago', ta: '2 மாதங்களுக்கு முன்' },
    avatarBg: 'bg-rose-600',
    initials: 'FB',
    text: {
      en: 'Extremely polite staff who speak both Tamil and English fluently. They guided us step-by-step through marriage registration paperwork and document attestation for visa submission.',
      ta: 'தமிழ் மற்றும் ஆங்கிலத்தில் மிகத் தெளிவாக வழிகாட்டினார்கள். திருமண பதிவு ஆவணங்கள் மற்றும் சான்றொப்ப பணிகளை மிகவும் நேர்த்தியாக முடித்துத் தந்தனர்.'
    }
  }
];

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-b from-sky-50/80 via-white to-slate-50 text-slate-900 relative overflow-hidden border-t border-b border-slate-200/80">
      {/* Background Decorative Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ta' ? 'வாடிக்கையாளர் கருத்துக்கள்' : 'Local Client Feedback'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ta' ? (
              <>
                எங்கள் வாடிக்கையாளர்களின் <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-700">நம்பிக்கை நிறை அனுபவங்கள்</span>
              </>
            ) : (
              <>
                Trusted by Local Families Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-700">East Coast Road</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'ta'
              ? 'மிமிசால், மணமேல்குடி, காட்டுமாவடி மற்றும் சுற்றியுள்ள பகுதிகளைச் சேர்ந்த மக்கள் எங்கள் சேவைகளைப் பற்றி என்ன கூறுகிறார்கள்?'
              : 'Real feedback from customers in Mimisal, Manamelkudi, Kattumavadi, and Aranthangi who rely on us for passports, visas, and e-Sevai.'}
          </p>
        </div>

        {/* Main Slider Container */}
        <div 
          className="mt-12 max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
            
            {/* Top Bar with Star Rating & Verification */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  5.0 Rating
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ta' ? 'சரிபார்க்கப்பட்ட சேவையாளி' : 'Verified Local Customer'}</span>
              </div>
            </div>

            {/* Testimonial Content with Motion Slide */}
            <div className="py-8 min-h-[200px] flex flex-col justify-center relative">
              <Quote className="absolute -top-2 left-0 w-12 h-12 text-slate-200 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="space-y-6 relative z-10"
                >
                  <p className="text-slate-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic">
                    "{activeTestimonial.text[lang]}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      {/* Avatar Circle */}
                      <div className={`w-12 h-12 rounded-2xl ${activeTestimonial.avatarBg} text-white font-extrabold flex items-center justify-center text-base shadow-md shrink-0`}>
                        {activeTestimonial.initials}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {activeTestimonial.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1 text-slate-700 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            {activeTestimonial.location[lang]}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">
                            {activeTestimonial.service[lang]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                      {activeTestimonial.date[lang]}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Slider Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev/Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Bottom WhatsApp Direct Feedback CTA */}
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs text-slate-600 font-semibold">
              {lang === 'ta' ? 'எங்கள் சேவையைப் பயன்படுத்தி திருப்தி அடைந்தீர்களா?' : 'Have you processed documents with us recently?'}
            </span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Haashiya Air Travels, I would like to leave feedback regarding my service.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் உங்கள் அனுபவத்தைப் பகிர்ந்து கொள்ளவும்' : 'Share your feedback on WhatsApp'}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
