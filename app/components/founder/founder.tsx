"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/app/assets/images";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import { UserCheck, Building2, TrendingUp } from "lucide-react";
import styles from "./founder.module.scss";

const LIST_ITEMS = [
  { Icon: UserCheck, text: "transformar empresários em operadores profissionais de crédito" },
  { Icon: Building2, text: "transformar securitizadoras em estruturas organizadas e escaláveis" },
  { Icon: TrendingUp, text: "transformar oportunidades em operações reais, legais e sustentáveis" },
];

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
            Por que a{" "}
            <AnimatedText
              text="Tigre Branco Pay"
              strokeColor="#02a657"
              strokeWidth={4}
              underlinePath="M 0,10 Q 60,0 120,10 Q 180,20 240,10"
              underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
              underlineDuration={1.5}
            />
            {" "}existe
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
              A história da Tigre Branco Pay começou muito antes do nome existir.
            </p>
            <p className={styles.paragraph}>
              Há cerca de três ou quatro anos, já existia um desejo muito claro: construir uma fintech.
              Naquele momento, o primeiro contato foi com o universo do FGTS, um mercado que crescia
              rapidamente e onde diversas fintechs surgiam com propostas inovadoras.
            </p>
            <p className={styles.paragraph}>
              Vieram então os estudos, o aprofundamento e a busca por compreender aquele novo cenário.
              Com o tempo, ficou evidente que aquele mercado exigia muito mais do que tecnologia ou boa
              vontade. Era necessário bancarização, fundos estruturados e uma série de estruturas
              financeiras que criavam barreiras quase invisíveis para quem estava começando.
            </p>
            <p className={styles.paragraph}>
              Quando a tentativa de aprovação junto a uma Sociedade de Crédito Direto (SCD) foi negada,
              o sentimento inicial foi de frustração. Mas aquela negativa não representou o fim da
              jornada. Na verdade, foi exatamente ali que tudo começou de verdade.
            </p>
            <p className={styles.paragraph}>A pergunta mudou.</p>
            <p className={styles.quote}>
              &ldquo;Por que depender da aprovação de alguém para construir meus próprios sonhos?&rdquo;
            </p>
            <p className={styles.paragraph}>
              Foi nesse momento que nasceu a ideia da securitizadora. Se o sistema tradicional criava
              barreiras, então seria necessário construir um novo caminho. Com capital próprio, coragem e
              visão de longo prazo, foi tomada a decisão de criar uma estrutura independente, sólida e
              sustentável.
            </p>
            <p className={styles.paragraph}>
              Nesse processo surgiu o encontro com o Método Tigre Branco, idealizado por Antônio,
              especialista comercial e estrategista de expansão no mercado de crédito. Esse encontro foi
              decisivo.
            </p>
            <p className={styles.paragraph}>
              Pela primeira vez ficou evidente que existia uma lacuna gigantesca no mercado: ninguém
              havia conseguido unir, de forma estruturada e profissional, o universo dos correspondentes
              bancários com o mundo das securitizadoras.
            </p>
            <p className={styles.paragraph}>
              De um lado estavam milhares de operadores de crédito, especialistas em gerar negócios.
              Do outro, estruturas financeiras capazes de transformar essas operações em ativos
              estruturados. Mas faltava algo essencial entre esses dois mundos:
            </p>
            <p className={styles.emphasis}>tecnologia.</p>
            <p className={styles.paragraph}>
              Foi então que nasceu a Tigre Branco Pay. Uma plataforma criada para conectar esses dois
              universos e organizar o mercado de crédito por meio da tecnologia.
            </p>
            <p className={styles.paragraph}>
              A Tigre Branco Pay não nasceu para ser apenas um sistema. Ela nasceu para:
            </p>
            <ul className={styles.list}>
              {LIST_ITEMS.map(({ Icon, text }, i) => (
                <li key={i} className={styles.listItem}>
                  <Icon size={16} strokeWidth={2} className={styles.listIcon} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className={styles.paragraph}>
              Mais do que um software, a Tigre Branco Pay representa um novo modelo de organização para
              o mercado de crédito. Um ecossistema onde tecnologia, capital e operadores trabalham
              conectados para gerar crescimento, oportunidades e prosperidade.
            </p>
            <p className={styles.paragraph}>
              Essa é apenas a primeira página de uma história que ainda está sendo escrita.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
