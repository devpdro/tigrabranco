"use client";

import { Factory, Store, Briefcase, Sprout } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import S from "./feedback-loop.module.scss";

export function FeedbackLoop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Factory,
      title: "Indústrias",
      description:
        "Antecipe recebíveis e fortaleça seu capital de giro para aquisição de matéria-prima, aumento de produção e expansão fabril com previsibilidade.",
      progress: "85%",
    },
    {
      icon: Store,
      title: "Comércio e Varejo",
      description:
        "Converta vendas a prazo em liquidez imediata e aumente seu poder de negociação com fornecedores sem recorrer a crédito bancário.",
      progress: "90%",
    },
    {
      icon: Briefcase,
      title: "Prestadores de Serviços",
      description:
        "Estruture seus contratos e notas fiscais como ativos financeiros e gere fluxo de caixa contínuo para sustentar o crescimento.",
      progress: "75%",
    },
    {
      icon: Sprout,
      title: "Agronegócio",
      description:
        "Acesse capital estruturado para custeio de safra, compra de insumos e expansão produtiva com agilidade e segurança.",
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
          <h2>Soluções de crédito para todos os setores.</h2>
          <p>
            Impulsione o crescimento do seu negócio com antecipação de
            recebíveis rápida e segura.
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
      </div>
    </section>
  );
}
