"use client";

import { useState } from "react";
import {
  Navbar,
  Footer,
  Contact,
} from "@/app/components";
import { SimuladorCcb } from "@/app/components/simulador-ccb/simulador-ccb";

export default function SimuladorCcbPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar forceScrolled onOpenContact={() => setIsDrawerOpen(true)} />
      <main style={{ paddingTop: 80 }}>
        <SimuladorCcb />
      </main>
      <Footer openContact={() => setIsDrawerOpen(true)} />
      <Contact isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
