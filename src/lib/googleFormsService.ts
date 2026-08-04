export interface GoogleDriveFormFile {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export interface FormQuestionItem {
  title: string;
  required?: boolean;
  type?: 'text' | 'paragraph' | 'choice';
  options?: string[];
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  questions: FormQuestionItem[];
}

export interface FormResponseAnswer {
  questionTitle?: string;
  value?: string;
}

export interface FormResponseItem {
  responseId: string;
  createTime: string;
  answers: Record<string, string>;
}

// Pre-configured Agency Form Templates for Haashiya Air Travels & e-Sevai
export const AGENCY_FORM_TEMPLATES: FormTemplate[] = [
  {
    id: 'passport-intake',
    title: 'Passport Application Pre-Registration Form',
    description: 'Haashiya Air Travels, Mimisal - Collect applicant details for Fresh / Renewal Passport submission.',
    questions: [
      { title: 'Full Name (as per Aadhaar)', required: true, type: 'text' },
      { title: 'Phone Number / WhatsApp Number', required: true, type: 'text' },
      { title: 'Passport Service Type', required: true, type: 'choice', options: ['Fresh Passport (Normal)', 'Tatkal Passport', 'Passport Renewal / Re-issue', 'Child Passport'] },
      { title: 'Date of Birth (DD/MM/YYYY)', required: true, type: 'text' },
      { title: 'Full Residential Address in Mimisal / Pudukkottai District', required: true, type: 'paragraph' },
      { title: 'Educational Qualification', required: false, type: 'choice', options: ['10th Pass or Above (ECNR)', 'Below 10th (ECR)', 'Graduate', 'Illiterate'] }
    ]
  },
  {
    id: 'visa-intake',
    title: 'Overseas Visa & GCC Medical Pre-Intake',
    description: 'Haashiya Air Travels, Mimisal - Documents intake for Saudi, Qatar, UAE, Oman, Malaysia Visas.',
    questions: [
      { title: 'Applicant Full Name', required: true, type: 'text' },
      { title: 'Contact Phone / WhatsApp', required: true, type: 'text' },
      { title: 'Destination Country', required: true, type: 'choice', options: ['Saudi Arabia', 'United Arab Emirates (Dubai)', 'Qatar', 'Oman', 'Kuwait', 'Malaysia', 'Singapore'] },
      { title: 'Visa Type Required', required: true, type: 'choice', options: ['Work / Employment Visa', 'Visit / Tourist Visa', 'Family Visa', 'Umrah Visa', 'GCC Medical Appointment'] },
      { title: 'Current Passport Expiry Date', required: true, type: 'text' }
    ]
  },
  {
    id: 'esevai-intake',
    title: 'E-Sevai & Government Certificate Request',
    description: 'Haashiya CSC Centre, Mimisal - Apply for Income, Community, Nativity Certificates or Patta/Chitta.',
    questions: [
      { title: 'Applicant Name in Tamil / English', required: true, type: 'text' },
      { title: 'WhatsApp Contact Number', required: true, type: 'text' },
      { title: 'Certificate / Service Required', required: true, type: 'choice', options: ['Income Certificate (வருமான சான்றிதழ்)', 'Community Certificate (சாதி சான்றிதழ்)', 'Nativity Certificate (இருப்பிட சான்றிதழ்)', 'First Graduate (முதல் பட்டதாரி)', 'Patta / Chitta Transfer (பட்டா மாறுதல்)', 'PAN Card New / Correction'] },
      { title: 'Aadhaar Card Number', required: true, type: 'text' }
    ]
  },
  {
    id: 'flight-enquiry',
    title: 'Flight Ticket Booking Inquiry Form',
    description: 'Haashiya Air Travels, Mimisal - Request international or domestic flight ticket fare quote.',
    questions: [
      { title: 'Passenger Name(s)', required: true, type: 'text' },
      { title: 'WhatsApp Number for Quotation', required: true, type: 'text' },
      { title: 'Departure City / Airport', required: true, type: 'text' },
      { title: 'Destination Airport (e.g., Trichy to Riyadh, Chennai to Dubai)', required: true, type: 'text' },
      { title: 'Preferred Travel Date', required: true, type: 'text' },
      { title: 'Trip Type', required: true, type: 'choice', options: ['One-Way Flight', 'Round Trip'] }
    ]
  }
];

/**
 * List all Google Forms owned by or accessible to the user in Google Drive
 */
export async function listUserGoogleForms(accessToken: string): Promise<GoogleDriveFormFile[]> {
  try {
    const query = encodeURIComponent("mimeType='application/vnd.google-apps.form' and trashed=false");
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,createdTime,modifiedTime)&orderBy=modifiedTime%20desc`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Failed to list Google Forms');
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error fetching Google Forms:', error);
    throw error;
  }
}

/**
 * Create a new Google Form using Google Forms API v1
 */
export async function createGoogleForm(
  accessToken: string,
  title: string,
  description: string,
  questions: FormQuestionItem[]
): Promise<{ formId: string; responderUri: string }> {
  // Step 1: Create the empty form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title,
        documentTitle: title,
        description,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err.error?.message || 'Failed to create Google Form');
  }

  const formData = await createRes.json();
  const formId = formData.formId;
  const responderUri = formData.responderUri;

  // Step 2: Populate form questions via batchUpdate
  if (questions && questions.length > 0) {
    const requests = questions.map((q, idx) => {
      const item: any = {
        title: q.title,
        questionItem: {
          question: {
            required: !!q.required,
          },
        },
      };

      if (q.type === 'choice' && q.options && q.options.length > 0) {
        item.questionItem.question.choiceQuestion = {
          type: 'RADIO',
          options: q.options.map((opt) => ({ value: opt })),
        };
      } else {
        item.questionItem.question.textQuestion = {
          paragraph: q.type === 'paragraph',
        };
      }

      return {
        createItem: {
          item,
          location: { index: idx },
        },
      };
    });

    const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });

    if (!updateRes.ok) {
      console.warn('Batch update questions warning:', await updateRes.text());
    }
  }

  return { formId, responderUri };
}

/**
 * Get details of a single Google Form
 */
export async function getFormDetails(accessToken: string, formId: string): Promise<any> {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to fetch form details');
  }

  return res.json();
}

/**
 * Fetch responses for a specific Google Form
 */
export async function getFormResponses(
  accessToken: string,
  formId: string
): Promise<{ totalResponses: number; responses: any[] }> {
  try {
    const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to fetch form responses');
    }

    const data = await res.json();
    const responsesList = data.responses || [];
    return {
      totalResponses: responsesList.length,
      responses: responsesList,
    };
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}
