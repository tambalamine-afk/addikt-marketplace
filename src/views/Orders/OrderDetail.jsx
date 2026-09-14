"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../components/Providers';
import OrderStatusPill from '../../components/OrderStatusPill';
import {
  ORDER_STEPS,
  formatFcfa,
  formatOrderDate,
  listingCover,
  orderStepIndex,
  userFacingError,
  whatsappLink,
} from '../../lib/orders';

const display = { fontFamily: '"Zalando Sans Expanded", sans-serif' };
const body = { fontFamily: '"Google Sans", sans-serif' };

const ACTIONS = {
  deliver: {
    status: 'delivered',
    label: 'Confirmer la réception',
    confirm: "Confirmes-tu avoir reçu l'article ?",
    success: 'Réception confirmée. Merci !',
    primary: true,
  },
  ship: {
    status: 'shipped',
    label: "J'ai remis l'article",
    confirm: "Confirmes-tu avoir remis l'article à l'acheteur ?",
    success: 'Remise enregistrée.',
    primary: true,
  },
  cancelPurchase: {
    status: 'cancelled',
    label: 'Annuler la commande',
    confirm: "Annuler la commande ? L'article sera remis en vente.",
    success: 'Commande annulée.',
  },
  cancelSale: {
    status: 'cancelled',
    label: 'Annuler la vente',
    confirm: "Annuler la vente ? L'article sera remis en vente.",
    success: 'Vente annulée.',
  },
};

function nextStep(status, isBuyer) {
  if (status === 'cancelled') {
    return { title: 'Commande annulée', text: "L'article a été remis en vente.", actions: [] };
  }
  if (status === 'delivered') {
    return {
      title: 'Vente terminée',
      text: isBuyer ? 'Profite bien de ton article !' : "L'acheteur a confirmé la réception. Bravo pour ta vente !",
      actions: [],
    };
  }
  if (isBuyer) {
    if (status === 'shipped') {
      return {
        title: "Le vendeur indique t'avoir remis l'article",
        text: 'Si tout est en ordre, confirme la réception pour terminer la commande.',
        actions: [ACTIONS.deliver],
      };
    }
    return {
      title: 'Retrouve le vendeur pour la remise',
      text: "Convenez ensemble d'un moment. Vérifie l'article avant de payer, puis confirme la réception ici.",
      actions: [ACTIONS.deliver, ACTIONS.cancelPurchase],
    };
  }
  if (status === 'shipped') {
    return { title: "En attente de l'acheteur", text: "L'acheteur doit confirmer la réception pour terminer la vente.", actions: [] };
  }
  return {
    title: "Contacte l'acheteur pour fixer la remise",
    text: "Une fois l'article remis et payé, indique-le ici.",
    actions: [ACTIONS.ship, ACTIONS.cancelSale],
  };
}

function Stars({ value, size = 18 }) {
  return (
    <span className="inline-flex" aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="material-symbols-outlined" style={{ fontSize: size, color: '#FFB800', fontVariationSettings: `'FILL' ${n <= value ? 1 : 0}` }}>star</span>
      ))}
    </span>
  );
}

function ReviewForm({ username, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    setIsSending(true);
    const ok = await onSubmit(rating, comment);
    if (!ok) setIsSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="font-bold text-primary">Comment s'est passée la transaction avec @{username || 'ce membre'} ?</p>
      <div className="flex gap-1" role="radiogroup" aria-label="Note">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
            onClick={() => setRating(n)}
            className="p-1 rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[32px]" style={{ color: '#FFB800', fontVariationSettings: `'FILL' ${n <= rating ? 1 : 0}` }}>star</span>
          </button>
        ))}
      </div>
      <label htmlFor="review-comment" className="flex flex-col gap-1.5 text-sm text-on-surface-variant">
        Un mot pour la communauté (facultatif)
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full bg-white border border-outline-variant/60 rounded-xl p-3 text-[15px] text-primary outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      <button type="submit" disabled={!rating || isSending} className="self-start bg-primary text-white font-bold text-[13px] uppercase tracking-wide px-6 py-3 rounded-full disabled:opacity-40" style={display}>
        {isSending ? 'Publication…' : "Publier l'avis"}
      </button>
    </form>
  );
}

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user, supabase, isLoadingAuth, addToast } = useContext(AppContext);

  const [order, setOrder] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sellerPhone, setSellerPhone] = useState(null);
  const [loadState, setLoadState] = useState('loading');
  const [pendingStatus, setPendingStatus] = useState(null);

  const loadOrder = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, status, total_amount, payment_method, created_at, buyer_id, seller_id, listing_id,
        listing:listings(id, title, size, brand, listing_images(url, position)),
        buyer:profiles!buyer_id(username),
        seller:profiles!seller_id(username),
        address:addresses!delivery_address_id(address_line, city, phone)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error('Commande :', error);
      setLoadState('notfound');
      return;
    }

    const { data: reviewData } = await supabase
      .from('reviews')
      .select('id, reviewer_id, rating, comment')
      .eq('order_id', id);

    setOrder(data);
    setReviews(reviewData || []);
    setLoadState('ready');
  }, [id, supabase]);

  useEffect(() => {
    if (!isLoadingAuth && user && id) loadOrder();
  }, [isLoadingAuth, user, id, loadOrder]);

  const isBuyer = order?.buyer_id === user?.id;

  // L'acheteur d'une commande en cours peut joindre le vendeur sur WhatsApp
  useEffect(() => {
    if (!order || !isBuyer || !order.listing_id) return;
    supabase
      .rpc('get_seller_phone', { p_listing_id: order.listing_id })
      .then(({ data }) => setSellerPhone(data || null));
  }, [order, isBuyer, supabase]);

  const changeStatus = async (action) => {
    if (!window.confirm(action.confirm)) return;
    setPendingStatus(action.status);
    const { error } = await supabase.rpc('update_order_status', { p_order_id: order.id, p_status: action.status });
    setPendingStatus(null);
    if (error) {
      console.error('Statut de commande :', error);
      addToast(userFacingError(error, "L'action n'a pas pu être enregistrée. Réessaie."));
    } else {
      addToast(action.success);
    }
    await loadOrder();
  };

  const openConversation = async () => {
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('listing_id', order.listing_id)
      .eq('buyer_id', order.buyer_id)
      .maybeSingle();

    if (existing) {
      router.push(`/messages/${existing.id}`);
      return;
    }
    if (!isBuyer) {
      addToast("L'acheteur ne t'a pas encore écrit : appelle-le ou écris-lui sur WhatsApp.");
      return;
    }
    const { data: created, error } = await supabase
      .from('conversations')
      .insert({ listing_id: order.listing_id, buyer_id: user.id, seller_id: order.seller_id })
      .select('id')
      .single();
    if (error) {
      console.error('Conversation :', error);
      addToast("La conversation n'a pas pu être ouverte. Réessaie.");
      return;
    }
    router.push(`/messages/${created.id}`);
  };

  const submitReview = async (rating, comment) => {
    const { error } = await supabase.from('reviews').insert({
      order_id: order.id,
      reviewer_id: user.id,
      reviewed_id: isBuyer ? order.seller_id : order.buyer_id,
      rating,
      comment: comment.trim() || null,
    });
    if (error) {
      console.error('Avis :', error);
      addToast(error.code === '23505' ? 'Tu as déjà laissé un avis pour cette commande.' : "L'avis n'a pas pu être publié. Réessaie.");
      return false;
    }
    addToast('Merci pour ton avis !');
    await loadOrder();
    return true;
  };

  if (isLoadingAuth || (user && loadState === 'loading')) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Chargement"></div>
      </div>
    );
  }

  if (!user || loadState === 'notfound') {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-24 text-center flex flex-col items-center gap-4" style={body}>
        <h1 className="text-2xl font-bold uppercase text-primary" style={display}>Commande introuvable</h1>
        <p className="text-on-surface-variant">Cette commande n'existe pas ou ne te concerne pas.</p>
        <Link href="/orders" className="mt-2 bg-primary text-white px-8 py-3 rounded-full font-bold">Voir mes commandes</Link>
      </div>
    );
  }

  const listing = order.listing;
  const counterpart = isBuyer ? order.seller?.username : order.buyer?.username;
  const step = nextStep(order.status, isBuyer);
  const currentStep = orderStepIndex(order.status);
  const myReview = reviews.find((r) => r.reviewer_id === user.id);
  const receivedReview = reviews.find((r) => r.reviewer_id !== user.id);
  const address = order.address;
  const contactPhone = isBuyer ? sellerPhone : address?.phone;
  const whatsappText = `Bonjour, c'est à propos de la commande Addikt « ${listing?.title || 'article'} ».`;
  const canContact = order.status !== 'cancelled' && order.listing_id;

  return (
    <main className="max-w-[1000px] mx-auto px-6 py-10 md:py-14" style={body}>
      <Link href="/orders" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Mes commandes
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-widest text-on-surface-variant">
            {isBuyer ? 'Achat' : 'Vente'} du {formatOrderDate(order.created_at)}
          </p>
          <h1 className="text-[26px] md:text-[34px] font-bold uppercase tracking-tight text-primary leading-tight" style={display}>
            {isBuyer ? 'Ta commande' : 'Ta vente'}
          </h1>
        </div>
        <OrderStatusPill status={order.status} />
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className="flex flex-col gap-8">
          {order.status !== 'cancelled' && (
            <ol className="grid grid-cols-3 gap-3" aria-label="Avancement de la commande">
              {ORDER_STEPS.map((item, index) => {
                const isDone = index <= currentStep;
                return (
                  <li key={item.key} className="flex flex-col gap-2" aria-current={index === currentStep ? 'step' : undefined}>
                    <span className={`h-1.5 rounded-full ${isDone ? 'bg-primary' : 'bg-surface-container-high'}`}></span>
                    <span className={`text-[12px] font-bold uppercase tracking-wide ${isDone ? 'text-primary' : 'text-on-surface-variant'}`}>{item.label}</span>
                  </li>
                );
              })}
            </ol>
          )}

          <section className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-primary" style={display}>{step.title}</h2>
            <p className="text-on-surface-variant leading-relaxed">{step.text}</p>
            {step.actions.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-1">
                {step.actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    disabled={pendingStatus !== null}
                    onClick={() => changeStatus(action)}
                    className={action.primary
                      ? 'bg-primary text-white font-bold text-[14px] uppercase tracking-wide px-6 py-3 rounded-full hover:bg-black/80 disabled:opacity-50'
                      : 'border border-primary text-primary font-bold text-[14px] uppercase tracking-wide px-6 py-3 rounded-full hover:bg-surface-container disabled:opacity-50'}
                    style={display}
                  >
                    {pendingStatus === action.status ? 'Enregistrement…' : action.label}
                  </button>
                ))}
              </div>
            )}
          </section>

          {order.status === 'delivered' && (
            <section className="flex flex-col gap-5">
              <h2 className="text-[18px] font-bold uppercase text-primary" style={display}>Avis</h2>
              {myReview ? (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-on-surface-variant">Ton avis sur @{counterpart || 'ce membre'}</p>
                  <Stars value={myReview.rating} />
                  {myReview.comment && <p className="text-primary">{myReview.comment}</p>}
                </div>
              ) : (
                <ReviewForm username={counterpart} onSubmit={submitReview} />
              )}
              {receivedReview && (
                <div className="flex flex-col gap-1 border-t border-outline-variant/40 pt-4">
                  <p className="text-sm text-on-surface-variant">Avis de @{counterpart || 'ce membre'} sur toi</p>
                  <Stars value={receivedReview.rating} />
                  {receivedReview.comment && <p className="text-primary">{receivedReview.comment}</p>}
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="border border-outline-variant/40 rounded-2xl p-5 flex gap-4">
            <img src={listingCover(listing)} alt="" className="w-20 h-24 object-cover rounded-xl bg-surface-container shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              {listing ? (
                <Link href={`/product/${listing.id}`} className="font-bold text-primary leading-snug break-words hover:underline">{listing.title}</Link>
              ) : (
                <p className="font-bold text-primary">Annonce retirée</p>
              )}
              {counterpart && <p className="text-[13px] text-on-surface-variant">{isBuyer ? 'Vendu par' : 'Réservé par'} @{counterpart}</p>}
              <p className="text-[20px] font-bold text-primary tabular-nums mt-1">{formatFcfa(order.total_amount)}</p>
              <p className="text-[13px] text-on-surface-variant">Paiement en main propre</p>
            </div>
          </div>

          <div className="border border-outline-variant/40 rounded-2xl p-5 flex flex-col gap-2">
            <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
              {isBuyer ? 'Tes informations de remise' : "Remise avec l'acheteur"}
            </h2>
            {address ? (
              <>
                <p className="text-primary font-bold">{address.address_line}</p>
                <p className="text-on-surface-variant">{address.city}</p>
                <a href={`tel:${address.phone}`} className="text-primary underline w-fit">{address.phone}</a>
              </>
            ) : (
              <p className="text-on-surface-variant">Aucun lieu indiqué : convenez-en par message.</p>
            )}
          </div>

          {canContact && (
            <div className="flex flex-col gap-3">
              <button type="button" onClick={openConversation} className="w-full border border-primary text-primary font-bold text-[14px] uppercase tracking-wide py-3 rounded-full hover:bg-surface-container" style={display}>
                Envoyer un message
              </button>
              {contactPhone && (
                <a href={whatsappLink(contactPhone, whatsappText)} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-[#25D366] text-white font-bold text-[14px] uppercase tracking-wide py-3 rounded-full hover:bg-[#20bd5a]" style={display}>
                  Écrire sur WhatsApp
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
