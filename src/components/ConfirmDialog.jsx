"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Remplace window.confirm : fenêtre aux couleurs du site, qui ne gèle pas la page.
// Utilisation :
//   const confirm = useConfirm();
//   if (await confirm({ title: 'Supprimer ?', message: '…', confirmLabel: 'Supprimer', tone: 'danger' })) { … }

const ConfirmContext = createContext(null);

const display = { fontFamily: '"Zalando Sans Expanded", sans-serif' };
const body = { fontFamily: '"Google Sans", sans-serif' };

export function useConfirm() {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error('useConfirm doit être utilisé sous <ConfirmProvider>');
  return confirm;
}

function Dialog({ title, message, confirmLabel, cancelLabel, tone, onClose }) {
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    // Action destructive : le focus part sur « Retour » pour éviter une validation par erreur
    (tone === 'danger' ? cancelRef : confirmRef).current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current(false);
      }
      if (e.key === 'Tab') {
        // Le focus reste dans la fenêtre
        const buttons = [cancelRef.current, confirmRef.current].filter(Boolean);
        const index = buttons.indexOf(document.activeElement);
        e.preventDefault();
        const next = e.shiftKey ? (index <= 0 ? buttons.length - 1 : index - 1) : (index + 1) % buttons.length;
        buttons[next].focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [tone]);

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary';
  const confirmColors = tone === 'danger' ? 'bg-[#e20020] hover:bg-[#c0001b]' : 'bg-primary hover:bg-black/80';

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm addikt-confirm-fade" onClick={() => onCloseRef.current(false)} aria-hidden="true"></div>

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={message ? 'confirm-dialog-message' : undefined}
        className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl p-6 sm:p-7 flex flex-col gap-3 addikt-confirm-pop"
      >
        <h2 id="confirm-dialog-title" className="text-[18px] font-bold uppercase leading-tight tracking-tight text-primary" style={display}>
          {title}
        </h2>
        {message && (
          <p id="confirm-dialog-message" className="text-[15px] leading-relaxed text-on-surface-variant" style={body}>
            {message}
          </p>
        )}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={() => onCloseRef.current(false)}
            className={`w-full sm:w-auto px-6 py-3 rounded-full border border-primary text-primary font-bold text-[13px] uppercase tracking-wide hover:bg-surface-container transition-colors ${focusRing}`}
            style={display}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={() => onCloseRef.current(true)}
            className={`w-full sm:w-auto px-6 py-3 rounded-full text-white font-bold text-[13px] uppercase tracking-wide transition-colors ${confirmColors} ${focusRing}`}
            style={display}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes addikt-confirm-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes addikt-confirm-pop { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
        .addikt-confirm-fade { animation: addikt-confirm-fade 150ms ease-out; }
        .addikt-confirm-pop { animation: addikt-confirm-pop 180ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .addikt-confirm-fade, .addikt-confirm-pop { animation: none; }
        }
      `}</style>
    </div>
  );
}

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const confirm = useCallback(
    (options) =>
      new Promise((resolve) => {
        setDialog({ confirmLabel: 'Confirmer', cancelLabel: 'Retour', tone: 'default', ...options, resolve });
      }),
    []
  );

  const close = (result) => {
    dialog?.resolve(result);
    setDialog(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialog && (
        <Dialog
          title={dialog.title}
          message={dialog.message}
          confirmLabel={dialog.confirmLabel}
          cancelLabel={dialog.cancelLabel}
          tone={dialog.tone}
          onClose={close}
        />
      )}
    </ConfirmContext.Provider>
  );
}
