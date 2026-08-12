import React from 'react';

const BOUTIQUES = [
  {
    name: "@VintageDakar",
    hoverColor: "hover:bg-accent-purple",
    textColor: "text-on-primary",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y"
    ]
  },
  {
    name: "@StyleRetro",
    hoverColor: "hover:bg-accent-blue",
    textColor: "text-on-primary",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACcbSS4y2pJ23MnUkOsDTBRG_3QY0sD49h3EN1xt9qaJwHjTEtCoqT8I_yinhPy5AbuCbwHg18mw_KjP-Ba-NdWbJv06_EMA2EjT5XW0v1FtlPKOU8boUyfDxKpbxxqws3EX1weIPjtRBJ5u5aWO2uKTTox-az-D_lolvTTPAsZPJcY2umQhxEAlaFunbNsuTkjecWUf86j7TelGPT3sAqq15qfCjJNVrJ6CnNpN6Lq8MGc5c3sqPk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9qFRcg-PAa-7zMaH_B8pc2yfK4HvGyQzEOh6LMce9HlMTChL7m3UI3TimVlAixu-nmt6ejNuOecOzn4odK0imoxbB0SH0piGP4xyGxEPHgEipHEWR_RrcVNZjgnNH1d7jd_Bb_tUXFkHAoa2DjuIpbBeLWSjehtn6sdpCPMyMhH_gfC02VMY68zG31EOofOP3SDdcgS0WLspLwNdWXLK8T27_LxVZBpBYiHLdbBnj_OqKo8vVfGT"
    ]
  },
  {
    name: "@PopThrift",
    hoverColor: "hover:bg-accent-yellow",
    textColor: "text-primary hover:text-primary",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcs43Suu82hPn-qrAKD-phR9HCmndvs8-2g_AKei7O9d2WWquUYcidNK2mqpM4yJ3kKF9ESK8xlztIgB0RIhdg8uY8aQIDAkaFqk6l6xKJ_9eeNJhGUEKqQ9G2qL3RnXziJa8zeiRoSq4qXCAhxAPEBoTbcGrFEDugdYhpuqf8D6xugJWCQq9EfNgj0_Gsm-FRrr-Uq9zkaiDeucET8UCdLHKfOnilpdN6mODco9GnKB6kpODYUhrL",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5p1FuRWy3m0NFykexcQcRtdjf6cFnRz8p7pbXN94KpoaOLtF8TH8kOE-5NE1wo2DkL93rdwMWbnIclQ8buif2RLBT0QmxWx80RkjV6LVL0BjWRVtwBYDWfCbhHL4pSebvqBj0yT6N5z1pHF5KzFY42z0_NmrJlDhK3JKSGqGNvJixmvj7znS056rtrqBYf6FAMt_NZRo61MDmRkEqP-L7BPxFq9yZyAYtdMhKQaFU0IY9su6Pwxyd",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj"
    ]
  },
  {
    name: "@DakarChic",
    hoverColor: "hover:bg-accent-orange",
    textColor: "text-on-primary",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT"
    ]
  }
];

export default function PopularBrands() {
  return (
    <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-headline-lg text-primary font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Top Boutik</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BOUTIQUES.map((boutique, index) => (
          <div key={index} className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-3xl border border-outline-variant/50 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="grid grid-cols-2 gap-2 mb-2 w-full rounded-2xl overflow-hidden">
              {boutique.images.map((imgUrl, imgIdx) => (
                <img key={imgIdx} className="aspect-[4/3] object-cover" src={imgUrl} alt={`${boutique.name} item ${imgIdx}`} />
              ))}
            </div>
            <div className="flex justify-between items-center w-full px-2">
              <span className="font-headline-md text-xl text-primary">{boutique.name}</span>
              <button className={`bg-primary font-button-text px-4 py-2 rounded-full transition-colors ${boutique.textColor} ${boutique.hoverColor}`}>
                Visiter
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
