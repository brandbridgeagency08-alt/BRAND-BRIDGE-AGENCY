
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Helper to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global context for leads management
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
      return [];
    }
  });

  const addLead = (lead: any) => {
    const newLeads = [lead, ...leads];
    setLeads(newLeads);
    localStorage.setItem('bba_leads', JSON.stringify(newLeads));
  };

  const updateLeadStatus = (id: string, status: string) => {
    const newLeads = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(newLeads);
    localStorage.setItem('bba_leads', JSON.stringify(newLeads));
  };

  const deleteLead = (id: string) => {
    const newLeads = leads.filter(l => l.id !== id);
    setLeads(newLeads);
    localStorage.setItem('bba_leads', JSON.stringify(newLeads));
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead }}>
      <Router>
        <ScrollToTop />
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
