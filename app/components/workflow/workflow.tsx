"use client";

import { useRef, useState } from "react";
import { FileText, Activity, Wallet, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { HandWrittenTextInline } from "@/app/components/ui/hand-written-text-inline";
import Button from "@/app/components/form/button/button";

import S from "./workflow.module.scss";

export function Workflow() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabs = [
    {
      id: "cobrancas",
      icon: Wallet,
      title: "Gestão de cobranças na mesma visão",
      description:
        "Centralize a visão da carteira, acompanhe inadimplência e renegociações e enxergue seus recebíveis em painéis claros, pensados para operações de crédito e securitização.",
    },
    {
      id: "acompanhamento",
      icon: Activity,
      title: "Monitoramento em tempo real",
      description:
        "Acompanhe cada contrato, do onboarding ao pagamento final, com status atualizados em tempo real e trilha completa da esteira, dando previsibilidade para decisões do dia a dia.",
    },
    {
      id: "digitacao",
      icon: FileText,
      title: "Cadastro guiado e sem fricção",
      description:
        "Cadastre propostas em um fluxo guiado, com validações automáticas e campos pensados para operações financeiras, reduzindo erros e retrabalho da sua equipe.",
    },
  ];

  return (
    <section ref={ref} id="workflow" className={S.section}>
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
            SISTEMA PRÓPRIO DE WORKFLOW
          </motion.span>
          <h2>
            Domine cada{" "}
            <HandWrittenTextInline
              text="etapa"
              className={S.handWritten}
              strokeColor="#02a657"
              strokeWidth={4}
              duration={2}
            />{" "}
            da sua operação financeira com nosso sistema próprio.
          </h2>
        </motion.div>

        <motion.div
          className={S.tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              className={`${S.tab} ${activeTab === index ? S.active : ""}`}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={S.icon}>
                <tab.icon />
              </div>
              <h3>{tab.title}</h3>
              <p>{tab.description}</p>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="primary"
            label="Conheça nosso sistema"
            href="https://tigrebrancopay.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            width={{ base: "100%", sm: "auto" }}
            icon={<ArrowRight size={18} />}
          />
        </motion.div>
      </div>
    </section>
  );
}
