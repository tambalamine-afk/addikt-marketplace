"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../components/Providers';
import OrderStatusPill from '../../components/OrderStatusPill';
import { formatFcfa, formatOrderDate, listingCover } from '../../lib/orders';

const display = { fontFamily: '"Zalando Sans Expanded", sans-serif' };
const body = { fontFamily: '"Google Sans", sans-serif' };

export default function OrdersList() {
  const { user, supabase, isLoadingAuth } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState('purchases');

  useEffect(() => {
    if (isLoadingAuth || !user) return;
    let isActive = true;

    async function load() {
      // Les règles d'accès ne renvoient que les commandes où l'on est acheteur ou vendeur
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id, status, total_amount, created_at, buyer_id, seller_id,
          listing:listings(id, title, listing_images(url, position)),
          buyer:profiles!buyer_id(username),
          seller:profiles!seller_id(username)
        `)
        .order('created_at', { ascending: false });

      if (!isActive) return;
      if (error) console.error('Commandes :', error);
      const list = data || [];
      setOrders(list);
      // Un vendeur sans achat arrive directement sur ses ventes
      if (!list.some((o) => o.buyer_id === user.id) && list.some((o) => o.seller_id === user.id)) {
        setTab('sales');
      }
      setIsLoading(false);
    }

    load();
    return () => { isActive = false; };
  }, [isLoadingAuth, user, supabase]);

  const purchases = orders.filter((o) => o.buyer_id === user?.id);
  const sales = orders.filter((o) => o.seller_id === user?.id);
  const visible = tab === 'purchases' ? purchases : sales;

  const tabs = [
    { key: 'purchases', label: 'Mes achats', count: purchases.length },
    { key: 'sales', label: 'Mes ventes', count: sales.length },
  ];

  return (
    <main className="max-w-[860px] mx-auto px-6 py-10 md:py-14" style={body}>
      <h1 className="text-[28px] md:text-[36px] font-bold uppercase tracking-tight text-primary mb-6" style={display}>
        Mes commandes
      </h1>

      <div className="flex gap-2 mb-6" role="tablist" aria-label="Type de commandes">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
            className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-colors ${tab === item.key ? 'bg-primary text-white' : 'bg-surface-container-low text-primary hover:bg-surface-container'}`}
          >
            {item.label} <span className="tabular-nums opacity-70">({item.count})</span>
          </button>
        ))}
      </div>

      {isLoadingAuth || isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Chargement"></div>
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex flex-col items-center gap-3 px-6">
          <span className="material-symbols-outlined text-[48px] text-secondary opacity-60">{tab === 'purchases' ? 'shopping_bag' : 'sell'}</span>
          <p className="font-bold text-primary text-[18px]" style={display}>
            {tab === 'purchases' ? "Tu n'as encore rien réservé" : 'Aucune vente pour le moment'}
          </p>
          <p className="text-on-surface-variant">
            {tab === 'purchases' ? 'Les articles que tu réserves apparaîtront ici.' : 'Quand un acheteur réserve un de tes articles, tu le retrouves ici.'}
          </p>
          <Link href={tab === 'purchases' ? '/' : '/publish'} className="mt-2 bg-primary text-white px-6 py-3 rounded-full font-bold">
            {tab === 'purchases' ? 'Découvrir des articles' : 'Publier une annonce'}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col border-t border-outline-variant/40">
          {visible.map((order) => {
            const counterpart = tab === 'purchases' ? order.seller?.username : order.buyer?.username;
            return (
              <li key={order.id} className="border-b border-outline-variant/40">
                <Link href={`/orders/${order.id}`} className="flex gap-4 py-4 hover:bg-surface-container-low transition-colors rounded-xl px-2 -mx-2">
                  <img src={listingCover(order.listing)} alt="" className="w-16 h-20 object-cover rounded-lg bg-surface-container shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-primary leading-snug truncate">{order.listing?.title || 'Annonce retirée'}</p>
                      <OrderStatusPill status={order.status} />
                    </div>
                    <p className="text-[13px] text-on-surface-variant">
                      {counterpart && `${tab === 'purchases' ? 'Vendu par' : 'Réservé par'} @${counterpart} · `}
                      {formatOrderDate(order.created_at)}
                    </p>
                    <p className="font-bold text-primary tabular-nums">{formatFcfa(order.total_amount)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
