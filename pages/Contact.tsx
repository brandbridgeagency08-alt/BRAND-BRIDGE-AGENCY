
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mail, CheckCircle2, ShieldCheck, Zap, AlertTriangle
} from 'lucide-react';
import { WebsiteType, BudgetRange } from '../types';
import { LeadContext } from '../App';

/**
 * ⚡ PRODUCTION AUTOMATION WEBHOOK
 */
const AUTOMATION_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz_T16mHboEzD2HpPr4TxEH1UgWbMUeMZQ-Mu1wkxbQqlZ0hNnMVOZ7yUy206I5_KKgHg/exec";

const Contact: React.FC = () => {
  const { addLead } = useContext(LeadContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  
  /**
   * 🛡️ MANDATORY ROOT CAUSE FIX:
   * State is initialized STRICTLY with empty strings.
   * No admin, demo, or hardcoded values are permitted here.
   */
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    email: "",
    projectType: "",
    budget: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorState(null);
    
    /**
     * Data Mapping Layer:
     * Translating clean frontend keys to system-required keys for Lead Processing.
     */
    const newLead = {
      name: formData.name,
      businessName: formData.brand,
      email: formData.email,
      websiteType: formData.projectType || WebsiteType.Other,
      budgetRange: formData.budget || BudgetRange.Startup,
      message: formData.message,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New' as const,
      createdAt: new Date().toLocaleString()
    };

    try {
      const response = await fetch(AUTOMATION_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(newLead)
      });

      const rawText = await response.text();
      let result;
      
      try {
        result = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error("Automation response validation failed.");
      }
      
      if (result && result.success === true) {
        addLead(newLead);
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error(result.error || "Remote server rejected submission.");
      }

    } catch (error: any) {
      setErrorState("Connection fault: Infrastructure currently unreachable.");
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
          <h2 className="text-4xl font-bold mb-6 text-white">Inquiry Verified</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Your project details have been successfully transmitted to our lead engine.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Start New Inquiry
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
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">Scale your <span className="text-gradient">Vision.</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Connect with our experts. Our secure lead capture system ensures your data is protected and processed with priority.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-8 border border-white/5 rounded-3xl space-y-4 bg-white/2 shadow-inner">
                <h4 className="font-bold flex items-center space-x-2 text-blue-400">
                  <ShieldCheck size={20} />
                  <span>Verified Data Privacy</span>
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Zero Data Leak Security Protocol</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Strict Separation of Concerns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Encrypted Transmission Standard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[2rem] space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Zap size={120} className="text-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Full Name</label>
                  <input 
                    required 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Company / Brand</label>
                  <input 
                    required 
                    name="brand" 
                    value={formData.brand} 
                    onChange={handleChange} 
                    placeholder="Enter your company name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors text-white" 
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Email Address</label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors text-white" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Project Type</label>
                  <select 
                    required
                    name="projectType" 
                    value={formData.projectType} 
                    onChange={handleChange} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none text-white"
                  >
                    <option value="" className="bg-gray-900">Select Project Type</option>
                    {Object.values(WebsiteType).map(type => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Budget Scope</label>
                  <select 
                    required
                    name="budget" 
                    value={formData.budget} 
                    onChange={handleChange} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 appearance-none text-white"
                  >
                    <option value="" className="bg-gray-900">Select Budget Range</option>
                    {Object.values(BudgetRange).map(range => (
                      <option key={range} value={range} className="bg-gray-900">{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-gray-400">Project Mission</label>
                <textarea 
                  required 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={5} 
                  placeholder="Describe your goals and requirements..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-blue-500 transition-colors resize-none text-white"
                ></textarea>
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
                    <span>Processing...</span>
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
