"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function VerifySMS() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 inputs for Supabase
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inputRefs = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  
  const supabase = createClient();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const token = otp.join('');
    if (token.length < 6) {
      setErrorMsg("Veuillez entrer le code à 6 chiffres.");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    } else {
      router.push('/');
    }
  };

  const resendCode = async () => {
    setTimeLeft(30);
    setErrorMsg('');
    await supabase.auth.signInWithOtp({
      phone,
    });
  };

  return (
    <div className="bg-surface text-on-surface h-screen flex flex-col font-body-sm relative overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center items-center px-container-margin max-w-md mx-auto w-full relative z-10">
        
        <header className="flex justify-between items-center w-full bg-surface dark:bg-surface z-10 mb-4 pb-4">
          <button onClick={() => router.back()} className="text-primary hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="text-headline-md font-black text-primary italic font-body-lg" style={{ fontFamily: '"Monument Extended", sans-serif' }}>
            Addi<span className="italic">k</span>t
          </div>
          <div className="w-6 h-6"></div>
        </header>

        <div className="w-full mb-10 min-w-max flex flex-col items-center text-center">
          <h1 className="font-body-lg text-headline-md text-primary uppercase leading-tight mb-4 tracking-tighter font-bold whitespace-nowrap" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>
            Entre le code reçu par SMS
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant flex flex-col sm:flex-row sm:items-center gap-2 justify-center" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            <span>Code envoyé au <span className="font-bold text-primary">{phone || '+221...'}</span></span>
            <button onClick={() => router.back()} className="text-accent-blue font-bold hover:underline">Modifier</button>
          </p>
        </div>
        
        {errorMsg && (
          <div className="w-full bg-error/10 text-error p-3 text-sm font-bold border border-error/20 mb-6">
            {errorMsg}
          </div>
        )}
        
        {/* Verification Code Inputs */}
        <div className="w-full mb-8">
          <form className="flex justify-between gap-2 sm:gap-4">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-16 sm:h-16 text-center font-headline-md text-headline-md text-primary bg-trust-grey border-2 border-transparent focus:border-primary focus:ring-0 rounded-lg outline-none transition-colors"
                inputMode="numeric"
                maxLength={1}
                type="text"
                autoFocus={index === 0}
              />
            ))}
          </form>
        </div>
        
        {/* Resend and Timer */}
        <div className="w-full flex justify-between items-center mb-12" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 400 }}>
          <button 
            className={`font-button-text text-button-text hover:text-primary transition-colors ${timeLeft <= 0 ? 'text-primary font-bold' : 'text-secondary opacity-50 cursor-not-allowed'}`}
            disabled={timeLeft > 0}
            onClick={resendCode}
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
          >
            Renvoyer le code
          </button>
          <span className={`font-body-sm text-body-sm font-bold ${timeLeft <= 0 ? 'text-secondary' : 'text-primary'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
        
        {/* Verify Action Button */}
        <div className="w-full">
          <button 
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full py-4 bg-tertiary text-on-tertiary font-button-text text-button-text rounded-full uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
          >
            {isLoading ? 'Vérification...' : 'Vérifier'}
          </button>
        </div>
      </main>
      
      {/* Background graphic accent */}
      <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none rotate-12">
        <span className="material-symbols-outlined" style={{ fontSize: '300px', fontVariationSettings: '"FILL" 1' }}>star</span>
      </div>
    </div>
  );
}
