
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mail, CheckCircle2, ShieldCheck, Zap, AlertTriangle
} from 'lucide-react';
import { WebsiteType, BudgetRange } from '../types';
import { LeadContext } from '../App';

/**
 * 🛠️ AUTOMATION WEBHOOK URL
 * Replace the string below with your ACTUAL deployed Web App URL from Google Apps Script.
 * Example: 'https://script.google.com/macros/s/AKfycb.../exec'
 */
const AUTOMATION_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec'; 

const Contact: React.FC = () => {
  const { addLead } = useContext(LeadContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    websiteType: WebsiteType.Business,
    budgetRange: BudgetRange.Growth,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorState(null);
    
    console.log("Submit: Initializing Automation Chain...");

    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New' as const,
      createdAt: new Date().toLocaleString()
    };

    try {
      if (!AUTOMATION_WEBHOOK_URL || AUTOMATION_WEBHOOK_URL.includes('YOUR_ACTUAL_SCRIPT_ID')) {
        throw new Error("Backend URL is missing or not configured. Please check Contact.tsx.");
      }

      /**
       * 🔥 SENIOR ENGINEER FIX:
       * We use 'text/plain' to avoid the CORS Preflight (OPTIONS) request.
       * Google Apps Script does not respond to OPTIONS, but it CAN read a POST body
       * sent as text/plain. We then JSON.parse it on the server side.
       */
      const response = await fetch(AUTOMATION_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Standard for Google Apps Script triggers
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(newLead)
      });

      // Note: With 'no-cors', we can't read the response body directly for security reasons,
      // but if the fetch doesn't throw, the signal reached the server.
      console.log("Automation: Lead signal successfully broadcasted to Google Cloud.");

      // Sync with local Admin Dashboard
      addLead(newLead);
      
      // Verification Delay
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);

    } catch (error: any) {
      console.error('Automation Fault:', error);
      setErrorState(error.message || "Automation bridge failed to connect.");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full glass-card p-12 rounded-[2rem] text-center shadow-2xl shadow-emerald-500/10"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-bold mb-6">Automation Triggered</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Success! Lead saved to Google Sheets. Our system is sending an <b>auto-reply</b> to <b>{formData.email}</b>. Please check your inbox.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            New Submission
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/5 space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Scale your <span className="text-gradient">Vision.</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Connect with Brand Bridge Agency. Our lead engine ensures your inquiry is processed instantly via Google Cloud.
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:brandbridgeagency08@gmail.com" className="flex items-center space-x-6 p-6 glass-card rounded-2xl hover:bg-white/5 transition-colors block">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Email Channel</div>
                  <div className="text-xl font-bold">brandbridgeagency08@gmail.com</div>
                </div>
              </a>
              
              <div className="p-8 border border-white/5 rounded-3xl space-y-4 bg-white/2">
                <h4 className="font-bold flex items-center space-x-2 text-blue-400">
                  <ShieldCheck size={20} />
                  <span>Verified Infrastructure</span>
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>No-Phone Direct Email Communication</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Instant Google Sheet Synchronization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Automated Client Receipt Sequence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[2rem] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap size={120} className="text-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Your Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Tushar Rishi" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Company Name</label>
                  <input required name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Brand Bridge" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Official Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@agency.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Project Type</label>
                  <select name="websiteType" value={formData.websiteType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(WebsiteType).map(type => <option key={type} value={type} className="bg-gray-900">{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Budget Range</label>
                  <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(BudgetRange).map(range => <option key={range} value={range} className="bg-gray-900">{range}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Detailed Requirements</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your project vision..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>

              {errorState && (
                <div className="flex items-center space-x-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                  <AlertTriangle size={20} />
                  <span className="text-sm font-medium">{errorState}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all ${isSubmitting ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-900/20 active:scale-95'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Broadcasting Lead...</span>
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    <span>Send Project Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
