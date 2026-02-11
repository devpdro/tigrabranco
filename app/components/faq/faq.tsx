"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  title: string;
  content: string;
}

const items: FaqItem[] = [
  {
    title: "Como funciona a antecipação de recebíveis via securitização?",
    content:
      "A securitização transforma seus recebíveis a prazo (duplicatas, cheques, contratos) em capital imediato. Cedemos esses direitos creditórios à securitizadora mediante um deságio, permitindo que sua empresa receba à vista o que só entraria no caixa no futuro, sem criar endividamento bancário.",
  },
  {
    title: "Quais são os requisitos para operar com a securitizadora?",
    content:
      "Atendemos pessoas jurídicas com faturamento consistente e carteira de recebíveis performada. É necessário apresentar o contrato social, documentos dos sócios e balanços recentes para análise de crédito e definição de limite operacional personalizado.",
  },
  {
    title: "Quais as taxas e prazos praticados nas operações?",
    content:
      "Nossas taxas são competitivas e definidas caso a caso, baseadas no risco sacado e no prazo médio da carteira. Não cobramos TAC (Tarifa de Abertura de Crédito) ou IOF nas operações de fomento mercantil, garantindo um Custo Efetivo Total otimizado para sua empresa.",
  },
  {
    title: "É necessário oferecer garantias reais?",
    content:
      "Na maioria das operações de antecipação de recebíveis, o próprio título de crédito serve como lastro. Em operações estruturadas ou de maior volume, podemos solicitar garantias adicionais (como aval ou garantia real) para viabilizar taxas ainda mais atrativas.",
  },
  {
    title: "Qual a documentação necessária para o cadastro inicial?",
    content:
      "Para agilidade na aprovação, solicitamos: Contrato Social e alterações, Cartão CNPJ, RG e CPF dos sócios, Faturamento dos últimos 12 meses e Balanço Patrimonial/DRE recentes. Todo o processo de envio é digital e seguro.",
  },
  {
    title: "Qual a diferença entre securitização e empréstimo bancário?",
    content:
      "Diferente do empréstimo, que gera uma dívida no passivo da empresa, a securitização é uma venda de ativos. Isso melhora seus índices de liquidez no balanço, não consome seu limite bancário e não incide IOF, sendo uma ferramenta estratégica para gestão de fluxo de caixa.",
  },
  {
    title: "Como é o processo de liberação de crédito e segurança?",
    content:
      "Após a análise e formalização digital da cessão (com assinatura eletrônica), o pagamento é realizado via TED no mesmo dia para operações aprovadas até determinado horário. Todas as transações seguem rigorosos protocolos de compliance e segurança de dados.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-14 px-8 flex justify-center bg-transparent box-border max-md:py-8 max-md:px-5">
      <div className="w-full max-w-[1280px]">
        <header className="mb-8 max-md:mb-6">
          <h2 className="m-0 text-[44px] leading-[1.1] font-normal text-[#f9fafb] max-md:text-[32px]">
            Soluções financeiras estruturadas para alavancar seu negócio
          </h2>
          <p className="mt-2 text-[28px] leading-[1.2] font-normal text-[#f9fafb] max-md:text-[22px]">
            Expertise em securitização para transformar ativos em liquidez
            imediata
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-3 max-md:mt-6">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={index}
                onClick={() => toggle(index)}
                className={cn(
                  "bg-white rounded-2xl p-5 cursor-pointer transition-all duration-150 ease-in-out border border-[#e5e7eb] shadow-sm hover:bg-[#f9fafb] hover:border-[#d1d5db]",
                  isOpen && "bg-[#f9fafb] shadow-md border-[#d1d5db]",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="m-0 text-base font-medium text-[#1a1a1a] max-md:text-[15px]">
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label="Alternar resposta"
                    className="flex items-center justify-center text-[#1a1a1a]"
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-in-out",
                    isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#4b5563] text-[15px] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
