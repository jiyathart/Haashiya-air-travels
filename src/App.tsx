import React, { useState, useEffect } from 'react';
import { Language, ServiceItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceFinderTool } from './components/ServiceFinderTool';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { QuickContactBar } from './components/QuickContactBar';
import { DocumentChecklistModal } from './components/DocumentChecklistModal';
import { GoogleFormsSection } from './components/GoogleFormsSection';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'finder', 'google-forms', 'why-us', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner & Floating Bar */}
      <QuickContactBar lang={lang} />

      {/* Main Header */}
      <Header lang={lang} setLang={setLang} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero 
          lang={lang} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSearchSubmit={handleSearchSubmit} 
        />

        <ServicesSection 
          lang={lang} 
          onSelectService={(service) => setSelectedService(service)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ServiceFinderTool 
          lang={lang} 
          onSelectService={(service) => setSelectedService(service)} 
        />

        <GoogleFormsSection lang={lang} />

        <WhyChooseUs lang={lang} />

        <AboutSection lang={lang} />

        <TestimonialsSection lang={lang} />

        <ContactSection lang={lang} />

        <FAQSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Modal for Document Checklist */}
      <DocumentChecklistModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        lang={lang} 
      />
    </div>
  );
}
