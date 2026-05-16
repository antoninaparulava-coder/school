import React, { useState } from 'react';
import Bookings from './Bookings';
import Trip from './Trip'; 

const Admin = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-['Segoe_UI',_sans-serif]">
      
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-[#2c3e50] text-white p-6 shrink-0 shadow-2xl flex flex-col">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-black text-[#3498db] tracking-tighter italic">SCHOOLTRIP.GE</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab('Dashboard')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'Dashboard' ? 'bg-[#3498db] shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('Bookings')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'Bookings' ? 'bg-[#3498db] shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Bookings
          </button>
          {/* Trip Button Added Here */}
          <button 
            onClick={() => setActiveTab('Trip')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'Trip' ? 'bg-[#3498db] shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Trips
          </button>
        </nav>

        <div className="mt-auto bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-bold text-white uppercase tracking-tighter">Server Online</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">
              {activeTab}
            </h1>
            
          </div>
          
          <div className="flex gap-3">
             <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs underline">A</div>
                <span className="text-sm font-bold text-slate-700">Admin User</span>
             </div>
          </div>
        </header>

        {activeTab === 'Dashboard' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-700">
            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Bookings</h3>
                <p className="text-4xl font-black mt-2 text-slate-900">1,284</p>
                <p className="text-[10px] text-green-500 font-bold mt-2">↑ 12% vs last month</p>
              </div>
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Pending Quotes</h3>
                <p className="text-4xl font-black mt-2 text-slate-900">42</p>
                <p className="text-[10px] text-amber-500 font-bold mt-2">Requires attention</p>
              </div>
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 bg-gradient-to-br from-white to-blue-50/30">
                <h3 className="text-[#3498db] text-xs font-black uppercase tracking-widest">Revenue</h3>
                <p className="text-4xl font-black mt-2 text-slate-900">₾84,200</p>
                <div className="w-full bg-blue-100 h-1.5 rounded-full mt-4">
                    <div className="bg-blue-500 w-[70%] h-full rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Analytics Placeholder */}
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Trip Activity</h2>
                  <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[200px] w-full bg-slate-50 rounded-2xl flex items-end justify-around p-4">
                  {/* Simple CSS bar chart representation */}
                  {[60, 40, 80, 50, 90, 70, 30].map((h, i) => (
                    <div key={i} className="w-8 bg-blue-400/20 hover:bg-blue-500 rounded-t-lg transition-all cursor-pointer group relative" style={{height: `${h}%`}}>
                       <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h} Trips</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around mt-4 text-[10px] font-bold text-slate-400 uppercase">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
              {/* Top Destinations */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-800 tracking-tight mb-6">Popular Spots</h2>
                <div className="space-y-5">
                  {[
                    { name: 'Sataflia', count: 42, color: 'bg-green-500' },
                    { name: 'Martvili', count: 38, color: 'bg-blue-500' },
                    { name: 'Gelati', count: 29, color: 'bg-purple-500' },
                    { name: 'Signagi', count: 21, color: 'bg-amber-500' }
                  ].map((spot, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${spot.color}`}></div>
                        <span className="text-sm font-bold text-slate-700">{spot.name}</span>
                      </div>
                      <span className="text-xs font-black text-slate-400">{spot.count} Trips</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-xs font-bold hover:border-blue-200 hover:text-blue-500 transition-all">View All Destinations</button>
              </div>
            </div>
          
        ) : activeTab === 'Bookings' ? (
          <Bookings />
        ) : (
          <Trip />
        )}
      </main>
    </div>
  );
};

export default Admin;