"use client";
import Link from 'next/link';
import React from 'react';

export default function MyProfile() {
  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex flex-col bg-white" style={{ fontFamily: '"Google Sans", sans-serif' }}>
      
      {/* Profile Header */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-[100px] h-[100px] rounded-full bg-[#757575] flex items-center justify-center text-white text-[22px] font-bold">
            MU
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[22px] font-bold text-gray-900 leading-none" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>tambc</h1>
            <div className="flex items-center gap-2 mt-0.5 text-gray-300 text-sm">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-gray-500 font-medium">(0)</span>
            </div>
            <div className="text-gray-500 text-sm mt-0.5">
              Active today
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 text-[15px]">
          <div><span className="font-bold text-gray-900 text-[18px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>0</span> <span className="text-gray-500">Followers</span></div>
          <div><span className="font-bold text-gray-900 text-[18px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>0</span> <span className="text-gray-500">Following</span></div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-12">
        <div className="flex gap-8">
          <button className="pb-3 border-b-[3px] border-gray-900 font-bold text-gray-900 text-[15px] transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Selling
          </button>
          <button className="pb-3 font-medium text-gray-500 hover:text-gray-900 transition-colors text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Likes
          </button>
          <button className="pb-3 font-medium text-gray-500 hover:text-gray-900 transition-colors text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
            Saves
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-[460px] mx-auto bg-white rounded-sm p-10 flex flex-col items-center justify-center text-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="mb-4 text-gray-800">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round"></path>
            <circle cx="15.5" cy="15.5" r="3.5" fill="black" stroke="none"></circle>
            <path d="M15.5 13.5v4M13.5 15.5h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
        </div>
        <p className="text-gray-500 text-[15px] mb-6 font-medium">
          Start selling today and turn your clothes into cash
        </p>
        <Link href="/publish" className="bg-[#1b1b1b] text-white font-bold py-2.5 px-6 rounded-sm text-[15px] hover:bg-black transition-colors">
          List an item
        </Link>
      </div>
    </main>
  );
}
