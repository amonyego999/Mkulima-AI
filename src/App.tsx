import React, { useState } from 'react';
import { 
  BarChart3, 
  MessageSquareQuote, 
  Store, 
  Sprout, 
  Menu, 
  X, 
  ChevronRight,
  TrendingDown,
  Info,
  Calculator
} from 'lucide-react';
import MarketTrends from './components/MarketTrends';
import Negotiator from './components/Negotiator';
import Marketplace from './components/Marketplace';
import ROICalculator from './components/ROICalculator';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'negotiator' | 'trends' | 'marketplace' | 'roi';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('negotiator');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'negotiator', label: 'Negotiator', icon: MessageSquareQuote, description: 'Chapa story na AI' },
    { id: 'trends', label: 'Market Trends', icon: BarChart3, description: 'Beu za soko' },
    { id: 'marketplace', label: 'Direct Sell', icon: Store, description: 'Soko bila broker' },
    { id: 'roi', label: 'ROI Calculator', icon: Calculator, description: 'Jua Ganji yako' },
  ];

  return (
    <div className="min-h-screen flex text-slate-800">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-land/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-soko-green p-2 rounded-xl shadow-lg shadow-soko-green/20">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-soko-text tracking-tight leading-none uppercase">Soko Smart</h1>
              <span className="text-[10px] font-bold text-soko-green/60 tracking-widest uppercase italic">Market Negotiator</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all group",
                  activeTab === tab.id 
                    ? "bg-soko-green text-white shadow-xl shadow-soko-green/20" 
                    : "hover:bg-soko-light text-slate-500 hover:text-soko-text"
                )}
              >
                <tab.icon className={cn(
                  "w-6 h-6",
                  activeTab === tab.id ? "text-white" : "group-hover:text-soko-green"
                )} />
                <div className="text-left">
                  <p className="font-bold text-sm leading-tight uppercase tracking-tight">{tab.label}</p>
                  <p className={cn(
                    "text-[10px] opacity-70",
                    activeTab === tab.id ? "text-white" : "text-slate-400"
                  )}>{tab.description}</p>
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-soko-green/5">
            <div className="bg-soko-light p-4 rounded-3xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-soko-green">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-tight">Market News</span>
              </div>
              <p className="text-[10px] leading-relaxed text-soko-text/60 italic font-medium">
                "Dalalis in Eldoret are trying to lower Maize prices despite low harvest. Keep tabs on our trends to stay safe."
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-paper/30">
        <header className="p-4 lg:p-8 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 bg-white rounded-xl shadow-sm"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden lg:flex items-center gap-4 bg-white/50 backdrop-blur px-6 py-2 rounded-full border border-white/50 shadow-sm ml-auto">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-growth" />
                USD/KSH: 130.40
             </div>
             <div className="w-[1px] h-4 bg-slate-200" />
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <TrendingDown className="w-4 h-4 text-red-400" />
                Fertilizer: -4%
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 lg:p-8 pt-0">
          <div className="max-w-6xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {activeTab === 'negotiator' && <Negotiator />}
                {activeTab === 'trends' && <MarketTrends />}
                {activeTab === 'marketplace' && <Marketplace />}
                {activeTab === 'roi' && <ROICalculator />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
