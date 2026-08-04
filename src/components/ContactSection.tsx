import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Building2 } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/servicesData';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceNeeded: SERVICES_DATA[0].title.en,
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setFormSubmitted(true);
  };

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'ta'
        ? `வணக்கம் ஹாஷியா டிராவல்ஸ்,\n\nபெயர்: ${formData.name}\nபோன்: ${formData.phone}\nதேவையான சேவை: ${formData.serviceNeeded}\nசெய்தி: ${formData.message || 'விவரங்கள் அறிய விரும்புகிறேன்.'}`
        : `Hi Haashiya Air Travels,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService Needed: ${formData.serviceNeeded}\nMessage: ${formData.message || 'I would like to inquire about this service.'}`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {lang === 'ta' ? 'தொடர்பு கொள்ள' : 'Contact Us & Visit Office'}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ta' ? (
              <>
                மிமிசால் அலுவலகத்தை <span className="text-emerald-700">நேரில் அல்லது போனில்</span> தொடர்பு கொள்ளலாம்
              </>
            ) : (
              <>
                Visit Our Office or Send an <span className="text-emerald-700">Instant Enquiry</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-base">
            {lang === 'ta'
              ? 'கிழக்கு கடற்கரை சாலையில் அமைந்துள்ள எங்கள் அலுவலகத்திற்கு வருகை தாருங்கள் அல்லது போன் மூலமாகவே ஆவண விவரங்களை அறிந்து கொள்ளுங்கள்.'
              : 'Located conveniently on East Coast Road, Mimisal. Feel free to call us, send a WhatsApp message, or drop by our office.'}
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Google Map */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ta' ? 'அலுவலக முகவரி' : 'Office Location'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-sky-700 hover:underline pt-1"
                >
                  {lang === 'ta' ? 'மேப்பில் வழிபார்க்க →' : 'View on Google Maps →'}
                </a>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ta' ? 'தொலைபேசி / வாட்ஸ்அப்' : 'Phone & WhatsApp'}
                </h3>
                <p className="text-xs font-extrabold text-emerald-700">
                  {BUSINESS_INFO.formattedPhone}
                </p>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ta' ? 'மின்னஞ்சல்: ' : 'Email: '}{BUSINESS_INFO.email}
                </p>
              </div>

            </div>

            {/* Business Hours Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'ta' ? 'வேலை நேரங்கள்' : 'Working Hours'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {lang === 'ta' ? BUSINESS_INFO.workingHours.ta : BUSINESS_INFO.workingHours.weekdays}
                </p>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-64">
              <iframe
                title="Haashiya Air Travels Mimisal Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15730.0!2d79.13!3d9.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0033c46b1a238f%3A0x6a1a1a1a1a1a1a1a!2sMimisal%2C%20Tamil%20Nadu%20614621!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
            
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    {lang === 'ta' ? 'ஆன்லைன் தகவல் படிவம்' : 'Send Direct Enquiry'}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  {lang === 'ta'
                    ? 'உங்கள் பெயர் மற்றும் விவரங்களை உள்ளிடுங்கள். நாங்கள் உடனே தொடர்பு கொள்கிறோம்.'
                    : 'Fill in your details below to request a callback or instant quote.'}
                </p>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ta' ? 'உங்கள் பெயர் *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'ta' ? 'எ.கா. முகமது ரஃபி' : 'e.g. John Doe'}
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors font-medium"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ta' ? 'தொலைபேசி எண் (WhatsApp) *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="99525XXXXX"
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors font-medium"
                  />
                </div>

                {/* Service Needed */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ta' ? 'தேவையான சேவை' : 'Service Needed'}
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors font-medium"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title.en}>
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ta' ? 'கூடுதல் செய்தி (விருப்பமானால்)' : 'Message / Details (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'ta' ? 'உங்கள் சந்தேகங்களை இங்கே எழுதலாம்...' : 'Mention any specific requirement...'}
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors font-medium"
                  ></textarea>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md"
                  >
                    {lang === 'ta' ? 'விவரங்களை சமர்ப்பிக்க' : 'Submit Enquiry'}
                  </button>
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'ta' ? 'நன்றி! உங்கள் மனு பெறப்பட்டது' : 'Enquiry Sent Successfully!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  {lang === 'ta'
                    ? 'மிமிசால் ஹாஷியா ஏர் டிராவல்ஸ் குழுவினர் உங்கள் எண்ணிற்கு உடனே தொடர்புகொள்வார்கள்.'
                    : 'Thank you for reaching out. Our Mimisal office staff will call you shortly.'}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={sendToWhatsApp}
                    className="py-3 px-6 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் செய்தி அனுப்ப' : 'Send Copy on WhatsApp'}</span>
                  </button>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="py-3 px-4 bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                  >
                    {lang === 'ta' ? 'மீண்டும் அனுப்ப' : 'Send Another'}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
