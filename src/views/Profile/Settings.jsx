"use client";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../components/Providers';

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
  const { user, supabase, addToast } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  
  // Profile State
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '', // Usually read-only from auth
    first_name: '',
    last_name: '',
    bio: '',
    website: '',
    country: 'Senegal',
    avatar_url: ''
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      setIsLoadingProfile(true);
      
      // Email comes from auth user
      setFormData(prev => ({ ...prev, email: user.email || '' }));

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (data) {
        setFormData(prev => ({
          ...prev,
          username: data.username || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          website: data.website || '',
          country: data.location || 'Senegal',
          avatar_url: data.avatar_url || ''
        }));
      }
      setIsLoadingProfile(false);
    }
    
    loadProfile();
  }, [user, supabase]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      let avatarUrlToSave = formData.avatar_url;
      
      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (uploadError) {
          // If 'avatars' bucket doesn't exist, it might fail here. 
          // We will catch it and alert.
          console.error("Avatar upload failed:", uploadError);
          throw new Error("L'upload de l'image a échoué. Assurez-vous que le bucket 'avatars' existe.");
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrlToSave = publicUrl;
      }
      
      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio,
          website: formData.website,
          location: formData.country,
          avatar_url: avatarUrlToSave,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      setFormData(prev => ({ ...prev, avatar_url: avatarUrlToSave }));
      setAvatarFile(null);
      setAvatarPreview(null);
      addToast('Profil mis à jour avec succès', 'success');
      
    } catch (error) {
      console.error(error);
      addToast(error.message || 'Erreur lors de la mise à jour', 'error');
    } finally {
      setIsSaving(false);
    }
  };

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
            {isLoadingProfile ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Avatar Section */}
                <section className="flex items-center gap-6">
                  <div 
                    onClick={handleAvatarClick}
                    className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden relative group"
                  >
                    {avatarPreview || formData.avatar_url ? (
                      <img src={avatarPreview || formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-gray-500" style={{ fontFamily: '"Monument Extended", sans-serif' }}>
                        {formData.username ? formData.username.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[18px] font-bold text-[#111]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Photo de profil</h2>
                    <p className="text-[13px] text-gray-500 max-w-xs mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                      Clique sur l'image pour modifier ton avatar.
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                </section>

                <section>
                  <h2 className="text-[20px] font-bold text-[#111] mb-6" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>User details</h2>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Username</label>
                      <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        disabled
                        className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none text-[15px] text-gray-400 cursor-not-allowed" style={{ fontFamily: '"Google Sans", sans-serif' }} 
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-[20px] font-bold text-[#111] mb-6" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>About me</h2>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>First name</label>
                      <input 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Last name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} 
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Bio</label>
                      <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="3" 
                        className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors resize-none text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}
                        placeholder="Parlez-nous un peu de vous et de ce que vous vendez..."
                      ></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>My website</label>
                      <input 
                        type="text" 
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-black transition-colors text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }} 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[13px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>Country</label>
                      <div className="relative">
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full appearance-none border border-gray-300 px-3 py-2.5 pr-10 outline-none focus:border-black transition-colors bg-white text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}
                        >
                          <option value="Senegal">Senegal</option>
                          <option value="France">France</option>
                          <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                          <option value="Mali">Mali</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col items-start gap-4 mt-2">
                  <p className="text-[14px] text-gray-500" style={{ fontFamily: '"Google Sans", sans-serif' }}>You can update your interests in the app</p>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-[#222] text-white px-5 py-2.5 hover:bg-black transition-colors text-[14px] disabled:opacity-50 flex items-center gap-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enregistrement...
                      </>
                    ) : (
                      'Save changes'
                    )}
                  </button>
                </div>
              </>
            )}
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
                  <span className="text-[15px] text-[#333]" style={{ fontFamily: '"Google Sans", sans-serif' }}>Sales and promos</span>
                  <Toggle checked={emailToggles.sales} onChange={() => handleToggle('sales')} />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="flex flex-col gap-10">
            <h2 className="text-[20px] font-bold text-[#111]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Permissions</h2>
            <p className="text-gray-500">Manage your data permissions here.</p>
          </div>
        )}

        {activeTab === '2fa' && (
          <div className="flex flex-col gap-10">
            <h2 className="text-[20px] font-bold text-[#111]" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>Two-factor authentication</h2>
            <p className="text-gray-500">Add an extra layer of security to your account.</p>
            <button className="self-start border-2 border-black text-black px-6 py-2.5 font-bold hover:bg-black hover:text-white transition-colors" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
              Set up 2FA
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
