import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';
import { verticals, campaigns, platformStats } from '../data/mockData';
import StatsBar from '../components/StatsBar';
import CampaignCard from '../components/CampaignCard';

export default function Landing() {
  const activeCampaigns = campaigns.filter(c => c.status === 'active').slice(0, 6);

  return (
    <div className="min-h-screen bg-surface font-body">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A4D2E]/80 backdrop-brightness-75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-16">
          <p className="text-[#D4891A] font-medium text-lg md:text-xl mb-4 font-body animate-fade-in-up">Make an Eco-Raise</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-white leading-tight mb-6 animate-fade-in-up stagger-1">
            Reduce Your Footprint, Amplify Your Impact
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Samarthya connects passionate volunteers with India's most impactful NGOs. Join us in making a real difference for the planet and its people.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/register"
              className="btn-primary"
            >
              Start Volunteering
            </Link>
            <Link
              to="/campaigns"
              className="btn-outline"
            >
              Browse Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* ── Action Section & Stats ── */}
      <section className="bg-white py-16 flex justify-center w-full">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-sm text-text-muted font-semibold tracking-wider mb-4">Nov 23, 2023</p>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading text-text-primary leading-tight mb-6">
                Eco-friendly actions, global satisfaction
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Every volunteer hour counts. We believe that collective small actions lead to massive global changes. Whether you are planting a tree, serving a meal, or educating a child, your time is the most valuable resource you can donate.
              </p>
              <Link
                to="/about"
                className="btn-primary mt-4"
              >
                Learn More
              </Link>
            </div>
            <div className="relative">
              <div className="flex gap-4">
                <div className="w-1/2 pt-12">
                  <img src="https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Volunteers" className="rounded-xl object-cover w-full h-80 shadow-lg" />
                </div>
                <div className="w-1/2">
                  <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Planting" className="rounded-xl object-cover w-full h-80 shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar (Integrated into white section like Ecoraise) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-border/50 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-[#1A4D2E] mb-2 font-heading">$256M</p>
              <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Total Donation</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-[#1A4D2E] mb-2 font-heading">37K+</p>
              <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Total Volunteers</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-[#1A4D2E] mb-2 font-heading">40+</p>
              <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Total Causes</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-[#1A4D2E] mb-2 font-heading">89K</p>
              <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Total Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NGO Verticals ── */}
      <section className="bg-surface-dark py-24 flex justify-center w-full">
        <div className="page-container">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[#D4891A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block font-body bg-[#D4891A]/5 px-5 py-2 rounded-full border border-[#D4891A]/10">Our Causes</span>
            <h2 className="text-5xl md:text-7xl font-extrabold font-heading text-[#1A1A1A] leading-[1.1] max-w-4xl">
              Four Verticals of <span className="text-[#1A4D2E]">Impact</span>
            </h2>
            <div className="w-32 h-2 bg-[#D4891A] mt-8 rounded-full shadow-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 justify-center">
            {verticals.map((v, i) => (
              <Link
                key={v.id}
                to={`/campaigns?vertical=${v.slug}`}
                className="group card-soft flex flex-col items-center text-center !p-0 overflow-hidden border-2 hover:border-[#1A4D2E]/40 hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-56 w-full bg-[#1A4D2E]/5 flex items-center justify-center group-hover:bg-[#1A4D2E]/10 transition-colors relative overflow-hidden">
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#1A4D2E]/20 to-transparent" />
                  <div className="text-7xl transform group-hover:scale-125 transition-transform duration-700 ease-out z-10">{v.icon}</div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold font-heading text-[#1A1A1A] mb-4 group-hover:text-[#1A4D2E] transition-colors leading-tight">
                    {v.name}
                  </h3>
                  <p className="text-[#6B7280] text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                    {v.description}
                  </p>
                  <div className="mt-auto inline-flex items-center justify-center text-[#1A4D2E] font-bold text-sm bg-[#1A4D2E]/5 px-6 py-3 rounded-xl group-hover:bg-[#1A4D2E] group-hover:text-white transition-all duration-300">
                    Explore Causes <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Campaigns ── */}
      <section className="bg-white py-24 flex justify-center w-full">
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-[#D4891A] font-bold tracking-[0.3em] uppercase text-xs mb-4 block font-body bg-[#D4891A]/5 px-5 py-2 rounded-full border border-[#D4891A]/10">Active Now</span>
              <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-[#1A1A1A] leading-tight">
                Featured Campaigns
              </h2>
            </div>
            <Link to="/campaigns" className="btn-primary hidden md:inline-flex shadow-xl hover:shadow-[#1A4D2E]/20 px-8 py-4 text-lg">
              View All Campaigns
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {activeCampaigns.map((c, i) => (
              <CampaignCard key={c.id} campaign={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 relative overflow-hidden flex justify-center w-full">
        <div className="absolute inset-0 bg-[#1A4D2E]" />
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-8 leading-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 1,155+ volunteers already creating social impact across India. Your capability is someone's hope.
          </p>
          <div className="flex justify-center">
            <Link to="/register" className="btn-cta px-10 py-4 text-lg shadow-xl hover:shadow-amber/20">
              Join Samarthya 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
