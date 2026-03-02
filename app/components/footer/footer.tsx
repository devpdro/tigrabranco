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
    "https://wa.me/5511914924000?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20da%20Tigre%20Branco%20e%20gostaria%20de%20receber%20assist%C3%AAncia%20de%20um%20especialista.";

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
                <Link 
                  href="#" 
                  className={S.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll("faq");
                  }}
                >
                  Perguntas frequentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={S.legal}>
          <div className={S.text}>
            <p>
              A Tigre Branco é uma plataforma de infraestrutura financeira
              que oferece, via API, serviços como:
              securitização de recebíveis, pagamentos, análise de crédito e
              gestão contábil/compliance para empresas, fintechs e demais
              parceiros de negócios.
            </p>
            <p>
              A Tigre Branco não é instituição financeira e não concede crédito
              diretamente ao usuário final. As operações financeiras são
              estruturadas e formalizadas por instituições parceiras
              devidamente autorizadas e reguladas, que são responsáveis pela
              análise de crédito, definição de taxas, prazos e demais
              condições econômicas.
            </p>
            <p>
              Antes da contratação de qualquer operação, todas as condições,
              encargos e tributos aplicáveis, incluindo Custo Efetivo Total, serão informados de forma clara e transparente pelas
              instituições parceiras. O atraso ou não cumprimento das
              obrigações contratadas poderá resultar em encargos adicionais e
              medidas de cobrança, conforme previsto em contrato e na legislação
              vigente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
