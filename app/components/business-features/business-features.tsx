"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/app/assets/images";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import S from "./business-features.module.scss";

export function Business() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="solucoes" className={S.businessFeatures}>
      <div className={S.container}>
        <motion.div
          className={S.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className={S.badge}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            SOLUÇÕES FINANCEIRAS INTEGRADAS
          </motion.span>
          <h2 className={S.title}>
            Estrutura sólida para alavancar seu{" "}
            <AnimatedText
              text="crescimento"
              strokeColor="#02a657"
              strokeWidth={4}
              underlinePath="M 0,10 Q 60,0 120,10 Q 180,20 240,10"
              underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
              underlineDuration={1.5}
            />
            .
          </h2>
          <p className={S.subtitle}>
            Da securitização à gestão de fluxo de caixa: oferecemos o
            ecossistema completo para a saúde financeira da sua empresa.
          </p>
        </motion.div>

        <div className={S.gridSmall}>
          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={S.visualPlaceholder}>
              <Image
                src={IMAGES.SECURITIZADORA}
                alt="Estrutura de Securitização"
                width={900}
                height={80}
              />
            </div>
            <div className={S.content}>
              <h3>Múltiplas Frentes de Crédito</h3>
              <p>
                Acesso direto a estruturas de CCB, Notas Comerciais e Debêntures
                através da nossa própria Securitizadora S.A., garantindo taxas
                competitivas e agilidade na aprovação.
              </p>
            </div>
          </motion.div>
          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={S.visualPlaceholder}>
              <Image
                src={IMAGES.DINHEIRO}
                alt="Gestão de Fluxo de Caixa"
                width={300}
                height={80}
              />
            </div>
            <div className={S.content}>
              <h3>Gestão e Liquidez Imediata</h3>
              <p>
                Visualize seu fluxo financeiro com clareza e transforme
                recebíveis em capital de giro instantâneo. Tecnologia e capital
                para manter sua operação sempre no verde.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
