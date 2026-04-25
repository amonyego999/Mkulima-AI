import React from 'react';
import { ShoppingBag, MapPin, Package, User, ExternalLink, ArrowRight } from 'lucide-react';
import { Listing } from '../types';

const mockListings: Listing[] = [
  {
    id: '1',
    farmerName: 'Mama Njeri',
    location: 'Nyeri County',
    crop: 'Potatoes (Waruzi)',
    quantity: '50 Bags',
    price: 'Ksh 2,500 per bag',
  },
  {
    id: '2',
    farmerName: 'Mzee Bakari',
    location: 'Kilifi',
    crop: 'Coconuts',
    quantity: '1,000 Pieces',
    price: 'Ksh 45 per piece',
  },
  {
    id: '3',
    farmerName: 'Otieno Farms',
    location: 'Kisumu',
    crop: 'Fish (Tilapia)',
    quantity: '200 KG',
    price: 'Ksh 400 per KG',
  }
];

export default function Marketplace() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-soko-text uppercase">Direct Sales</h2>
          <p className="text-xs font-bold text-soko-green opacity-60 tracking-wider uppercase">Zero Brokerage / Direct Channels</p>
        </div>
        <button className="bg-soko-green text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-soko-green/90 transition-all shadow-lg shadow-soko-green/20">
          Add Listing
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {mockListings.map((listing) => (
          <div key={listing.id} className="farm-card group hover:border-soko-green/40 transition-all cursor-pointer bg-white p-6 flex gap-6">
            <div className="w-32 h-32 bg-soko-light rounded-[1.5rem] flex items-center justify-center shrink-0">
               <Package className="w-10 h-10 text-soko-green opacity-30" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-soko-text/40">{listing.farmerName}</h3>
                  <div className="text-xl font-black text-soko-text tracking-tight uppercase">{listing.crop}</div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-soko-green tracking-tighter uppercase">{listing.price.split(' ')[1]}</span>
                  <div className="text-[9px] font-black opacity-40 uppercase">Best Offer</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-soko-green" />
                  <span>{listing.location.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-3 h-3 text-soko-green" />
                  <span>{listing.quantity}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-soko-green/5 flex items-center justify-between group-hover:text-soko-green transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest">Connect Directly</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-soko-green/10 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center bg-soko-light/30 space-y-4">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <ExternalLink className="w-6 h-6 text-soko-green" />
          </div>
          <h4 className="text-xs font-black uppercase tracking-widest text-soko-green">Want to skip the broker?</h4>
          <p className="text-[10px] text-slate-400 font-bold max-w-[200px] uppercase tracking-tighter">List your next harvest here and deal with verified buyers only.</p>
        </div>
      </div>
    </div>
  );
}
