"use client";

import { GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/app/components/form";
import S from "./dual-cta.module.scss";

interface DualCtaProps {
  onOpenContact?: () => void;
}

export function DualCta({ onOpenContact }: DualCtaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className={S.section}>
      <div className={S.container}>
        <div className={S.row}>

          {/* ── Card esquerdo (70%) ───────────────────────────── */}
          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={S.cardTitle}>
              Pronto para estruturar sua operação de crédito com tecnologia e capital?
            </h2>
            <div>
              <Button
                variant="primary"
                label="Falar com especialista"
                size="md"
                onClick={onOpenContact}
              />
            </div>
          </motion.div>

          {/* ── Card direito (30%) ────────────────────────────── */}
          <motion.div
            className={S.card}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={S.cardIcon}>
              <GraduationCap size={32} strokeWidth={1.4} />
            </div>
            <p className={S.cardLabel}>Mentoria Tigre Branco</p>
            <p className={S.cardSubtitle}>
              Aprenda a montar e escalar sua operação de crédito com quem já trilhou esse caminho.
            </p>
            <div>
              <Button
                variant="secondary"
                label="Quero a mentoria"
                size="md"
                onClick={onOpenContact}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

