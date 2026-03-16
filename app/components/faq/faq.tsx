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
    question: "O que é a Tigre Branco Pay e como ela funciona?",
    answer:
      "A Tigre Branco Pay é uma plataforma de infraestrutura tecnológica financeira que conecta correspondentes bancários, securitizadoras e investidores em um único ecossistema. Disponibilizamos, via API e ambiente web, tudo que é necessário para estruturar e escalar operações de crédito: securitização de recebíveis, gestão de pagamentos, análise de risco e conformidade regulatória. Você traz a operação, nós entregamos a infraestrutura para operar com profissionalismo e escala.",
  },
  {
    id: 2,
    question: "Preciso já ter uma securitizadora ou FIDC para usar a plataforma?",
    answer:
      "Não. A Tigre Branco Pay foi criada justamente para operadores de crédito que ainda estão estruturando seu negócio. Se você é um correspondente bancário, empresário ou gestor de crédito que quer profissionalizar sua operação, podemos ajudá-lo desde o início, conectando você às estruturas de capital e securitização adequadas ao seu modelo de negócio.",
  },
  {
    id: 3,
    question: "Como a plataforma conecta correspondentes bancários e securitizadoras?",
    answer:
      "Nossa plataforma atua como o elo tecnológico entre esses dois mundos. Os correspondentes bancários e operadores de crédito têm acesso a ferramentas para originar, analisar e formalizar operações. As securitizadoras encontram uma estrutura organizada para transformar essas operações em ativos estruturados. A tecnologia garante que esse fluxo aconteça de forma padronizada, rastreável e escalável.",
  },
  {
    id: 4,
    question: "A Tigre Branco Pay é uma instituição financeira?",
    answer:
      "Não. Somos uma plataforma de infraestrutura tecnológica financeira, o que chamamos de Finance as a Service. Não concedemos crédito diretamente ao consumidor final. Atuamos como elo tecnológico e operacional entre originadores de crédito, estruturas de securitização e fontes de capital. As operações financeiras são estruturadas e liquidadas por instituições parceiras devidamente autorizadas pelo Banco Central e pela CVM.",
  },
  {
    id: 5,
    question: "Quanto tempo leva para começar a operar com a plataforma?",
    answer:
      "O tempo de onboarding varia conforme a complexidade da sua operação. Para operações mais simples, é possível começar em poucas semanas. Após uma conversa inicial para entender seu modelo de negócio, nossa equipe apresenta um plano de implementação com etapas claras, prioridades definidas e suporte técnico durante todo o processo.",
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
                className={`${styles.questionButton} ${openItems.includes(item.id) ? styles.active : ""}`}
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

