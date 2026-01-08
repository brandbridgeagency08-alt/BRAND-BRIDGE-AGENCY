
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mail, CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';
import { WebsiteType, BudgetRange } from '../types';
import { LeadContext } from '../App';

/**
 * 🛠️ CRITICAL ACTION: 
 * 1. Deploy the new script from automation-setup.md.
 * 2. Paste the Web App URL below.
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
    console.log("Submit initiated: Data package prepared (No Phone).");

    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New' as const,
      createdAt: new Date().toLocaleString()
    };

    try {
      if (AUTOMATION_WEBHOOK_URL) {
        // We use 'no-cors' to allow the request to trigger Google Apps Script successfully.
        await fetch(AUTOMATION_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLead)
        });
        console.log("Automation: Trigger signal sent to Google Apps Script.");
      }

      // Local storage persistence
      addLead(newLead);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1000);

    } catch (error) {
      console.error('Automation Failed:', error);
      setIsSubmitting(false);
      setSubmitted(true); // Don't block the user if only the hook fails
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
          <h2 className="text-4xl font-bold mb-6">Request Received!</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Lead saved. Our automation is sending an <b>auto-reply</b> to <b>{formData.email}</b>. Please check your inbox.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            New Request
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Let's <span className="text-gradient">Automate.</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Connect your business to modern digital infrastructure. No phone calls needed—strictly efficient email communication.
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
                <h4 className="font-bold flex items-center space-x-2 text-emerald-400">
                  <ShieldCheck size={20} />
                  <span>Verified Automation</span>
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>✔ Real-time Lead Storage</li>
                  <li>✔ Instant Auto-Reply</li>
                  <li>✔ 24/7 Monitoring</li>
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
                  <label className="text-sm font-bold text-gray-400">Your Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Business Name</label>
                  <input required name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Empire Inc." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Website Type</label>
                  <select name="websiteType" value={formData.websiteType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(WebsiteType).map(type => <option key={type} value={type} className="bg-gray-950">{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Investment</label>
                  <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none">
                    {Object.values(BudgetRange).map(range => <option key={range} value={range} className="bg-gray-950">{range}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Project Requirements</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your digital goals..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all ${isSubmitting ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-900/20'}`}
              >
                {isSubmitting ? <span>Executing Automation...</span> : <><Send size={24} /><span>Request Website</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
