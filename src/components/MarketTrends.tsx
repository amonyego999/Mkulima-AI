import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

const mockData = [
  { name: 'Jan', maize: 3200, tomatoes: 4500, pMaize: 3300 },
  { name: 'Feb', maize: 3400, tomatoes: 4200, pMaize: 3500 },
  { name: 'Mar', maize: 3100, tomatoes: 4800, pMaize: 3200 },
  { name: 'Apr', maize: 3000, tomatoes: 5000, pMaize: 2900 },
  { name: 'May', maize: 3500, tomatoes: 4600, pMaize: 3800 },
  { name: 'Jun', maize: 3800, tomatoes: 4300, pMaize: 4200 },
];

export default function MarketTrends() {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-soko-text">Market Forecasts</h2>
        <p className="text-xs font-bold uppercase tracking-wider text-soko-text/40">Weekly Outlook / Regional Hubs</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
        <div className="md:col-span-8 farm-card p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-sm">Tomato Price Pulse</h3>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Kitui Hub / Prediction</p>
            </div>
            <div className="text-right text-soko-green">
              <span className="text-2xl font-black">+29%</span>
              <div className="text-[9px] font-bold uppercase">Expected Hike</div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d5a27" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2d5a27" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f1" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="tomatoes" stroke="#2d5a27" strokeWidth={3} fillOpacity={1} fill="url(#colorMaize)" name="Actual Beu" />
                <Area type="step" dataKey="pMaize" stroke="#2d5a27" strokeWidth={1} strokeDasharray="4 4" fill="transparent" name="Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-4 farm-card p-6 bg-soko-green text-white border-none flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-6 opacity-60">Trend Alert</h3>
            <div className="space-y-6">
              <div className="group cursor-default">
                <div className="text-2xl font-black tracking-tight group-hover:text-growth transition-colors uppercase">Maize</div>
                <div className="text-[10px] font-bold opacity-60 tracking-wider">STABILITY: <span className="text-white opacity-100 uppercase">High</span></div>
              </div>
              <div className="group cursor-default">
                <div className="text-2xl font-black tracking-tight text-orange-400 group-hover:text-orange-300 transition-colors uppercase">Onion</div>
                <div className="text-[10px] font-bold opacity-60 tracking-wider">STOCKPILING: <span className="text-white opacity-100 uppercase">Recommended</span></div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 mt-4">
             <button className="w-full text-[10px] font-black tracking-widest bg-white/10 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all uppercase">
               Full Analysis
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="farm-card p-4 bg-soko-light border-soko-green/5 flex gap-3">
          <div className="bg-white p-2 rounded-xl h-fit">
            <Info className="w-4 h-4 text-soko-green" />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-soko-green">Pro Tip</h4>
            <p className="text-[10px] text-soko-text/60 leading-relaxed font-medium mt-1">
              "Brokers wa Kitui wanatafuta tomatoes kwa wingi. Beu itatandikiza 1,500/- by Friday."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
