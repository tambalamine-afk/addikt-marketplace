"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/Providers';
import { formatFcfa, listingCover, userFacingError } from '../lib/orders';

const display = { fontFamily: '"Zalando Sans Expanded", sans-serif' };
const body = { fontFamily: '"Google Sans", sans-serif' };
const inputClass = 'w-full bg-surface-container border border-outline-variant/50 rounded-2xl p-4 text-[16px] text-primary placeholder-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none';

function Message({ title, text, linkHref, linkLabel }) {
  return (
    <div className="max-w-[560px] mx-auto px-6 py-24 text-center flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold uppercase text-primary" style={display}>{title}</h1>
      <p className="text-on-surface-variant" style={body}>{text}</p>
      <Link href={linkHref} className="mt-2 bg-primary text-white px-8 py-3 rounded-full font-bold" style={body}>{linkLabel}</Link>
    </div>
  );
}

export default function Checkout() {
  const { id: listingId } = useParams();
  const router = useRouter();
  const { user, supabase, isLoadingAuth, removeFromCart } = useContext(AppContext);

  const [listing, setListing] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);
  const [meetingPlace, setMeetingPlace] = useState('');
  const [city, setCity] = useState('Dakar');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isLoadingAuth || !user || !listingId) return;
    let isActive = true;

    async function load() {
      const [{ data: listingData }, { data: addressData }] = await Promise.all([
        supabase
          .from('listings')
          .select('id, title, price, size, brand, condition, status, seller_id, listing_images(url, position), seller:profiles!seller_id(username)')
          .eq('id', listingId)
          .maybeSingle(),
        supabase
          .from('addresses')
          .select('id, address_line, city, phone')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      if (!isActive) return;

      setListing(listingData);
      if (addressData) {
        // Dernières informations de remise utilisées, pré-remplies
        setSavedAddress(addressData);
        setMeetingPlace(addressData.address_line);
        setCity(addressData.city);
        setPhone(addressData.phone);
      }
      setIsLoading(false);
    }

    load();
    return () => { isActive = false; };
  }, [isLoadingAuth, user, listingId, supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const place = meetingPlace.trim();
    const town = city.trim();
    const tel = phone.trim();
    if (!place || !town || !tel) {
      setErrorMsg('Indique le lieu de remise, la ville et ton téléphone.');
      return;
    }
    if (tel.replace(/\D/g, '').length < 9) {
      setErrorMsg('Vérifie ton numéro de téléphone : il doit contenir au moins 9 chiffres.');
      return;
    }

    setIsSubmitting(true);
    try {
      let addressId = savedAddress?.id;
      const isSameAddress = savedAddress
        && savedAddress.address_line === place
        && savedAddress.city === town
        && savedAddress.phone === tel;

      if (!isSameAddress) {
        const { data: newAddress, error: addressError } = await supabase
          .from('addresses')
          .insert({ user_id: user.id, address_line: place, city: town, phone: tel, is_default: true })
          .select('id')
          .single();
        if (addressError) throw addressError;
        addressId = newAddress.id;
      }

      // Prix, vendeur et réservation de l'article sont gérés côté serveur
      const { data: orderId, error: orderError } = await supabase.rpc('place_order', {
        p_listing_id: listing.id,
        p_delivery_address_id: addressId,
        p_payment_method: 'cod',
      });
      if (orderError) throw orderError;

      removeFromCart(listing.id);
      router.push(`/orders/${orderId}`);
    } catch (err) {
      console.error('Réservation :', err);
      setErrorMsg(userFacingError(err, "La réservation n'a pas pu être enregistrée. Vérifie ta connexion et réessaie."));
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth || (user && isLoading)) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Chargement"></div>
      </div>
    );
  }

  if (!user) {
    return <Message title="Connecte-toi" text="Tu dois être connecté pour réserver un article." linkHref={`/login?next=/checkout/${listingId}`} linkLabel="Se connecter" />;
  }
  if (!listing) {
    return <Message title="Article introuvable" text="Cette annonce n'existe plus ou a été retirée." linkHref="/" linkLabel="Retour à l'accueil" />;
  }
  if (listing.seller_id === user.id) {
    return <Message title="C'est ton annonce" text="Tu ne peux pas réserver un article que tu vends." linkHref={`/product/${listing.id}`} linkLabel="Voir l'annonce" />;
  }
  if (listing.status !== 'active') {
    return <Message title="Article plus disponible" text={listing.status === 'sold' ? 'Cet article a déjà été vendu.' : "Un autre membre l'a réservé. Il sera remis en vente si la remise n'a pas lieu."} linkHref="/" linkLabel="Découvrir d'autres articles" />;
  }

  const details = [listing.size && `Taille ${listing.size}`, listing.brand, listing.condition].filter(Boolean).join(' · ');

  return (
    <main className="max-w-[1000px] mx-auto px-6 py-10 md:py-14">
      <Link href={`/product/${listing.id}`} className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6" style={body}>
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Retour à l'annonce
      </Link>

      <h1 className="text-[28px] md:text-[36px] font-bold uppercase tracking-tight text-primary mb-8" style={display}>
        Réserver l'article
      </h1>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_340px] items-start">
        {/* Récapitulatif (en premier sur mobile) */}
        <aside className="md:order-2 md:sticky md:top-6 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5 flex flex-col gap-5" style={body}>
          <div className="flex gap-4">
            <img src={listingCover(listing)} alt={listing.title} className="w-20 h-24 object-cover rounded-xl bg-surface-container shrink-0" />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-bold text-primary leading-snug break-words">{listing.title}</p>
              {details && <p className="text-[13px] text-on-surface-variant">{details}</p>}
              {listing.seller?.username && <p className="text-[13px] text-on-surface-variant">Vendu par @{listing.seller.username}</p>}
            </div>
          </div>
          <dl className="flex flex-col gap-2 text-[15px] border-t border-outline-variant/40 pt-4">
            <div className="flex justify-between gap-4">
              <dt className="text-on-surface-variant">Paiement</dt>
              <dd className="text-primary text-right">En main propre</dd>
            </div>
            <div className="flex justify-between gap-4 items-baseline">
              <dt className="font-bold text-primary">Total</dt>
              <dd className="text-[22px] font-bold text-primary tabular-nums">{formatFcfa(listing.price)}</dd>
            </div>
          </dl>
        </aside>

        <form onSubmit={handleSubmit} className="md:order-1 flex flex-col gap-10" style={body}>
          <section className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold uppercase text-primary" style={display}>Remise en main propre</h2>
            <p className="text-on-surface-variant">
              Indique où tu souhaites récupérer l'article. Vous fixerez ensemble le moment exact par message.
            </p>
            <label htmlFor="checkout-meeting-place" className="flex flex-col gap-2 font-bold text-primary text-sm">
              Lieu de rendez-vous
              <input id="checkout-meeting-place" value={meetingPlace} onChange={(e) => setMeetingPlace(e.target.value)} className={inputClass} placeholder="Ex. devant la pharmacie, rond-point de Liberté 6" autoComplete="street-address" required />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="checkout-city" className="flex flex-col gap-2 font-bold text-primary text-sm">
                Ville
                <input id="checkout-city" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} autoComplete="address-level2" required />
              </label>
              <label htmlFor="checkout-phone" className="flex flex-col gap-2 font-bold text-primary text-sm">
                Ton téléphone
                <input id="checkout-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="77 123 45 67" type="tel" autoComplete="tel" required />
              </label>
            </div>
            <p className="text-[13px] text-on-surface-variant">Ces informations ne sont visibles que par le vendeur de cet article.</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold uppercase text-primary" style={display}>Paiement</h2>
            <div className="flex items-start gap-3 border-2 border-primary rounded-2xl p-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>radio_button_checked</span>
              <div>
                <p className="font-bold text-primary">En main propre, à la remise</p>
                <p className="text-sm text-on-surface-variant">Tu paies le vendeur quand tu as l'article en main.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[13px] text-on-surface-variant">
              <span className="px-3 py-1 rounded-full border border-outline-variant/60">Wave · bientôt</span>
              <span className="px-3 py-1 rounded-full border border-outline-variant/60">Orange Money · bientôt</span>
            </div>
          </section>

          <div className="flex gap-3 items-start bg-surface-container-low border border-outline-variant/40 rounded-2xl p-4">
            <span className="material-symbols-outlined text-[#0099FF] mt-0.5">verified_user</span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Donne rendez-vous dans un lieu public, vérifie l'article avant de payer, et ne paie jamais d'avance.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-error/10 text-error p-3 text-sm font-bold border border-error/20 rounded-xl" role="alert">{errorMsg}</div>
          )}

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold text-[16px] uppercase tracking-wide py-4 rounded-full hover:bg-black/80 transition-all duration-200 disabled:opacity-50" style={display}>
              {isSubmitting ? 'Réservation…' : 'Réserver cet article'}
            </button>
            <p className="text-[13px] text-on-surface-variant text-center">
              L'article est retiré de la vente le temps de la remise. Tu pourras annuler tant qu'il ne t'a pas été remis.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
