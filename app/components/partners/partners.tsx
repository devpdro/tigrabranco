"use client";

import Image from "next/image";
import { IMAGES } from "@/app/assets/images";
import styles from "./partners.module.scss";

export function Partners() {
  const partners = [
    { name: "ABC Brasil", logo: IMAGES.ABC_BRASIL },
    { name: "Safra", logo: IMAGES.SAFRA },
    { name: "Emcash", logo: IMAGES.EMCASH },
    { name: "XP", logo: IMAGES.XP },
    { name: "Banco BV", logo: IMAGES.BANCO_BV },
    { name: "BASF", logo: IMAGES.BASF },
    { name: "MRV", logo: IMAGES.MRV },
    { name: "Trademaster", logo: IMAGES.TRADEMASTER },
    { name: "Itaú", logo: IMAGES.ITAU },
    { name: "Nu", logo: IMAGES.NU },
    { name: "Bradesco", logo: IMAGES.BRADESCO },
  ];

  // Duplicate the list to create seamless infinite scroll
  const carouselItems = [...partners, ...partners];

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.label}>Alguns dos nossos parceiros</span>
          
          <div className={styles["carousel-container"]}>
            <div className={styles.track}>
              {carouselItems.map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`} 
                  className={styles["logo-item"]}
                >
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    height={32}
                    width={120}
                    priority={index < 5} // Prioritize visible images
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
