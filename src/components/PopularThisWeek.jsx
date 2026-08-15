import React, { useRef } from 'react';

const FRESH_DROP_ITEMS = [
  {
    title: "CARHARTT VINTAGE",
    price: "25000",
    size: "XL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5AqZ2cPaCCf-8N33xxQ9xu6KHDxfq2LCMk6oPckVrXk32kNQfDMzyZlolsO6lH14qv1BDuv2HoAD9kCGSDVG5c9_U1o5cVoETCDDB8HsvWCWK-fP3qroc-SfZN7NSoXoFyLsl2lN7rTlBCslN6dsrGMsXtZZ-9VIhnUgZeNODEhJ0Sq27lxnzsGMD0UIlH70Grrnoa4W0rbw9wIiW-wVeDaiWjhb1IpzvOo5wZT84AlBq-uTrubxE"
  },
  {
    title: "DAKAR UNION",
    price: "18000",
    size: "M",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8PaSiZF5onF-yWWfEvXiCLpcDKb_pZFjuoVLY8-1chVppqlf8RA30WpA-Dy2ueZFW33TXqASKiUJgL1QZEk-oqb2Q1z8PhKzmzmKHHMStIJoLiI-3SD-XJIS-qeArXWLglmu2ZyH2JuK25D2pBnMd73CEmHfVRLlmN5sw48Av1hSkIbsoCyZx5lUomUgWAMYwZPOKG7rj98_l9l-fowk-0HLCaDbEc3uxb88m2BSAaR9xD7K1crdK"
  },
  {
    title: "MINIMAL TROUSERS",
    price: "15000",
    size: "S",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZ1G-VR7rihSP3AEcWU5_5fOJrGbyMtS5TULpD8Y4FyCko7MQ_UIM5YqBzBFj2iJklrye1-a4500sTMULBIUwkLbSI3gn9NWARVPWmcGylJdUu_ihv9uLUPcEQywAXbivsEoZ3zCAycDxoZqLpz4KpVZ-HNTksHw-KB4rWMeRCIpMYytQI5a62KcHAVhJbFZqmaAH9q1o6aMl1iP_WHEXxBj4Gp2xzF0WZDcNuLk8RFuwOX3dFPMz"
  },
  {
    title: "JORDAN 1 RETRO",
    price: "85000",
    size: "42",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMW-Z7_PWlt-DMUT_Fhb6J9WEUh9G8c26Ck86FTV2ERheV-QYIA1GpiXR6qCXFWYPDxvSpxc_TkrqwGHqcpIOv4u9kIV4Obx2KRGcn2nm8F4P6h8FY14xe3Zd4n20VmY1eTd3OisVYrZhCXIohDetK7rXabGccy55uGFab3NKC1PgGiR4Wp14RrAGvQiJ2hMr1HZcpFpFfdV4zjoGhPxSNqQ9CqSS07ZzNl6s8IAWvTTkHcUYMcIQL"
  },
  {
    title: "WAX JUMPSUIT",
    price: "32000",
    size: "L",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6zLTkSgDJk1y0prOXOmjhn0RiYNkeuomELs8zRh5C6Xhej_CrOChESTfFbideR2hbJKSZWwj5CT_gQIUsQuYy4WFUtAD61aT9NDbNTWpme35vkaIVk4bJU-OasFyykeyyknV8rxNVkemkKdKRqlZb5CkxP9G4vzfII9rELJOrgXT_0Jycl6u2g-bLkdrHeGYgPGtckUlS4NDykkhI4bdjHXgldPZLdyGSs95wTbwpBMLJylDxlP7x"
  },
  {
    title: "LEATHER BAG M&CO",
    price: "45000",
    size: "Unique",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCociVPzIVyJyl6Lt9w4w24s_Kng3Sh6AA8H16-6sHbYArL-pqXOA2Q63rA7ETj0iiVWWsQdpwiWeyeMCEm9EijAy_TiJE79_hXOXH4vbhLgX4O1oJgnzN5zeVc0nKFm5vLTNdI4qlI-8ROm30F6HM8GcBMwtucAmyUp6_0u5Ax2Iq-AdGLQIUcAIw6g7M628lLa0dQz-NskBmFzH9nZAagUuE02U5_-HgfI14HGbWFyqldDDrwY4Md"
  }
];

export default function PopularThisWeek({ onSelect }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[98%] mx-auto bg-accent-purple px-container-margin py-16 relative overflow-hidden my-12 group" style={{ backgroundColor: 'rgb(0, 166, 251)', borderRadius: '18px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-lg text-headline-lg text-white" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 'bold' }}>Fresh DROP</h2>
            <svg className="text-white" fill="currentColor" height="40" viewBox="0 0 100 100" width="40">
              <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z"></path>
            </svg>
          </div>
          <button className="bg-on-primary text-primary font-button-text px-6 py-2.5 rounded-full hover:bg-accent-yellow transition-colors hidden sm:block">Explore</button>
        </div>

        <div className="relative flex items-center">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 z-20 w-10 h-10 flex items-center justify-center border border-white/50 rounded-full text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <div ref={scrollRef} className="flex gap-[10px] overflow-x-auto hide-scrollbar snap-x w-full pb-4 scroll-smooth">
            {FRESH_DROP_ITEMS.map((product, idx) => (
              <div 
                key={idx} 
                className="min-w-[160px] md:min-w-[calc(16.66%-10px)] flex flex-col gap-3 snap-start cursor-pointer"
                onClick={() => onSelect && onSelect(product)}
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <img alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform" src={product.image} />
                </div>
                <div className="flex flex-col px-1 mt-2">
                  <span className="text-[15px] text-white leading-tight" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.title}</span>
                  <span className="text-[14px] text-white/70 leading-tight mt-[1px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.size}</span>
                  <span className="text-[16px] text-white font-bold leading-tight mt-1" style={{ fontFamily: '"Google Sans", sans-serif' }}>{product.price} F</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 z-20 w-10 h-10 flex items-center justify-center border border-white/50 rounded-full text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}
