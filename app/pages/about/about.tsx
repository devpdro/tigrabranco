"use client";

import { useState } from "react";
import {
  Navbar,
  Contact,
  MissionValues,
  ScrollRevealText,
  ServicesGrid,
  DualCta,
  Founder,
  Footer,
} from "@/app/components";
import { HeaderAbout } from "@/app/components/header-about/header-about";

export default function About() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar forceScrolled onOpenContact={() => setIsDrawerOpen(true)} />
      <main>
        <HeaderAbout />
        <MissionValues />
        <ScrollRevealText />
        <ServicesGrid />
        <Founder />
        <DualCta />
      </main>
      <Footer openContact={() => setIsDrawerOpen(true)} />
      <Contact isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}

