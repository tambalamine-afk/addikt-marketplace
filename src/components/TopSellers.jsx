import React from 'react';
import { Link } from 'react-router-dom';

export const TOP_SELLERS = [
  {
    id: 1,
    name: "The Vintage Block",
    handle: "thevintageblock",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1434389672724-4fa1d84f6b40?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550614000-4b95d4662d5a?w=300&h=300&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Rolling In Style",
    handle: "rollinginstyle",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=300&h=300&fit=crop"
    ]
  },
  {
    id: 3,
    name: "GET LOST THRIFTING",
    handle: "getlostthrifting",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485230895905-31d044e41bf0?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0c37cb5f0fc9?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=300&h=300&fit=crop"
    ]
  }
];

export default function TopSellers() {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
      <h2 className="font-headline-md text-primary text-2xl mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
        Meet the Top Sellers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOP_SELLERS.map(seller => (
          <div key={seller.id} className="bg-white border border-outline-variant/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {seller.images.map((img, idx) => (
                <div key={idx} className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-full object-cover bg-surface-container" />
                <div>
                  <h3 className="font-bold text-sm text-primary leading-tight">{seller.name}</h3>
                  <p className="text-xs text-secondary">@{seller.handle}</p>
                </div>
              </div>
              <Link to={`/seller/${seller.id}`} className="bg-primary text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-black transition-colors">
                SHOP
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
