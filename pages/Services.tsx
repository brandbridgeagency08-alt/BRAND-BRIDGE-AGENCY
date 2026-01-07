
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Shield, Cpu, TrendingUp, Search, 
  Code2, Smartphone, Cloud, PenTool, Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const serviceDetails = [
    {
      id: 'web-dev',
      title: 'Website Development',
      icon: <Code2 className="text-blue-500" />,
      features: ['Custom SPA Development', 'E-commerce Solutions', 'SEO Semantic HTML', 'Performance Tuning'],
      description: 'We build websites that are not just beautiful, but high-performance engines. Using React and Next.js, we ensure your site is fast, accessible, and ready to scale.',
      color: 'blue'
    },
    {
      id: 'web-mgmt',
      title: 'Website Management',
      icon: <Shield className="text-purple-500" />,
      features: ['Cloud Hosting', '24/7 Monitoring', 'Security Audits', 'Content Updates'],
      description: 'Never worry about technical glitches again. We handle the hosting, SSL certificates, daily backups, and ongoing maintenance of your entire digital asset.',
      color: 'purple'
    },
    {
      id: 'automation',
      title: 'Automation Setup',
      icon: <Cpu className="text-emerald-500" />,
      features: ['Lead Generation Funnels', 'Email Automation', 'CRM Integration', 'Webhooks & APIs'],
      description: 'Transform your website into a sales machine. We set up systems that automatically capture, tag, and follow up with leads while you sleep.',
      color: 'emerald'
    },
    {
      id: 'analytics',
      title: 'Growth Tracking',
      icon: <TrendingUp className="text-yellow-500" />,
      features: ['Conversion Tracking', 'User Behavior Maps', 'A/B Testing', 'ROI Dashboards'],
      description: 'Data-driven decisions are the only way to grow. We integrate advanced analytics to show you exactly where your users come from and how they convert.',
      color: 'yellow'
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <header className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-8"
          >
            Digital <span className="text-gradient">Powerhouse</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We provide the full stack of services required to launch, manage, and scale a modern brand online.
          </motion.p>
        </header>

        <div className="space-y-40">
          {serviceDetails.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-8">
                <div className={`w-20 h-20 rounded-3xl bg-${service.color}-500/10 flex items-center justify-center`}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: 40 })}
                </div>
                <h2 className="text-4xl font-bold">{service.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-${service.color}-500 shadow-[0_0_8px] shadow-${service.color}-500`}></div>
                      <span className="text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <Link to="/contact" className="inline-flex items-center space-x-2 text-white font-bold group">
                    <span>Inquire about {service.title}</span>
                    <TrendingUp size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-square">
                  <div className={`absolute inset-0 bg-${service.color}-500/10 blur-[80px] rounded-full`}></div>
                  <img 
                    src={`https://picsum.photos/seed/${service.id}/800/800`} 
                    alt={service.title} 
                    className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <section className="mt-48 py-24 bg-white/5 rounded-[3rem] text-center">
          <h2 className="text-4xl font-bold mb-12">Seamlessly Integrated With</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
             <div className="text-2xl font-bold">Google Analytics</div>
             <div className="text-2xl font-bold">WhatsApp Business</div>
             <div className="text-2xl font-bold">Stripe</div>
             <div className="text-2xl font-bold">Zapier</div>
             <div className="text-2xl font-bold">AWS</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
