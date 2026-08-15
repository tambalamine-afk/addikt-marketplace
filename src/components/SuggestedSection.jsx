import React from 'react';

const SUGGESTED_ITEMS = [
  {
    title: "Chemise Été",
    price: "5000",
    size: "XS",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj"
  },
  {
    title: "Veste Jean",
    price: "8500",
    size: "M",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR"
  },
  {
    title: "Robe Fleur",
    price: "12000",
    size: "L",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y"
  },
  {
    title: "Pantalon",
    price: "6000",
    size: "XL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT"
  },
  {
    title: "T-shirt",
    price: "3000",
    size: "S",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9qFRcg-PAa-7zMaH_B8pc2yfK4HvGyQzEOh6LMce9HlMTChL7m3UI3TimVlAixu-nmt6ejNuOecOzn4odK0imoxbB0SH0piGP4xyGxEPHgEipHEWR_RrcVNZjgnNH1d7jd_Bb_tUXFkHAoa2DjuIpbBeLWSjehtn6sdpCPMyMhH_gfC02VMY68zG31EOofOP3SDdcgS0WLspLwNdWXLK8T27_LxVZBpBYiHLdbBnj_OqKo8vVfGT"
  },
  {
    title: "Boubou Léger",
    price: "15000",
    size: "L",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACcbSS4y2pJ23MnUkOsDTBRG_3QY0sD49h3EN1xt9qaJwHjTEtCoqT8I_yinhPy5AbuCbwHg18mw_KjP-Ba-NdWbJv06_EMA2EjT5XW0v1FtlPKOU8boUyfDxKpbxxqws3EX1weIPjtRBJ5u5aWO2uKTTox-az-D_lolvTTPAsZPJcY2umQhxEAlaFunbNsuTkjecWUf86j7TelGPT3sAqq15qfCjJNVrJ6CnNpN6Lq8MGc5c3sqPk"
  },
  {
    title: "Sneakers Blanches",
    price: "25000",
    size: "42",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcs43Suu82hPn-qrAKD-phR9HCmndvs8-2g_AKei7O9d2WWquUYcidNK2mqpM4yJ3kKF9ESK8xlztIgB0RIhdg8uY8aQIDAkaFqk6l6xKJ_9eeNJhGUEKqQ9G2qL3RnXziJa8zeiRoSq4qXCAhxAPEBoTbcGrFEDugdYhpuqf8D6xugJWCQq9EfNgj0_Gsm-FRrr-Uq9zkaiDeucET8UCdLHKfOnilpdN6mODco9GnKB6kpODYUhrL"
  },
  {
    title: "Sac Bandoulière",
    price: "12000",
    size: "Unique",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo"
  },
  {
    title: "Jupe Plissée",
    price: "7500",
    size: "S",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5p1FuRWy3m0NFykexcQcRtdjf6cFnRz8p7pbXN94KpoaOLtF8TH8kOE-5NE1wo2DkL93rdwMWbnIclQ8buif2RLBT0QmxWx80RkjV6LVL0BjWRVtwBYDWfCbhHL4pSebvqBj0yT6N5z1pHF5KzFY42z0_NmrJlDhK3JKSGqGNvJixmvj7znS056rtrqBYf6FAMt_NZRo61MDmRkEqP-L7BPxFq9yZyAYtdMhKQaFU0IY9su6Pwxyd"
  },
  {
    title: "Chemise Wax",
    price: "9000",
    size: "XL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4"
  }
];

export default function SuggestedSection({ onSelect }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin relative py-12">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <h2 className="font-headline-lg text-headline-lg text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Pour toi</h2>
        <button className="bg-primary text-on-primary font-button-text px-6 py-2.5 rounded-full hover:bg-accent-orange transition-colors">Tout voir</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
        {SUGGESTED_ITEMS.map((product, index) => (
          <div key={index} className="flex flex-col gap-3 group cursor-pointer" onClick={() => onSelect && onSelect(product)}>
            <div className="aspect-[3/4] bg-surface-container rounded-2xl w-full mb-2 overflow-hidden relative">
              <div className="absolute top-2 right-2 z-20">
                <span className="material-symbols-outlined text-xl text-on-surface hover:text-error transition-colors cursor-pointer drop-shadow-md">favorite</span>
              </div>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-headline-md text-[18px] text-primary">{product.title}</span>
                <span className="font-body-sm text-black font-bold">{product.price} F</span>
              </div>
              <span className="font-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded">{product.size}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
