import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Wallet, ArrowRight, RefreshCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    seeds: 0,
    fertilizer: 0,
    labor: 0,
    transport: 0,
    other: 0,
    sellingPrice: 0,
    quantity: 0,
  });

  const [results, setResults] = useState({
    totalCost: 0,
    totalRevenue: 0,
    netProfit: 0,
    roi: 0,
  });

  const calculateROI = () => {
    const totalCost = inputs.seeds + inputs.fertilizer + inputs.labor + inputs.transport + inputs.other;
    const totalRevenue = inputs.sellingPrice * inputs.quantity;
    const netProfit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

    setResults({
      totalCost,
      totalRevenue,
      netProfit,
      roi,
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-soko-text uppercase">ROI Calculator</h2>
        <p className="text-xs font-bold text-soko-green opacity-60 tracking-wider uppercase">Jua Ganji yako / Track your profit</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-7 farm-card p-8 bg-white space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-soko-green" />
            <h3 className="font-black text-xs uppercase tracking-widest text-soko-text">Production Costs (Gharama)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CostInput label="Seeds / Mbegu" name="seeds" value={inputs.seeds} onChange={handleChange} />
            <CostInput label="Fertilizer / Mbolea" name="fertilizer" value={inputs.fertilizer} onChange={handleChange} />
            <CostInput label="Labor / Kibarua" name="labor" value={inputs.labor} onChange={handleChange} />
            <CostInput label="Transport / Usafiri" name="transport" value={inputs.transport} onChange={handleChange} />
            <CostInput label="Other / Nyingine" name="other" value={inputs.other} onChange={handleChange} />
          </div>

          <div className="pt-6 border-t border-soko-green/5">
             <div className="flex items-center gap-2 mb-4 text-soko-green">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-black text-xs uppercase tracking-widest">Expected Sales (Mauzo)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CostInput label="Price per Unit (Beu)" name="sellingPrice" value={inputs.sellingPrice} onChange={handleChange} />
              <CostInput label="Total Units (Quantity)" name="quantity" value={inputs.quantity} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="farm-card p-8 bg-soko-green text-white border-none flex-1">
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-10 opacity-60">Financial Summary</h3>
            
            <div className="space-y-8">
              <div>
                <div className="text-[10px] font-bold opacity-60 uppercase mb-1">Net Profit (Ganji Safi)</div>
                <div className="text-4xl font-black tracking-tighter">Ksh {results.netProfit.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] font-bold opacity-60 uppercase mb-1">Total Cost</div>
                  <div className="text-xl font-black">Ksh {results.totalCost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold opacity-60 uppercase mb-1">Total Revenue</div>
                  <div className="text-xl font-black">Ksh {results.totalRevenue.toLocaleString()}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold opacity-60 uppercase mb-1">Return On Investment</div>
                    <div className={cn(
                      "text-5xl font-black tracking-tighter",
                      results.roi >= 0 ? "text-growth" : "text-red-400"
                    )}>
                      {results.roi.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-3xl backdrop-blur">
                    {results.roi > 50 ? '💎 High Profit' : results.roi > 0 ? '👍 Stable' : '⚠️ Risk'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="farm-card p-6 bg-soko-light border-soko-green/5">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-soko-green mb-2">Farmer's Wisdom</h4>
            <p className="text-[10px] text-soko-text/60 leading-relaxed font-medum">
              {results.roi > 30 
                ? "Hii beu ni fiti! Your ROI is strong. Make sure to negotiate directly to keep every shilling."
                : "ROI iko chini kiasi. Maybe try to reduce transport costs or wait for the price hike next week."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostInput({ label, name, value, onChange }: { label: string, name: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder="0"
          className="w-full bg-soko-bg border border-soko-green/10 rounded-2xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-soko-green/20"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-soko-green/40">
          <Wallet className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
