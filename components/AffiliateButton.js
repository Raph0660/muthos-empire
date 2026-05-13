'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function AffiliateButton({ url, merchantName = "le marchand", price }) {
  if (!url) return null;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="nofollow sponsored noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full bg-[#1c1917] hover:bg-amber-800 text-white text-center font-bold uppercase tracking-[0.2em] py-5 px-8 transition-all duration-300 shadow-xl group"
    >
      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span>Voir l'offre chez {merchantName}</span>
    </a>
  );
}
