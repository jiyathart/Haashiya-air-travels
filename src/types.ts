export type Language = 'en' | 'ta';

export type ServiceCategory = 
  | 'passport' 
  | 'travel' 
  | 'medical' 
  | 'eservices' 
  | 'registration';

export interface RequiredDocument {
  name: { en: string; ta: string };
  isMandatory: boolean;
  note?: { en: string; ta: string };
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: { en: string; ta: string };
  shortDesc: { en: string; ta: string };
  detailedDesc: { en: string; ta: string };
  iconName: string;
  popular?: boolean;
  processingTime: { en: string; ta: string };
  documents: RequiredDocument[];
  whatsappMessage: { en: string; ta: string };
}

export interface FAQItem {
  question: { en: string; ta: string };
  answer: { en: string; ta: string };
  category?: string;
}

export interface CounterStat {
  id: string;
  value: number;
  suffix: string;
  label: { en: string; ta: string };
  icon: string;
}
