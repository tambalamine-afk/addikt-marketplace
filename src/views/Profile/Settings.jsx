"use client";
import React, { useState } from 'react';

const Toggle = ({ checked, onChange }) => (
  <button 
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`w-11 h-6 rounded-full flex items-center px-[3px] transition-colors focus:outline-none ${checked ? 'bg-[#e20020]' : 'bg-gray-300'}`}
  >
    <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`} />
  </button>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('email');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  
  const [emailToggles, setEmailToggles] = useState({
    promotional: true,
    features: true,
    trends: true,
    sales: true,
    shopping: true,
    sellingTips: true,
    recommendations: true,
    specialOffers: true,
    unreadMessages: true,
  });

  const handleToggle = (key) => {
    setEmailToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 gap-8 md:gap-16">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] flex-shrink-0 flex flex-col gap-6">
        <nav className="flex flex-col">
          <div 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 cursor-pointer text-[15px] ${activeTab === 'profile' ? 'bg-[#f2f2f2] font-bold text-black' : 'text-[#333] hover:bg-gray-50'}`} 
            style={{ fontFamily: activeTab === 'profile' ? '"Zalando Sans Expanded", sans-serif' : '"Google Sans", sans-serif' }}
          >
            Profile
          </div>
          
          <div 
            onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
            className="px-4 py-3 flex justify-between items-center cursor-pointer transition-colors text-[15px] text-black font-bold"
            style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}
          >
            <span>Preferences</span>
            <span className="material-symbols-outlined text-xl transition-transform" style={{ transform: isPreferencesOpen ? 'rotate(180deg)' : 'none' }}>expand_more</span>
          </div>
          
          {isPreferencesOpen && (
            <div className="flex flex-col">
              <div 
                onClick={() => setActiveTab('email')}
                className={`px-8 py-3 cursor-pointer text-[15px] ${activeTab === 'email' ? 'bg-[#f2f2f2] font-bold text-black' : 'text-[#333] hover:bg-gray-50'}`}
                style={{ fontFamily: activeTab === 'email' ? '"Zalando Sans Expanded", sans-serif' : '"Google Sans", sans-serif' }}
              >
                Email
              </div>
              <div 
                onClick={() => setActiveTab('permissions')}
                className={`px-8 py-3 cursor-pointer text-[15px] ${activeTab === 'permissions' ? 'bg-[#f2f2f2] font-bold text-black' : 'text-[#333] hover:bg-gray-50'}`}
                style={{ fontFamily: activeTab === 'permissions' ? '"Zalando Sans Expanded", sans-serif' : '"Google Sans", sans-serif' }}
              >
                Permissions
              </div>
            </div>
          )}

          <div 
            onClick={() => setActiveTab('2fa')}
            className={`px-4 py-3 cursor-pointer transition-colors text-[15px] mt-2 ${activeTab === '2fa' ? 'bg-[#f2f2f2] font-bold text-black' : 'text-[#333] hover:bg-gray-50'}`} 
            style={{ fontFamily: activeTab === '2fa' ? '"Zalando Sans Expanded", sans-serif' : '"Google Sans", sans-serif' }}
          >
            Two-factor authentication
          </div>
        </nav>

        <div className="px-4 mt-2">
          <h3 className="font-bold text-black mb-2 text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>My Addikt link</h3>
          <a href="#" className="text-[#2A5AAB] hover:underline text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>addikt.com/tambc</a>
        </div>

        <div className="px-4">
          <h3 className="font-bold text-black mb-2 text-[15px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Support</h3>
          <a href="#" className="text-[#2A5AAB] hover:underline text-[15px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Need help?</a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 flex flex-col gap-10 max-w-2xl">
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-[20px] font-bold text-[#111] mb-6" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>User details</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Username</label>
                  <input type="text" defaultValue="tambc" className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Email</label>
                  <input type="email" defaultValue="tambalamine@gmail.com" className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-[#111] mb-6" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>About me</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>First name</label>
                  <input type="text" defaultValue="Mr" className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                </div>
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Last name</label>
                  <div className="relative">
                    <input type="text" defaultValue="UnderCover" className="w-full border border-gray-300 px-3 py-2.5 pr-10 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center justify-center bg-gray-100 rounded-full w-5 h-5">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Bio</label>
                  <textarea rows="2" className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors resize-none text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>My website</label>
                  <input type="text" className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} />
                </div>
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Country</label>
                  <div className="relative">
                    <select className="w-full appearance-none border border-gray-300 px-3 py-2.5 pr-10 outline-none focus:border-black transition-colors bg-white text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      <option value="Senegal">Senegal</option>
                      <option value="France">France</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col items-start gap-4 mt-2">
              <p className="text-[14px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>You can update your interests in the app</p>
              <button className="bg-[#222] text-white px-5 py-2.5 hover:bg-black transition-colors text-[14px]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>
                Save changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-[18px] font-bold text-[#111] mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Email notifications</h2>
              <div className="flex items-center justify-between py-5 border-b border-gray-200">
                <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>All promotional emails</span>
                <Toggle checked={emailToggles.promotional} onChange={() => handleToggle('promotional')} />
              </div>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-[#111] mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>News</h2>
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>New features and updates</span>
                  <Toggle checked={emailToggles.features} onChange={() => handleToggle('features')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Trends, campaigns and more</span>
                  <Toggle checked={emailToggles.trends} onChange={() => handleToggle('trends')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Sales and promotions</span>
                  <Toggle checked={emailToggles.sales} onChange={() => handleToggle('sales')} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-[#111] mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Enhancing your Addikt experience</h2>
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Shopping updates</span>
                  <Toggle checked={emailToggles.shopping} onChange={() => handleToggle('shopping')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Selling tips and updates</span>
                  <Toggle checked={emailToggles.sellingTips} onChange={() => handleToggle('sellingTips')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Personalised recommendations</span>
                  <Toggle checked={emailToggles.recommendations} onChange={() => handleToggle('recommendations')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Special offers from sellers</span>
                  <Toggle checked={emailToggles.specialOffers} onChange={() => handleToggle('specialOffers')} />
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Unread messages</span>
                  <Toggle checked={emailToggles.unreadMessages} onChange={() => handleToggle('unreadMessages')} />
                </div>
              </div>
            </section>
          </div>
        )}

        {(activeTab === 'permissions' || activeTab === '2fa') && (
          <div className="text-gray-500 py-10" style={{ fontFamily: '"Google Sans", sans-serif' }}>
            This section is currently under construction.
          </div>
        )}
      </main>
    </div>
  );
}
