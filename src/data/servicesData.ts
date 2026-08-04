import { ServiceItem, FAQItem, CounterStat } from '../types';

export const BUSINESS_INFO = {
  name: "Haashiya Air Travels",
  tagline: {
    en: "Passport, Visa & Government e-Sevai Center",
    ta: "பாஸ்போர்ட், விசா & அரசு இ-சேவை மையம்"
  },
  address: "No. 5/608, East Coast Road, Mimisal, 614621, Tamil Nadu",
  landmark: "Near Bus Stand / East Coast Road Main Road",
  phone: "9952595090",
  formattedPhone: "+91 99525 95090",
  whatsappNumber: "919952595090",
  email: "haashiyacsc@gmail.com",
  gst: "33AABCH1234F1Z1 (Provided on Invoice)",
  workingHours: {
    weekdays: "Monday - Saturday: 8:30 AM - 8:30 PM",
    sunday: "Sunday: 9:00 AM - 2:00 PM (Prior Appointment)",
    ta: "திங்கள் - சனி: காலை 8:30 - இரவு 8:30"
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mimisal+East+Coast+Road+614621"
};

export const SERVICES_DATA: ServiceItem[] = [
  // A. PASSPORT SERVICES
  {
    id: 'pcc-certificate',
    category: 'passport',
    title: {
      en: 'PCC (Police Clearance Certificate)',
      ta: 'PCC (காவல்துறை சான்றிதழ்)'
    },
    shortDesc: {
      en: 'Fast PCC application and appointment scheduling for Gulf, European & overseas employment or residency.',
      ta: 'வெளிநாட்டு வேலை மற்றும் விசா தேவைகளுக்கான விரைவான PCC விண்ணப்ப சேவை.'
    },
    detailedDesc: {
      en: 'Complete guidance for Police Clearance Certificate (PCC) through Passport Seva Kendra. We handle appointment booking, documentation check, and status tracking.',
      ta: 'பாஸ்போர்ட் சேவா கேந்திரா மூலம் காவல்துறை சான்றிதழ் பெறுவதற்கான முழுமையான உதவி.'
    },
    iconName: 'ShieldCheck',
    popular: true,
    processingTime: { en: '3 - 7 Working Days', ta: '3 - 7 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Original Valid Passport', ta: 'அசல் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: 'Aadhaar Card or Address Proof', ta: 'ஆதார் கார்டு / முகவரி சான்று' }, isMandatory: true },
      { name: { en: 'Employment Offer Letter / Visa Copy (if applicable)', ta: 'வேலை வாய்ப்பு கடிதம் / விசா நகல்' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to apply for PCC (Police Clearance Certificate). Please advise.',
      ta: 'வணக்கம், நான் PCC சான்றிதழுக்கு விண்ணப்பிக்க விரும்புகிறேன். விவரங்கள் அனுப்பவும்.'
    }
  },
  {
    id: 'new-passport',
    category: 'passport',
    title: {
      en: 'New Passport Application',
      ta: 'புதிய பாஸ்போர்ட் விண்ணப்பம்'
    },
    shortDesc: {
      en: 'Hassle-free application for fresh adult passports with document verification and PSK slot booking.',
      ta: 'புதிய பாஸ்போர்ட்டிற்கு தேவையான ஆவணங்கள் சரிபார்த்தல் மற்றும் அப்பாயிண்ட்மென்ட் முன் பதிவு.'
    },
    detailedDesc: {
      en: 'Complete end-to-end service for fresh passport applications. From online form submission to photo specification check and PSK appointment booking in Trichy / Madurai / Tanjore.',
      ta: 'புதிய பாஸ்போர்ட் விண்ணப்பம், ஆவணங்கள் சரிபார்த்தல் மற்றும் திருச்சி/மதுரை மையத்தில் அப்பாயிண்ட்மென்ட் பதிவு.'
    },
    iconName: 'BookOpen',
    popular: true,
    processingTime: { en: '7 - 15 Working Days', ta: '7 - 15 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Aadhaar Card (Linked with Mobile Number)', ta: 'ஆதார் கார்டு (மொபைல் எண் இணைப்புடன்)' }, isMandatory: true },
      { name: { en: '10th / 12th Marksheet (for ECNR status)', ta: '10 / 12 ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்' }, isMandatory: true },
      { name: { en: 'Bank Passbook or Voter ID / Driving License', ta: 'வங்கி கணக்கு புத்தகம் / வாக்காளர் அட்டை' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need assistance applying for a New Passport. Please share the procedure.',
      ta: 'வணக்கம், புதிய பாஸ்போர்ட் விண்ணப்பிக்க உதவி தேவை. விவரங்கள் தரவும்.'
    }
  },
  {
    id: 'passport-renewal',
    category: 'passport',
    title: {
      en: 'Passport Renewal / Re-issue',
      ta: 'பாஸ்போர்ட் புதுப்பித்தல் (Renewal)'
    },
    shortDesc: {
      en: 'Renew expiring or expired passports or re-issue due to page exhaustion or damage.',
      ta: 'காலாவதியான அல்லது பக்கங்கள் முடிந்த பாஸ்போர்ட்டை புதுப்பிக்கும் சேவை.'
    },
    detailedDesc: {
      en: 'Quick renewal service before passport expiry or after expiration. We ensure smooth processing and slot booking at nearest PSK.',
      ta: 'பாஸ்போர்ட் காலாவதியாகும் முன்னரோ அல்லது காலாவதியான பின்னரோ புதுப்பிப்பதற்கான விரைவான சேவை.'
    },
    iconName: 'RefreshCw',
    popular: false,
    processingTime: { en: '5 - 10 Working Days', ta: '5 - 10 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Old Original Passport', ta: 'பழைய அசல் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: 'Aadhaar Card', ta: 'ஆதார் கார்டு' }, isMandatory: true },
      { name: { en: 'Proof of Address (if address changed)', ta: 'முகவரி மாற்ற சான்று (தேவையெனில்)' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, my passport is expiring soon. I want to renew my passport.',
      ta: 'வணக்கம், எனது பாஸ்போர்ட் புதுப்பிக்க வேண்டும். உதவவும்.'
    }
  },
  {
    id: 'tatkal-passport',
    category: 'passport',
    title: {
      en: 'Tatkal Passport (Urgent)',
      ta: 'தட்கல் பாஸ்போர்ட் (அவசர பாஸ்போர்ட்)'
    },
    shortDesc: {
      en: 'Express passport processing under Tatkal scheme for urgent emergency travel needs.',
      ta: 'அவசர வெளிநாட்டு பயணங்களுக்கு தட்கல் முறையில் மிக விரைவாக பாஸ்போர்ட் பெறும் சேவை.'
    },
    detailedDesc: {
      en: 'Urgent Tatkal passport booking for immediate emergency travel, employment, or medical requirements. Priority slot booking guaranteed.',
      ta: 'அவசர வெளிநாட்டு வேலை அல்லது மருத்துவ தேவைக்காக உடனடி தட்கல் அப்பாயிண்ட்மென்ட் முன் பதிவு.'
    },
    iconName: 'Zap',
    popular: true,
    processingTime: { en: '1 - 3 Working Days', ta: '1 - 3 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Aadhaar Card', ta: 'ஆதார் கார்டு' }, isMandatory: true },
      { name: { en: 'PAN Card / Voter ID', ta: 'பான் கார்டு / வாக்காளர் அட்டை' }, isMandatory: true },
      { name: { en: 'Bank Passbook / Annexure Proof', ta: 'வங்கி கணக்கு புத்தகம்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need an urgent Tatkal Passport. Please guide me immediately.',
      ta: 'வணக்கம், எனக்கு அவசரமாக தட்கல் பாஸ்போர்ட் தேவைப்படுகிறது. உடனடி உதவி கோருகிறேன்.'
    }
  },
  {
    id: 'passport-correction',
    category: 'passport',
    title: {
      en: 'Passport Correction & Name Change',
      ta: 'பாஸ்போர்ட் திருத்தம் & பெயர் மாற்றம்'
    },
    shortDesc: {
      en: 'Correct name, DOB, address, spouse name, or parent name in your existing passport.',
      ta: 'பாஸ்போர்ட்டில் பெயர், பிறந்த தேதி, முகவரி, துணைவர் பெயர் திருத்தம் செய்யும் சேவை.'
    },
    detailedDesc: {
      en: 'Assistance for official corrections in passport records including name spelling, date of birth, marital status update, or address modification.',
      ta: 'பாஸ்போர்ட்டில் உள்ள பிழைகளை திருத்துவதற்கும் புதிய தகவல்களை புதுப்பிப்பதற்குமான சேவை.'
    },
    iconName: 'FileEdit',
    popular: false,
    processingTime: { en: '7 - 12 Working Days', ta: '7 - 12 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Original Passport', ta: 'அசல் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: 'Supporting Proof for Correction (Gazette / Marriage Certificate / School TC)', ta: 'திருத்தத்திற்கான ஆதார சான்றிதழ்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need to make corrections in my passport. Please provide details.',
      ta: 'வணக்கம், எனது பாஸ்போர்ட்டில் தகவல் திருத்தம் செய்ய வேண்டும்.'
    }
  },
  {
    id: 'ecnr-status',
    category: 'passport',
    title: {
      en: 'ECNR / Non-ECNR Conversion',
      ta: 'ECNR / Non-ECNR மாற்றம்'
    },
    shortDesc: {
      en: 'Update Emigration Check Not Required status for hassle-free overseas employment travel.',
      ta: 'குடியேற்ற சோதனை தேவையில்லை (ECNR) அந்தஸ்து பாஸ்போர்ட்டில் சேர்க்கும் சேவை.'
    },
    detailedDesc: {
      en: 'Convert ECR passport to Non-ECNR status using 10th/12th certificate or 3-year tax/emigration proof.',
      ta: '10-ம் வகுப்பு அல்லது 3 வருட வருமான வரி சான்றிதழ் மூலம் ECNR ஆக மாற்றும் சேவை.'
    },
    iconName: 'UserCheck',
    popular: false,
    processingTime: { en: '5 - 8 Working Days', ta: '5 - 8 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Original Passport', ta: 'அசல் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: '10th Pass Certificate or SSLC Marksheet', ta: '10-ம் வகுப்பு தேர்ச்சி சான்றிதழ்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to change my passport from ECR to Non-ECNR.',
      ta: 'வணக்கம், எனது பாஸ்போர்ட்டை Non-ECNR ஆக மாற்ற வேண்டும்.'
    }
  },
  {
    id: 'child-passport',
    category: 'passport',
    title: {
      en: 'Minor / Child Passport',
      ta: 'குழந்தைகள் பாஸ்போர்ட்'
    },
    shortDesc: {
      en: 'Passport booking for newborns, infants, and minors under 18 years.',
      ta: '18 வயதுக்கு உட்பட்ட குழந்தைகள் மற்றும் பிறந்த குழந்தைகளுக்கான பாஸ்போர்ட் விண்ணப்பம்.'
    },
    detailedDesc: {
      en: 'Specialized application for infants and minors with Annexure D declaration and parent passport verification.',
      ta: 'குழந்தைகளுக்கான பாஸ்போர்ட் விண்ணப்பம் மற்றும் பெற்றோர் ஆவணங்கள் சரிபார்த்தல்.'
    },
    iconName: 'Baby',
    popular: false,
    processingTime: { en: '5 - 10 Working Days', ta: '5 - 10 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Child Birth Certificate', ta: 'குழந்தையின் பிறப்பு சான்றிதழ்' }, isMandatory: true },
      { name: { en: 'Parents Original Passports', ta: 'பெற்றோரின் அசல் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: 'Parents Aadhaar Cards', ta: 'பெற்றோரின் ஆதார் அட்டை' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to apply for a child/minor passport.',
      ta: 'வணக்கம், குழந்தைக்கு பாஸ்போர்ட் விண்ணப்பிக்க வேண்டும்.'
    }
  },

  // B. TRAVEL & VISA
  {
    id: 'airline-ticketing',
    category: 'travel',
    title: {
      en: 'Airline Ticketing (Domestic & International)',
      ta: 'விமான பயண சீட்டு பதிவு (Ticketing)'
    },
    shortDesc: {
      en: 'Best fare booking for Gulf flights (Saudi, UAE, Qatar, Kuwait, Oman), Malaysia, Singapore & Worldwide.',
      ta: 'சவூதி, துபாய், குவைத், மலேசியா, சிங்கப்பூர் போன்ற நாடுகளுக்கு குறைந்த கட்டணத்தில் விமான டிக்கெட்.'
    },
    detailedDesc: {
      en: 'Instant airline ticket reservation with lowest fare guarantee, baggage allowance check, seat selection, and date reissuance assistance.',
      ta: 'குறைந்த கட்டணத்தில் அனைத்து உள்நாட்டு மற்றும் சர்வதேச விமான டிக்கெட்டுகள் பதிவு செய்து தரப்படும்.'
    },
    iconName: 'Plane',
    popular: true,
    processingTime: { en: 'Instant / Same Day', ta: 'உடனடி சேவை' },
    documents: [
      { name: { en: 'Passport Copy (First & Last Page)', ta: 'பாஸ்போர்ட் நகல்' }, isMandatory: true },
      { name: { en: 'Travel Dates & Destination', ta: 'பயண தேதி மற்றும் சேருமிடம்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to check flight ticket rates for my travel.',
      ta: 'வணக்கம், விமான டிக்கெட் விலை நிலவரம் அறிய விரும்புகிறேன்.'
    }
  },
  {
    id: 'visa-processing',
    category: 'travel',
    title: {
      en: 'Visa Processing (All Countries)',
      ta: 'விசா விண்ணப்ப சேவை (அனைத்து நாடுகள்)'
    },
    shortDesc: {
      en: 'Tourist, Employment, Family Visit & Business Visa services for UAE, Saudi, Qatar, Kuwait, Oman, Malaysia, Singapore & Europe.',
      ta: 'சுற்றுலா விசா, குடும்ப விசா, வேலை விசா விண்ணப்ப சேவைகள்.'
    },
    detailedDesc: {
      en: 'End-to-end visa consultation, document drafting, online visa application submission, VFS slot booking, and tourist e-visa delivery.',
      ta: 'அனைத்து வெளிநாடுகளுக்கான சுற்றுலா விசா மற்றும் வேலை விசா விண்ணப்ப உதவி.'
    },
    iconName: 'Globe',
    popular: true,
    processingTime: { en: '2 - 7 Working Days', ta: '2 - 7 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Valid Passport (6+ Months Expiry)', ta: 'செல்லுபடியாகும் பாஸ்போர்ட்' }, isMandatory: true },
      { name: { en: 'White Background Photos', ta: 'பாஸ்போர்ட் அளவு புகைப்படங்கள்' }, isMandatory: true },
      { name: { en: 'Pan / Bank Statement (if required)', ta: 'பான் / வங்கி கணக்கு விவரம்' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need visa processing assistance for overseas travel.',
      ta: 'வணக்கம், வெளிநாட்டு விசா விண்ணப்பிக்க உதவி தேவை.'
    }
  },

  // C. MEDICAL & CERTIFICATION
  {
    id: 'medical-appointment',
    category: 'medical',
    title: {
      en: 'Medical Appointment Booking (GAMCA / Wafid)',
      ta: 'மருத்துவ பரிசோதனை முன் பதிவு (GAMCA / Wafid Medical)'
    },
    shortDesc: {
      en: 'Online booking for GCC Medical (GAMCA/Wafid) slip for Gulf employment visas (Saudi, Kuwait, Oman, UAE, Bahrain, Qatar).',
      ta: 'சவூதி, குவைத், ஓமன் வேலை விசாவிற்கான GAMCA/Wafid மருத்துவ அப்பாயிண்ட்மென்ட் ஸ்லிப்.'
    },
    detailedDesc: {
      en: 'Instant generation of official Wafid / GAMCA medical appointment slips for overseas employment medical tests at authorized centers.',
      ta: 'வளைகுடா வேலை விசாவிற்கான அங்கீகரிக்கப்பட்ட மருத்துவ மையங்களின் GAMCA ஸ்லிப் உடனே எடுத்து தரப்படும்.'
    },
    iconName: 'Stethoscope',
    popular: true,
    processingTime: { en: 'Instant / 1 Hour', ta: '1 மணி நேரத்தில்' },
    documents: [
      { name: { en: 'Passport Copy', ta: 'பாஸ்போர்ட் நகல்' }, isMandatory: true },
      { name: { en: 'City Preference for Medical Center (Trichy, Chennai, etc.)', ta: 'மருத்துவ மையம் அமைந்துள்ள நகரம்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need a GAMCA/Wafid Medical Appointment slip for Gulf visa.',
      ta: 'வணக்கம், GAMCA மருத்துவ அப்பாயிண்ட்மென்ட் ஸ்லிப் தேவைப்படுகிறது.'
    }
  },
  {
    id: 'certificate-attestation',
    category: 'medical',
    title: {
      en: 'Certificate Attestation (HRD, MEA, Apostille & Embassy)',
      ta: 'சான்றிதழ் சான்றொப்பம் (Attestation / Apostille)'
    },
    shortDesc: {
      en: 'Educational, Personal & Commercial document attestation for Gulf & international endorsement.',
      ta: 'கல்வி சான்றிதழ், திருமண சான்றிதழ், பிறப்பு சான்றிதழ் MEA/தூதரக சான்றொப்பம்.'
    },
    detailedDesc: {
      en: 'Complete attestation workflow including State HRD / Notary, Ministry of External Affairs (MEA), Apostille, and Embassy attestation (Saudi, UAE, Qatar, Kuwait).',
      ta: 'அரசு மற்றும் தூதரக அபோஸ்டைல் மற்றும் சான்றொப்பம் பெறும் சேவை.'
    },
    iconName: 'Award',
    popular: false,
    processingTime: { en: '7 - 15 Working Days', ta: '7 - 15 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Original Degree / Certificate', ta: 'அசல் சான்றிதழ்' }, isMandatory: true },
      { name: { en: 'Passport Copy', ta: 'பாஸ்போர்ட் நகல்' }, isMandatory: true },
      { name: { en: 'All Marksheets Copies', ta: 'மதிப்பெண் பட்டியல் நகல்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need certificate attestation for my educational/personal documents.',
      ta: 'வணக்கம், சான்றிதழ் அபோஸ்டைல்/அட்டெஸ்டேஷன் செய்ய வேண்டும்.'
    }
  },

  // D. E-SERVICES
  {
    id: 'pan-new',
    category: 'eservices',
    title: {
      en: 'New PAN Card Application',
      ta: 'புதிய பான் கார்டு (PAN Card) விண்ணப்பம்'
    },
    shortDesc: {
      en: 'Fast NSDL/UTI PAN card generation with e-PAN delivered via email in 24-48 hours.',
      ta: 'புதிய பான் கார்டு விண்ணப்பம். e-PAN 24-48 மணி நேரத்தில் மின்னஞ்சலில் பெறலாம்.'
    },
    detailedDesc: {
      en: 'Authorized NSDL / UTIITSL PAN card application service for individuals, minors, and businesses with instant biometric/OTP verification.',
      ta: 'விரைவான பான் கார்டு சேவை. ஆதார் எண் மூலம் உடனடி பான் கார்டு பதிவு.'
    },
    iconName: 'CreditCard',
    popular: true,
    processingTime: { en: '1 - 3 Days (e-PAN), 7 Days (Physical)', ta: '1 - 3 நாட்கள் (e-PAN)' },
    documents: [
      { name: { en: 'Aadhaar Card with correct Name & DOB', ta: 'ஆதார் கார்டு' }, isMandatory: true },
      { name: { en: 'Active Mobile Number for OTP', ta: 'செயலில் உள்ள மொபைல் எண்' }, isMandatory: true },
      { name: { en: '2 Passport Size Photos (if manual application)', ta: '2 பாஸ்போர்ட் புகைப்படங்கள்' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to apply for a New PAN Card.',
      ta: 'வணக்கம், புதிய பான் கார்டு விண்ணப்பிக்க வேண்டும்.'
    }
  },
  {
    id: 'pan-correction',
    category: 'eservices',
    title: {
      en: 'PAN Card Correction & Aadhaar Link',
      ta: 'பான் கார்டு திருத்தம் & ஆதார் இணைப்பு'
    },
    shortDesc: {
      en: 'Correction of name, photo, signature, father name, DOB, and mandatory PAN-Aadhaar linking.',
      ta: 'பான் கார்டில் பெயர், புகைப்பட திருத்தம் மற்றும் பான்-ஆதார் இணைப்பு.'
    },
    detailedDesc: {
      en: 'Update faulty PAN card details, request reprint of damaged cards, or complete mandatory PAN-Aadhaar linking.',
      ta: 'பான் கார்டு பிழை திருத்தம் மற்றும் பான்-ஆதார் இணைப்பு உதவி.'
    },
    iconName: 'FileCheck',
    popular: false,
    processingTime: { en: '3 - 7 Working Days', ta: '3 - 7 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Existing PAN Card Copy', ta: 'பான் கார்டு நகல்' }, isMandatory: true },
      { name: { en: 'Aadhaar Card Proof', ta: 'ஆதார் கார்டு' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need to correct my PAN card details / link PAN with Aadhaar.',
      ta: 'வணக்கம், பான் கார்டு திருத்தம் / பான்-ஆதார் இணைப்பு செய்ய வேண்டும்.'
    }
  },
  {
    id: 'esevai-tn',
    category: 'eservices',
    title: {
      en: 'e-Sevai TN Government Certificates',
      ta: 'தமிழ்நாடு அரசு இ-சேவை சான்றிதழ்கள்'
    },
    shortDesc: {
      en: 'Community, Income, Nativity, First Graduate, OBC, Legal Heir & Residence Certificates.',
      ta: 'சாதி சான்றிதழ், வருமான சான்றிதழ், இருப்பிட சான்றிதழ், வாரிசு சான்றிதழ்.'
    },
    detailedDesc: {
      en: 'Official TNeGA e-Sevai portal services for all government certificates, student scholarship proofs, Patta/Chitta view & download.',
      ta: 'தமிழ்நாடு மின் ஆளுமை முகமை (TNeGA) மூலம் அனைத்து அரசு சான்றிதழ்களும் உடனடியாக விண்ணப்பித்து தரப்படும்.'
    },
    iconName: 'Landmark',
    popular: true,
    processingTime: { en: '3 - 10 Working Days (Govt Approval)', ta: '3 - 10 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Aadhaar Card & Smart Ration Card', ta: 'ஆதார் கார்டு & குடும்ப அட்டை' }, isMandatory: true },
      { name: { en: 'Self Photo & Applicants Mobile Number', ta: 'புகைப்படம் & மொபைல் எண்' }, isMandatory: true },
      { name: { en: 'Parent / Old Certificate Copy (if available)', ta: 'பழைய சான்றிதழ் நகல்' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need assistance with e-Sevai Government Certificates (Community/Income/Patta).',
      ta: 'வணக்கம், அரசு இ-சேவை சான்றிதழ் (சாதி/வருமானம்/பட்டா) விண்ணப்பிக்க வேண்டும்.'
    }
  },
  {
    id: 'eb-service',
    category: 'eservices',
    title: {
      en: 'EB Electricity Board Services',
      ta: 'மின்சார வாரிய (EB) சேவைகள்'
    },
    shortDesc: {
      en: 'TANGEDCO EB online bill payments, name transfer applications, new service connection & tariff changes.',
      ta: 'EB மின் கட்டணம் செலுத்துதல், பெயர் மாற்றம், புதிய மின் இணைப்பு விண்ணப்பம்.'
    },
    detailedDesc: {
      en: 'TANGEDCO portal assistance for house & commercial electricity connection name transfers, tariff revision, and instant bill receipt download.',
      ta: 'மின்சார வாரிய பெயர் மாற்றம் மற்றும் புதிய கணெக்ஷன் விண்ணப்ப உதவி.'
    },
    iconName: 'ZapOff',
    popular: false,
    processingTime: { en: '1 - 7 Working Days', ta: '1 - 7 வேலை நாட்கள்' },
    documents: [
      { name: { en: 'Existing EB Consumer Number / Bill', ta: 'மின் நுகர்வோர் எண் / பில்' }, isMandatory: true },
      { name: { en: 'Property Sale Deed / Patta Copy (for Name Transfer)', ta: 'பத்திர நகல் / பட்டா (பெயர் மாற்றத்திற்கு)' }, isMandatory: true },
      { name: { en: 'Aadhaar Card', ta: 'ஆதார் கார்டு' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need help with EB Electricity Board service / Name Transfer.',
      ta: 'வணக்கம், EB மின் இணைப்பு பெயர் மாற்றம் / சேவை தேவைப்படுகிறது.'
    }
  },

  // E. REGISTRATION SERVICES
  {
    id: 'marriage-registration',
    category: 'registration',
    title: {
      en: 'Marriage Registration Assistance',
      ta: 'திருமண பதிவு வழிகாட்டுதல்'
    },
    shortDesc: {
      en: 'Sub-registrar office marriage registration document creation & online slot booking.',
      ta: 'சார்பதிவாளர் அலுவலக திருமண பதிவிற்கான படிவங்கள் மற்றும் ஆன்லைன் முன் பதிவு.'
    },
    detailedDesc: {
      en: 'Guidance and document preparation for Hindu Marriage Act / Special Marriage Act registration with Registrar office slot scheduling in Tamil Nadu.',
      ta: 'சார்பதிவாளர் அலுவலகத்தில் திருமண பதிவு செய்ய தேவையான ஆவணங்கள் தயாரிப்பு.'
    },
    iconName: 'HeartHandshake',
    popular: true,
    processingTime: { en: 'Slot Booking in 24 Hours', ta: '24 மணி நேரத்தில் ஸ்லாட்' },
    documents: [
      { name: { en: 'Groom & Bride Aadhaar, Passport / Age Proof', ta: 'மணமகன் & மணமகள் ஆதார், வயது சான்று' }, isMandatory: true },
      { name: { en: 'Marriage Invitation Card & Temple/Hall Receipt', ta: 'திருமண அழைப்பிதழ் & மண்டப ரசீது' }, isMandatory: true },
      { name: { en: '4 Passport Photos of Couple + 3 Witness ID Proofs', ta: 'தம்பதியர் புகைப்படம் & சாட்சிகள் ஆதார்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need guidance for Marriage Registration document submission.',
      ta: 'வணக்கம், திருமண பதிவு செய்வதற்கு வழிகாட்டுதல் தேவை.'
    }
  },
  {
    id: 'land-registration',
    category: 'registration',
    title: {
      en: 'Land Registration & EC Assistance',
      ta: 'நில பதிவு & வில்லங்க சான்று (EC)'
    },
    shortDesc: {
      en: 'Encumbrance Certificate (EC) download, Patta document verification & registration application draft.',
      ta: 'வில்லங்க சான்று (EC) பெறுதல், சிட்டா/பட்டா விவரங்கள் சரிபார்த்தல்.'
    },
    detailedDesc: {
      en: 'Online Star2 TN REGINET portal support for downloading Encumbrance Certificates (EC), Guideline value lookup, and deed drafting guidance.',
      ta: 'TN REGINET இணையதளம் மூலம் வில்லங்க சான்று மற்றும் வழிகாட்டி மதிப்பு சரிபார்த்தல்.'
    },
    iconName: 'FileSpreadsheet',
    popular: false,
    processingTime: { en: 'Instant to 2 Days', ta: 'உடனடி சேவை' },
    documents: [
      { name: { en: 'Survey Number / Village Name', ta: 'சர்வே எண் / கிராமத்தின் பெயர்' }, isMandatory: true },
      { name: { en: 'Previous Document Number (if available)', ta: 'பழைய பத்திர எண்' }, isMandatory: false }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I want to take Encumbrance Certificate (EC) / check Guideline value for property.',
      ta: 'வணக்கம், நில வில்லங்க சான்றிதழ் (EC) எடுக்க வேண்டும்.'
    }
  },
  {
    id: 'other-registration',
    category: 'registration',
    title: {
      en: 'Rental Agreement & Other Document Drafting',
      ta: 'வாடகை ஒப்பந்தம் & ஆவண தயாரிப்பு'
    },
    shortDesc: {
      en: 'Rental agreement preparation, affidavit drafting, power of attorney document assistance.',
      ta: 'வீடு வாடகை ஒப்பந்தம், பிரமாண பத்திரம், பொது அதிகார பத்திரம் தயாரித்தல்.'
    },
    detailedDesc: {
      en: 'Professional typing and legal document drafting for lease/rental agreements, notary affidavits, name change gazette submissions.',
      ta: 'வாடகை ஒப்பந்தம், பிரமாண பத்திரம் மற்றும் சட்டப்பூர்வ ஆவணங்கள் தயாரிக்கும் சேவை.'
    },
    iconName: 'FileText',
    popular: false,
    processingTime: { en: 'Same Day', ta: 'அதே நாளில்' },
    documents: [
      { name: { en: 'Owner & Tenant ID Proofs', ta: 'உரிமையாளர் & வாடகைதாரர் ஆதார்' }, isMandatory: true },
      { name: { en: 'Property Address & Rent Terms', ta: 'வாடகை தொகை & கால அளவு விவரங்கள்' }, isMandatory: true }
    ],
    whatsappMessage: {
      en: 'Hi Haashiya Travels, I need assistance drafting a Rental Agreement / Legal Affidavit.',
      ta: 'வணக்கம், வாடகை ஒப்பந்தம் / பிரமாண பத்திரம் தயாரிக்க வேண்டும்.'
    }
  }
];

export const STATS_DATA: CounterStat[] = [
  {
    id: 'clients',
    value: 12500,
    suffix: '+',
    label: { en: 'Satisfied Local Clients', ta: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்' },
    icon: 'Users'
  },
  {
    id: 'years',
    value: 14,
    suffix: '+ Years',
    label: { en: 'Trusted Service Experience', ta: 'ஆண்டுகள் நம்பிக்கையான சேவை' },
    icon: 'Award'
  },
  {
    id: 'passports',
    value: 8400,
    suffix: '+',
    label: { en: 'Passports & Visas Handled', ta: 'பாஸ்போர்ட் & விசா சேவைகள்' },
    icon: 'Plane'
  },
  {
    id: 'esevai',
    value: 25000,
    suffix: '+',
    label: { en: 'e-Sevai Govt Applications', ta: 'அரசு இ-சேவை மனுக்கள்' },
    icon: 'CheckCircle2'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: {
      en: 'How do I apply for a Passport at Haashiya Air Travels?',
      ta: 'ஹாஷியா ஏர் டிராவல்ஸில் பாஸ்போர்ட்டிற்கு எவ்வாறு விண்ணப்பிப்பது?'
    },
    answer: {
      en: 'Simply visit our office on East Coast Road, Mimisal with your original Aadhaar Card and education certificates. We will check your documents, submit the online application, and book your appointment slot at the nearest Passport Seva Kendra.',
      ta: 'உங்கள் ஆதார் கார்டு மற்றும் கல்விச் சான்றிதழ்களுடன் மிமிசால் கிழக்கு கடற்கரை சாலையில் உள்ள எங்கள் அலுவலகத்திற்கு வாருங்கள். நாங்கள் உங்கள் ஆவணங்களை சரிபார்த்து ஆன்லைனில் விண்ணப்பித்து அப்பாயிண்ட்மென்ட் ஸ்லாட் பதிவு செய்து தருவோம்.'
    }
  },
  {
    question: {
      en: 'How long does a Tatkal Passport take?',
      ta: 'தட்கல் பாஸ்போர்ட் கிடைக்க எத்தனை நாட்கள் ஆகும்?'
    },
    answer: {
      en: 'Tatkal passports are dispatched within 1 to 3 working days after successful appointment verification at Passport Seva Kendra.',
      ta: 'பாஸ்போர்ட் சேவா கேந்திரா சரிபார்ப்பிற்கு பிறகு 1 முதல் 3 வேலை நாட்களுக்குள் தட்கல் பாஸ்போர்ட் அனுப்பி வைக்கப்படும்.'
    }
  },
  {
    question: {
      en: 'Can I get PAN card and e-Sevai certificates on the same day?',
      ta: 'பான் கார்டு மற்றும் இ-சேவை சான்றிதழ்களை ஒரே நாளில் பெற முடியுமா?'
    },
    answer: {
      en: 'For PAN card, e-PAN is generated in 24 to 48 hours. For e-Sevai certificates (Community/Income), online applications are processed immediately and sent to VAO/Tahsildar for digital approval.',
      ta: 'பான் கார்டு e-PAN 24-48 மணி நேரத்தில் பெறலாம். இ-சேவை சான்றிதழ்கள் ஆன்லைனில் உடனடியாக விண்ணப்பிக்கப்பட்டு VAO/வட்டாட்சியர் ஒப்புதலுக்கு அனுப்பப்படும்.'
    }
  },
  {
    question: {
      en: 'Do you offer assistance in Tamil?',
      ta: 'தமிழில் முழுமையான வழிகாட்டுதல் கிடைக்குமா?'
    },
    answer: {
      en: 'Yes! Our staff is 100% bilingual and provides friendly, clear, step-by-step guidance in both Tamil and English for all paperwork.',
      ta: 'ஆம்! எங்கள் அலுவலகத்தில் தமிழில் மிகத் தெளிவான, எளிமையான வழிகாட்டுதல் வழங்கப்படும்.'
    }
  }
];
