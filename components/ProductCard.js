import React from 'react';
import AffiliateButton from './AffiliateButton';

export default function ProductCard({ product }) {
  const fallbackImage = "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=300&auto=format&fit=crop"; 

  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white h-full">
      <div className="relative w-full h-48 mb-4">
        <img
          src={product.image_url || fallbackImage}
          alt={product.model}
          className="object-contain w-full h-full"
          onError={(e) => {
            e.target.src = fallbackImage;
            e.target.onerror = null;
          }}
        />
      </div>
      
      <div className="flex-grow">
        <span className="text-xs font-bold text-orange-600 uppercase">{product.brand}</span>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">{product.model}</h3>
        
        <div className="flex items-center gap-2 mt-4 mb-4">
          <span className="text-xl font-bold text-red-600">{product.price_current} €</span>
          {product.price_catalog > product.price_current && (
            <span className="text-xs text-gray-400 line-through">{product.price_catalog} €</span>
          )}
        </div>
      </div>

      {/* ICI on utilise ton composant AffiliateButton existant */}
      <AffiliateButton 
        url={product.source_url} 
        merchantName={product.brand} // Ou une logique pour extraire le marchand de l'URL
        price={product.price_current}
      />
    </div>
  );
}
