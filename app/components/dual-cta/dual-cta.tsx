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

  const whatsappLink =
    "https://wa.me/5511914924000?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20da%20Tigre%20Branco%20e%20gostaria%20de%20receber%20assist%C3%AAncia%20de%20um%20especialista.";

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
              Pronto para estruturar sua operação de crédito com tecnologia, capital e escala real?
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
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

