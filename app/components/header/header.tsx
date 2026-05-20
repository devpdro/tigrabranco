"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/app/components/form";
import { IMAGES } from "@/app/assets/images";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import styles from "./header.module.scss";

interface HeaderProps {
  onOpenContact?: () => void;
}

export function Header({ onOpenContact }: HeaderProps) {
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
            Conecte seu{" "}
            <AnimatedText
              text="negócio"
              strokeColor="#02a657"
              strokeWidth={4}
              underlinePath="M 0,10 Q 60,0 120,10 Q 180,20 240,10"
              underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
              underlineDuration={1.5}
            />{" "}à infraestrutura do mercado de crédito.
          </motion.h1>

          <motion.p className={styles.heroDescription} variants={itemVariants}>
            A Tigre Branco Pay conecta correspondentes bancários, securitizadoras
            e investidores numa única plataforma. Tecnologia para organizar,
            profissionalizar e escalar o mercado de crédito.
          </motion.p>

          <motion.div className={styles.heroButtons} variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="white"
                label="Conhecer a plataforma"
                icon={<ArrowRight size={18} />}
                width={{ base: "100%", sm: "auto" }}
                href="https://tigrebrancopay.com.br/login"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outlineWhite"
                label="Simular agora"
                onClick={onOpenContact}
                width={{ base: "100%", sm: "auto" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

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
