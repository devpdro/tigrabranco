"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/images/LOGO_PRETO.png";
import Anbima from "@/app/assets/images/ANBIMA_SECURITIZADORA.svg";

import { Button } from "@/app/components/form";

import S from "./footer.module.scss";

interface FooterProps {
  openContact?: () => void;
}

export function Footer({ openContact }: FooterProps) {
  const whatsappLink =
    "https://wa.me/5514991370807?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20da%20Tigre%20Branco%20e%20gostaria%20de%20receber%20assist%C3%AAncia%20de%20um%20especialista.";

  return (
    <footer className={S.footer}>
      <div className={S.transitionSection}>
        <div className={S.ctaContainer}>
          <h2>Vamos começar?</h2>
          <p>Agende uma conversa com nosso time hoje mesmo!</p>
          <div className={S.buttons}>
            <Button
              variant="white"
              label="Falar com especialista"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              width={{ base: "100%", sm: "auto" }}
            />
            <Button
              variant="outlineWhite"
              label="Simular agora"
              onClick={openContact}
              width={{ base: "100%", sm: "auto" }}
            />
          </div>
        </div>
      </div>

      <div className={S.container}>
        <div className={S.grid}>
          <div className={S.logo}>
            <div>
              <Link href="/" className={S.link}>
                <Image
                  src={Logo}
                  alt="Tigre Branco Pay"
                  width={140}
                  height={40}
                  className={S.image}
                />
              </Link>
            </div>
            <div className={S.anbima}>
              <Image
                src={Anbima}
                alt="Anbima Securitizadora"
                width={120}
                height={90}
              />
            </div>
          </div>

          <div className={S.nav}>
            <h4 className={S.heading}>Sobre</h4>
            <ul className={S.list}>
              <li>
                <Link href="#" className={S.link}>
                  <span>Programa de Parceria</span>
                  <span className={S.badge}>NOVO</span>
                </Link>
              </li>
              <li>
                <Link href="#" className={S.link}>
                  <span>Carreiras</span>
                  <span className={S.badge}>Estamos contratando!</span>
                </Link>
              </li>
              <li>
                <Link href="/termos" className={S.link}>
                  Termos
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className={S.link}>
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${S.nav} ${S.last}`}>
            <h4 className={S.heading}>Obtenha ajuda</h4>
            <ul className={S.list}>
              <li>
                <Link href="#" className={S.link}>
                  Perguntas frequentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={S.legal}>
          <div className={S.text}>
            <p>
              A Tigra Branco é uma plataforma digital que atua como
              correspondente bancário para facilitar o processo de contratação
              de empréstimos. Como correspondente bancário, seguimos as
              diretrizes do Banco Central do Brasil, nos termos da Resolução nº.
              3.954 de 24 de fevereiro de 2011.
            </p>
            <p>
              A análise de crédito e cálculo das taxas de juros dependem de
              diversas informações, como seus dados financeiros, histórico de
              crédito e prazo de pagamento. Toda avaliação será realizada
              conforme a política de crédito da Instituição Financeira parceira.
              Antes da contratação de qualquer serviço através de nossos
              parceiros, você receberá todas as condições e informações
              relativas ao empréstimo de forma completa e transparente,
              incluindo impostos incidentes (IOF) e Custo Efetivo Total (CET).
            </p>
            <p>
              O atraso ou não pagamento de prestações do contrato de empréstimo
              pessoal pode ter consequências legais, tais como a inclusão de
              nome nos cadastros dos órgãos de proteção ao crédito, o protesto
              de títulos e o ajuizamento de ações de cobrança.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
