import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="bg-surface-container-lowest text-primary min-h-screen flex flex-col justify-center items-center p-grid-gutter antialiased">
      <main className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link to="/">
            <img alt="Addikt Logo" className="w-24 h-24 object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLtsdp9sYXoz1AZX_rCa9M-kbyrcith-ek743xlodTOK2nSOoG8I7R4BGrTvNDeW8GciUMj_xrLjevj2YZ3D0-wqYWqlIiODW-LBgADzmW-5WN547EKvHv2yEnShD9dYtZ3bN6ZLVO83egMb-Al-YvYr2bznv7AP5q0wfu5AGuZAui7C1SbjZVXFgLyYnsJFrDCukMWjvBSq1cfYgZc2Y8M9JU7be8PzSMcucZ_RP8QeZO1mv9_JNSpVJ4c" />
          </Link>
        </div>
        
        {/* Title */}
        <h1 className="text-[24px] text-center uppercase tracking-tight mb-8" style={{ fontFamily: '"Monument Extended", sans-serif', fontWeight: 800, lineHeight: 1.2 }}>
          Content de te revoir
        </h1>
        
        {/* Login Form */}
        <form className="w-full space-y-6">
          {/* Phone Input */}
          <div className="flex items-center border-2 border-outline-variant focus-within:border-primary transition-colors bg-surface-container-lowest h-14">
            <span className="px-4 border-r-2 border-outline-variant text-[12px] text-secondary h-full flex items-center bg-surface-container-low" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>
              +221
            </span>
            <input className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-[14px] outline-none placeholder-secondary h-full" placeholder="Numéro de téléphone" type="tel" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }} />
          </div>
          
          {/* Submit Button */}
          <button className="w-full bg-primary text-white text-[14px] py-5 rounded-full uppercase tracking-widest hover:opacity-80 active:scale-95 transition-all duration-200" type="button" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>
            Continuer
          </button>
          
          {/* Separator */}
          <div className="flex items-center py-4">
            <hr className="flex-1 border-t-2 border-outline-variant" />
            <span className="px-4 text-[12px] text-secondary uppercase" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 700 }}>ou</span>
            <hr className="flex-1 border-t-2 border-outline-variant" />
          </div>
          
          {/* Google Button */}
          <button className="w-full bg-surface-container-lowest border-2 border-outline-variant text-primary text-[14px] py-5 rounded-full flex items-center justify-center space-x-3 hover:bg-surface-container-low active:scale-95 transition-all duration-200" type="button" style={{ fontFamily: '"Flatit Quiet Sans", sans-serif', fontWeight: 600 }}>
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
              <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
              <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
              <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
            </svg>
            <span className="uppercase tracking-widest">Continuer avec Google</span>
          </button>
        </form>
        
        {/* Footer Link */}
        <div className="mt-12 text-center w-full">
          <p className="text-[14px] text-on-surface-variant" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Pas encore de compte ? 
            <Link to="/register" className="text-accent-orange font-bold hover:underline transition-all ml-1">Inscris-toi</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
