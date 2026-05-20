"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/app/components/form";
import S from "./mentoring.module.scss";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easeOut },
  viewport: { once: true },
});

const stats = [
  {
    value: "87%",
    desc: "dos mentorados fecham a primeira operação estruturada em menos de 60 dias.",
  },
  {
    value: "5x",
    desc: "de crescimento médio de carteira nos primeiros 12 meses de operação.",
  },
  {
    value: "R$3M+",
    desc: "em crédito estruturado pelos primeiros mentorados na plataforma Tigre Branco Pay.",
  },
];

interface MentoringProps {
  onOpenContact?: () => void;
}

export function Mentoring({ onOpenContact }: MentoringProps) {
  return (
    <section className={S.container}>
      <div className={S.wrapper}>
        {/* ── Esquerda ─────────────────────────────────────────── */}
        <div className={S.left}>
          <motion.span className={S.badge} {...fadeUp(0)}>
            MENTORIA TIGRE BRANCO
          </motion.span>

          <motion.h2 className={S.title} {...fadeUp(0.12)}>
            Quem tem{" "}
            <span className={S.highlight}>método</span>{" "}
            constrói carteira. Quem improvisa, paga para aprender.
          </motion.h2>

          <motion.p className={S.descSub} {...fadeUp(0.24)}>
            A Mentoria Tigre Branco é para quem quer parar de operar no
            improviso e montar um negócio de crédito real. Você recebe
            estratégia, infraestrutura tecnológica, suporte jurídico e acesso
            direto a quem já estruturou operações do zero ao crescimento.
          </motion.p>

          <motion.div className={S.ctaBlock} {...fadeUp(0.36)}>
            <Button
              variant="primary"
              label="Garantir minha vaga"
              onClick={onOpenContact}
              size="md"
            />
          </motion.div>
        </div>

        {/* ── Direita — cards ───────────────────────────────────── */}
        <div className={S.right}>
          {stats.map((stat, idx) => (
            <motion.div
              className={S.card}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: idx * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.7 }}
              key={idx}
            >
              <div className={S.value}>{stat.value}</div>
              <div className={S.desc}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
