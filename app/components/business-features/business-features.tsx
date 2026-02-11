"use client";

import styles from "./business-features.module.scss";

export function Business() {
  return (
    <section className={styles["business-features"]}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>RECURSOS SUPERCARREGADOS</span>
          <h2 className={styles.title}>O cartão é apenas o começo.</h2>
          <p className={styles.subtitle}>
            Economize ainda mais tempo e dinheiro com uma conta empresarial
            completa e pagamentos integrados.
          </p>
        </div>

        {/* First Grid - 2 Columns */}
        <div className={styles["grid-large"]}>
          <div className={styles.card}>
            <div className={styles["visual-placeholder"]}>
              Interface: Conta Comercial
            </div>
            <div className={styles.content}>
              <h3>Conta comercial</h3>
              <p>
                Receba pagamentos, envie dinheiro e gerencie seus cartões
                Winden.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles["visual-placeholder"]}>
              Interface: Faturamento
            </div>
            <div className={styles.content}>
              <h3>Faturamento e Pagamentos</h3>
              <p>
                Gerencie seus clientes em um só lugar e receba pagamentos
                rapidamente com faturas personalizáveis.
              </p>
            </div>
          </div>
        </div>

        {/* Second Grid - 3 Columns */}
        <div className={styles["grid-small"]}>
          <div className={styles.card}>
            <div className={styles["visual-placeholder"]}>
              Interface: Transferências
            </div>
            <div className={styles.content}>
              <h3>Transferências ACH e bancárias nacionais gratuitas.</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles["visual-placeholder"]}>
              Ícones: Integrações
            </div>
            <div className={styles.content}>
              <h3>Milhares de Integrações.</h3>
              <p>
                Integre sua conta Winden com a contabilidade, folha de pagamento
                e muito mais.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles["visual-placeholder"]}>
              Interface: Gráficos AI
            </div>
            <div className={styles.content}>
              <h3>Diretor financeiro de IA</h3>
              <p>Sua contabilidade e projeções criadas com IA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
