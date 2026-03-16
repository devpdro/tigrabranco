"use client";

import { MessageSquareQuote, Gift, Headset } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HandWrittenTextInline } from "@/app/components/ui/hand-written-text-inline";

import S from "./support.module.scss";

export function Support() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={S.support}>
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
            Sempre aqui
          </motion.span>
          <h2 className={S.title}>
            <span className={S["title-line"]}>
            Estamos disponíveis{" "}
            <HandWrittenTextInline
              text="24 horas"
              className={S.handWritten}
              strokeColor="#02a657"
              strokeWidth={4}
              duration={2}
              />{" "}
            por dia, 7 dias por semana,
            </span>
            <span className={S["title-line"]}>
            para ajudar com qualquer coisa.
            </span>
          </h2>
        </motion.div>

        <div className={S.grid}>
          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={S["icon-wrapper"]}>
              <MessageSquareQuote />
            </div>
            <h3 className={S["card-title"]}>
              Suporte estratégico para sua operação
            </h3>
            <p className={S["card-description"]}>
              Apoiamos você na organização de fluxos, políticas e rotinas da
              operação financeira, conectando o uso do sistema próprio às
              necessidades reais do seu negócio.
            </p>
          </motion.div>

          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={S["icon-wrapper"]}>
              <Gift />
            </div>
            <h3 className={S["card-title"]}>Suporte ao uso da plataforma</h3>
            <p className={S["card-description"]}>
              Esclarecemos dúvidas e orientamos quanto às funcionalidades e
              boas práticas de uso, para que sua equipe aproveite ao máximo a
              plataforma já pronta no dia a dia.
            </p>
          </motion.div>

          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={S["icon-wrapper"]}>
              <Headset />
            </div>
            <h3 className={S["card-title"]}>
              Gestão e Acompanhamento Dedicado
            </h3>
            <p className={S["card-description"]}>
              Tenha suporte completo em todas as etapas, desde a análise de
              crédito até a liquidação, com total transparência.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
