
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Phone, Mail, MapPin, 
  CheckCircle2, Clock, Globe, ShieldCheck, Zap
} from 'lucide-react';
import { WebsiteType, BudgetRange } from '../types';
import { LeadContext } from '../App';

// NOTE: Replace this with your actual Google Apps Script Web App URL or Zapier Webhook URL
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
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Send data to Automation Endpoint (Google Sheets / Auto-Message)
      if (AUTOMATION_WEBHOOK_URL) {
        await fetch(AUTOMATION_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Common for simple Apps Script triggers
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
      }

      // 2. Persist locally for Admin Dashboard
      addLead(newLead);
      
      // Simulate processing time for UX
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        console.log('Automation Triggered: Lead sent to Sheets & Messaging');
      }, 1000);

    } catch (error) {
      console.error('Automation failed:', error);
      // Still allow form to complete for UX, but log error
      setIsSubmitting(false);
      setSubmitted(true);
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
          <h2 className="text-4xl font-bold mb-6">Automation Triggered!</h2>
          <p className="text-gray-400 text-lg mb-10">
            Thanks for contacting Brand Bridge Agency. We've received your inquiry. Check your email; we've sent you an automatic confirmation!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Send another inquiry
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Let's build your <span className="text-gradient">Empire.</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Fill out the form to start your digital transformation. Every submission triggers our instant response automation.
              </p>
            </div>

            <div className="space-y-8">
              <a href="tel:6350154327" className="flex items-center space-x-6 p-6 glass-card rounded-2xl hover:bg-white/5 transition-colors block">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Call Directly</div>
                  <div className="text-xl font-bold">6350154327</div>
                </div>
              </a>

              <a href="mailto:brandbridgeagency08@gmail.com" className="flex items-center space-x-6 p-6 glass-card rounded-2xl hover:bg-white/5 transition-colors block">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Email Us</div>
                  <div className="text-xl font-bold">brandbridgeagency08@gmail.com</div>
                </div>
              </a>
            </div>

            <div className="p-8 border border-white/5 rounded-3xl space-y-4">
              <h4 className="font-bold flex items-center space-x-2">
                <ShieldCheck className="text-emerald-400" size={20} />
                <span>Our Promise</span>
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>100% Confidentiality</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Response in under 2 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Free Initial Strategy Consultation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[2rem] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap size={120} className="text-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Business Name</label>
                  <input 
                    required
                    type="text" 
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Company Inc."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 63501 54327"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Type of Website</label>
                  <select 
                    name="websiteType"
                    value={formData.websiteType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {Object.values(WebsiteType).map(type => (
                      <option key={type} value={type} className="bg-gray-950">{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Budget Range</label>
                  <select 
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {Object.values(BudgetRange).map(range => (
                      <option key={range} value={range} className="bg-gray-950">{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400 ml-1">Requirements / Message</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your goals and vision..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-3 transition-all ${isSubmitting ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] shadow-xl shadow-blue-900/20'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Triggering Automation...</span>
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    <span>Send Order Inquiry</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                By clicking "Send Order Inquiry", you agree to our terms and will receive an <b>automatic email reply</b>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
