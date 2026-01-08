
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Search, Filter, 
  Trash2, Mail, Download, Shield
} from 'lucide-react';
import { LeadContext } from '../App';

const Admin: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useContext(LeadContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tushar rishi') { 
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid agency credentials.');
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Business', 'Email', 'Type', 'Budget', 'Status'];
    const rows = leads.map(l => [
      l.createdAt, l.name, l.businessName, l.email, l.websiteType, l.budgetRange, l.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "agency_leads_no_phone.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full glass-card p-10 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-400">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Master Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 text-center"
            />
            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">Unlock Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 container mx-auto px-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-extrabold flex items-center gap-4"><Database className="text-blue-400" /> Agency Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={exportToCSV} className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"><Download size={18} /><span>Export</span></button>
          <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20">Exit</button>
        </div>
      </header>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <input 
            type="text" 
            placeholder="Search Leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-gray-400 text-xs font-bold uppercase">
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Project</th>
                <th className="px-8 py-5">Budget</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white">{lead.name}</div>
                    <div className="text-blue-400 text-xs">{lead.businessName}</div>
                    <div className="text-gray-500 text-xs mt-1 flex items-center gap-1"><Mail size={12} /> {lead.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-gray-300 text-sm font-medium">{lead.websiteType}</div>
                    <div className="text-gray-500 text-[10px] mt-1 italic truncate max-w-[150px]">{lead.message}</div>
                  </td>
                  <td className="px-8 py-6"><span className="text-xs font-bold text-emerald-400">{lead.budgetRange}</span></td>
                  <td className="px-8 py-6">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="bg-transparent text-sm font-bold text-blue-400 focus:outline-none"
                    >
                      <option value="New" className="bg-gray-900">New</option>
                      <option value="Contacted" className="bg-gray-900">Contacted</option>
                      <option value="Closed" className="bg-gray-900">Closed</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => deleteLead(lead.id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
