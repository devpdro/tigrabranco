"use client";

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./header-about.module.scss";

export function HeaderAbout() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>

        {/* Badge with icon */}
        <motion.span
          className={styles.badge}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Building2 size={13} strokeWidth={2} />
          Sobre nós
        </motion.span>

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Somos Tigre Branco Pay
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Criamos a infraestrutura financeira que gostaríamos de ter encontrado,
          para que você não precise construir tudo do zero.
        </motion.p>
      </div>

      {/* Organic wave divider — balanced left ↔ right */}
      <div className={styles.waveDivider} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,75 C240,15 480,110 720,55 C960,10 1200,110 1440,75 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
