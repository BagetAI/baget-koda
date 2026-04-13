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
            <span className="font-heading text-xl font-bold tracking-tighter text-forest">KODA</span>
          </div>
          <div className="hidden md:flex space-x-12 text-xs font-medium uppercase tracking-widest">
            <a href="#join" className="hover:text-sunset">Join a Pack</a>
            <a href="#lead" className="hover:text-sunset">Start a Pack</a>
            <a href="#safety" className="hover:text-sunset">Safety</a>
          </div>
          <button className="bg-forest text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-forest/90">
            Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-forest leading-tight mb-8">
            Stop walking alone.<br />Join the pack.
          </h1>
          <p className="max-w-2xl text-lg text-charcoal/80 mb-12 font-medium">
            Koda matches your dog with local friends who share their pace, breed, and energy level. 
            Hyper-local social walks within your 10-minute walkable core.
          </p>
          
          {/* Dual Action Toggle */}
          <div className="w-full max-w-xl mb-16">
            <div className="flex border border-[#E5E5E5] bg-white p-1">
              <button 
                onClick={() => setRole("owner")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${role === 'owner' ? 'bg-forest text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
              >
                Join a Pack
              </button>
              <button 
                onClick={() => setRole("leader")}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${role === 'leader' ? 'bg-forest text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
              >
                Start a Pack
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto h-[600px] overflow-hidden">
          <img 
            src="https://images.lucid-images.com/image/1712952000000-8b4e4c2c-8a9d-4c8d-8a9d-4c8d8a9d4c8d.png" 
            alt="The Perfect Pack"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition duration-700"
          />
        </div>
      </section>

      {/* The Match Preview */}
      <section className="py-24 bg-white border-y border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-forest mb-6 italic">The Energy Matrix</h2>
            <p className="text-charcoal/70 mb-8 leading-relaxed">
              Safety starts with compatibility. Our algorithm prevents mismatched packs—protecting calm breeds from high-intensity interactions while ensuring active dogs get the exercise they crave.
            </p>
            <div className="space-y-4">
              {breeds.map((b) => (
                <div key={b.name} className="flex items-center justify-between p-4 border border-[#F0EEE9] hover:border-sunset/30 transition-colors">
                  <span className="text-sm font-medium">{b.name}</span>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-3 h-3 ${i <= b.level ? 'bg-sunset' : 'bg-[#E5E5E5]'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F0EEE9] p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Shield size={120} className="text-forest" />
             </div>
             <h3 className="text-xl font-bold text-forest mb-4">Walkable Core</h3>
             <p className="text-sm text-charcoal/60 mb-8">
               We launch by block, not by city. Your pack forms within a 10-minute radius of your front door.
             </p>
             <div className="flex items-center space-x-4 text-xs font-bold tracking-widest text-sunset">
               <MapPin size={16} />
               <span>ACTIVE IN: BROOKLYN HEIGHTS</span>
             </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="join" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-forest mb-12">
            {role === "owner" ? "Find Your Pack" : "Become a Pack Leader"}
          </h2>
          
          {status === "success" ? (
            <div className="bg-white border border-[#E5E5E5] p-12">
              <CheckCircle className="mx-auto text-forest mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Welcome to the Pack.</h3>
              <p className="text-charcoal/60">We'll notify you as soon as matches form in your walkable core.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Dog Breed</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Vizsla"
                    className="w-full bg-white border border-[#E5E5E5] px-6 py-4 outline-none focus:border-sunset"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Energy Level (1-5)</label>
                  <select 
                    className="w-full bg-white border border-[#E5E5E5] px-6 py-4 outline-none focus:border-sunset appearance-none"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                  >
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4 - High</option>
                    <option value="5">5 - Extreme</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="raphael@baget.ai"
                  className="w-full bg-white border border-[#E5E5E5] px-6 py-4 outline-none focus:border-sunset"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-forest text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-forest/90 disabled:opacity-50"
              >
                {status === "loading" ? "Processing..." : role === "owner" ? "Join the Waitlist" : "Apply as Pack Leader"}
              </button>
              <p className="text-[10px] text-charcoal/40 uppercase tracking-wider mt-4">
                {role === "owner" ? "Matches forming now in selective zip codes." : "Pack Leaders receive free lifetime Verified status."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#E5E5E5] px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border border-forest flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-forest rounded-full" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tighter">KODA</span>
            </div>
            <p className="text-xs text-charcoal/40 max-w-xs">
              Structured socialization for the modern dog. Safety through breed-compatible energy matching.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-charcoal/40">LEGAL</h4>
              <ul className="text-xs space-y-2 font-medium">
                <li><a href="#" className="hover:text-sunset">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-sunset">Terms of Service</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-charcoal/40">CONNECT</h4>
              <ul className="text-xs space-y-2 font-medium">
                <li><a href="#" className="hover:text-sunset">Instagram</a></li>
                <li><a href="#" className="hover:text-sunset">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#F0EEE9] flex justify-between items-center text-[10px] font-bold tracking-widest text-charcoal/30">
          <span>&copy; 2026 KODA INC.</span>
          <span>BUILT FOR THE PACK.</span>
        </div>
      </footer>
    </div>
  );
}