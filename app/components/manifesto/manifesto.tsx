"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./manifesto.module.scss";

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="sobre" className={styles.manifesto}>
      <div className={styles.container}>
        <motion.div
          className={styles.titleColumn}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>
            Sua parceira estratégica para{" "}
            <span className={styles.dimmed}>crescimento sustentável.</span>
          </h2>
        </motion.div>
        <motion.div
          className={styles.contentColumn}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Simplificamos a complexidade financeira para que você possa focar
            exclusivamente no que realmente importa: escalar o seu negócio.
            Nossa plataforma une soluções inteligentes de crédito, gestão
            eficiente e tecnologia de ponta para transformar desafios diários em
            oportunidades reais de expansão. Esqueça processos lentos e
            burocráticos; oferecemos a estrutura sólida que você precisa para
            tomar decisões rápidas e assertivas.{" "}
            <span className={styles.strong}>
              Potencialize sua operação com segurança jurídica, agilidade
              financeira e transparência total.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
