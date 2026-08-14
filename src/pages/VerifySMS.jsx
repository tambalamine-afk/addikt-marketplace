import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifySMS() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value !== '' && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleResend = () => {
    if (timeLeft <= 0) {
      alert('Code renvoyé');
      setTimeLeft(30);
    }
  };

  const handleVerify = () => {
    // Check if OTP is fully entered
    if (otp.every(digit => digit !== '')) {
       navigate('/');
    }
  };

  return (
    <div className="bg-surface text-on-surface h-screen flex flex-col relative overflow-hidden" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-grid-gutter py-4 bg-surface fixed top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="text-[24px] font-black text-primary italic" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 900 }}>
          Addi<span className="italic">k</span>t
        </div>
        <div className="w-6 h-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center items-center px-container-margin pt-20 pb-10 max-w-md mx-auto w-full relative z-10">
        <div className="w-full mb-10 min-w-max flex flex-col items-center text-center">
          <h1 className="font-body-lg text-headline-md text-primary uppercase leading-tight mb-4 tracking-tighter font-bold whitespace-nowrap">
            Entre le code reçu par SMS
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant flex flex-col sm:flex-row sm:items-center gap-2 justify-center">
            <span>Code envoyé au <span className="font-bold text-primary">+221 77 123 45 67</span></span>
            <Link to="/login" className="text-accent-blue font-bold hover:underline">Modifier</Link>
          </p>
        </div>

        {/* Verification Code Inputs */}
        <div className="w-full mb-8">
          <form className="flex justify-between gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
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
        <div className="w-full flex justify-between items-center mb-12">
          <button 
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-button-text text-button-text transition-colors ${timeLeft > 0 ? 'text-secondary opacity-50 cursor-not-allowed' : 'text-primary font-bold hover:opacity-80'}`}
          >
            Renvoyer le code
          </button>
          <span className={`font-body-sm text-body-sm font-bold ${timeLeft > 0 ? 'text-primary' : 'text-secondary'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>

        {/* Verify Action Button */}
        <div className="w-full mt-auto">
          <button 
            onClick={handleVerify}
            className="w-full py-4 bg-tertiary text-on-tertiary font-button-text text-button-text rounded-full uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
          >
            Vérifier
          </button>
        </div>
      </main>

      {/* Background graphic accent (Brutalist sticker style) */}
      <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none rotate-12">
        <span className="material-symbols-outlined" style={{ fontSize: '300px', fontVariationSettings: "'FILL' 1" }}>star</span>
      </div>
    </div>
  );
}
