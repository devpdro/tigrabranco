"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./faq.module.scss";

const faqItems = [
  {
    id: 1,
    question: "O que é uma Securitizadora e como ela funciona?",
    answer:
      "Uma Securitizadora é uma instituição financeira autorizada pela CVM que transforma ativos (como recebíveis, contratos e créditos) em títulos negociáveis no mercado de capitais. Ela funciona adquirindo esses ativos de empresas, criando uma estrutura jurídica segura e emitindo títulos lastreados nesses ativos, permitindo que investidores financiem operações de forma segura e regulamentada.",
  },
  {
    id: 2,
    question: "Quais são os benefícios de trabalhar com uma Securitizadora?",
    answer:
      "Os principais benefícios incluem: acesso a capital de forma mais rápida e eficiente, taxas competitivas comparadas a outras modalidades de crédito, segurança jurídica através de estruturas regulamentadas pela CVM, diversificação de fontes de financiamento, melhoria do fluxo de caixa através da antecipação de recebíveis, e possibilidade de estruturar operações customizadas para diferentes necessidades do negócio.",
  },
  {
    id: 3,
    question: "Quanto tempo leva para estruturar uma operação de securitização?",
    answer:
      "Com nossa estrutura já pronta e processos otimizados, é possível estruturar uma operação em até 3 dias ou menos. O tempo pode variar conforme a complexidade da operação, volume de ativos e necessidade de customização, mas nossa equipe trabalha de forma ágil para garantir agilidade sem comprometer a segurança jurídica e a qualidade da estruturação.",
  },
  {
    id: 4,
    question: "Quais tipos de ativos podem ser securitizados?",
    answer:
      "Podemos securitizar diversos tipos de ativos, incluindo: recebíveis de vendas a prazo, contratos de prestação de serviços, créditos de cartão de crédito, contratos de aluguel, fluxos de caixa futuros, debêntures, notas comerciais e outros créditos que gerem fluxo de pagamento futuro. Nossa equipe avalia cada caso para determinar a viabilidade e a melhor estrutura para cada tipo de ativo.",
  },
  {
    id: 5,
    question: "Como é garantida a segurança jurídica das operações?",
    answer:
      "A segurança jurídica é garantida através de: estruturação conforme regulamentação da CVM, separação patrimonial dos ativos (isolamento de risco), auditorias e due diligence rigorosos, contratos padronizados e revisados por equipe jurídica especializada, acompanhamento contínuo das operações, e compliance com todas as normas do mercado de capitais brasileiro. Nossa estrutura é desenhada para proteger tanto os originadores quanto os investidores.",
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

