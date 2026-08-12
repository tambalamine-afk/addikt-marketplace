import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary w-full mt-12 pt-8">
      <div className="max-w-7xl mx-auto px-container-margin py-16">
        <div className="grid grid-cols-1 gap-12 mb-24 text-on-primary md:grid-cols-4">
          <div className="flex flex-col gap-6 md:col-span-1">
            <p className="font-body-sm opacity-90 leading-relaxed">
              Addikt, votre marketplace de mode circulaire et vintage. Une sélection unique pour trouver vos pépites.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xl mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2 font-body-sm opacity-80">
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Femmes</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Hommes</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Enfants</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Marques</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Vendre</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xl mb-4">Aide</h3>
            <ul className="flex flex-col gap-2 font-body-sm opacity-80">
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Livraison</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Retours</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-md text-xl mb-4">Connect</h3>
            <ul className="flex flex-col gap-2 font-body-sm opacity-80">
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Facebook</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Pinterest</li>
              <li className="hover:text-accent-orange cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center items-center pt-8">
          <div className="h-[300px] md:h-[450px] w-full flex items-center justify-center">
            <svg className="w-full h-full mx-auto" viewBox="0 0 352.87 130.21" xmlns="http://www.w3.org/2000/svg">
              <defs><style>{`.cls-footer-1 { fill: #fdffff; } .cls-footer-2 { fill: #e20020; }`}</style></defs>
              <g>
                <g>
                  <path className="cls-footer-2" d="M107.61,0l-2.17,48.88c-.05.94.84,1.66,1.75,1.41l29.02-9.7-17.89,30.33c-.66.56-.65,1.58.02,2.12l20.92,30.23-37.64-8.27c-.78-.11-1.49.45-1.57,1.24l-4.68,33.96-18-22.57c-.37-.83-1.41-1.08-2.12-.52l-40.92,19.51,19.77-36.29c.42-.82-.07-1.82-.98-2L0,80.14l58.67-18.39c.76-.24,1.16-1.08.87-1.82l-9.64-34.91,29.54,21.63c.67.49,1.62.29,2.03-.43L107.61,0Z"></path>
                  <path className="cls-footer-1" d="M79.07,79.15c-2.79,11.2-8.89,19.63-13.61,18.81s-6.29-10.55-3.49-21.76c2.79-11.2,8.89-19.63,13.61-18.81,4.72.81,6.29,10.55,3.49,21.76Z"></path>
                  <path className="cls-footer-1" d="M101.01,78.36c-3.46,12.05-10.56,20.92-15.86,19.8s-6.79-11.79-3.33-23.85c3.46-12.05,10.56-20.92,15.86-19.8,5.3,1.12,6.79,11.79,3.33,23.85Z"></path>
                </g>
                <g>
                  <path className="cls-footer-1" d="M157.42,97.43h14.13l-20.17-41.87h-15.36l-20.23,41.87h13.08l3.69-8.09h21.2l3.67,8.09ZM136.82,79.96l6.34-13.92,6.32,13.92h-12.66Z"></path>
                  <path className="cls-footer-1" d="M200.28,55.56v15.38c-.53-.52-1.13-1.02-1.82-1.51-1.25-.88-2.82-1.59-4.69-2.14-1.88-.55-4.09-.82-6.63-.82-1.64,0-3.25.21-4.81.62-1.56.41-3.02,1.03-4.37,1.85s-2.54,1.86-3.58,3.11c-1.04,1.25-1.84,2.74-2.4,4.46-.57,1.72-.85,3.66-.85,5.81,0,3.6.76,6.58,2.29,8.94,1.52,2.37,3.51,4.13,5.95,5.28s5.03,1.73,7.77,1.73c2.15,0,4.14-.22,5.98-.67,1.84-.45,3.46-1.1,4.87-1.96.87-.53,1.63-1.14,2.29-1.81v3.63h12.49v-41.87h-12.49ZM199.11,86.55c-.43.61-.98,1.14-1.64,1.61-.67.47-1.44.83-2.32,1.08-.88.25-1.87.38-2.96.38-1.84,0-3.38-.34-4.63-1.03-1.25-.68-2.18-1.58-2.79-2.7-.61-1.11-.91-2.3-.91-3.55,0-.78.11-1.53.32-2.23.21-.7.55-1.36,1-1.96.45-.61,1.01-1.14,1.67-1.61.66-.47,1.45-.83,2.35-1.08.9-.25,1.9-.38,2.99-.38,1.84,0,3.36.34,4.57,1.03,1.21.68,2.12,1.57,2.73,2.67.61,1.09.91,2.29.91,3.58,0,.74-.11,1.48-.32,2.2s-.54,1.39-.97,1.99Z"></path>
                  <path className="cls-footer-1" d="M245.97,55.56v15.38c-.53-.52-1.13-1.02-1.82-1.51-1.25-.88-2.82-1.59-4.69-2.14-1.88-.55-4.09-.82-6.63-.82-1.64,0-3.25.21-4.81.62-1.56.41-3.02,1.03-4.37,1.85s-2.54,1.86-3.58,3.11c-1.04,1.25-1.84,2.74-2.4,4.46-.57,1.72-.85,3.66-.85,5.81,0,3.6.76,6.58,2.29,8.94,1.52,2.37,3.51,4.13,5.95,5.28s5.03,1.73,7.77,1.73c2.15,0,4.14-.22,5.98-.67,1.84-.45,3.46-1.1,4.87-1.96.87-.53,1.63-1.14,2.29-1.81v3.63h12.49v-41.87h-12.49ZM244.79,86.55c-.43.61-.98,1.14-1.64,1.61-.67.47-1.44.83-2.32,1.08-.88.25-1.87.38-2.96.38-1.84,0-3.38-.34-4.63-1.03-1.25-.68-2.18-1.58-2.79-2.7-.61-1.11-.91-2.3-.91-3.55,0-.78.11-1.53.32-2.23.21-.7.55-1.36,1-1.96.45-.61,1.01-1.14,1.67-1.61.66-.47,1.45-.83,2.35-1.08.9-.25,1.9-.38,2.99-.38,1.84,0,3.36.34,4.57,1.03,1.21.68,2.12,1.57,2.73,2.67.61,1.09.91,2.29.91,3.58,0,.74-.11,1.48-.32,2.2s-.54,1.39-.97,1.99Z"></path>
                  <path className="cls-footer-1" d="M264.44,97.43v-30.14h12.49v30.14h-12.49ZM264.5,64.3v-8.74h12.43v8.74h-12.43Z"></path>
                  <path className="cls-footer-1" d="M309.33,81.36c-.76-.74-1.73-1.37-2.9-1.88l16.07-12.2h-12.67l-16.35,12.82,4.33-24.55h-10.73l-7.39,41.87h10.73l1.18-6.58,4.8-3.57c1.02-.74,2.1-1.1,3.25-1.08,1.15.02,2.06.66,2.73,1.91l5.34,9.32h11.9l-7.86-12.73c-.86-1.49-1.67-2.6-2.43-3.34Z"></path>
                  <path className="cls-footer-1" d="M352.87,75.15v-7.86h-10.38v-8.15h-12.49v8.15h-6.92v7.86h6.92v11.96c0,3.25.98,5.78,2.93,7.59,1.96,1.82,4.57,2.73,7.86,2.73h12.08v-8.03h-6.04c-1.52,0-2.63-.39-3.31-1.17-.68-.78-1.03-1.86-1.03-3.23v-9.85h10.38Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="border-t border-on-primary/10 py-8 px-container-margin">
        <div className="max-w-7xl mx-auto flex justify-center">
          <p className="font-body-sm opacity-60 text-center w-full" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 300 }}>
            © 2024 Addikt. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
