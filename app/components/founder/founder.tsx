"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/app/assets/images";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import styles from "./founder.module.scss";

export function Founder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={styles.founder}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Nossa História</span>
          <h2 className={styles.title}>
            Como nasceu a{" "}
            <AnimatedText
              text="Tigre Branco Pay"
              strokeColor="#02a657"
              strokeWidth={4}
              underlinePath="M 0,10 Q 60,0 120,10 Q 180,20 240,10"
              underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
              underlineDuration={1.5}
            />
          </h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={IMAGES.CEOS}
              alt="Fundadores da Tigre Branco Pay"
              className={styles.image}
              priority
            />
          </motion.div>

          <motion.div
            className={styles.textWrapper}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.paragraph}>
              A história da Tigre Branco Pay começa muito antes do nome existir. Há cerca de três a quatro anos, já existia um desejo muito claro: construir uma fintech. O primeiro contato foi com o universo do FGTS, onde inúmeras fintechs surgiam e cresciam. O estudo veio, o aprofundamento também — e com eles, a compreensão de que aquele mercado exigia bancarização, fundos estruturados e uma série de barreiras invisíveis para quem estava começando.
            </p>
            <p className={styles.paragraph}>
              Quando a tentativa de aprovação junto a uma SCD foi negada, o sentimento foi de frustração. Mas aquela negativa não encerrou a jornada. Pelo contrário: foi o ponto exato em que ela começou de verdade. A pergunta mudou. Em vez de &quot;por que não fui aprovado?&quot;, passou a ser &quot;por que depender de alguém para aprovar meus sonhos?&quot;.
            </p>
            <p className={styles.paragraph}>
              Foi nesse momento que a ideia da securitizadora surgiu. Se o sistema não permitia avançar, então seria necessário construir o próprio caminho. Com capital próprio, coragem e visão de longo prazo, a decisão foi tomada: seria criado um modelo independente, estruturado e sustentável.
            </p>
            <p className={styles.paragraph}>
              O encontro com o Método Tigre Branco foi decisivo. Pela primeira vez, ficou evidente que existia uma lacuna gigantesca no mercado: ninguém havia unido, de forma profissional, o mundo do correspondente bancário ao universo das securitizadoras. A Tigre Branco Pay nasceu exatamente dessa união.
            </p>
            <p className={styles.paragraph}>
              A Tigre Branco Pay não nasceu para ser apenas um sistema. Ela nasceu para transformar empresários em operadores de crédito, securitizadoras em estruturas profissionais e sonhos em operações reais, legais e escaláveis.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
