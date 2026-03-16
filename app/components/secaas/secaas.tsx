"use client";

import { MoveRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/app/components/form";
import S from "./secaas.module.scss";

const provides = [
  "Estrutura jurídica (SPV)",
  "Emissão de debêntures",
  "Gestão do lastro",
  "Compliance e governança",
  "Contabilidade especializada",
  "Relacionamento com investidores",
  "Plataforma operacional",
];

const clients = [
  "Fintechs de crédito",
  "Factorings",
  "FIDCs menores",
  "Originadores de crédito",
  "Plataformas de antecipação",
  "Empresas com recebíveis",
];

const ecosystem = [
  { step: "01", label: "Originação", sub: "Seus clientes" },
  { step: "02", label: "Tigre Branco Pay", sub: "Plataforma" },
  { step: "03", label: "Confia Capital", sub: "Securitizadora" },
  { step: "04", label: "Investidores", sub: "Debêntures" },
];

export function Secaas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className={S.section}>
      <div className={S.container}>

        {/* ── Hero row: assimétrico 55/45 ──────────────────────── */}
        <div className={S.hero}>
          <motion.div
            className={S.heroLeft}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={S.badge}>SECaaS</span>
            <h2 className={S.title}>
              Você origina.<br />
              <em>Nós estruturamos.</em>
            </h2>
            <p className={S.subtitle}>
              Securitizadora as a Service é o modelo em que sua empresa usa a
              infraestrutura completa de uma securitizadora já existente —
              sem precisar criar a sua própria. Você foca em originar crédito.
              Nós cuidamos de toda a estrutura por trás.
            </p>
            <div className={S.actions}>
              <Button
                variant="primary"
                label="Conectar minha operação"
                href="https://wa.me/5511914924000?text=Ol%C3%A1!%20Tenho%20interesse%20no%20modelo%20SECaaS%20da%20Tigre%20Branco%20Pay.%20Podem%20me%20contar%20mais%3F"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
              />
              <Button
                variant="secondary"
                label="Falar com especialista"
                href="https://wa.me/5511914924000?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20securitiza%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                size="md"
              />
            </div>
          </motion.div>

          {/* Lado direito: manifesto do que fornecemos */}
          <motion.div
            className={S.heroRight}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={S.rightLabel}>O que fornecemos</p>
            <ul className={S.provides}>
              {provides.map((item, i) => (
                <motion.li
                  key={i}
                  className={S.providesItem}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                >
                  <span className={S.dot} />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className={S.example}>
              <p>
                Uma fintech que gera{" "}
                <strong>R$10M/mês em crédito</strong> pode transformar
                contratos em lastro, emitir debêntures e financiar a própria
                originação usando a infraestrutura da Confia Capital.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Quem usa — chips de texto simples ────────────────── */}
        <motion.div
          className={S.clientsRow}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={S.clientsLabel}>Quem usa</span>
          <div className={S.chips}>
            {clients.map((c, i) => (
              <span key={i} className={S.chip}>{c}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Ecossistema: linha com nós ────────────────────────── */}
        <motion.div
          className={S.ecosystemRow}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={S.rightLabel}>Ecossistema financeiro completo</p>
          <div className={S.flow}>
            {ecosystem.map((node, i) => (
              <div key={i} className={S.flowNode}>
                <div className={S.nodeContent}>
                  <span className={S.nodeStep}>{node.step}</span>
                  <span className={S.nodeLabel}>{node.label}</span>
                  <span className={S.nodeSub}>{node.sub}</span>
                </div>
                {i < ecosystem.length - 1 && (
                  <MoveRight className={S.nodeArrow} size={18} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
