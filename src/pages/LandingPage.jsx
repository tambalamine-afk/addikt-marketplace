import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdCarousel from '../components/AdCarousel';
import TopSellers from '../components/TopSellers';
import AppPromoBanner from '../components/AppPromoBanner';

const slideData = [
  { title: "Vintage Vibes", subtitle: "Des pièces uniques, à ne pas laisser filer.", color: "#A8A29E", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxLgjMfUFExwuaqPvDCm-TZviw8WL3U4SHmcp7u3cvkhIIx1CpjzohYsejzpqx_abQIvviLLh-u45yYfgh_hvuQqGR_uNzEaNNknvcQYjk7yZzKeKCyqXCiJNsTTAWoIotGVgPFW8y0rXgsx3x_2aFs7ZFN9R9fC7JozICwJWPfycH1Wfvfw-gJ-RTdAU6GGl74MzC8MNCDCw1VhRymfJ91lUqOIXJ1YdwF_jIBxYLJEnSyT5OIvlK" },
  { title: "Sneakers de la semaine", subtitle: "Les paires les plus recherchées, en stock maintenant.", color: "#22C55E", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiU-4HGh-ATzQvfsVrhatuBF1hLHnmeIQ2HLQK6E4X2AoE0YD0DFIMGr3d8i4g3X_b_m76-KhO6mKWt766QPpy5NSW9xhZLMxfSopUmlMnaBlnT7uQwx-4o83wc7di0wGafvg0NNm8BeAruXw7pLXIzjx_CSukej7tuGFSuwbFFQUbk840X9qRhAWhOeD5nNWj_c7oyuPi5-OGurgzQynkq2qhre4GtniezzxUWr3wSmjWYZDBJnzO" },
  { title: "Looks Wax", subtitle: "Le motif qui ne se démode jamais.", color: "#D946EF", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxbqGSfDWXUEhaRcbeghlO4wxcF03GpYPW6Mq9zajiz7Y__NxpPNqa4bqXDK_l0CK4fh0mq7Cfr9TgZi3f560BfaImqAYkYX-FSPCGwGE8Ma9Juz1YLhCPA3uHE4F14E1boQepHJBYIoCZYlhgTFalpfNT1FjK6gPEg0rFwPd_8NFkI56-YmRQ1v_BEjEj_G0e2-s8x0VGgO2UshLhrfcfszGcaO1Wukm6N0mxS6MPCQKDekzkq8WJ" }
];

const PRODUCTS_GRID = [
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj", title: "Chemise Été", price: "5000 F", size: "XS" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR", title: "Veste Jean", price: "8500 F", size: "M" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y", title: "Robe Fleur", price: "12000 F", size: "L" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT", title: "Pantalon", price: "6000 F", size: "XL" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9qFRcg-PAa-7zMaH_B8pc2yfK4HvGyQzEOh6LMce9HlMTChL7m3UI3TimVlAixu-nmt6ejNuOecOzn4odK0imoxbB0SH0piGP4xyGxEPHgEipHEWR_RrcVNZjgnNH1d7jd_Bb_tUXFkHAoa2DjuIpbBeLWSjehtn6sdpCPMyMhH_gfC02VMY68zG31EOofOP3SDdcgS0WLspLwNdWXLK8T27_LxVZBpBYiHLdbBnj_OqKo8vVfGT", title: "T-shirt", price: "3000 F", size: "S" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACcbSS4y2pJ23MnUkOsDTBRG_3QY0sD49h3EN1xt9qaJwHjTEtCoqT8I_yinhPy5AbuCbwHg18mw_KjP-Ba-NdWbJv06_EMA2EjT5XW0v1FtlPKOU8boUyfDxKpbxxqws3EX1weIPjtRBJ5u5aWO2uKTTox-az-D_lolvTTPAsZPJcY2umQhxEAlaFunbNsuTkjecWUf86j7TelGPT3sAqq15qfCjJNVrJ6CnNpN6Lq8MGc5c3sqPk", title: "Boubou Léger", price: "15000 F", size: "L" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcs43Suu82hPn-qrAKD-phR9HCmndvs8-2g_AKei7O9d2WWquUYcidNK2mqpM4yJ3kKF9ESK8xlztIgB0RIhdg8uY8aQIDAkaFqk6l6xKJ_9eeNJhGUEKqQ9G2qL3RnXziJa8zeiRoSq4qXCAhxAPEBoTbcGrFEDugdYhpuqf8D6xugJWCQq9EfNgj0_Gsm-FRrr-Uq9zkaiDeucET8UCdLHKfOnilpdN6mODco9GnKB6kpODYUhrL", title: "Sneakers Blanches", price: "25000 F", size: "42" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo", title: "Sac Bandoulière", price: "12000 F", size: "Unique" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5p1FuRWy3m0NFykexcQcRtdjf6cFnRz8p7pbXN94KpoaOLtF8TH8kOE-5NE1wo2DkL93rdwMWbnIclQ8buif2RLBT0QmxWx80RkjV6LVL0BjWRVtwBYDWfCbhHL4pSebvqBj0yT6N5z1pHF5KzFY42z0_NmrJlDhK3JKSGqGNvJixmvj7znS056rtrqBYf6FAMt_NZRo61MDmRkEqP-L7BPxFq9yZyAYtdMhKQaFU0IY9su6Pwxyd", title: "Jupe Plissée", price: "7500 F", size: "S" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4", title: "Chemise Wax", price: "9000 F", size: "XL" },
];

const BOUTIQUES = [
  {
    handle: "@VintageDakar", buttonHover: "hover:bg-accent-purple",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y",
    ]
  },
  {
    handle: "@StyleRetro", buttonHover: "hover:bg-accent-blue",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACcbSS4y2pJ23MnUkOsDTBRG_3QY0sD49h3EN1xt9qaJwHjTEtCoqT8I_yinhPy5AbuCbwHg18mw_KjP-Ba-NdWbJv06_EMA2EjT5XW0v1FtlPKOU8boUyfDxKpbxxqws3EX1weIPjtRBJ5u5aWO2uKTTox-az-D_lolvTTPAsZPJcY2umQhxEAlaFunbNsuTkjecWUf86j7TelGPT3sAqq15qfCjJNVrJ6CnNpN6Lq8MGc5c3sqPk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9qFRcg-PAa-7zMaH_B8pc2yfK4HvGyQzEOh6LMce9HlMTChL7m3UI3TimVlAixu-nmt6ejNuOecOzn4odK0imoxbB0SH0piGP4xyGxEPHgEipHEWR_RrcVNZjgnNH1d7jd_Bb_tUXFkHAoa2DjuIpbBeLWSjehtn6sdpCPMyMhH_gfC02VMY68zG31EOofOP3SDdcgS0WLspLwNdWXLK8T27_LxVZBpBYiHLdbBnj_OqKo8vVfGT",
    ]
  },
  {
    handle: "@PopThrift", buttonHover: "hover:bg-accent-yellow hover:text-primary",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcs43Suu82hPn-qrAKD-phR9HCmndvs8-2g_AKei7O9d2WWquUYcidNK2mqpM4yJ3kKF9ESK8xlztIgB0RIhdg8uY8aQIDAkaFqk6l6xKJ_9eeNJhGUEKqQ9G2qL3RnXziJa8zeiRoSq4qXCAhxAPEBoTbcGrFEDugdYhpuqf8D6xugJWCQq9EfNgj0_Gsm-FRrr-Uq9zkaiDeucET8UCdLHKfOnilpdN6mODco9GnKB6kpODYUhrL",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5p1FuRWy3m0NFykexcQcRtdjf6cFnRz8p7pbXN94KpoaOLtF8TH8kOE-5NE1wo2DkL93rdwMWbnIclQ8buif2RLBT0QmxWx80RkjV6LVL0BjWRVtwBYDWfCbhHL4pSebvqBj0yT6N5z1pHF5KzFY42z0_NmrJlDhK3JKSGqGNvJixmvj7znS056rtrqBYf6FAMt_NZRo61MDmRkEqP-L7BPxFq9yZyAYtdMhKQaFU0IY9su6Pwxyd",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn1-DOUvoPMAI3OgItbzAbfbQIN3JqFcpo81LAKueaJ7KUZ3m5wcT3-qgapek4yXvvK01NdEqtar0nwHUTb0zM-cyojjNdgMDgUTUy_h82T2QlGdb9eFr3NAMKypXG-cnh4eytv5TjuboPRuO59H5cKoE1dAR2u3VnIXBzHHH9xioxicZJRgKF1wxRedaAB5FLX59Bm2vSrPEgi8ttdht1MH6m6aGh3VCrTod6kKxp-RmN8glqkhR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjY9WRoP3gdmglUGKoNydhseBPXXvU-7T5pRrVBEQa8c-9PTtxE_Ircs8XNPk2j3zbeWKZG2SQr5jqmYs4WFM9-yZILZM9UsyRkU3Z9k8uoEnWFBV-Ymmz-i0yQG38xy1_hFxo_KIta3WS2OOTC-3CjfMPNfQi7h8e5IbfEEjTBZAbaj_VgW_JsiyCYXIEw3YcVQNXdCW776pMyu6M8Ln0FZ4SCTIH44eddzjZdGBE150pi13ntQLj",
    ]
  },
  {
    handle: "@DakarChic", buttonHover: "hover:bg-accent-orange",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBugp3TioWKGGLxZIFzU0gf7WNvePzpaY6hJoAelOKYaCCXCEGSKY1FH5Sms5vQj8rhHq9RF1vudipGoOjLeyZNJq0Ny231EWHgvg498v6_hJH6m7EpvGKDbrNNlxLOMInRexFrW3nNBF4K4VCwXNMhpefC1QkSOwMyjUu7_9nOGHxhwtqwhddLShOKOVNs_aP_q9eNJ5T-Kgm1yA-2T7UCAh-9UyMrLDHYoZWFBRFypBzFIyO2aeL4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCENOK7bHdSnCo8oedGJTk4F9cz85hG0-HD3bUMzniyFBCBUUA2Q8jh6Bc4ozWQT1K10vcw7NwDE1cl83yGin1QXAI3okHa9MBdwil9DvuCOKWF4myVwrTnS4Mks5nllL8M-I9nrSFYujtXgl7ZXGPjVvceiCmaRqoR0ijlK0kixPkCLKE6aVVqCyNPhJEDwX-WLCCfsvfl-WggLHb-vNN9HkOLXdNvp_7n2-z42HuQQLUwQod6YU4Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfxX1PRfjl7U72oVJ7rqcg9-zrTwLFpCq-7NkxI2H9a9OqApKY5_UXUwwh8r2BSZ6UCswErPqefd96GsaYere7UCzHnx5Gh2L9aqe8AhBcpLoXUOTWmMA4fxPeIkZ1lFqbZuZ5YxnZ8G0AfWV6PI-DbmGgo0PxN_6wyUUmv9Vr4GS-0g9TxX1Jewn2ugSDoItsko8BYiel5xB4UWvnd5JLn7_ZrJOwh_OXltXp2CiKH5r_-U3Z2wmo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpS3vXfjGPvLu5UMv1cqbpeynzq2vFTcCT57xF89jQnwFBcvqkSw5MHhzkrXxBo10oMbv2cUTvjwCs1O4vS1niHU7udjXJWn9pr_7BwO5xS0Ds-JEgCJXo4BF86wFnZKxbOVLK8EAFddDGNTgm7Tab3EXrqSCZzVBBTz7kDUhKmqihd4JLrE0qxbiQMiRMvebpcs1e49CXef7F29gk9oTT2m45bpvt17PDvx2Nt28qrANM7fL649LT",
    ]
  }
];

const NOS_SELECTIONS = [
  {
    title: "Essentiels Été",
    subtitle: "La sélection légère",
    size: "Taille XS-S",
    category: "Pour elles",
    icon: "favorite",
    bgColor: "bg-[#D9F99D]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmUb5psVnhq7h70ikcb8T985LWoU0SQEkYZWzyweDLc1JbAQ5bXiSJtkmvlkKMLDb4c6KZ73x8QJgSYCzFkxO_KRk2IhF0sc_DKssaGNz2imFETbDGHqzP3IB7HdBgM-sl-HgQPaB4IdfGNoC9soBeCYS1zNCOHPGHyewQnzfD9hk4teerJIBCPw3L-4xgWmetEzCg8KC-JBBO_cAmxjUzyGgmlec6-vwvyxfwkLvM9sOCznjubhxx"
  },
  {
    title: "Streetwear Dakar",
    subtitle: "L'énergie urbaine",
    size: "Taille M-L",
    category: "Pour eux",
    icon: "star",
    bgColor: "bg-[#E9D5FF]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHvJNRFRRFipwGOU6r5CrtQIkXjSXwIAU_yCzBlAjO8kiwL1OnmM6qNh3GjiL5WWzwPuObkBYZH84PJBXjc_EKneKRUBoJH2i7IeM08Ad3WC9Cv1K-kPe2Q-ZZ0kEF8C2j8kbEMc-_2LaGqF_MXMNN8tIVu5koGgm44OKqBMAiM-pF5bM_rkodgbcfOHNVZf5vPyV5LFIdgaKkXy78wnKt06dnLzHbRq6vDSUQbqwVrR-t5jGjfBhO"
  },
  {
    title: "Boubous & Wax",
    subtitle: "L'élégance intemporelle",
    size: "Toutes tailles",
    category: "Traditions",
    icon: "favorite",
    bgColor: "bg-[#F5E6D3]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm8_1BAcNpiYkfmMbIAoVTNC7mu2BiuAOAxdbZisiKbXJ1_fm5CdLtEMwbN_-Ia_chcop9oGVq5IeeV7WvUnuruaqv9PPgryqYSqzpHIpbhmXHBmPqm_7-kWsFw5j6YpUqwRDJIPeRwp6mxhWrzTzO-o-bJeMd18OzcjUnu0d3jEChj-g_2wHJf3fuZIqqCGY7VPdV602Ij4gv3lWQzPz4hwhxSVxgmoUlAkBahQlsxltYtnDFKsQU"
  },
  {
    title: "Sneakers Rares",
    subtitle: "Pépites de collection",
    size: "Taille 36-42",
    category: "Chaussures",
    icon: "star",
    bgColor: "bg-[#BFDBFE]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvarkjSvXHjbnXwxbwH8bTFmso3S7iCQDQPG1vJojemVTJL73NZRKxNhnCPo4Yrmhw-wtchwYjwIYt9SAnOIjsImijq8ugpYuxSfshnzTpm6II3yS1_6wTsYPeUu73iTJ82TBZiadGJN1TjkpnDsXgPYV2QXpWys1BlGnbn9ib9Ztv7vZTbYKrzfIXZxgkQMbFc6KyzjWxbtIeMjkyW_7x-vwaUJHx_4YcBI_ncjzHkhFQ5gbjA5e"
  },
  {
    title: "Trouvailles Vintage",
    subtitle: "Le charme du passé",
    size: "Pièce unique",
    category: "Vintage",
    icon: "favorite",
    bgColor: "bg-[#FECACA]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg03R2BWlcW2jG7WVIVLsyQneN18hJYJmmVp03_9jiJoAbngMoUqy0HvSFdrPH7py76NyKFum1C4iLmg3OOZL-MLZyGFeM743Ufx1NukjbtSEM_US_UB72QrTPz5tKvPmfphi0676bSelL63CbKezpH2rNU2NvWdTmqIUQqV0hTtObSC02w5Q_c585uoxwwBfrYSDrXzhKElY6T_rS1q4zlgfZHGIL6Vkl8BVMJcNCFGjWOK-sH6cp"
  }
];

const NEW_DROP = [
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5AqZ2cPaCCf-8N33xxQ9xu6KHDxfq2LCMk6oPckVrXk32kNQfDMzyZlolsO6lH14qv1BDuv2HoAD9kCGSDVG5c9_U1o5cVoETCDDB8HsvWCWK-fP3qroc-SfZN7NSoXoFyLsl2lN7rTlBCslN6dsrGMsXtZZ-9VIhnUgZeNODEhJ0Sq27lxnzsGMD0UIlH70Grrnoa4W0rbw9wIiW-wVeDaiWjhb1IpzvOo5wZT84AlBq-uTrubxE", title: "Carhartt vintage", price: "25000 F", size: "XL" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8PaSiZF5onF-yWWfEvXiCLpcDKb_pZFjuoVLY8-1chVppqlf8RA30WpA-Dy2ueZFW33TXqASKiUJgL1QZEk-oqb2Q1z8PhKzmzmKHHMStIJoLiI-3SD-XJIS-qeArXWLglmu2ZyH2JuK25D2pBnMd73CEmHfVRLlmN5sw48Av1hSkIbsoCyZx5lUomUgWAMYwZPOKG7rj98_l9l-fowk-0HLCaDbEc3uxb88m2BSAaR9xD7K1crdK", title: "Dakar union", price: "18000 F", size: "M" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZ1G-VR7rihSP3AEcWU5_5fOJrGbyMtS5TULpD8Y4FyCko7MQ_UIM5YqBzBFj2iJklrye1-a4500sTMULBIUwkLbSI3gn9NWARVPWmcGylJdUu_ihv9uLUPcEQywAXbivsEoZ3zCAycDxoZqLpz4KpVZ-HNTksHw-KB4rWMeRCIpMYytQI5a62KcHAVhJbFZqmaAH9q1o6aMl1iP_WHEXxBj4Gp2xzF0WZDcNuLk8RFuwOX3dFPMz", title: "Minimal trousers", price: "15000 F", size: "S" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMW-Z7_PWlt-DMUT_Fhb6J9WEUh9G8c26Ck86FTV2ERheV-QYIA1GpiXR6qCXFWYPDxvSpxc_TkrqwGHqcpIOv4u9kIV4Obx2KRGcn2nm8F4P6h8FY14xe3Zd4n20VmY1eTd3OisVYrZhCXIohDetK7rXabGccy55uGFab3NKC1PgGiR4Wp14RrAGvQiJ2hMr1HZcpFpFfdV4zjoGhPxSNqQ9CqSS07ZzNl6s8IAWvTTkHcUYMcIQL", title: "Jordan 1 retro", price: "85000 F", size: "42" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6zLTkSgDJk1y0prOXOmjhn0RiYNkeuomELs8zRh5C6Xhej_CrOChESTfFbideR2hbJKSZWwj5CT_gQIUsQuYy4WFUtAD61aT9NDbNTWpme35vkaIVk4bJU-OasFyykeyyknV8rxNVkemkKdKRqlZb5CkxP9G4vzfII9rELJOrgXT_0Jycl6u2g-bLkdrHeGYgPGtckUlS4NDykkhI4bdjHXgldPZLdyGSs95wTbwpBMLJylDxlP7x", title: "Wax jumpsuit", price: "32000 F", size: "L" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCociVPzIVyJyl6Lt9w4w24s_Kng3Sh6AA8H16-6sHbYArL-pqXOA2Q63rA7ETj0iiVWWsQdpwiWeyeMCEm9EijAy_TiJE79_hXOXH4vbhLgX4O1oJgnzN5zeVc0nKFm5vLTNdI4qlI-8ROm30F6HM8GcBMwtucAmyUp6_0u5Ax2Iq-AdGLQIUcAIw6g7M628lLa0dQz-NskBmFzH9nZAagUuE02U5_-HgfI14HGbWFyqldDDrwY4Md", title: "Leather bag m&co", price: "45000 F", size: "Unique" }
];

const CATEGORIES = [
  { title: "Femmes", subtitle: "Blouses, robes et plus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN0hPZ7PccIkDRgVV3CXNQ362XwjArh7R41MNGUlbitiOPNnRSzW00afyffMi4WVQdbRG_OW1ZYZcvgQQodypwJCqWXLUJaUSaK7Eg3z9J1xy4eN4-KMGGX5gEezl2P8ou91zt5WOfv362OQWQRBZ5l7HR9hOX83uTAwKhJaGhWuK2Xz_dRyD122RU8GVuOz82w0BLKVov88Vzv4vlgnvspKfX3lHfwT4AU5PKOYOrfoJHPbmkVq6w", link: "/category/femmes" },
  { title: "Hommes", subtitle: "T-shirts, polos et plus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByQnOkEqxcocHqJ0PJiwvlKQv6i0TivIInYvMg8-wC9MuM2NJeDBix9Ro6xgmOYweX7B5Rg35TG6uXpC79HZmhtgmR_2RhlDsSt5RUblN206q5gDy2itBGZdPpUsjHEqjpAc_HmIqtBJ68j6rY-sNsroy_qNtjoG-iFhzrFrI1gmvRTBNWozpts9JJPhRRDt2cWX2ya32fgQwq_B9BC-WJSDbpAdvfBS26mo4FrYFwwTQFRumCk4P2", link: "/category/hommes" },
  { title: "Enfants", subtitle: "Pyjamas, tenues et plus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpUYzloC2GpHHinOyTXHNXemuf8G6iDaecwSDlknf25NXpQuGDXnm6gRDtCUqjAc03rL7UYbtSoDraFs_ida3Lix_rorFyLVQ8cwwevbHk6eZmiMPcLATiykG2BJ4j3jDUUtSZk09hU6rM3ud6fV9oCrOz_1u9F0ehVylPu4MGfzFBVMWfSp1nxlg7q1AUTenWk0NIp1bIH_FL54xrqmepHqTSDjdKM25ZBoT_kX5l1pOR_CkowHg0", link: "/category/enfants" },
  { title: "Accessoires", subtitle: "Sacs, bijoux et plus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_gP-u7CegtOVZgGVsvsgo99hSykmyCqTimv1pG2obRfCuzj8nOCd6pf78d0wtxF-OmdffGIY04I3VCShIJeWQFFxf3jxuzxHsrWhvT25JQwNd3r2M52FM0AUkgSQNRFE_xRBhuYO3WSMxbrQoTDtGRx4JugpWGaAAblR-e-ITdYaVFXYZUwDkSEUphIk9VrY_brxBgpWQjKI3k7tZY6koCvUt-paJCWrrMCAiGthBfWp_yLJtK2Z-", link: "/category/accessoires" }
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toggleState, setToggleState] = useState('acheter');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* 2. HERO SECTION */}
      <section className={`w-full min-h-[500px] flex items-center justify-center relative overflow-hidden py-20 mx-auto max-w-full ${toggleState === 'acheter' ? 'bg-accent-orange' : 'bg-[#00a6fb]'}`}>
        <div className="max-w-7xl mx-auto w-full px-container-margin grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex flex-col justify-center items-start pt-8 md:pt-0">
            {/* 1. Toggle */}
            <div className="relative bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1 flex items-center transition-colors duration-300 border border-white/20 w-48 mb-6">
              <div 
                className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full transition-transform duration-300 ease-in-out shadow-sm" 
                style={{ transform: toggleState === 'acheter' ? 'translateX(0)' : 'translateX(100%)' }}
              ></div>
              <button 
                className={`relative z-10 w-1/2 font-button-text font-bold transition-colors duration-300 tracking-wide text-[15px] py-1.5 ${toggleState === 'acheter' ? 'text-primary' : 'text-white'}`}
                onClick={() => setToggleState('acheter')}
              >
                Acheter
              </button>
              <button 
                className={`relative z-10 w-1/2 font-button-text font-bold transition-colors duration-300 tracking-wide text-[15px] py-1.5 ${toggleState === 'vendre' ? 'text-primary' : 'text-white'}`}
                onClick={() => setToggleState('vendre')}
                style={{ fontFamily: '"Mona Sans Expanded", sans-serif', fontWeight: 700 }}
              >
                Vendre
              </button>
            </div>

            {/* 2. Headline */}
            <h1 className="text-[48px] lg:text-[56px] leading-[1.05] text-on-primary mb-4" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {toggleState === 'acheter' ? (
                <>Trouve tes <br/>pépites.</>
              ) : (
                <>Vends tes <br/>pépites.</>
              )}
            </h1>
            
            {/* 3. Subtitle */}
            <p className="text-on-primary/90 font-body-lg mb-8 text-[18px]" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Ensemble, rendons la mode circulaire.
            </p>

            {/* 4. Button */}
            {toggleState === 'acheter' ? (
              <button className="bg-primary text-white px-8 py-3.5 rounded-sm font-bold text-[16px] hover:opacity-90 transition-opacity mb-12">
                Découvrir
              </button>
            ) : (
              <button className="bg-primary text-white px-8 py-3.5 rounded-sm font-bold text-[16px] hover:opacity-90 transition-opacity mb-12">
                Sell now
              </button>
            )}

            {/* 5. Stats Cards */}
            {toggleState === 'acheter' ? (
              <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar pb-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">checkroom</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '16px' }}>1M+</span>
                  <span className="text-on-surface-variant text-xs mt-0.5">Articles en vente</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">auto_awesome</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '16px' }}>10K+</span>
                  <span className="text-on-surface-variant text-xs mt-0.5">Nouveautés / jour</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">verified_user</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '15px' }}>Sécurité</span>
                  <span className="text-on-surface-variant text-xs mt-0.5 underline cursor-pointer">Protection Addikt</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar pb-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">verified_user</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '15px' }}>Vends en sécurité</span>
                  <span className="text-on-surface-variant text-xs mt-0.5 underline cursor-pointer">Protection Addikt</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">auto_awesome</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '15px' }}>Publie vite</span>
                  <span className="text-on-surface-variant text-xs mt-0.5">Annonces intelligentes</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex flex-col min-w-[130px] shadow-sm flex-1">
                  <span className="material-symbols-outlined text-primary mb-2 text-[22px]">local_shipping</span>
                  <span className="font-bold text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontSize: '15px' }}>Expédie facile</span>
                  <span className="text-on-surface-variant text-xs mt-0.5">Sans imprimante</span>
                </div>
              </div>
            )}
          </div>
          <div className="relative h-[450px] flex justify-center items-center mt-8 md:mt-0">
            <div className="absolute w-56 h-[320px] transform -rotate-[15deg] -translate-x-36 overflow-hidden z-0" style={{ backgroundColor: 'rgb(249, 249, 249)', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute w-56 h-[320px] transform rotate-0 z-10 translate-y-2 scale-105 overflow-hidden" style={{ backgroundColor: 'rgb(255, 206, 84)', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute w-56 h-[320px] transform rotate-[15deg] translate-x-36 -translate-y-2 overflow-hidden z-0" style={{ backgroundColor: 'rgb(239, 71, 111)', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>


      {/* MAIN CONTENT AREA */}
      <div className="w-full">
        {toggleState === 'acheter' ? (
          <div>
            {/* AD CAROUSEL SECTION */}
            <AdCarousel />
            
            {/* 2.5. NOS SÉLECTIONS */}
      <section className="w-full max-w-7xl mx-auto px-container-margin py-12 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-headline-lg text-primary text-3xl" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>Nos sélections</h2>
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-4">
          {NOS_SELECTIONS.map((item, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[350px] aspect-[3/4] rounded-[40px] bg-[#F3EFE9] p-6 flex flex-col snap-start transition-transform duration-500 hover:scale-[1.02] cursor-pointer group">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black leading-tight" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>{item.title}</h3>
                <p className="text-black/60 text-sm mt-1">{item.subtitle}</p>
              </div>
              <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                <img alt={item.title} className="w-full h-full object-cover" src={item.img} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST BAND / PROMO CAROUSEL */}
      <section className="w-full px-container-margin py-8">
        <div className="max-w-7xl mx-auto h-[260px] overflow-hidden flex flex-col md:flex-row shadow-sm relative group rounded-[30px]">
          <div className="w-full md:w-1/3 p-12 flex flex-col justify-center items-start text-white transition-colors duration-500 z-10 absolute left-0 top-0 bottom-0" style={{ backgroundColor: slideData[currentSlide].color }}>
            <h3 className="text-3xl mb-2 font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>{slideData[currentSlide].title}</h3>
            <p className="mb-6 opacity-90 text-sm" style={{ fontFamily: '"Google Sans", sans-serif' }}>{slideData[currentSlide].subtitle}</p>
            <button className="bg-white text-black px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-bold text-sm">
              Shop now
            </button>
          </div>
          <div className="w-full md:w-2/3 absolute right-0 top-0 bottom-0">
            <div className="flex h-full w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slideData.map((slide, index) => (
                <div key={index} className="w-full h-full shrink-0">
                  <img alt={slide.title} className="w-full h-full object-cover" src={slide.image} />
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slideData.map((_, index) => (
                <button 
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`${index === currentSlide ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/80'} rounded-full transition-all duration-300 hover:scale-125`}
                />
              ))}
            </div>
          </div>
          <button 
            aria-label="Next slide"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-md hover:bg-gray-100 transition-colors z-20"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slideData.length)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

      {/* 4. SUGGÉRÉ POUR TOI */}
      <section className="w-full max-w-7xl mx-auto px-container-margin relative py-12">
        <div className="flex items-center justify-between mb-10 relative z-10">
          <h2 className="font-headline-lg text-primary text-3xl" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600 }}>Pour toi</h2>
          <button className="font-button-text rounded-full hover:bg-accent-orange transition-colors bg-transparent text-primary border border-primary/20 px-4 py-2">Tout voir</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
          {PRODUCTS_GRID.map((item, idx) => (
            <Link key={idx} to={`/product/${idx + 1}`} className="flex flex-col gap-3 group cursor-pointer">
              <div className="aspect-[3/4] bg-surface-container rounded-2xl w-full mb-2 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-20" onClick={(e) => { e.preventDefault(); /* Like logic here */ }}><span className="material-symbols-outlined text-xl text-on-surface hover:text-error transition-colors cursor-pointer drop-shadow-md">favorite</span></div>
                <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-headline-md text-[18px] text-primary">{item.title}</span>
                  <span className="font-body-sm text-accent-orange font-bold">{item.price}</span>
                </div>
                <span className="font-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded">{item.size}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. TOP BOUTIQUES */}
      <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-headline-md text-primary font-bold" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Top Boutik</h2>
        </div>
        <div className="flex flex-row justify-between gap-8 w-full">
          {BOUTIQUES.map((boutique, idx) => (
            <div key={idx} className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-3xl border border-outline-variant/50 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="grid grid-cols-2 gap-2 mb-2 w-full rounded-2xl overflow-hidden">
                {boutique.images.map((img, imgIdx) => (
                  <img key={imgIdx} className="aspect-[4/3] object-cover" src={img} alt="" />
                ))}
              </div>
              <div className="flex justify-between items-center w-full px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLtwTDV42ZbLuj6QnBR9UKGkIimOcFACHMlO1CrulKBFpUaODHdGeQmQoH1PEfulBizSgnWvcfEL-5xd3vS-NHbshmy_vhcmNfz4xu2D8ICH-g2mwtZk0zxFg5WMKUygm_WCqWTvSKXB3LEi_myz00VAIc8lZqkONlQS6_FHTv1aHqAtBjHtvfatTCoQaFfn0111IYJdkrD3uRIzXz8_yQe_tZhXW2l2EqEaPDMUfSpbrfSKNmPTMNZ6WDo" style={{ objectPosition: '0% 0%', scale: '2' }} />
                  </div>
                  <span className="font-headline-md text-xl text-primary">{boutique.handle.replace('@', '')}</span>
                </div>
                <button className="hover:text-error transition-colors"><span className="material-symbols-outlined">favorite</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEW DROP */}
      <section className="w-full max-w-[98%] mx-auto bg-white rounded-[40px] px-container-margin py-16 relative overflow-hidden my-12" style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '18px' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <h2 className="font-headline-lg text-black" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 600, fontSize: '24px' }}>Fresh DROP</h2>
              <svg className="text-black" fill="currentColor" height="40" viewBox="0 0 100 100" width="40"><path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z"></path></svg>
            </div>
            <button className="bg-primary text-on-primary font-button-text px-6 py-2.5 rounded-full hover:bg-accent-orange transition-colors hidden sm:block">Explore</button>
          </div>
          <div className="relative flex items-center group">
            <button className="absolute -left-4 z-20 w-10 h-10 flex items-center justify-center border border-black/20 rounded-full text-black hover:bg-black/5 transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="flex gap-[10px] overflow-x-auto hide-scrollbar snap-x w-full pb-4">
              {NEW_DROP.map((item, idx) => (
                <Link key={idx} to={`/product/${idx + 10}`} className="min-w-[calc(16.66%-10px)] flex flex-col gap-3 snap-start">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img alt={item.title.toUpperCase()} className="w-full h-full object-cover" src={item.img} />
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <span className="font-bold text-sm text-black" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 400 }}>{item.title}</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.price}</span>
                      <span className="text-black/60 text-sm" style={{ fontFamily: '"Google Sans", sans-serif' }}>{item.size}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button className="absolute -right-4 z-20 w-10 h-10 flex items-center justify-center border border-black/20 rounded-full text-black hover:bg-black/5 transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </section>

      {/* 7. CATÉGORIES */}
      <section className="w-full max-w-7xl mx-auto px-container-margin py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link key={idx} to={cat.link} className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer block">
              <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110">
                <img alt={cat.title} className="w-full h-full object-cover" src={cat.img} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                <p className="text-sm mb-1" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>{cat.subtitle}</p>
                <h3 className="text-2xl" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Decorative Categories SVG Section */}
      <section className="w-full py-16 flex flex-col items-center justify-center overflow-hidden min-h-[600px] bg-surface">
        <h2 className="font-headline-lg text-primary text-center mb-24 relative z-20" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Catégories</h2>
        <div className="w-full max-w-7xl mx-auto px-container-margin relative z-10 mt-[-50px]">
          <svg className="w-full h-auto" viewBox="-100 -50 1490.71 460.67" xmlns="http://www.w3.org/2000/svg">
            <defs><style>{`.cls-cat-1 { fill: #c77dff; } .cls-cat-16 { fill: #ff4313; } .cls-cat-17 { fill: #00b2ae; } .cls-cat-18 { fill: #00a6fb; } .cls-cat-14 { fill: #fd7f91; } .cls-cat-15 { fill: #fdcf65; }`}</style></defs>
            <g>
              <g className="shape-group-1" transform="translate(100, 0)"><Link to="/category/femmes"><path className="cls-cat-16" d="M651.31,226.37c27.59-27.6,7.04-92.89-45.92-145.85-52.95-52.95-118.25-73.51-145.85-45.92-21.47,21.47-13.78,65.78,15.64,109.33-20.45-3.73-38.03-.5-49.31,10.77-27.59,27.59-7.04,92.89,45.92,145.85,52.95,52.95,118.25,73.51,145.85,45.92,21.47-21.47,13.78-65.78-15.64-109.33,20.45,3.73,38.03.51,49.31-10.77Z"></path></Link></g>
              <g className="shape-group-2" transform="translate(0, 0)"><Link to="/category/hommes"><path className="cls-cat-18" d="M402.49,149.22c-5.07-5.57-11.09-9.96-17.8-13.19-9.06-59.14-48.45-102.49-90.61-98.11-44.05,4.58-74.43,59.52-67.86,122.73,1.48,14.25,4.72,27.69,9.34,39.93-23.27,37.23-25.92,78.64-3.23,103.56,29.81,32.75,92.07,24.61,139.06-18.16,46.99-42.78,60.92-104,31.11-136.75Z"></path></Link></g>
              <g className="shape-group-3" transform="translate(150, 0)"><Link to="/category/enfants"><path className="cls-cat-14" d="M798.46,0c74.9-.31,99.3,108.8,32.32,141.46,24.75,35.96,26.68,84.46.64,120.28,25.74,191.51-267.7,69.29-148.23-66.65C609.1,102.36,695.94,2.43,798.46,0Z"></path></Link></g>
              <g className="shape-group-4" transform="translate(200, 0)"><Link to="/category/accessoires"><path className="cls-cat-15" d="M949.07,18.58c55.94.32,82.41,62.01,88.5,109.9,46.94,15.15,66.09,77.08,37.1,116.49-10.3,14.7-25.55,25.51-42.91,30.18-13.86,8.74-26.62,19.26-37.98,31.04-28.35,78.42-147.79,59.38-148.76-23.76-.86-46.13,30.24-85.09,39.65-129.12.5-24.16-23.71-33.33-13.51-76.66,8-34.74,42.21-60.75,77.9-58.06Z"></path></Link></g>
              <g className="shape-group-5" transform="translate(-100, 0)"><Link to="/category/femmes"><path className="cls-cat-17" d="M206.55,187.13c-24.11,83.01-87.83,150.31-142.31,150.31S-14.86,270.15,9.26,187.13C33.37,104.12,97.09,36.82,151.57,36.82s79.1,67.3,54.98,150.31Z"></path></Link></g>
              <g className="shape-group-6" transform="translate(250, 0)"><Link to="/category/accessoires"><path className="cls-cat-1" d="M1167.17,61.22l23.89,17.36,29.45-2.2c43.87-3.28,77.05,38.98,63.45,80.82l-9.13,28.09,11.19,27.33c16.67,40.71-13.27,85.32-57.26,85.32h-29.53s-22.53,19.09-22.53,19.09c-33.56,28.44-85.25,13.75-98.84-28.09l-9.13-28.09-25.12-15.53c-37.42-23.13-39.42-76.82-3.83-102.68l23.89-17.36,7.01-28.69c10.44-42.73,60.88-61.23,96.47-35.37Z"></path></Link></g>
            </g>
          </svg>
        </div>
      </section>
          </div>
        ) : (
          <div>
            <VendreContent />
          </div>
        )}
      </div>
    </main>
  );
}

const VendreContent = () => (
  <div className="w-full mb-12">
    {/* SIMPLICITY SECTION */}
    <section className="bg-surface-container-lowest py-16 px-container-margin my-8">
      <div className="max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <div className="relative w-[300px] h-[600px] border-8 border-primary rounded-[3rem] overflow-hidden shadow-xl bg-surface">
            <div className="absolute top-0 w-full h-8 bg-primary rounded-b-3xl flex justify-center items-end pb-1">
              <div className="w-20 h-4 bg-primary-container rounded-full"></div>
            </div>
            <div className="p-6 pt-12 h-full flex flex-col gap-4">
              <div className="w-full h-48 bg-surface-container-high rounded-xl mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-outline">add_a_photo</span>
              </div>
              <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
              <div className="h-4 bg-surface-container-high rounded w-1/2"></div>
              <div className="mt-auto space-y-2">
                <div className="h-10 bg-primary rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-12">
          <h2 className="text-headline-lg text-primary mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Addikt rend la <br/>vente simple</h2>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-4xl text-primary mt-1">money_off</span>
            <div>
              <h3 className="font-headline-md text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Aucun frais de vente</h3>
              <p className="font-body-lg text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>Garde 100% de ce que tu gagnes. Zéro commission sur tes ventes.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-4xl text-primary mt-1">timer</span>
            <div>
              <h3 className="font-headline-md text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Publie en quelques secondes</h3>
              <p className="font-body-lg text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>Prends une photo, ajoute un prix, et c'est en ligne. C'est aussi simple que ça.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-4xl text-primary mt-1">forum</span>
            <div>
              <h3 className="font-headline-md text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Contact direct avec l'acheteur</h3>
              <p className="font-body-lg text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>Négocie et organise la remise en main propre directement via notre messagerie sécurisée.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-4xl text-primary mt-1">verified_user</span>
            <div>
              <h3 className="font-headline-md text-primary mb-2" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Vends avec confiance</h3>
              <p className="font-body-lg text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>Notre équipe de modération veille à ce que la communauté reste sûre et respectueuse.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppPromoBanner />
    
    <TopSellers />

    {/* TESTIMONIALS SECTION */}
    <section className="py-16 px-container-margin bg-surface-container-low mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline-lg text-primary mb-12" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Ce que les vendeurs disent d'Addikt</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <p className="font-bold mb-4 text-primary">@vintage_dakar</p>
            <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>"Addikt me permet de partager mon style, de donner une seconde vie aux vêtements, et surtout, m'aide à être financièrement indépendant."</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <p className="font-bold mb-4 text-primary">@style_retro</p>
            <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>"Je vends sur Addikt parce que j'adore la simplicité de l'interface et la facilité pour publier des articles. Cette année, je me rapproche des 500 ventes !"</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <p className="font-bold mb-4 text-primary">@dakar_chic</p>
            <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>"Nous vendons sur Addikt car le processus est fluide et facile. Tout est très simple, de la mise en ligne à la livraison."</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <p className="font-bold mb-4 text-primary">@pop_thrift</p>
            <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>"Vendre sur Addikt est le meilleur complément de revenu possible. Pas de frais de vente et vous pouvez aller aussi loin que vous le souhaitez !"</p>
          </div>
        </div>
      </div>
    </section>

    {/* CIRCULAR FASHION BANNER */}
    <section className="py-16 px-container-margin">
      <div className="max-w-7xl mx-auto rounded-[2rem] p-12 flex flex-col gap-8 items-start relative overflow-hidden" style={{ backgroundColor: 'rgb(226, 0, 32)' }}>
        <h2 className="text-headline-md text-white relative z-10" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif', fontWeight: 700 }}>Keep fashion circular</h2>
        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity relative z-10">Sell now</button>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:block opacity-50">
          <svg height="93" viewBox="0 0 241.67 225.99" width="100" xmlns="http://www.w3.org/2000/svg">
            <path d="M186.76,0l-3.77,84.84c-.09,1.64,1.45,2.88,3.03,2.45l50.37-16.84-31.05,52.64c-1.14.97-1.12,2.74.03,3.69l36.3,52.47-65.33-14.34c-1.35-.19-2.59.79-2.72,2.15l-8.12,58.93-31.24-39.17c-.64-1.43-2.46-1.88-3.69-.91l-71.02,33.86,34.31-62.99c.73-1.43-.12-3.17-1.7-3.46L0,139.09l101.83-31.91c1.32-.42,2.02-1.87,1.52-3.16l-16.73-60.59,51.26,37.53c1.16.86,2.82.51,3.53-.75L186.76,0Z" fill="#e20020"></path>
            <path d="M137.23,137.36c-4.85,19.44-15.42,34.06-23.62,32.65-8.2-1.41-10.91-18.32-6.06-37.76,4.85-19.44,15.42-34.06,23.62-32.65,8.2,1.41,10.91,18.32,6.06,37.76Z" fill="#fdffff"></path>
            <path d="M175.3,135.99c-6,20.92-18.33,36.3-27.52,34.36s-11.78-20.47-5.77-41.39c6-20.92,18.33-36.3,27.52-34.36,9.19,1.94,11.78,20.47,5.77,41.39Z" fill="#fdffff"></path>
          </svg>
        </div>
      </div>
    </section>
  </div>
);
