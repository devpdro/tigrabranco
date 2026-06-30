"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, FileSpreadsheet } from "lucide-react";
import { Contact, Footer, Navbar } from "@/app/components";
import { SimuladorCcb } from "@/app/components/simulador-ccb/simulador-ccb";
import { CalculadoraExecucaoCcb } from "@/app/components/calculadora-execucao-ccb/calculadora-execucao-ccb";
import styles from "./calculadoras.module.scss";

type CalculatorTab = "liquidacao" | "execucao";

const tabs = [
  {
    id: "liquidacao" as const,
    href: "/calculadoras/liquidacao-ccb",
    label: "Liquidacao CCB",
    icon: Calculator,
  },
  {
    id: "execucao" as const,
    href: "/calculadoras/calculadora-ccb",
    label: "Calculadora CCB",
    icon: FileSpreadsheet,
  },
];

export default function Calculadoras({ initialTab = "liquidacao" }: { initialTab?: CalculatorTab }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar forceScrolled onOpenContact={() => setIsDrawerOpen(true)} />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.hubHeader}>
            <span className={styles.kicker}>Central de calculadoras</span>
            <h1>Ferramentas CCB Tigre Branco</h1>
            <p>
              Simuladores operacionais para liquidacao antecipada, saldo devedor e
              memoria de calculo de execucao, reunidos em um unico ambiente.
            </p>
          </div>

          <nav className={styles.tabs} aria-label="Calculadoras CCB">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = tab.id === initialTab;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`${styles.tab} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={16} strokeWidth={2.2} />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.toolShell}>
            {initialTab === "liquidacao" ? <SimuladorCcb /> : <CalculadoraExecucaoCcb />}
          </div>
        </div>
      </main>
      <div className={styles.footerBleed}>
        <Footer openContact={() => setIsDrawerOpen(true)} />
      </div>
      <Contact isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
