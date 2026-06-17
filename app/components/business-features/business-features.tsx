"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, ArrowRight } from "lucide-react";
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
            <Link href="/simulador-ccb" className={S.cardLink}>
              <div className={S.visualPlaceholder}>
                <div className={S.simulatorPreview}>
                  <div className={S.simHeader}>
                    <Calculator size={20} strokeWidth={1.6} />
                    <span>Simulador CCB</span>
                  </div>
                  <div className={S.simRow}>
                    <span className={S.simLabel}>Valor financiado</span>
                    <span className={S.simValue}>R$ 250.000,00</span>
                  </div>
                  <div className={S.simRow}>
                    <span className={S.simLabel}>Taxa a.m.</span>
                    <span className={S.simValue}>1,99%</span>
                  </div>
                  <div className={S.simRow}>
                    <span className={S.simLabel}>Parcelas</span>
                    <span className={S.simValue}>12 × R$ 24.842,31</span>
                  </div>
                  <div className={`${S.simRow} ${S.simRowHighlight}`}>
                    <span className={S.simLabel}>Quitação antecipada</span>
                    <span className={S.simValueAccent}>R$ 184.327,12</span>
                  </div>
                </div>
              </div>
              <div className={S.content}>
                <h3>
                  Simulador de Liquidação CCB{" "}
                  <span className={S.newBadge}>NOVO</span>
                </h3>
                <p>
                  Importe sua CCB em PDF ou preencha os dados da operação para
                  simular liquidação antecipada, saldo devedor e antecipação de
                  parcelas com a precisão do Sistema Price.
                </p>
                <span className={S.cardCta}>
                  Abrir simulador <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </div>
            </Link>
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
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
