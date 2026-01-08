
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Layout, Settings, Zap, BarChart3, 
  CheckCircle, ExternalLink, ShieldCheck, Star, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const services = [
    { title: 'Website Development', desc: 'Custom, blazing fast websites built with modern tech stacks like React & Next.js.', icon: <Layout className="text-blue-400" /> },
    { title: 'Website Management', desc: 'We handle hosting, security, and updates so you can focus on your business.', icon: <Settings className="text-purple-400" /> },
    { title: 'Automation Systems', desc: 'AI-driven lead capture and follow-up sequences that run 24/7 on autopilot.', icon: <Zap className="text-yellow-400" /> },
    { title: 'Growth Tracking', desc: 'Advanced analytics integration to monitor conversions and ROI in real-time.', icon: <BarChart3 className="text-emerald-400" /> }
  ];

  const whyChooseUs = [
    'Creative Designs',
    'Full Automation',
    'Analytics Integration',
    'Affordable Pricing',
    'Reliable Support'
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
          >
            <Star size={16} className="mr-2" />
            Empowering Your Digital Future
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight max-w-4xl mx-auto"
          >
            We Build <span className="text-gradient">High-Converting</span>, Creative & Automated Websites
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            At Brand Bridge Agency, we create stunning websites that build trust, convert users, and grow your business.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link 
              to="/contact" 
              className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center shadow-xl shadow-blue-900/10"
            >
              Get Your Website <ArrowRight className="ml-2" />
            </Link>
            <Link 
              to="/services" 
              className="px-10 py-5 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 bg-white/5 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
            <h3 className="text-3xl font-bold italic opacity-80">"We don't just build websites, we build digital trust."</h3>
            <div className="flex items-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all">
               <ShieldCheck size={48} />
               <Zap size={48} />
               <CheckCircle size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">World-Class Solutions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive digital services designed to handle every aspect of your online presence.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-10 rounded-3xl group hover:border-blue-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Our Portfolio</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Take a look at some of the recent projects we've launched. We focus on high-performance architecture and stunning aesthetics.
              </p>
            </div>
            <Link to="/contact" className="text-blue-400 font-bold flex items-center group">
              Start your project <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-3xl glass-card aspect-video cursor-pointer"
            >
              <img 
                src="https://picsum.photos/seed/web1/1200/800" 
                alt="Project" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-2 block">Case Study</span>
                    <h3 className="text-3xl font-bold text-white mb-2">Gupta Footwear</h3>
                    <p className="text-gray-300 max-w-md">Creative & conversion-focused business website with modern UI and smooth shopping experience.</p>
                  </div>
                  <a 
                    href="https://gupta-footwear.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col justify-center space-y-12 lg:pl-12">
              <div className="space-y-6">
                <h4 className="text-3xl font-bold">First Real-World Project</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We built a comprehensive e-commerce showcase for Gupta Footwear, featuring advanced grid layouts, fast image loading, and a mobile-first approach.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Tailwind CSS', 'Framer Motion', 'SEO Optimized'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                <div>
                  <div className="text-3xl font-extrabold text-blue-400 mb-1">99%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Performance</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-purple-400 mb-1">40%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Growth Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-10 max-w-4xl mx-auto tracking-tighter">
            Stop losing leads. <span className="text-gradient">Start converting today.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Our experts are ready to transform your digital presence into a 24/7 revenue-generating machine.
          </p>
          <div className="flex justify-center">
            <Link to="/contact" className="flex items-center space-x-3 px-10 py-5 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
              <Mail size={20} className="text-purple-600" />
              <span>Contact Us via Email</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
