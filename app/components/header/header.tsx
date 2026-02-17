"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/app/components/form";
import { IMAGES } from "@/app/assets/images";
import { Highlighter } from "@/app/components/ui/highlighter";
import styles from "./header.module.scss";

const VALOR_MIN = 50_000;
const VALOR_MAX = 5_000_000;

const PRAZOS = [
  { value: 30, label: "30 dias" },
  { value: 60, label: "60 dias" },
  { value: 90, label: "90 dias" },
  { value: 120, label: "120 dias" },
  { value: 180, label: "180 dias" },
];

// Taxa mensal estimada (pode ser ajustada)
const TAXA_MENSAL = 0.025; // 2.5% ao mês

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

interface HeaderProps {
  onOpenContact?: () => void;
}

export function Header({ onOpenContact }: HeaderProps) {
  const [valorRecebiveis, setValorRecebiveis] = useState(500_000);
  const [prazoMedio, setPrazoMedio] = useState(90);
  const calculatorRef = useRef(null);
  const isCalculatorInView = useInView(calculatorRef, { once: true, margin: "-100px" });

  const sliderPercentage = Math.min(
    100,
    Math.max(0, ((valorRecebiveis - VALOR_MIN) / (VALOR_MAX - VALOR_MIN)) * 100),
  );

  // Cálculo do valor líquido e diferença
  // Taxa total = taxa mensal * (prazo / 30)
  const taxaTotal = TAXA_MENSAL * (prazoMedio / 30);
  const valorLiquido = valorRecebiveis * (1 - taxaTotal);
  const diferencaFluxo = valorRecebiveis - valorLiquido;

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  } as const;

  const calculatorVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  } as const;

  const numberVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  } as const;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) || VALOR_MIN;
    setValorRecebiveis(value);
  };

  const handlePrazoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value) || 90;
    setPrazoMedio(value);
  };

  const handleSimulateClick = () => {
    if (onOpenContact) {
      onOpenContact();
      return;
    }

    // Fallback: rolar até a calculadora caso o handler não seja passado
    const element = document.getElementById("header-calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.heroTitle} variants={itemVariants}>
            Receba agora e transforme seu{" "}
            <Highlighter
              action="underline"
              color="#02a657"
              strokeWidth={2}
              animationDuration={800}
              iterations={1}
              padding={4}
              isView={false}
            >
              negócio
            </Highlighter>
          </motion.h1>

          <motion.p className={styles.heroDescription} variants={itemVariants}>
            Receba capital imediato e transforme recebíveis em crescimento
            acelerado para seu negócio com segurança total.
          </motion.p>

          <motion.div className={styles.heroButtons} variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="white"
                label="Simular Agora"
                icon={<ArrowRight size={18} />}
                width={{ base: "auto", sm: "auto" }}
                onClick={handleSimulateClick}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outlineWhite"
                label="Falar com especialista"
                width={{ base: "auto", sm: "auto" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Calculator Card */}
      <motion.div
        id="header-calculator"
        ref={calculatorRef}
        className={styles.calculatorCard}
        style={{ "--slider-value": `${sliderPercentage}%` } as CSSProperties}
        variants={calculatorVariants}
        initial="hidden"
        animate={isCalculatorInView ? "visible" : "hidden"}
      >
        <div className={styles.calculatorContent}>
          {/* Valor dos Recebíveis */}
          <motion.div
            className={styles.calculatorField}
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.spendHeader}>
              <label className={styles.calculatorLabel}>
                Valor a Antecipar
              </label>
              <motion.span
                key={valorRecebiveis}
                className={styles.spendValue}
                variants={numberVariants}
                initial="initial"
                animate="animate"
              >
                {formatCurrency(valorRecebiveis)}
              </motion.span>
            </div>
            <div className={styles.sliderWrapper}>
              <input
                type="range"
                min={VALOR_MIN}
                max={VALOR_MAX}
                value={valorRecebiveis}
                onChange={handleSliderChange}
                className={styles.slider}
              />
            </div>
          </motion.div>

          {/* Prazo Médio */}
          <motion.div
            className={styles.calculatorField}
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className={styles.calculatorLabel}>
              Prazo Médio de Recebimento
            </label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={prazoMedio}
                onChange={handlePrazoChange}
              >
                {PRAZOS.map((prazo) => (
                  <option key={prazo.value} value={prazo.value}>
                    {prazo.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className={styles.chevron} />
            </div>
          </motion.div>

          {/* Resultado */}
          <motion.div
            className={styles.resultContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className={styles.resultItem}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className={styles.resultLabel}>Receba Hoje</span>
              <motion.span
                key={valorLiquido}
                className={styles.resultValue}
                variants={numberVariants}
                initial="initial"
                animate="animate"
              >
                {formatCurrency(Math.round(valorLiquido))}
              </motion.span>
            </motion.div>
            <motion.div
              className={styles.resultItem}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className={styles.resultLabel}>Ganhe em Fluxo de Caixa</span>
              <motion.span
                key={diferencaFluxo}
                className={styles.resultValue}
                variants={numberVariants}
                initial="initial"
                animate="animate"
              >
                {formatCurrency(Math.round(diferencaFluxo))} ao antecipar
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tiger Background Image */}
      <div className={styles.tigerBackground}>
        <Image
          src={IMAGES.TIGRE}
          alt="Tiger"
          width={1200}
          height={1600}
          className={styles.tigerImage}
          priority
          quality={100}
          unoptimized
        />
      </div>
    </div>
  );
}
