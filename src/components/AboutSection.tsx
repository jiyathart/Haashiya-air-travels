import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, CheckCircle2, ShieldCheck, HeartHandshake, Building2 } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-sky-50/60 text-slate-900 relative overflow-hidden border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: About Narrative */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ta' ? 'எங்களைப் பற்றி' : 'About Haashiya Air Travels'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {lang === 'ta' ? (
                <>
                  மிமிசாலில் உங்கள் <span className="text-emerald-700">நம்பிக்கையான</span> சேவை மையம்
                </>
              ) : (
                <>
                  Your Trusted Agency on <span className="text-emerald-700">East Coast Road, Mimisal</span>
                </>
              )}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              {lang === 'ta' 
                ? 'ஹாஷியா ஏர் டிராவல்ஸ் & இ-சேவை மையம், மிமிசால் மற்றும் சுற்றியுள்ள கடலோர கிராம மக்களுக்கு பாஸ்போர்ட், வெளிநாட்டு விசா, விமான டிக்கெட்டுகள் மற்றும் தமிழக அரசின் மின் ஆளுமை சான்றிதழ்கள் வழங்கும் முதன்மை முகமையாகும்.'
                : 'Haashiya Air Travels is a premier local travel agency and Common Service Center (CSC) located at East Coast Road, Mimisal. We specialize in making government paperwork, passport processing, and overseas travel ticketing straightforward, transparent, and hassle-free.'}
            </p>

            {/* Storefront Photography Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group my-4 bg-white">
              <img
                src="https://lh3.googleusercontent.com/grass-cs/ACvplmMY3U4zzorc2e1tKEF_AIf51LgjrVBUBoRD7MLadu3Cug7YVqftw4xHrWTdH88PK9bVSIkiIxD4pQsh0JOl1yS1KOWGgaOo5_aAO7C1rSfVeIKFR2hNpx8qER2FjCG0J0ubvO0_k5krpCTv=s680-w680-h510-rw"
                alt="Haashiya Air Travels Mimisal Office Storefront"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
                <span className="flex items-center gap-1.5 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-700 backdrop-blur-md shadow-md">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  {lang === 'ta' ? 'மிமிசால் அலுவலகம்' : 'Haashiya Office • Mimisal'}
                </span>
                <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                  East Coast Road
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {lang === 'ta'
                ? 'எங்கள் வாடிக்கையாளர்களுக்கு மிகத் துல்லியமான வழிகாட்டுதலை வழங்கி, பாஸ்போர்ட் விண்ணப்பங்கள் முதல் இ-சேவை சான்றிதழ்கள் வரை அனைத்து சேவைகளையும் குறித்த காலத்தில் பூர்த்தி செய்வதே எங்கள் நோக்கம்.'
                : 'Whether you are applying for your first passport, booking urgent Tatkal slots, securing GCC medical appointments, or updating your PAN and Patta details, our team offers personalized step-by-step guidance in Tamil and English.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2 text-sm">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">{lang === 'ta' ? 'முகவரி' : 'Address'}</p>
                  <p className="font-bold text-slate-900 mt-0.5 text-xs sm:text-sm">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">{lang === 'ta' ? 'தொலைபேசி' : 'Phone / WhatsApp'}</p>
                  <p className="font-bold text-slate-900 mt-0.5 text-xs sm:text-sm">{BUSINESS_INFO.phone}</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Key Commitments Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {lang === 'ta' ? 'எங்கள் உறுதிமொழி' : 'Our Service Commitments'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Haashiya Air Travels • Mimisal</p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold">
                    {lang === 'ta' ? '100% பாதுகாப்பான ஆவண பராமரிப்பு' : '100% Safe & Confidential Document Handling'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold">
                    {lang === 'ta' ? 'வெளிப்படையான மற்றும் நியாயமான கட்டணம்' : 'Transparent & Honest Pricing Guarantee'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold">
                    {lang === 'ta' ? 'உடனடி வாட்ஸ்அப் அறிவிப்புகள்' : 'Direct WhatsApp Updates on Application Status'}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold">
                    {lang === 'ta' ? 'தமிழ் மற்றும் ஆங்கில வழி உதவி' : 'Friendly Assistance in Tamil & English'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <a
                  href={`tel:+91${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'ta' ? 'அலுவலகத்தை தொடர்பு கொள்ள' : 'Contact Office Directly'}</span>
                </a>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

