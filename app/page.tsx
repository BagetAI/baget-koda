"use client";

import React, { useState } from 'react';
import { Shield, Zap, MapPin, CheckCircle, ChevronRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("owner"); // owner or leader
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [breed, setBreed] = useState("");
  const [energy, setEnergy] = useState("3");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("https://baget.ai/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: "9faa98f9-0c8e-42d6-b986-9bca14cde524",
          email,
          name: `${role} - ${breed} (Energy: ${energy})`
        })
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  const breeds = [
    { name: "Siberian Husky", level: 5 },
    { name: "Border Collie", level: 5 },
    { name: "Golden Retriever", level: 3 },
    { name: "French Bulldog", level: 2 },
    { name: "Basset Hound", level: 1 },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#F0EEE9]/80 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-forest flex items-center justify-center">
              <div className="w-2 h-2 bg-forest rounded-full" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tighter text-forest uppercase">KODA</span>
          </div>
          <div className="hidden md:flex space-x-12 text-xs font-bold uppercase tracking-widest text-charcoal/60">
            <a href="#join" className="hover:text-sunset transition-colors">Join a Pack</a>
            <a href="#join" onClick={() => setRole('leader')} className="hover:text-sunset transition-colors">Start a Pack</a>
            <a href="#safety" className="hover:text-sunset transition-colors">Safety Matrix</a>
          </div>
          <button onClick={() => {document.getElementById('join')?.scrollIntoView({behavior: 'smooth'})}} className="bg-forest text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-forest/90 transition-all">
            Find Your Pack
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-[110px] font-bold text-forest leading-[0.9] mb-12 tracking-tighter uppercase italic">
            Stop walking <br className="hidden md:block" /> alone.
          </h1>
          <p className="max-w-xl text-xl text-charcoal/80 mb-16 font-medium leading-relaxed">
            Koda matches your dog with neighborhood friends who share their pace and energy. 
            Hyper-local social walks starting at your front door.
          </p>
          
          {/* Action Toggle */}
          <div className="w-full max-w-lg mb-20">
            <div className="flex border border-charcoal/10 bg-white/50 backdrop-blur p-1">
              <button 
                onClick={() => setRole("owner")}
                className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${role === 'owner' ? 'bg-forest text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
              >
                Find a Pack
              </button>
              <button 
                onClick={() => setRole("leader")}
                className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${role === 'leader' ? 'bg-forest text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
              >
                Lead a Pack
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 border-[0.5px] border-charcoal/10 -m-4 z-0 group-hover:m-0 transition-all duration-700"></div>
          <div className="relative z-10 h-[700px] overflow-hidden">
            <img 
              src="images/editorial-photography-of-a-group-of-well.png" 
              alt="The Perfect Pack"
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition duration-1000 scale-105 hover:scale-100"
            />
          </div>
        </div>
      </section>

      {/* Safety Matrix */}
      <section id="safety" className="py-40 bg-white border-y border-charcoal/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-sunset uppercase mb-6 block">01 / Logic</span>
            <h2 className="text-4xl md:text-5xl font-bold text-forest mb-10 tracking-tight leading-[1.1]">The Energy Matrix Compatibility.</h2>
            <p className="text-charcoal/60 text-lg leading-relaxed mb-12">
              Safety isn't just about temperament—it's about metabolic demand. We filter out incompatible pairings to protect lower-energy sprinters from high-intensity working breeds.
            </p>
            <div className="space-y-6">
              {breeds.map((b) => (
                <div key={b.name} className="flex items-center justify-between py-6 border-b border-charcoal/5 group hover:px-2 transition-all">
                  <span className="text-sm font-bold uppercase tracking-widest">{b.name}</span>
                  <div className="flex space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-1.5 h-6 ${i <= b.level ? 'bg-forest' : 'bg-charcoal/5'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F0EEE9] p-16 md:p-24 relative overflow-hidden">
             <Shield className="absolute -top-10 -right-10 text-forest/5 w-64 h-64" />
             <h3 className="text-2xl font-bold text-forest mb-6 uppercase tracking-tight italic">Walkable Core&trade;</h3>
             <p className="text-charcoal/50 leading-relaxed mb-12 text-sm">
               Koda operates in "Neighborhood Blocks." We only launch the app in your area when a founding Pack Leader is verified within your 10-minute walkable core. No driving. No empty maps.
             </p>
             <div className="pt-8 border-t border-charcoal/10 flex items-center space-x-4">
               <div className="w-2 h-2 rounded-full bg-sunset animate-pulse" />
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Now Seeding: Brooklyn Heights</span>
             </div>
          </div>
        </div>
      </section>

      {/* Value Prop Cards */}
      <section className="py-40 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="w-12 h-12 border border-charcoal/10 flex items-center justify-center">
            <Shield size={18} className="text-forest" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Safety Signals</h3>
          <p className="text-xs text-charcoal/50 leading-relaxed">Mandatory vaccination records and background checks for every Pack Leader in our network.</p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 border border-charcoal/10 flex items-center justify-center">
            <Zap size={18} className="text-forest" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Energy Sync</h3>
          <p className="text-xs text-charcoal/50 leading-relaxed">Integration with wearable pet trackers to suggest packs based on your dog's daily activity data.</p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 border border-charcoal/10 flex items-center justify-center">
            <MapPin size={18} className="text-forest" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Micro-Community</h3>
          <p className="text-xs text-charcoal/50 leading-relaxed">Build real relationships with neighbors who understand the specific needs of your breed.</p>
        </div>
      </section>

      {/* Final Waitlist Section */}
      <section id="join" className="py-40 bg-forest text-cloud relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter uppercase leading-[0.9]">
            {role === "owner" ? "Your Pack is \nWaiting." : "Leading the \nNeighborhood."}
          </h2>
          
          {status === "success" ? (
            <div className="border border-cloud/20 p-20 backdrop-blur-sm">
              <CheckCircle className="mx-auto text-sunset mb-6" size={64} />
              <h3 className="text-2xl font-bold mb-4 uppercase">Application Received.</h3>
              <p className="text-cloud/60 text-sm tracking-wide">Welcome to Koda. We are currently vetting matches in your zip code.</p>
            </div>
          ) : (
            <div className="bg-white p-12 md:p-20 text-charcoal shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">Breed Profile</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Belgian Malinois"
                      className="w-full bg-[#F0EEE9] border-none px-6 py-5 outline-none focus:ring-1 ring-sunset"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">Observed Drive (1-5)</label>
                    <select 
                      className="w-full bg-[#F0EEE9] border-none px-6 py-5 outline-none focus:ring-1 ring-sunset appearance-none font-medium"
                      value={energy}
                      onChange={(e) => setEnergy(e.target.value)}
                    >
                      <option value="1">1 - Stroller / Napper</option>
                      <option value="2">2 - Casual Sniffer</option>
                      <option value="3">3 - Standard Walker</option>
                      <option value="4">4 - Active Explorer</option>
                      <option value="5">5 - Working Athlete</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3 text-left">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">Email for Local Verification</label>
                  <input 
                    type="email" 
                    required
                    placeholder="raphael@baget.ai"
                    className="w-full bg-[#F0EEE9] border-none px-6 py-5 outline-none focus:ring-1 ring-sunset"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-forest text-white py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-forest/90 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                >
                  {status === "loading" ? "Verifying..." : role === "owner" ? "Request Invitations" : "Apply as Pack Leader"}
                </button>
                <div className="pt-6 text-[10px] text-charcoal/30 uppercase tracking-[0.1em] font-medium leading-relaxed">
                  {role === "owner" ? "By joining the waitlist, you agree to our 2026 Community Safety Standards." : "Pack Leaders undergo mandatory 48-hour background verification."}
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Abstract background element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sunset via-forest to-sunset opacity-30" />
      </section>

      {/* Global Footer */}
      <footer className="py-32 px-6 bg-[#F0EEE9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start border-t border-charcoal/5 pt-20">
          <div className="mb-20 md:mb-0">
             <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 rounded-full border-2 border-forest flex items-center justify-center">
                <div className="w-2 h-2 bg-forest rounded-full" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tighter uppercase italic">KODA</span>
            </div>
            <p className="text-xs text-charcoal/40 max-w-sm leading-loose tracking-wide">
              Koda is a hyper-local social discovery engine for high-status dog owners. 
              Built on the principles of canine ethology and neighborhood structure.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
             <div className="space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-charcoal/30 uppercase">THE SYSTEM</h4>
              <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-forest">
                <li><a href="#" className="hover:text-sunset transition-colors">Safety Matrix</a></li>
                <li><a href="#" className="hover:text-sunset transition-colors">Pack Logic</a></li>
                <li><a href="#" className="hover:text-sunset transition-colors">Leaders</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-charcoal/30 uppercase">RESOURCES</h4>
              <ul className="text-xs space-y-4 font-bold uppercase tracking-widest text-forest">
                <li><a href="#" className="hover:text-sunset transition-colors">Behaviorists</a></li>
                <li><a href="#" className="hover:text-sunset transition-colors">Boutiques</a></li>
                <li><a href="#" className="hover:text-sunset transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.3em] text-charcoal/20">
          <span className="mb-4 md:mb-0 uppercase">&copy; 2026 KODA PROTOCOL. ALL RIGHTS RESERVED.</span>
          <span className="uppercase">Socialization without the chaos.</span>
        </div>
      </footer>
    </div>
  );
}