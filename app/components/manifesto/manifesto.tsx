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
            Infraestrutura financeira para{" "}
            <span className={styles.dimmed}>tirar seu negócio do papel e escalar.</span>
          </h2>
        </motion.div>
        <motion.div
          className={styles.contentColumn}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            A Tigre Branco oferece uma plataforma de infraestrutura financeira que
            permite operar crédito, securitização de recebíveis, pagamentos e rotinas de
            contabilidade e compliance sem construir tudo do zero. Você conecta sua
            operação ao nosso sistema próprio e passa a contar com fluxos, APIs e
            controles pensados para negócios financeiros que precisam ganhar escala com
            segurança. Enquanto cuidamos da complexidade regulatória, operacional e
            tecnológica, sua equipe foca em estratégia, relacionamento com clientes e
            crescimento.{" "}
            <span className={styles.strong}>
              Mais velocidade para lançar produtos, mais controle sobre os riscos e mais
              clareza para tomar decisões que sustentam o próximo ciclo de expansão.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
