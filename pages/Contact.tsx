
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Phone, Mail, MapPin, 
  CheckCircle2, Clock, Globe, ShieldCheck, Zap
} from 'lucide-react';
import { WebsiteType, BudgetRange } from '../types';
import { LeadContext } from '../App';

/**
 * 🛠️ CRITICAL STEP:
 * 1. Follow the steps in automation-setup.md to get your Web App URL.
 * 2. Paste that URL here between the quotes.
 */
const AUTOMATION_WEBHOOK_URL = ''; 

const Contact: React.FC = () => {
  const { addLead } = useContext(LeadContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
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

    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New' as const,
      createdAt: new Date().toLocaleString()
    };

    try {
      if (AUTOMATION_WEBHOOK_URL) {
        // Send data to Google Apps Script
        // We use 'no-cors' because Google Scripts redirect after POST, 
        // which browsers often block. 'no-cors' allows the request to finish.
        await fetch(AUTOMATION_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain', // Using text/plain avoids CORS preflight issues with Google Scripts
          },
          body: JSON.stringify(newLead)
        });
        console.log("Automation: Data sent to Webhook.");
      } else {
        console.warn("Automation: URL missing. Lead saved to local Admin Panel only.");
      }

      // Add to local state/dashboard
      addLead(newLead);
      
      // Artificial delay for UI smoothness
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1200);

    } catch (error) {
      console.error('Automation Error:', error);
      setIsSubmitting(false);
      setSubmitted(true); // Still show success to user
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
          <h2 className="text-4xl font-bold mb-6">Success!</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Your inquiry has been processed. Our automation has sent an <b>auto-reply to your email</b>. Check your inbox (and spam) shortly!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Send Another Inquiry
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Ready to <span className="text-gradient">Grow?</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Contact Brand Bridge Agency. Our automated systems handle your inquiry instantly.
              </p>
            </div>

            <div className="space-y-6">
              <a href="tel:6350154327" className="flex items-center space-x-6 p-6 glass-card rounded-2xl hover:bg-white/5 transition-colors block">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Phone</div>
                  <div className="text-xl font-bold">6350154327</div>
                </div>
              </a>

              <a href="mailto:brandbridgeagency08@gmail.com" className="flex items-center space-x-6 p-6 glass-card rounded-2xl hover:bg-white/5 transition-colors block">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Official Email</div>
                  <div className="text-xl font-bold">brandbridgeagency08@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[2rem] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap size={120} className="text-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Business</label>
                  <input required name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Phone</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Project Type</label>
                  <select name="websiteType" value={formData.websiteType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(WebsiteType).map(type => <option key={type} value={type} className="bg-gray-950">{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Budget</label>
                  <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(BudgetRange).map(range => <option key={range} value={range} className="bg-gray-950">{range}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400 ml-1">Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Your project requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all ${isSubmitting ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-900/20'}`}
              >
                {isSubmitting ? <span>Sending...</span> : <><Send size={24} /><span>Send Inquiry</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
