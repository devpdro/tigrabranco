"use client";

import { MessageSquareQuote, Gift, Headset } from "lucide-react";
import styles from "./support.module.scss";

export function Support() {
  return (
    <section className={styles.support}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Sempre aqui</span>
          <h2 className={styles.title}>
            Estamos disponíveis 24 horas
            <br />
            por dia, 7 dias por semana,
            <br />
            para ajudar com qualquer coisa.
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles["icon-wrapper"]}>
              <MessageSquareQuote />
            </div>
            <h3 className={styles["card-title"]}>
              Suporte por e-mail e chat 24 horas por dia, 7 dias por semana
            </h3>
            <p className={styles["card-description"]}>
              Estamos aqui para atender a qualquer solicitação que você tenha.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles["icon-wrapper"]}>
              <Gift />
            </div>
            <h3 className={styles["card-title"]}>
              Mais de 500 mil dólares em benefícios
            </h3>
            <p className={styles["card-description"]}>
              Obtenha descontos em serviços populares para expandir seu negócio.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles["icon-wrapper"]}>
              <Headset />
            </div>
            <h3 className={styles["card-title"]}>Porteiro</h3>
            <p className={styles["card-description"]}>
              Reservas sob demanda, ajuda e muito mais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
