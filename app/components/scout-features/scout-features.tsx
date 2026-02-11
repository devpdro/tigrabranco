"use client";

import { Search, Wallet, DollarSign } from "lucide-react";
import styles from "./scout-features.module.scss";

export function Scout() {
  const features = [
    {
      icon: Search,
      title: "O Scout™ monitora todas as transações.",
      description:
        "Monitoramos cada dólar gasto para encontrar as melhores oportunidades de reembolso.",
    },
    {
      icon: Wallet,
      title: "A IA trabalha nos bastidores.",
      description:
        "O Scout™ negocia automaticamente descontos, códigos promocionais, ofertas de fidelização, preços por atacado e programas especiais em cada compra. Ele interage diretamente com os comerciantes para garantir o máximo de cashback em cada transação.",
    },
    {
      icon: DollarSign,
      title: "Aproveite dinheiro grátis",
      description:
        "Deixe o Scout™ fazer a sua magia e veja o seu cashback aumentar 🤑",
    },
  ];

  return (
    <section className={styles["scout-features"]}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>REEMBOLSO AUTOMÁTICO</span>
          <h2 className={styles.title}>
            Economize mais dinheiro <br /> com o Scout™
          </h2>
          <a href="#" className={styles["cta-button"]}>
            Comece a economizar &gt;
          </a>
        </div>

        <div className={styles.content}>
          <div className={styles.visuals}>
            <div className={styles["placeholder-box"]}>
              Interface: Monitoramento de Transações
            </div>
            <div className={styles["placeholder-box"]}>
              Interface: Negociação via IA
            </div>
            <div className={styles["placeholder-box"]}>
              Interface: Dashboard de Cashback
            </div>
          </div>

          <div className={styles.timeline}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles["timeline-item"]}>
                  <div className={styles["icon-wrapper"]}>
                    <Icon strokeWidth={1} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
