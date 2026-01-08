
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <span className="text-xl">B</span>
              </div>
              <span className="text-white">BRAND BRIDGE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              We build high-converting, creative, and automated websites. Empowering brands with modern digital infrastructure.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon size={18} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Order Website</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Management</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Inquiry Channel</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <a href="mailto:brandbridgeagency08@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">brandbridgeagency08@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <MapPin size={16} />
                </div>
                <span className="text-gray-400 text-sm">Global Remote Operation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <p>© 2025 Brand Bridge Agency. All Digital Processes Secured.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
