import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifySMS() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleVerify = () => {
    // Navigate back to home or a success page
    navigate('/');
  };

  return (
    <div className="bg-surface text-on-surface min-h-[calc(100vh-200px)] flex flex-col font-body-sm relative overflow-hidden w-full items-center">
      {/* Top Navigation (Shell suppressed for transactional, but leaving a back button) */}
      <header className="flex justify-between items-center w-full px-grid-gutter py-4 bg-surface dark:bg-surface top-0 z-10 max-w-md">
        <button onClick={() => navigate(-1)} className="text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="font-headline-md text-2xl font-black text-primary italic" style={{ fontFamily: '"Monument Extended", sans-serif' }}>
          Addi<span className="italic">k</span>t
        </div>
        <div className="w-6 h-6"></div> {/* Spacer for alignment */}
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center items-center px-container-margin pt-10 pb-10 max-w-md mx-auto w-full relative z-10">
        <div className="w-full mb-10">
          <h1 className="font-headline-lg-mobile text-3xl md:text-4xl text-primary uppercase leading-tight mb-4 tracking-tighter" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800 }}>
            Entre le code<br />reçu par SMS
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant flex flex-col sm:flex-row sm:items-center gap-2">
            <span>Code envoyé au <span className="font-bold text-primary">+221 77 123 45 67</span></span>
            <button onClick={() => navigate(-1)} className="text-accent-blue font-bold hover:underline">Modifier</button>
          </p>
        </div>
        
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
                className="w-12 h-14 sm:w-16 sm:h-16 text-center font-headline-md text-2xl text-primary bg-trust-grey border-2 border-transparent focus:border-primary focus:ring-0 rounded-lg outline-none transition-colors"
                inputMode="numeric"
                maxLength={1}
                type="text"
                autoFocus={index === 0}
              />
            ))}
          </form>
        </div>
        
        {/* Resend and Timer */}
        <div className="w-full flex justify-between items-center mb-12">
          <button 
            className={`font-button-text transition-colors ${timeLeft <= 0 ? 'text-primary font-bold' : 'text-secondary hover:text-primary opacity-50 cursor-not-allowed'}`}
            disabled={timeLeft > 0}
            onClick={() => setTimeLeft(30)}
          >
            Renvoyer le code
          </button>
          <span className={`font-body-sm font-bold ${timeLeft <= 0 ? 'text-secondary' : 'text-primary'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
        
        {/* Verify Action Button */}
        <div className="w-full mt-auto">
          <button 
            onClick={handleVerify}
            className="w-full py-4 bg-tertiary text-on-tertiary font-button-text rounded-full uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
          >
            Vérifier
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
