
import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, Database, Search, Filter, 
  Trash2, Mail, Phone, ExternalLink, 
  CheckCircle, Clock, MoreHorizontal, Download, Shield
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
    // Updated credential per user request
    if (password === 'tushar rishi') { 
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid agency credentials. Access denied.');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Business', 'Email', 'Phone', 'Type', 'Budget', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.name, l.businessName, l.email, l.phone, l.websiteType, l.budgetRange, l.status, l.createdAt
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-10 rounded-3xl shadow-2xl shadow-blue-500/10"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-400">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">Agency Access</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Secure Portal for Brand Bridge Agency Admins</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 ml-1">Master Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-center tracking-widest"
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-xs font-bold text-center mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
              Unlock Dashboard
            </button>
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-4">
            <Database className="text-blue-400" />
            Lead Management
          </h1>
          <p className="text-gray-400 mt-2">Managing {leads.length} active inquiries across all systems.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Total Inquiries</div>
          <div className="text-4xl font-extrabold">{leads.length}</div>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">New Leads</div>
          <div className="text-4xl font-extrabold text-blue-400">
            {leads.filter(l => l.status === 'New').length}
          </div>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Closed / Converted</div>
          <div className="text-4xl font-extrabold text-emerald-400">
            {leads.filter(l => l.status === 'Closed').length}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
             <Filter size={18} className="text-gray-400" />
             <span className="text-sm font-bold text-gray-400">Filtering by: Latest</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Lead Details</th>
                <th className="px-8 py-5">Project Info</th>
                <th className="px-8 py-5">Budget</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white text-lg">{lead.name}</div>
                    <div className="text-blue-400 text-sm font-medium">{lead.businessName}</div>
                    <div className="flex items-center space-x-4 mt-2 text-gray-500 text-xs">
                       <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                       <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-gray-300 font-medium">{lead.websiteType}</div>
                    <div className="text-gray-500 text-xs mt-1 italic truncate max-w-xs">{lead.message}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      {lead.budgetRange}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className={`bg-transparent text-sm font-bold focus:outline-none cursor-pointer ${
                        lead.status === 'New' ? 'text-blue-400' : 
                        lead.status === 'Contacted' ? 'text-yellow-400' : 'text-emerald-400'
                      }`}
                    >
                      <option value="New" className="bg-gray-900">New Inquiry</option>
                      <option value="Contacted" className="bg-gray-900">Contacted</option>
                      <option value="Closed" className="bg-gray-900">Closed Deal</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">
                    No leads found. Start your first campaign to see them here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
