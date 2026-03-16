"use client";

import {
  Eye,
  Target,
  Gem,
  ShieldCheck,
  Scale,
  Landmark,
  Star,
  Lightbulb,
  TrendingUp,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import S from "./mission-values.module.scss";

interface ValueItem {
  Icon: LucideIcon;
  bold: string;
  rest: string;
}

const coreValues: ValueItem[] = [
  {
    Icon: ShieldCheck,
    bold: "Verdade e transparência",
    rest: "Confiança acima de tudo.",
  },
  {
    Icon: Scale,
    bold: "Justiça nas relações",
    rest: "Prosperamos quando todos prosperam.",
  },
  {
    Icon: Landmark,
    bold: "Responsabilidade financeira",
    rest: "Decisões conscientes e sustentáveis.",
  },
  {
    Icon: Star,
    bold: "Excelência",
    rest: "Nunca aceitamos mediocridade.",
  },
  {
    Icon: Lightbulb,
    bold: "Sabedoria nas decisões",
    rest: "Pensar antes de agir.",
  },
  {
    Icon: TrendingUp,
    bold: "Construção de longo prazo",
    rest: "Reputação acima de lucro rápido.",
  },
  {
    Icon: Heart,
    bold: "Servir pessoas",
    rest: "Tecnologia e crédito devem melhorar vidas.",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  viewport: { once: true, margin: "-80px" },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function MissionValues() {
  const ref = useRef(null);

  return (
    <section ref={ref} className={S.section}>
      <div className={S.container}>

        {/* ── Section header ── */}
        <motion.div className={S.header} {...fade()}>
          <span className={S.badge}>Nossos Pilares</span>
          <h2 className={S.title}>Missão, Visão e Valores</h2>
          <p className={S.subtitle}>
            Os princípios que guiam cada decisão, cada parceria e cada linha de
            código que escrevemos.
          </p>
        </motion.div>

        {/* ── 3-column grid ── */}
        <div className={S.grid}>

          {/* ── Card 1: Visão ── */}
          <motion.div className={S.card} {...fade(0.1)}>
            <Eye size={28} strokeWidth={1.6} className={S.cardIcon} />
            <p className={S.cardLabel}>Visão</p>
            <p className={S.cardText}>
              Ser a principal infraestrutura tecnológica do mercado de crédito
              da América Latina. Uma plataforma que une capital, originadores e
              oportunidades em um ecossistema eficiente, seguro e escalável,
              onde qualquer empresa pode operar crédito com autonomia,
              velocidade e conformidade regulatória. Queremos ser o alicerce
              invisível sobre o qual o futuro financeiro da região é construído,
              setor por setor, operação por operação.
            </p>
          </motion.div>

          {/* ── Card 2: Missão ── */}
          <motion.div className={S.card} {...fade(0.2)}>
            <Target size={28} strokeWidth={1.6} className={S.cardIcon} />
            <p className={S.cardLabel}>Missão</p>
            <p className={S.cardText}>
              Conectar tecnologia, capital e oportunidades para transformar o
              mercado de crédito. Permitir que empresas e fintechs operem com
              eficiência, segurança e escala real, sem precisar construir do
              zero uma infraestrutura complexa que deveria estar disponível
              para todos. Acreditamos que acesso a crédito de qualidade é um
              habilitador de crescimento, e nossa missão é remover cada
              barreira que ainda impede isso.
            </p>
          </motion.div>

          {/* ── Card 3: Valores ── */}
          <motion.div className={`${S.card} ${S.valuesCard}`} {...fade(0.3)}>
            <Gem size={28} strokeWidth={1.6} className={S.cardIcon} />
            <p className={S.cardLabel}>Valores</p>
            <ul className={S.valuesList}>
              {coreValues.map(({ Icon, bold, rest }, i) => (
                <li key={i} className={S.valueItem}>
                  <Icon size={14} strokeWidth={2} className={S.valueIcon} />
                  <div className={S.valueContent}>
                    <span className={S.valueBold}>{bold}</span>
                    <span className={S.valueRest}>{rest}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
