"use client";
import React, { useContext, useState } from 'react';
import { AppContext } from './Providers';

const REASONS = [
  { value: 'counterfeit', label: 'Contrefaçon' },
  { value: 'prohibited', label: 'Article interdit' },
  { value: 'misleading', label: 'Annonce trompeuse (photos, état, prix)' },
  { value: 'scam', label: "Tentative d'arnaque" },
  { value: 'offensive', label: 'Contenu choquant' },
  { value: 'other', label: 'Autre raison' },
];

const body = { fontFamily: '"Google Sans", sans-serif' };

export default function ReportListingButton({ listingId }) {
  const { user, supabase } = useContext(AppContext);
  // closed → open → sending → sent, ou already si l'annonce a déjà été signalée
  const [state, setState] = useState('closed');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpen = () => {
    if (!user) {
      window.dispatchEvent(new Event('openAuthModal'));
      return;
    }
    setState('open');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      setErrorMsg('Choisis un motif.');
      return;
    }
    setErrorMsg('');
    setState('sending');

    const { error } = await supabase.from('reports').insert({
      listing_id: listingId,
      reporter_id: user.id,
      reason,
      details: details.trim() || null,
    });

    if (error?.code === '23505') {
      setState('already');
      return;
    }
    if (error) {
      console.error('Signalement :', error);
      setErrorMsg("Le signalement n'a pas pu être envoyé. Réessaie.");
      setState('open');
      return;
    }
    setState('sent');
  };

  if (state === 'sent' || state === 'already') {
    return (
      <p className="text-sm text-on-surface-variant" style={body}>
        {state === 'sent'
          ? "Merci, ton signalement a été transmis à l'équipe Addikt."
          : 'Tu as déjà signalé cette annonce. Merci !'}
      </p>
    );
  }

  if (state === 'closed') {
    return (
      <button type="button" onClick={handleOpen} className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary hover:underline" style={body}>
        <span className="material-symbols-outlined text-[18px]">flag</span>
        Signaler cette annonce
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5" style={body}>
      <p className="font-bold text-primary">Pourquoi signales-tu cette annonce ?</p>
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Motif du signalement</legend>
        {REASONS.map((item) => (
          <label key={item.value} htmlFor={`report-reason-${item.value}`} className="flex items-center gap-3 text-[15px] text-on-surface cursor-pointer">
            <input
              id={`report-reason-${item.value}`}
              type="radio"
              name="report-reason"
              value={item.value}
              checked={reason === item.value}
              onChange={() => setReason(item.value)}
              className="w-4 h-4 accent-black"
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      <label htmlFor="report-details" className="flex flex-col gap-1.5 text-sm text-on-surface-variant">
        Précisions (facultatif)
        <textarea
          id="report-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={1000}
          rows={3}
          className="w-full bg-white border border-outline-variant/60 rounded-xl p-3 text-[15px] text-primary outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      {errorMsg && <p className="text-sm font-bold text-error">{errorMsg}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={state === 'sending'} className="bg-primary text-white font-bold text-[13px] uppercase tracking-wide px-5 py-2.5 rounded-full disabled:opacity-50" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
          {state === 'sending' ? 'Envoi…' : 'Envoyer le signalement'}
        </button>
        <button type="button" onClick={() => { setState('closed'); setErrorMsg(''); }} className="text-sm font-bold text-on-surface-variant hover:underline px-2">
          Annuler
        </button>
      </div>
    </form>
  );
}
