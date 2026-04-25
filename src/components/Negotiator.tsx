import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, MessageSquare, Globe } from 'lucide-react';
import { Message } from '../types';
import { chatWithMkulima } from '../services/gemini';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'sheng' | 'japanese' | 'german';

export default function Negotiator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Sema farmer! Mimi ni Mkulima AI. Uko na beu gani kwa soko? Au dalali anajaribu kukucheza? Chapa story hapa nikupe miongozo za kutesa soko.",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('sheng');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add language context to the specific request if not Sheng
    let processedInput = input;
    if (language === 'japanese') processedInput = `[TRANSLATE TO JAPANESE]: ${input}`;
    if (language === 'german') processedInput = `[TRANSLATE TO GERMAN]: ${input}`;

    const response = await chatWithMkulima(messages, processedInput);
    
    const modelMessage: Message = {
      role: 'model',
      content: response,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col farm-card bg-white">
      <div className="p-4 border-b border-soko-green/5 bg-soko-bg/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="font-bold text-[11px] uppercase tracking-tighter text-soko-green">Mshauri AI (Online)</h3>
        </div>
        
        <div className="flex items-center gap-2 bg-white/80 p-1 rounded-full border border-soko-green/5">
          <button 
            onClick={() => setLanguage('sheng')}
            className={cn("px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all", 
            language === 'sheng' ? "bg-soko-green text-white" : "text-slate-400 hover:text-soko-green")}
          >
            Sheng
          </button>
          <button 
            onClick={() => setLanguage('japanese')}
            className={cn("px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all", 
            language === 'japanese' ? "bg-soko-green text-white" : "text-slate-400 hover:text-soko-green")}
          >
            JP
          </button>
          <button 
            onClick={() => setLanguage('german')}
            className={cn("px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all", 
            language === 'german' ? "bg-soko-green text-white" : "text-slate-400 hover:text-soko-green")}
          >
            DE
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={m.timestamp + i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex flex-col",
                m.role === 'user' ? "items-end" : "items-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-4 rounded-2xl text-sm transition-all",
                m.role === 'user' 
                  ? "bg-soko-green text-white rounded-tr-none shadow-sm" 
                  : "bg-soko-paper text-soko-text rounded-tl-none italic"
              )}>
                <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
              <span className={cn(
                "text-[9px] mt-2 text-gray-400 font-bold uppercase tracking-widest",
                m.role === 'user' ? "mr-1" : "ml-1"
              )}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-soko-paper p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-soko-green" />
              <span className="text-[10px] text-soko-green/60 font-bold uppercase">Ma-thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-soko-bg border-t border-soko-green/5">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type in English or Sheng..."
            className="flex-1 bg-white border border-soko-green/10 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-soko-green/20 text-sm shadow-inner"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-soko-green text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-soko-green/90 transition-all shadow-lg shadow-soko-green/20 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
