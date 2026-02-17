"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/app/assets/images";
import styles from "./partners.module.scss";

export function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section ref={ref} className={styles.partners}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Alguns dos nossos <br /> parceiros
          </motion.span>
          
          <motion.div
            className={styles["carousel-container"]}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.track}>
              {carouselItems.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className={styles["logo-item"]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + (index % partners.length) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    height={32}
                    width={120}
                    priority={index < 5}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
