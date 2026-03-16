"use client";

import {
  Eye,
  Scale,
  ShieldCheck,
  Lightbulb,
  Wallet,
  TrendingUp,
  Award,
  Users,
  Shield,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import S from "./services-grid.module.scss";

interface Principle {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    Icon: Eye,
    title: "A verdade sempre vem primeiro",
    description: "A confiança é o ativo mais importante de uma empresa financeira.",
  },
  {
    Icon: Scale,
    title: "Nunca prosperamos causando prejuízo",
    description: "Buscamos negócios onde todos possam ganhar de forma justa.",
  },
  {
    Icon: ShieldCheck,
    title: "Honramos cada compromisso",
    description: "Reputação acima de qualquer ganho imediato.",
  },
  {
    Icon: Lightbulb,
    title: "Sabedoria antes da pressa",
    description: "Preferimos prudência a riscos desnecessários.",
  },
  {
    Icon: Wallet,
    title: "Respeitamos o capital que administramos",
    description: "Ele representa o esforço e a confiança de pessoas e empresas.",
  },
  {
    Icon: TrendingUp,
    title: "Construímos para o longo prazo",
    description: "Sem atalhos que comprometam o futuro.",
  },
  {
    Icon: Award,
    title: "Excelência é padrão",
    description: "Melhoramos constantemente tecnologia, processos e decisões.",
  },
  {
    Icon: Users,
    title: "Crescemos ajudando outros a crescer",
    description: "Nossa prosperidade está ligada ao sucesso de todos.",
  },
  {
    Icon: Shield,
    title: "Protegemos nossa reputação",
    description: "Cada decisão deve preservar o nome da empresa.",
  },
  {
    Icon: Leaf,
    title: "Usamos negócios para fazer o bem",
    description: "Tecnologia e finanças devem melhorar vidas.",
  },
];

// Pyramid rows: 4 → 3 → 2 → 1
const ROW_SLICES: [number, number][] = [
  [0, 4],
  [4, 7],
  [7, 9],
  [9, 10],
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  viewport: { once: true, margin: "-80px" },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function ServicesGrid() {
  return (
    <section className={S.section}>
      <div className={S.container}>

        {/* ── Section header ── */}
        <motion.div className={S.header} {...fade(0)}>
          <span className={S.badge}>Código de Honra</span>
          <h2 className={S.title}>Os princípios que guiam cada decisão</h2>
          <p className={S.subtitle}>
            Mais do que regras, são convicções que moldam como operamos,
            negociamos e construímos.
          </p>
        </motion.div>

        {/* ── Pyramid grid: 4 → 3 → 2 → 1 ── */}
        <div className={S.pyramidGrid}>
          {ROW_SLICES.map(([start, end], rowIdx) => (
            <div key={rowIdx} className={S.pyramidRow}>
              {PRINCIPLES.slice(start, end).map(({ Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  className={S.card}
                  {...fade(0.08 + (start + i) * 0.05)}
                >
                  <Icon size={28} strokeWidth={1.6} className={S.cardIcon} />
                  <p className={S.cardLabel}>{title}</p>
                  <p className={S.cardText}>{description}</p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* ── Full-width closing quote ── */}
      <motion.div
        className={S.quoteBlock}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, margin: "-60px" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={S.quoteInner}>
          <span className={S.quoteMark}>&ldquo;</span>
          <p className={S.quoteText}>
            Construímos tecnologia e negócios guiados por verdade, sabedoria
            e responsabilidade, pois acreditamos que a prosperidade verdadeira
            nasce da confiança.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
