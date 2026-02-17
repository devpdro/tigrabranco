"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/app/components/form/button/button";
import { Highlighter } from "@/app/components/ui/highlighter";
import styles from "./process-timeline.module.scss";

const steps = [
  {
    id: 1,
    title: "Agende o diagnóstico",
    description:
      "Veja como alavancar o crescimento do seu negócio com um braço financeiro",
  },
  {
    id: 2,
    title: "Estruture em 3 dias (ou menos)",
    description: "Utilize nossa estrutura já pronta para iniciar rapidamente.",
  },
  {
    id: 3,
    title: "Aporte de capital",
    description:
      "Recursos próprios PF, PJ e de terceiros para financiar a operação.",
  },
  {
    id: 4,
    title: "Comece a operar",
    description:
      "Obtenha mais caixa livre, menos custos e alta rentabilidade.",
  },
];

interface ProcessTimelineProps {
  onContactClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProcessTimeline({ onContactClick: _onContactClick }: ProcessTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={styles.processTimeline}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Como estruturar sua{" "}
          <Highlighter
            action="underline"
            color="#02a657"
            strokeWidth={2}
            animationDuration={800}
            iterations={1}
            padding={4}
            isView={true}
          >
            Securitizadora
          </Highlighter>
        </motion.h2>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine} />
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={styles.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.stepIndicator}>
                  <div className={styles.outerCircle} />
                  <div className={styles.innerCircle} />
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="primary"
            label="Conheça nosso sistema"
            href="https://tigrebrancopay.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            width={{ base: "100%", sm: "auto" }}
            icon={<ArrowRight size={18} />}
          />
          <Button
            variant="secondary"
            label="Falar com especialista"
            href="https://api.whatsapp.com/send/?phone=5514991370807&text=Ol%C3%A1%21+Vim+atrav%C3%A9s+do+site+da+Tigre+Branco+e+gostaria+de+receber+assist%C3%AAncia+de+um+especialista.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            width={{ base: "100%", sm: "auto" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

