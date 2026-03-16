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
            O crédito sempre foi complexo.{" "}
            <span className={styles.dimmed}>Nós construímos a tecnologia para organizá-lo.</span>
          </h2>
        </motion.div>
        <motion.div
          className={styles.contentColumn}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            A Tigre Branco Pay nasceu para ser o elo que faltava entre correspondentes
            bancários, securitizadoras e investidores. Uma plataforma que organiza
            operações de crédito, transforma empresários em operadores profissionais e
            conecta capital a oportunidades reais. Acreditamos que crédito, quando usado
            com responsabilidade, transforma vidas e impulsiona empresas. Por isso
            desenvolvemos tecnologia que torna o mercado de crédito mais eficiente,
            mais transparente e mais acessível.{" "}
            <span className={styles.strong}>
              Porque quando tecnologia, capital e pessoas se conectam da maneira certa,
              novas oportunidades surgem. E é assim que mercados evoluem.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
