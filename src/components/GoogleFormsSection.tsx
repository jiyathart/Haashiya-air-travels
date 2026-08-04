import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  PlusCircle, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  MessageSquare, 
  LogOut, 
  Eye, 
  Sparkles, 
  FileText, 
  Copy, 
  Check, 
  Send, 
  AlertCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { User } from 'firebase/auth';
import { Language } from '../types';
import { initAuth, googleSignIn, logoutGoogle } from '../lib/googleAuth';
import { 
  listUserGoogleForms, 
  createGoogleForm, 
  getFormResponses, 
  AGENCY_FORM_TEMPLATES, 
  GoogleDriveFormFile, 
  FormTemplate,
  FormQuestionItem
} from '../lib/googleFormsService';
import { BUSINESS_INFO } from '../data/servicesData';

interface GoogleFormsSectionProps {
  lang: Language;
}

export const GoogleFormsSection: React.FC<GoogleFormsSectionProps> = ({ lang }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loadingForms, setLoadingForms] = useState(false);
  const [formsList, setFormsList] = useState<GoogleDriveFormFile[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Confirmation modal state for creating forms
  const [pendingTemplate, setPendingTemplate] = useState<FormTemplate | null>(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false);

  // Custom Form Creator modal state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customQuestions, setCustomQuestions] = useState<FormQuestionItem[]>([
    { title: 'Full Name', required: true, type: 'text' },
    { title: 'WhatsApp Contact Number', required: true, type: 'text' }
  ]);

  // Selected form responses view state
  const [viewingFormId, setViewingFormId] = useState<string | null>(null);
  const [formResponsesData, setFormResponsesData] = useState<{ total: number; responses: any[] } | null>(null);
  const [loadingResponses, setLoadingResponses] = useState(false);

  // Copy URL indicator
  const [copiedFormId, setCopiedFormId] = useState<string | null>(null);

  // Initialize Auth State Listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        fetchForms(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch list of user's Google Forms
  const fetchForms = async (authToken?: string) => {
    const accessToken = authToken || token;
    if (!accessToken) return;

    setLoadingForms(true);
    setErrorMsg(null);
    try {
      const files = await listUserGoogleForms(accessToken);
      setFormsList(files);
    } catch (err: any) {
      console.error('Fetch Forms Error:', err);
      setErrorMsg(err.message || 'Could not load Google Forms from your Google Drive.');
    } finally {
      setLoadingForms(false);
    }
  };

  // Google Sign In Handler
  const handleLogin = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchForms(result.accessToken);
        setSuccessMsg(lang === 'ta' ? 'கூகிள் கணக்கு வெற்றியடைந்தது!' : 'Google Forms connected successfully!');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  // Google Sign Out
  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setFormsList([]);
    setSuccessMsg(null);
  };

  // Trigger Confirmation Modal for Template Creation
  const handleRequestCreateTemplate = (template: FormTemplate) => {
    if (!token) {
      handleLogin();
      return;
    }
    setPendingTemplate(template);
  };

  // Confirmed Creation Action
  const handleConfirmCreateForm = async () => {
    if (!pendingTemplate || !token) return;

    setIsCreatingForm(true);
    setErrorMsg(null);
    try {
      const { formId, responderUri } = await createGoogleForm(
        token,
        pendingTemplate.title,
        pendingTemplate.description,
        pendingTemplate.questions
      );

      setSuccessMsg(
        lang === 'ta'
          ? `கூகிள் பாஃர்ம் உருவாக்கப்பட்டது! (ID: ${formId.slice(0, 8)}...)`
          : `New Google Form created successfully! Link: ${responderUri}`
      );
      setPendingTemplate(null);
      fetchForms();
    } catch (err: any) {
      console.error('Create Form Error:', err);
      setErrorMsg(err.message || 'Failed to create Google Form. Please verify permissions.');
    } finally {
      setIsCreatingForm(false);
    }
  };

  // Handle Custom Form Submit
  const handleCreateCustomFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !token) return;

    const customTemplate: FormTemplate = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      description: customDesc || 'Haashiya Air Travels, Mimisal - Service Application Form',
      questions: customQuestions
    };

    setShowCustomModal(false);
    setPendingTemplate(customTemplate);
  };

  // Add question field in custom form modal
  const addCustomQuestion = () => {
    setCustomQuestions([
      ...customQuestions,
      { title: '', required: true, type: 'text' }
    ]);
  };

  // Update question field in custom form modal
  const updateCustomQuestion = (index: number, field: keyof FormQuestionItem, value: any) => {
    const updated = [...customQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setCustomQuestions(updated);
  };

  // Remove question in custom form modal
  const removeCustomQuestion = (index: number) => {
    if (customQuestions.length <= 1) return;
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  // Fetch responses for a form
  const handleViewResponses = async (formId: string) => {
    if (!token) return;
    setViewingFormId(formId);
    setLoadingResponses(true);
    try {
      const data = await getFormResponses(token, formId);
      setFormResponsesData({ total: data.totalResponses, responses: data.responses });
    } catch (err: any) {
      console.error('Fetch Responses Error:', err);
      setErrorMsg('Could not fetch responses. Make sure your account has permissions.');
    } finally {
      setLoadingResponses(false);
    }
  };

  // Share Form via WhatsApp
  const shareFormWhatsApp = (form: GoogleDriveFormFile) => {
    const formUrl = form.webViewLink || `https://docs.google.com/forms/d/${form.id}/viewform`;
    const text = encodeURIComponent(
      lang === 'ta'
        ? `வணக்கம், ஹாஷியா ஏர் டிராவல்ஸ் மிமிசால் ஆன்லைன் விண்ணப்பப் படிவம்: ${form.name}\n\nபடிவத்தை நிரப்ப இங்கே கிளிக் செய்யவும்: ${formUrl}`
        : `Hello, please fill out the ${form.name} online form for Haashiya Air Travels, Mimisal:\n\n${formUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Copy Form Link
  const copyFormLink = (form: GoogleDriveFormFile) => {
    const url = form.webViewLink || `https://docs.google.com/forms/d/${form.id}/viewform`;
    navigator.clipboard.writeText(url);
    setCopiedFormId(form.id);
    setTimeout(() => setCopiedFormId(null), 2500);
  };

  return (
    <section id="google-forms" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden border-t border-b border-slate-700/80">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30 mb-3">
              <FileSpreadsheet className="w-4 h-4 text-purple-400" />
              <span>{lang === 'ta' ? 'கூகிள் ஃபார்ம்ஸ் ஆன்லைன் தளம்' : 'Google Forms Agency Integration'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === 'ta' ? (
                <>
                  வாடிக்கையாளர்கள் <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">ஆன்லைன் விண்ணப்பப் படிவங்கள்</span>
                </>
              ) : (
                <>
                  Online Application & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Pre-Registration Forms</span>
                </>
              )}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              {lang === 'ta'
                ? 'பாஸ்போர்ட், விசா, இ-சேவை மற்றும் விமான டிக்கெட் விண்ணப்பங்களை கூகிள் ஃபார்ம்ஸ் மூலம் ஆன்லைனில் பூர்த்தி செய்து வாட்ஸ்அப் வழியாக சமர்ப்பிக்கலாம்.'
                : 'Create, distribute, and collect passport pre-registrations, visa documents intake, and e-Sevai requests directly via Google Forms.'}
            </p>
          </div>

          {/* User Auth Status / Sign In Button */}
          <div className="shrink-0">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700 p-2.5 rounded-2xl backdrop-blur-md shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-xl object-cover" />
                  ) : (
                    (user.displayName || user.email || 'A').charAt(0).toUpperCase()
                  )}
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white line-clamp-1">{user.displayName || 'Connected Account'}</p>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-2"
                  title="Sign out of Google Workspace"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isSigningIn}
                className="gsi-material-button group relative overflow-hidden bg-white text-slate-900 font-bold px-5 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 border border-slate-200 hover:scale-[1.02]"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                <span className="text-sm">
                  {isSigningIn ? 'Connecting...' : lang === 'ta' ? 'கூகிள் கணக்குடன் இணைய' : 'Connect Google Workspace'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Status Alerts */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 mb-6 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-xs underline ml-4 font-bold">Dismiss</button>
            </motion.div>
          )}

          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 mb-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg(null)} className="text-xs underline ml-4 font-bold">Dismiss</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agency Form Quick Create Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>{lang === 'ta' ? 'தயார் நிலை ஆவணப் படிவங்கள்' : 'Ready Agency Form Templates'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ta' ? 'ஒரே கிளிக்கில் உங்கள் கூகிள் டிரைவில் படிவத்தை உருவாக்கி வாடிக்கையாளர்களுக்கு பகிருங்கள்.' : 'Deploy pre-built forms to your Google Drive in one click and share with customers.'}
              </p>
            </div>

            {user && (
              <button
                onClick={() => setShowCustomModal(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{lang === 'ta' ? '+ புதிய படிவம் உருவாக்கு' : '+ Custom Form'}</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENCY_FORM_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-white line-clamp-2">{tmpl.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{tmpl.description}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1">
                    <p className="font-semibold text-purple-300">📋 {tmpl.questions.length} Key Questions Included</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => handleRequestCreateTemplate(tmpl)}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600/90 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{user ? (lang === 'ta' ? 'படிவம் உருவாக்கு' : 'Create Google Form') : (lang === 'ta' ? 'இணைத்து உருவாக்கு' : 'Connect & Deploy')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Google Forms List Section */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'ta' ? 'உங்கள் செயலில் உள்ள கூகிள் படிவங்கள்' : 'Active Google Forms Hub'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'ta' ? 'உங்கள் கூகிள் கணக்கில் உள்ள படிவங்கள் மற்றும் பதில்கள்' : 'Manage deployed forms, share WhatsApp links, and view responses in real-time.'}
              </p>
            </div>

            {user && (
              <button
                onClick={() => fetchForms()}
                disabled={loadingForms}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-600"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingForms ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{lang === 'ta' ? 'புதுப்பிக்க' : 'Refresh List'}</span>
              </button>
            )}
          </div>

          {!user ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-700/80 text-purple-400 flex items-center justify-center mx-auto border border-slate-600">
                <UserCheck className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">
                {lang === 'ta' ? 'கூகிள் கணக்குடன் இணையவில்லை' : 'Google Workspace Not Connected'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {lang === 'ta' 
                  ? 'உங்கள் கூகிள் டிரைவில் உள்ள படிவங்களை பார்வை இட அல்லது புதிய படிவங்களை உருவாக்க மேலே உள்ள "Connect Google Workspace" பட்டனை கிளிக் செய்யவும்.' 
                  : 'Connect your Google Workspace account to generate online forms, collect pre-registration documents, and view real-time form responses.'}
              </p>
              <button
                onClick={handleLogin}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ta' ? 'கூகிள் கணக்குடன் இணைய' : 'Connect Google Workspace Now'}</span>
              </button>
            </div>
          ) : loadingForms ? (
            <div className="text-center py-12 space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-300 font-semibold">Fetching Google Forms from your Google Drive...</p>
            </div>
          ) : formsList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">No Google Forms found in your Google Drive.</p>
              <p className="text-xs text-slate-400">Click on any template above to create your first online application form!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formsList.map((form) => (
                <div
                  key={form.id}
                  className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-500/30">
                        Google Form
                      </span>
                      {form.modifiedTime && (
                        <span className="text-[10px] text-slate-400">
                          {new Date(form.modifiedTime).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-white text-base line-clamp-2">{form.name}</h4>
                  </div>

                  <div className="mt-6 space-y-2 pt-4 border-t border-slate-800">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={form.webViewLink || `https://docs.google.com/forms/d/${form.id}/viewform`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                        <span>Open Form</span>
                      </a>

                      <button
                        onClick={() => shareFormWhatsApp(form)}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => copyFormLink(form)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        {copiedFormId === form.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleViewResponses(form.id)}
                        className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Responses</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mandatory User Confirmation Dialog before creating a Google Form */}
      <AnimatePresence>
        {pendingTemplate && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left space-y-5">
              
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'ta' ? 'கூகிள் ஃபார்ம் உருவாக்க வேண்டுமா?' : 'Confirm Google Form Creation'}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {lang === 'ta'
                    ? `"${pendingTemplate.title}" என்ற புதிய படிவம் உங்கள் கூகிள் டிரைவில் உருவாக்கப்படும். இதை வாடிக்கையாளர்கள் நிரப்பலாம்.`
                    : `This action will create a new Google Form titled "${pendingTemplate.title}" in your Google Drive account with ${pendingTemplate.questions.length} pre-configured fields.`}
                </p>
              </div>

              <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-white">Title: {pendingTemplate.title}</p>
                <p className="text-[11px] text-slate-400">Questions count: {pendingTemplate.questions.length}</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setPendingTemplate(null)}
                  disabled={isCreatingForm}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                >
                  {lang === 'ta' ? 'ரத்து செய்க' : 'Cancel'}
                </button>
                <button
                  onClick={handleConfirmCreateForm}
                  disabled={isCreatingForm}
                  className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  {isCreatingForm ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'ta' ? 'உறுதி செய்க' : 'Create Form'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Form Builder Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {lang === 'ta' ? 'தனிப்பயன் கூகிள் ஃபார்ம் உருவாக்கு' : 'Create Custom Google Form'}
                    </h3>
                    <p className="text-xs text-slate-400">Design a custom online form for your agency</p>
                  </div>
                </div>
                <button onClick={() => setShowCustomModal(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
              </div>

              <form onSubmit={handleCreateCustomFormSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Form Title *</label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Saudi Visa Pre-Medical Consent Form"
                    className="w-full px-4 py-2.5 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Form Description</label>
                  <textarea
                    rows={2}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="Instructions for applicants..."
                    className="w-full px-4 py-2.5 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                {/* Question List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-purple-300">Form Questions ({customQuestions.length})</label>
                    <button
                      type="button"
                      onClick={addCustomQuestion}
                      className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1"
                    >
                      + Add Question
                    </button>
                  </div>

                  {customQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          required
                          value={q.title}
                          onChange={(e) => updateCustomQuestion(idx, 'title', e.target.value)}
                          placeholder={`Question ${idx + 1} (e.g., Aadhaar Number)`}
                          className="flex-1 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg border border-slate-700 focus:outline-none"
                        />
                        {customQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCustomQuestion(idx)}
                            className="text-rose-400 hover:text-rose-300 font-bold text-xs p-1"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-300">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={q.required}
                            onChange={(e) => updateCustomQuestion(idx, 'required', e.target.checked)}
                            className="rounded border-slate-600 text-purple-600 focus:ring-0"
                          />
                          <span>Required</span>
                        </label>

                        <select
                          value={q.type || 'text'}
                          onChange={(e) => updateCustomQuestion(idx, 'type', e.target.value)}
                          className="px-2 py-1 bg-slate-900 text-slate-200 rounded border border-slate-700 text-xs"
                        >
                          <option value="text">Short Answer</option>
                          <option value="paragraph">Paragraph</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Proceed to Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form Responses Viewer Modal */}
      <AnimatePresence>
        {viewingFormId && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-left max-h-[85vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <span>Form Responses Dashboard</span>
                  </h3>
                  <p className="text-xs text-slate-400">Form ID: {viewingFormId}</p>
                </div>
                <button onClick={() => { setViewingFormId(null); setFormResponsesData(null); }} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
              </div>

              <div className="py-6">
                {loadingResponses ? (
                  <div className="text-center py-8 space-y-3">
                    <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                    <p className="text-xs text-slate-300">Fetching live responses from Google Forms API...</p>
                  </div>
                ) : !formResponsesData || formResponsesData.total === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-300">No responses submitted yet.</p>
                    <p className="text-xs text-slate-400">Share the WhatsApp link with applicants to start collecting responses.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-between text-xs font-bold text-purple-200">
                      <span>Total Submissions Received:</span>
                      <span className="text-base font-extrabold">{formResponsesData.total}</span>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {formResponsesData.responses.map((resp, idx) => (
                        <div key={resp.responseId || idx} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs space-y-2">
                          <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-700">
                            <span className="font-bold text-purple-300">Submission #{idx + 1}</span>
                            <span>{resp.createTime ? new Date(resp.createTime).toLocaleString() : ''}</span>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {resp.answers ? (
                              Object.entries(resp.answers).map(([key, val]: [string, any]) => {
                                const answerText = val?.textAnswers?.answers?.map((a: any) => a.value).join(', ') || JSON.stringify(val);
                                return (
                                  <div key={key} className="text-slate-200">
                                    <span className="font-bold text-slate-400">Question Answer: </span>
                                    <span className="font-medium">{answerText}</span>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-slate-400 italic">Response data present</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 text-right">
                <button
                  onClick={() => { setViewingFormId(null); setFormResponsesData(null); }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
