"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./faq.module.scss";

const faqItems = [
  {
    id: 2,
    question: "Como estruturar melhor sua securitizadora ou operação de crédito?",
    answer:
      "O ponto de partida é ter clareza sobre qual tipo de crédito ou recebível você quer trabalhar, definir bem o perfil de cliente, estabelecer políticas de crédito objetivas e criar fluxos padronizados de análise, formalização e cobrança. A partir daí, ajudamos você a traduzir essa visão em processos, integrações e controles dentro da nossa infraestrutura, para que a operação seja organizada desde o início.",
  },
  {
    id: 3,
    question: "Quais passos para otimizar operações financeiras que já estão rodando?",
    answer:
      "Começamos revisando seus indicadores-chave, como inadimplência, prazos médios, concentração de risco e gargalos operacionais. Com base nisso, sugerimos ajustes em políticas de crédito, automações de aprovação, fluxos de pagamentos, conciliação e rotinas de acompanhamento da carteira, usando nossa infraestrutura para reduzir retrabalho e dar mais previsibilidade ao resultado.",
  },
  {
    id: 5,
    question:
      "Não tenho tudo pronto ainda. Em que momento faz sentido começar a usar a plataforma?",
    answer:
      "Você não precisa chegar com a operação totalmente desenhada. É suficiente ter clareza sobre o público que quer atender e o tipo de produto financeiro que deseja oferecer. A partir disso, ajudamos a organizar etapas, priorizar entregas, definir fluxos mínimos para começar e construir, passo a passo, uma operação sólida de crédito ou securitização, evitando decisões que possam travar o crescimento no futuro.",
  },
  {
    id: 6,
    question: "Como a Tigre Branco ajuda a reduzir riscos e erros operacionais?",
    answer:
      "Nossa infraestrutura já incorpora boas práticas de mercado em cadastro, análise de crédito, monitoramento de carteira, pagamentos e compliance, reduzindo a dependência de controles manuais dispersos. Além disso, apoiamos seus times na definição de rotinas, responsabilidades e alertas, o que diminui falhas operacionais, aumenta a rastreabilidade das decisões e fortalece a governança do negócio financeiro.",
  },
  {
    id: 7,
    question:
      "Que resultados posso esperar ao estruturar minha operação com a Tigre Branco?",
    answer:
      "Os principais ganhos costumam aparecer em três frentes: mais velocidade para lançar ou ajustar produtos financeiros, mais controle sobre riscos e indicadores da carteira e mais eficiência operacional, com menos retrabalho e maior automação. Ao longo do tempo, isso se traduz em uma operação de crédito ou securitização mais previsível, escalável e preparada para aproveitar novas oportunidades de mercado.",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" ref={ref} className={styles.faq}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>FAQs</span>
          <h2 className={styles.title}>Perguntas Frequentes</h2>
        </motion.div>

        <div className={styles.accordion}>
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                className={styles.questionButton}
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItems.includes(item.id)}
                aria-controls={`answer-${item.id}`}
              >
                <span className={styles.question}>{item.question}</span>
                <motion.div
                  className={styles.chevron}
                  animate={{
                    rotate: openItems.includes(item.id) ? 180 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    id={`answer-${item.id}`}
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={styles.answer}>{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

