"use client";

import { Factory, Store, Briefcase, Sprout } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/app/components/form";
import S from "./feedback-loop.module.scss";

export function FeedbackLoop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Factory,
      title: "Diagnóstico da sua operação de crédito",
      description:
        "Avaliamos sua estrutura atual — produtos, fluxos, governança e riscos — para identificar o que impede sua operação de crescer e traçar um caminho claro até a escala.",
      progress: "85%",
    },
    {
      icon: Store,
      title: "Estruturação financeira e jurídica",
      description:
        "Orientamos a montagem da arquitetura correta: securitizadora, FIDC, SCD ou correspondente bancário. Cada estrutura no lugar certo, dentro da legalidade e pronta para operar.",
      progress: "90%",
    },
    {
      icon: Briefcase,
      title: "Integração com a plataforma Tigre Branco Pay",
      description:
        "Conectamos sua operação à infraestrutura tecnológica da plataforma — APIs, esteiras de crédito, gestão de carteira e compliance — para que você opere com agilidade e controle real.",
      progress: "75%",
    },
    {
      icon: Sprout,
      title: "Crescimento com acompanhamento estratégico",
      description:
        "Monitoramos indicadores, comportamento de carteira e performance das estruturas para ajustar modelos, abrir novas teses de crédito e garantir crescimento sustentável a longo prazo.",
      progress: "95%",
    },
  ];

  return (
    <section ref={ref} className={S.section}>
      <div className={S.container}>
        <motion.div
          className={S.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Da estrutura à escala, com quem entende o mercado de crédito.</h2>
          <p>
            A Mentoria Tigre Branco une infraestrutura tecnológica e visão
            estratégica para transformar sua operação em um negócio de crédito
            profissional, organizado e preparado para crescer.
          </p>
        </motion.div>

        <div className={S.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={S.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={S.iconWrapper}>
                <feature.icon />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={S.progress}>
                <motion.div
                  className={S.progressBar}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: feature.progress } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.4 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={S.cta}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="outlineWhite"
            label="Quero a mentoria"
            href="https://wa.me/5511914924000?text=Ol%C3%A1!%20Tenho%20interesse%20na%20Mentoria%20Tigre%20Branco.%20Podem%20me%20contar%20mais%20sobre%20como%20funciona%3F"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
          />
        </motion.div>
      </div>
    </section>
  );
}
