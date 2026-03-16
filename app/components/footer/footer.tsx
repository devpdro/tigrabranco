"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/app/assets/images/LOGO_PRETO.png";
import Anbima from "@/app/assets/images/ANBIMA_SECURITIZADORA.svg";

import { Button } from "@/app/components/form";

import S from "./footer.module.scss";

interface FooterProps {
  openContact?: () => void;
}

export function Footer({ openContact }: FooterProps) {
  const pathname = usePathname();
  const router = useRouter();

  const whatsappLink =
    "https://wa.me/5511914924000?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20da%20Tigre%20Branco%20e%20gostaria%20de%20receber%20assist%C3%AAncia%20de%20um%20especialista.";

  const handleSectionNav = (sectionId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${sectionId}`);
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
                <span className={S.linkStatic}>
                  <span>Programa de Parceria</span>
                  <span className={S.badge}>NOVO</span>
                </span>
              </li>
              <li>
                <span className={S.linkStatic}>
                  <span>Carreiras</span>
                  <span className={S.badge}>Estamos contratando!</span>
                </span>
              </li>
              <li>
                <a
                  href="/apresentacao-institucional.pdf"
                  className={S.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Apresentação Institucional</span>
                  <span className={S.badge}>PDF</span>
                </a>
              </li>
              <li>
                <Link href="/sobre-nos" className={S.link}>
                  Quem somos
                </Link>
              </li>
              <li>
                <Link href="/termos" className={S.link}>
                  Termos de Uso
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
                <span
                  className={S.link}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSectionNav("faq")}
                >
                  Perguntas frequentes
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={S.legal}>
          <div className={S.text}>
            <p>
              A Tigre Branco Pay é uma plataforma de infraestrutura tecnológica financeira (Finance as a Service), operada pela Tigre Branco Securitizadora S.A., que disponibiliza, via API e ambiente web, serviços de securitização de recebíveis, intermediação de operações de crédito, gestão de pagamentos, análise de risco e conformidade regulatória para empresas, fintechs, correspondentes bancários e investidores.
            </p>
            <p>
              A Tigre Branco não é instituição financeira e não realiza concessão direta de crédito ao consumidor final. Todas as operações financeiras intermediadas pela plataforma são estruturadas, formalizadas e liquidadas por instituições parceiras devidamente autorizadas e supervisionadas pelos órgãos competentes, incluindo Banco Central do Brasil e Comissão de Valores Mobiliários (CVM). A Tigre Branco atua como elo tecnológico e operacional entre originadores de crédito, estruturas de securitização e fontes de capital.
            </p>
            <p>
              O uso da plataforma está sujeito aos Termos de Serviço e à Política de Privacidade disponíveis neste site, elaborados em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), a Resolução CVM nº 60/2021 e demais legislações aplicáveis ao mercado financeiro e de capitais. Informações completas sobre condições, encargos, Custo Efetivo Total (CET) e obrigações contratuais são disponibilizadas previamente à contratação de qualquer produto ou serviço.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
