"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Activity, Wallet, ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { HandWrittenTextInline } from "@/app/components/ui/hand-written-text-inline";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./workflow-lightbox.css";
import { IMAGES } from "@/app/assets/images";
import Button from "@/app/components/form/button/button";

import S from "./workflow.module.scss";

export function Workflow() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Helper function to get image URL from Next.js Image import
  const getImageUrl = (image: unknown): string => {
    if (typeof image === "string") return image;
    const img = image as { src?: string; default?: { src?: string } };
    return img?.src || img?.default?.src || "";
  };

  const tabs = [
    {
      id: "cobrancas",
      icon: Wallet,
      title: "Gestão de Cobranças",
      description:
        "Controle a inadimplência, renegocie dívidas e acompanhe seus recebíveis com dashboards automáticos e integrados.",
      image: IMAGES.COBRANÇAS,
      alt: "Painel de Gestão de Cobranças",
    },
    {
      id: "acompanhamento",
      icon: Activity,
      title: "Monitoramento em Tempo Real",
      description:
        "Visualize o status de cada contrato em tempo real, da análise ao pagamento, garantindo total transparência na esteira.",
      image: IMAGES.ACOMPANHAMENTO,
      alt: "Dashboard de Acompanhamento de Propostas",
    },
    {
      id: "digitacao",
      icon: FileText,
      title: "Digitação Intuitiva",
      description:
        "Cadastre propostas com validação automática e fluxo guiado, reduzindo erros e eliminando o retrabalho operacional.",
      image: IMAGES.DIGITAÇÃO,
      alt: "Interface de Digitação de Propostas",
    },
  ];

  return (
    <section ref={ref} id="workflow" className={S.section}>
      <div className={S.container}>
        <motion.div
          className={S.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className={S.badge}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            WORKFLOW INTELIGENTE
          </motion.span>
          <h2>
            Domine cada etapa da sua operação de crédito com nosso{" "}
            <HandWrittenTextInline
              text="sistema próprio"
              className={S.handWritten}
              strokeColor="#02a657"
              strokeWidth={4}
              duration={2}
            />
            .
          </h2>
        </motion.div>

        <motion.div
          className={S.tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              className={`${S.tab} ${activeTab === index ? S.active : ""}`}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={S.icon}>
                <tab.icon />
              </div>
              <h3>{tab.title}</h3>
              <p>{tab.description}</p>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className={S.preview}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={S.backgroundImage}>
            <Image
              src={IMAGES.BG_HEADER}
              alt="Background"
              fill
              className={S.bgImage}
              quality={100}
              priority
            />
          </div>
          <div className={S.glow} />
          <div className={S.imageContainer}>
            <div className={S.imageWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].alt}
                    className={S.interfaceImage}
                    quality={100}
                    priority
                    onClick={() => setIsLightboxOpen(true)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={[
          {
            src: getImageUrl(tabs[activeTab].image),
            alt: tabs[activeTab].alt,
          },
        ]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          slide: {
            maxWidth: "75%",
            maxHeight: "75vh",
            margin: "auto",
          },
        }}
        carousel={{
          finite: true,
        }}
      />
    </section>
  );
}
