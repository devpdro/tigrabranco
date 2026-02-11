"use client";

import { useState } from "react";
import {
  Navbar,
  FaqAccordion,
  Footer,
  Support,
  Partners,
  Scout,
  Business,
  Product,
  Contact,
  WhatsappButton,
} from "@/app/components";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar openModal={() => setIsDrawerOpen(true)} />
      <main className="flex min-h-screen flex-col items-center justify-between bg-[#1a1a1a]">
        <Partners />
        <Scout />
        <Business />
        <Product />
        <FaqAccordion />
        <Support />
        <Footer />
      </main>
      <Contact isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <WhatsappButton />
    </>
  );
}
