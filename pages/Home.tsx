
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  ArrowRight, Layout, Settings, Zap, BarChart3, 
  CheckCircle, ExternalLink, ShieldCheck, Star, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const services = [
    { title: 'Website Development', desc: 'Custom, blazing fast websites built with modern tech stacks like React & Next.js.', icon: <Layout className="text-blue-400" /> },
    { title: 'Website Management', desc: 'We handle hosting, security, and updates so you can focus on your business.', icon: <Settings className="text-purple-400" /> },
    { title: 'Automation Systems', desc: 'AI-driven lead capture and follow-up sequences that run 24/7 on autopilot.', icon: <Zap className="text-yellow-400" /> },
    { title: 'Growth Tracking', desc: 'Advanced analytics integration to monitor conversions and ROI in real-time.', icon: <BarChart3 className="text-emerald-400" /> }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center px-5 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide">
              <Star size={14} className="mr-2 fill-current" />
              THE FUTURE OF DIGITAL COMMERCE
            </div>
          </motion.div>

          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05]"
            >
              We Build <span className="text-gradient">High-Converting</span>, <br className="hidden md:block" /> Creative & Automated Websites
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed"
            >
              At Brand Bridge Agency, we merge elite design with powerful automation to build websites that convert visitors into lifetime customers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6"
            >
              <Link 
                to="/contact" 
                className="group relative px-10 py-5 rounded-full bg-white text-black font-extrabold text-lg hover:bg-blue-50 transition-all flex items-center overflow-hidden shadow-2xl shadow-blue-500/20"
              >
                <span>Order Website</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="px-10 py-5 rounded-full border border-white/10 hover:border-white/20 text-white font-extrabold text-lg glass-card transition-all"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">100+</div>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Projects Launched</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-blue-400">24/7</div>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Automated Systems</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-purple-400">99.9%</div>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Client Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Core Expertise</h2>
            <p className="text-gray-400 text-xl">We don't just deliver files; we deliver digital infrastructure that scales with your ambition.</p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] group hover:bg-white/5 transition-all border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
                {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Highlight */}
      <section className="py-32 bg-gray-950/50 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-10 md:p-16 rounded-[3rem] border-white/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[100px] -z-10"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">Featured Project</div>
                <h3 className="text-4xl md:text-5xl font-black">Gupta Footwear</h3>
                <p className="text-gray-400 text-xl leading-relaxed">
                  A comprehensive digital storefront engineered for conversion. Featuring ultra-fast loading speeds and a seamless automated checkout experience.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="px-5 py-2 rounded-xl bg-white/5 text-sm font-bold border border-white/10">Next.js 14</div>
                  <div className="px-5 py-2 rounded-xl bg-white/5 text-sm font-bold border border-white/10">Custom CMS</div>
                  <div className="px-5 py-2 rounded-xl bg-white/5 text-sm font-bold border border-white/10">AI Search</div>
                </div>
                <div className="pt-8">
                  <a 
                    href="https://gupta-footwear.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all"
                  >
                    <span>View Live Site</span>
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full group">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/agency-project/1200/800" 
                    alt="Project Showcase" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end p-8">
                    <p className="text-white font-bold italic">"Creative & conversion-focused business website with modern UI."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-[1.1]">
              Ready to Bridge the Gap <br /> <span className="text-gradient">Between Idea & ROI?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Our development pipeline is currently open for new partnerships. Secure your spot in our next sprint.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-4 px-12 py-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-blue-500/20"
            >
              <Mail size={24} />
              <span>Contact Us via Email</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
