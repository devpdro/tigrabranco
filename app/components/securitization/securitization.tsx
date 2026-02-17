import Image from "next/image";
import { IMAGES } from "@/app/assets/images";

import S from "./securitization.module.scss";

export function Securitization() {
  return (
    <section className={S.securitizationSection}>
      <div className={S.container}>
        <div className={S.header}>
          <h2 className={S.title}>Estrutura Robusta</h2>
          <p className={S.description}>
            Nossa estrutura de securitização é desenhada para garantir segurança
            jurídica, agilidade operacional e os melhores retornos para o seu
            negócio.
          </p>
        </div>

        <div className={S.cardGrid}>
          <div className={S.featureCard}>
            <div className={S.imageWrapper}>
              <Image
                src={IMAGES.SECURITIZADORA}
                alt="Estrutura Securitizadora Tigra Branco"
                className={S.diagramImage}
                priority
              />
            </div>
            <div className={S.cardContent}>
              <h3>Fluxo de Capital Otimizado</h3>
              <p>
                Integração completa entre injeção de capital, risco sacado e
                retorno para investidores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
