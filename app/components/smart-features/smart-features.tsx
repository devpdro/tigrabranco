import S from "./smart-features.module.scss";

export function SmartFeatures() {
  return (
    <section className={S.smartFeaturesSection}>
      <div className={S.container}>
        <div className={S.header}>
          <h2 className={S.title}>Conheça a Inteligência</h2>
          <p className={S.description}>
            Nosso assistente impulsionado por IA foi projetado para decodificar números financeiros complexos 
            e iluminar tendências chave no seu negócio.
          </p>
        </div>

        <div className={S.cardGrid}>
          {/* Card 1 */}
          <div className={S.featureCard}>
            <div className={S.visualArea}>
              {/* Placeholder para imagem futura */}
              <div className={S.placeholderContent}>
                <span>Área da Imagem 1</span>
              </div>
            </div>
            <div className={S.cardContent}>
              <h3>Previsão Inteligente</h3>
              <p>
                Aproveite o poder da análise preditiva para mapear 
                o futuro financeiro do seu negócio com precisão.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={S.featureCard}>
            <div className={S.visualArea}>
              {/* Placeholder para imagem futura */}
              <div className={S.placeholderContent}>
                <span>Área da Imagem 2</span>
              </div>
            </div>
            <div className={S.cardContent}>
              <h3>Chat com Genius</h3>
              <p>
                Basta perguntar. Com a IA ao seu lado, navegar pelo labirinto 
                financeiro torna-se intuitivo e sem esforço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
