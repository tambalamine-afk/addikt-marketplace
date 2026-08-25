"use client";
import Link from 'next/link';
import React from 'react';

export const TOP_SELLERS = [
  {
    id: 1,
    name: "Aminata Diallo",
    handle: "aminata_d",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo"
    ]
  },
  {
    id: 2,
    name: "Ibrahima Fall",
    handle: "ibra_sneaks",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcs43Suu82hPn-qrAKD-phR9HCmndvs8-2g_AKei7O9d2WWquUYcidNK2mqpM4yJ3kKF9ESK8xlztIgB0RIhdg8uY8aQIDAkaFqk6l6xKJ_9eeNJhGUEKqQ9G2qL3RnXziJa8zeiRoSq4qXCAhxAPEBoTbcGrFEDugdYhpuqf8D6xugJWCQq9EfNgj0_Gsm-FRrr-Uq9zkaiDeucET8UCdLHKfOnilpdN6mODco9GnKB6kpODYUhrL"
    ]
  },
  {
    id: 3,
    name: "Fatou Mbaye",
    handle: "fatou_vintage",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9qFRcg-PAa-7zMaH_B8pc2yfK4HvGyQzEOh6LMce9HlMTChL7m3UI3TimVlAixu-nmt6ejNuOecOzn4odK0imoxbB0SH0piGP4xyGxEPHgEipHEWR_RrcVNZjgnNH1d7jd_Bb_tUXFkHAoa2DjuIpbBeLWSjehtn6sdpCPMyMhH_gfC02VMY68zG31EOofOP3SDdcgS0WLspLwNdWXLK8T27_LxVZBpBYiHLdbBnj_OqKo8vVfGT",
      "https://images.unsplash.com/photo-1583846400216-df267688220f?w=500",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACcbSS4y2pJ23MnUkOsDTBRG_3QY0sD49h3EN1xt9qaJwHjTEtCoqT8I_yinhPy5AbuCbwHg18mw_KjP-Ba-NdWbJv06_EMA2EjT5XW0v1FtlPKOU8boUyfDxKpbxxqws3EX1weIPjtRBJ5u5aWO2uKTTox-az-D_lolvTTPAsZPJcY2umQhxEAlaFunbNsuTkjecWUf86j7TelGPT3sAqq15qfCjJNVrJ6CnNpN6Lq8MGc5c3sqPk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5p1FuRWy3m0NFykexcQcRtdjf6cFnRz8p7pbXN94KpoaOLtF8TH8kOE-5NE1wo2DkL93rdwMWbnIclQ8buif2RLBT0QmxWx80RkjV6LVL0BjWRVtwBYDWfCbhHL4pSebvqBj0yT6N5z1pHF5KzFY42z0_NmrJlDhK3JKSGqGNvJixmvj7znS056rtrqBYf6FAMt_NZRo61MDmRkEqP-L7BPxFq9yZyAYtdMhKQaFU0IY9su6Pwxyd"
    ]
  }
];

export default function TopSellers({ topBoutiques = [] }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
      <h2 className="font-headline-md text-primary text-2xl mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>
        Meet the Top Sellers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topBoutiques.length > 0 ? topBoutiques.map(seller => (
          <div key={seller.id} className="bg-white border border-outline-variant/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[0, 1, 2, 3].map(idx => {
                const imageSrc = seller.listings?.[idx]?.listing_images?.[0]?.url;
                return (
                  <div key={idx} className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                    {imageSrc ? (
                      <img src={imageSrc} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        <span className="material-symbols-outlined text-sm">inventory_2</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={seller.avatar_url || 'https://via.placeholder.com/100'} alt={seller.username} className="w-10 h-10 rounded-full object-cover bg-surface-container border border-gray-200" />
                <div>
                  <h3 className="font-bold text-sm text-primary leading-tight">{seller.username || 'Boutique'}</h3>
                  <p className="text-xs text-secondary">@{seller.username ? seller.username.toLowerCase().replace(/\s+/g, '') : 'boutique'}</p>
                </div>
              </div>
              <Link href={`/seller/${seller.id}`} className="bg-primary text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-black transition-colors">
                SHOP
              </Link>
            </div>
          </div>
        )) : TOP_SELLERS.map(seller => (
          <div key={seller.id} className="bg-white border border-outline-variant/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {seller.images.map((img, idx) => (
                <div key={idx} className="aspect-square bg-surface-container rounded-lg overflow-hidden">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-full object-cover bg-surface-container" />
                <div>
                  <h3 className="font-bold text-sm text-primary leading-tight">{seller.name}</h3>
                  <p className="text-xs text-secondary">@{seller.handle}</p>
                </div>
              </div>
              <Link href={`/seller/${seller.id}`} className="bg-primary text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-black transition-colors">
                SHOP
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
