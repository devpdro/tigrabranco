"use client";

import { useState } from "react";
import {
  Footer,
  Support,
  Partners,
  Business,
  FeedbackLoop,
  Contact,
  WhatsappButton,
  Workflow,
  Header,
  Manifesto,
  Navbar,
  ProcessTimeline,
  FAQ,
  Founder,
} from "@/app/components";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setIsDrawerOpen(true)} />
      
      {/* 1. IMPACTO INICIAL - Captura atenção */}
      <Header onOpenContact={() => setIsDrawerOpen(true)} />
      
      {/* 2. CREDIBILIDADE - Logo após o hero */}
      <Partners />
      
      {/* 3. PROPOSTA DE VALOR - Por que existimos */}
      <Manifesto />
      
      {/* 4. CALCULADORA/BENEFÍCIO - Mostre o valor tangível */}
      <Business />
      
      {/* 5. COMO FUNCIONA - Processo simplificado */}
      <Workflow />
      
      {/* 6. DETALHAMENTO - Timeline do processo */}
      <ProcessTimeline onContactClick={() => setIsDrawerOpen(true)} />
      
      {/* 7. PROVA SOCIAL - Depoimentos de clientes */}
      <FeedbackLoop />
      
      {/* 8. DIFERENCIAL - Suporte 24/7 */}
      <Support />
      
      {/* 9. OBJEÇÕES - Tire dúvidas comuns */}
      <FAQ />
      
      {/* 10. HUMANIZAÇÃO - Quem está por trás */}
      <Founder />
      
      {/* 11. CONVERSÃO FINAL */}
      <Footer openContact={() => setIsDrawerOpen(true)} />
      
      <Contact isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <WhatsappButton />
    </>
  );
}
