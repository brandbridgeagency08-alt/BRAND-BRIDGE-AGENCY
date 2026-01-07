
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Global context for leads
export const LeadContext = React.createContext<{
  leads: any[];
  addLead: (lead: any) => void;
  updateLeadStatus: (id: string, status: string) => void;
  deleteLead: (id: string) => void;
}>({
  leads: [],
  addLead: () => {},
  updateLeadStatus: () => {},
  deleteLead: () => {},
});

const App: React.FC = () => {
  const [leads, setLeads] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bba_leads');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("LocalStorage access failed - lead persistence disabled.", e);
      return [];
    }
  });

  const addLead = (lead: any) => {
    const newLeads = [lead, ...leads];
    setLeads(newLeads);
    try {
      localStorage.setItem('bba_leads', JSON.stringify(newLeads));
    } catch (e) {
      console.warn("Failed to save lead to storage", e);
    }
  };

  const updateLeadStatus = (id: string, status: string) => {
    const newLeads = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(newLeads);
    try {
      localStorage.setItem('bba_leads', JSON.stringify(newLeads));
    } catch (e) {
      console.warn("Failed to update lead in storage", e);
    }
  };

  const deleteLead = (id: string) => {
    const newLeads = leads.filter(l => l.id !== id);
    setLeads(newLeads);
    try {
      localStorage.setItem('bba_leads', JSON.stringify(newLeads));
    } catch (e) {
      console.warn("Failed to delete lead from storage", e);
    }
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </LeadContext.Provider>
  );
};

export default App;
