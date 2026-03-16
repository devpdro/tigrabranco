"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import S from "./scroll-reveal-text.module.scss";

// ── Manifesto Tigre Branco Pay ─────────────────────────────────────
const PARAGRAPHS = [
  "O mercado financeiro move o mundo.",
  "Mas muitas vezes ele se torna complexo, fechado e distante das pessoas.",
  "Nós acreditamos que não precisa ser assim.",
  "Acreditamos que a tecnologia pode organizar o mercado, conectar pessoas e criar oportunidades onde antes existia apenas burocracia.",
  "O Tigre Branco Pay nasceu com um propósito claro: construir a infraestrutura que conecta capital, tecnologia e oportunidades.",
  "Acreditamos que o crédito, quando usado com responsabilidade, pode transformar vidas, impulsionar empresas e gerar prosperidade real.",
  "Por isso desenvolvemos tecnologia que torna o mercado de crédito mais eficiente, mais transparente e mais acessível.",
  "Nosso compromisso é construir um ecossistema onde originadores tenham ferramentas poderosas para crescer, instituições financeiras tenham eficiência e escala, investidores encontrem oportunidades sólidas e pessoas tenham acesso a soluções financeiras responsáveis.",
  "Acreditamos em negócios baseados em confiança.",
  "Acreditamos em decisões guiadas por sabedoria.",
  "Acreditamos que prosperidade verdadeira acontece quando todos crescem juntos.",
  "Por isso buscamos construir algo maior que uma empresa.",
  "Construímos uma plataforma. Um ecossistema. Uma nova infraestrutura para o mercado de crédito.",
  "Porque quando tecnologia, capital e pessoas se conectam da maneira certa, novas oportunidades surgem.",
  "E é assim que mercados evoluem.",
];

// ── Pre-compute flat word list ─────────────────────────────────────
const WORD_DATA = (() => {
  const result: { word: string; pIdx: number; globalIdx: number }[] = [];
  let globalIdx = 0;
  PARAGRAPHS.forEach((para, pIdx) => {
    para.split(" ").forEach((word) => {
      result.push({ word, pIdx, globalIdx });
      globalIdx++;
    });
  });
  return result;
})();

const TOTAL_WORDS = WORD_DATA.length;

// Group back by paragraph for rendering
const GROUPED = PARAGRAPHS.map((_, pIdx) =>
  WORD_DATA.filter((w) => w.pIdx === pIdx),
);

export function ScrollRevealText() {
  const ref = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.3"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(Math.round(latest * TOTAL_WORDS));
  });

  return (
    <section ref={ref} className={S.section}>
      <div className={S.container}>
        {GROUPED.map((words, pIdx) => (
          <p key={pIdx} className={S.paragraph}>
            {words.map(({ word, globalIdx }) => (
              <span
                key={globalIdx}
                className={`${S.word} ${globalIdx < activeIndex ? S.active : ""}`}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

