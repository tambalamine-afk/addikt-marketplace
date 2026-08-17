"use client";
import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <div className="bg-surface-container-lowest text-primary min-h-screen flex flex-col justify-center items-center p-grid-gutter antialiased">
      <main className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link href="/">
            <svg className="w-24 h-24" viewBox="0 0 280 263" xmlns="http://www.w3.org/2000/svg">
              <path fill="#e20020" d="M217.19,0l-4.39,98.66c-.1,1.9,1.69,3.35,3.53,2.85l58.57-19.58-36.11,61.22c-1.32,1.13-1.3,3.18.04,4.29l42.21,61.02-75.98-16.68c-1.57-.22-3.01.92-3.17,2.5l-9.45,68.54-36.33-45.55c-.74-1.67-2.86-2.19-4.29-1.06l-82.59,39.38,39.9-73.25c.85-1.66-.14-3.68-1.97-4.03L0,161.75l118.42-37.11c1.54-.49,2.35-2.17,1.76-3.68l-19.46-70.46,59.61,43.65c1.35,1,3.27.59,4.1-.88L217.19,0Z"></path>
              <path fill="#fdffff" d="M159.6,159.75c-5.64,22.61-17.94,39.61-27.47,37.97-9.53-1.64-12.69-21.3-7.05-43.92,5.64-22.61,17.94-39.61,27.47-37.97,9.53,1.64,12.69,21.3,7.05,43.92Z"></path>
              <path fill="#fdffff" d="M203.86,158.15c-6.98,24.33-21.31,42.22-32,39.96s-13.7-23.81-6.71-48.13c6.98-24.33,21.31-42.22,32-39.96,10.69,2.26,13.7,23.81,6.71,48.13Z"></path>
            </svg>
          </Link>
        </div>
        
        {/* Title */}
        <h1 className="font-headline-md text-headline-md text-center uppercase tracking-tight mb-8">
          Content de te revoir
        </h1>
        
        {/* Login Form */}
        <form className="w-full space-y-6">
          {/* Phone Input */}
          <div className="flex items-center border-2 border-outline-variant focus-within:border-primary transition-colors bg-surface-container-lowest h-14">
            <span className="px-4 border-r-2 border-outline-variant font-label-caps text-label-caps text-secondary h-full flex items-center bg-surface-container-low">
              +221
            </span>
            <input className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 font-body-sm text-body-sm outline-none placeholder-secondary h-full" placeholder="Numéro de téléphone" type="tel" />
          </div>
          
          {/* Submit Button */}
          <button className="w-full bg-primary text-on-primary font-button-text text-button-text py-5 rounded-full uppercase tracking-widest hover:opacity-80 active:scale-95 transition-all duration-200" type="button">
            Continuer
          </button>
          
          {/* Separator */}
          <div className="flex items-center py-4">
            <hr className="flex-1 border-t-2 border-outline-variant" />
            <span className="px-4 font-label-caps text-label-caps text-secondary uppercase">ou</span>
            <hr className="flex-1 border-t-2 border-outline-variant" />
          </div>
          
          {/* Google Button */}
          <button className="w-full bg-surface-container-lowest border-2 border-outline-variant text-primary font-button-text text-button-text py-5 rounded-full flex items-center justify-center space-x-3 hover:bg-surface-container-low active:scale-95 transition-all duration-200" type="button">
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
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Pas encore de compte ? 
            <Link href="/register" className="text-accent-orange font-bold hover:underline transition-all ml-1">Inscris-toi</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
