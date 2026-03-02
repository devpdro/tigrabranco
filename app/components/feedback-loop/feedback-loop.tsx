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
      title: "Diagnóstico profundo da operação",
      description:
        "Mapeamos sua estrutura atual de crédito, recebíveis, riscos e governança para identificar gargalos, oportunidades de melhoria e caminhos de crescimento sustentável.",
      progress: "85%",
    },
    {
      icon: Store,
      title: "Desenho da arquitetura financeira",
      description:
        "Ajudamos você a organizar a arquitetura do negócio financeiro, conectando produtos, fluxos, APIs, parceiros e esteiras de decisão em um modelo coerente e escalável.",
      progress: "90%",
    },
    {
      icon: Briefcase,
      title: "Aplicação prática da infraestrutura FaaS",
      description:
        "Trazemos referências e boas práticas para que sua equipe desenhe políticas, fluxos operacionais e rotinas de controle usando a infraestrutura já disponível, sem complexidade desnecessária.",
      progress: "75%",
    },
    {
      icon: Sprout,
      title: "Otimização contínua e expansão",
      description:
        "Acompanhamos indicadores, comportamento da carteira e performance das estruturas para ajustar modelos, reduzir riscos e abrir espaço para novas teses e produtos financeiros.",
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
          <h2>Acompanhamento estratégico para sua operação financeira.</h2>
          <p>
            Unimos infraestrutura FaaS e suporte especializado para ajudar você
            a estruturar, evoluir e escalar sua securitizadora ou negócio de
            crédito com mais clareza, controle e eficiência.
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
