import { Link } from 'react-router-dom';
import { Leaf, Heart, Mail, MapPin, Phone } from 'lucide-react';
import { verticals } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#1A4D2E] text-white relative overflow-hidden flex justify-center w-full">
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-light blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber blur-3xl" />
      </div>

      <div className="relative page-container pt-24 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-16 text-center sm:text-left justify-items-center sm:justify-items-start">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Leaf size={22} className="text-white" />
              </div>
              <span className="text-3xl font-bold font-heading tracking-tight">Samarthya</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Where capability meets cause. A platform connecting passionate volunteers with NGOs making real social impact across India.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#D4891A] flex items-center justify-center transition-all duration-300 text-white/50 hover:text-white">
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Verticals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4891A] mb-6">Our Causes</h4>
            <ul className="space-y-4">
              {verticals.map(v => (
                <li key={v.id}>
                  <Link to={`/campaigns?vertical=${v.slug}`} className="group flex items-center justify-center sm:justify-start gap-3 text-white/60 hover:text-white transition-colors text-sm">
                    <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{v.icon}</span> 
                    <span className="font-medium">{v.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4891A] mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { to: '/campaigns', label: 'Browse Campaigns' },
                { to: '/register', label: 'Become a Volunteer' },
                { to: '/login', label: 'Volunteer Login' },
                { to: '/admin/login', label: 'Admin Portal' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4891A] mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail size={14} /></div>
                <span className="font-medium">hello@samarthya.org</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Phone size={14} /></div>
                <span className="font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><MapPin size={14} /></div>
                <span className="font-medium">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Samarthya. Built with <Heart size={12} className="inline text-coral" /> by DevOps Team — LanchEd Capstone
          </p>
          <p className="text-white/30 text-xs">
            Powered by Antigravity + Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
