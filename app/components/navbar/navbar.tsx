"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, UserSearch, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/app/assets/images/LOGO.png"; // Ajuste o caminho conforme necessário

interface NavbarProps {
  openModal?: () => void;
}

export function Navbar({ openModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Como funciona?", href: "#como-funciona", id: "como-funciona" },
    { label: "Depoimentos", href: "#testimonials", id: "testimonials" },
  ];

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "mx-6 mt-4 rounded-b-2xl rounded-t-none bg-white/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-4 px-6 md:px-8"
            : "mx-0 mt-0 bg-transparent py-6 px-8 md:px-[80px] lg:px-[120px]",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <div
              className={cn(
                "transition-all duration-300",
                isScrolled ? "brightness-0" : "brightness-0 invert",
              )}
            >
              {/* 
                 Nota: Assumindo que o LOGO.png é colorido ou escuro. 
                 Se for branco, removemos o filter no isScrolled=false e adicionamos invert no isScrolled=true.
                 Ajuste conforme a cor real do logo. 
                 Aqui assumi que o logo original é colorido/escuro, então:
                 - Scroll (fundo branco): brightness-0 (preto) ou normal
                 - Topo (fundo escuro): brightness-0 invert (branco)
               */}
              <Image
                src={logo}
                alt="Tigra Branco"
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-80",
                  isScrolled ? "text-[#0A1128]" : "text-white",
                )}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                if (openModal) {
                  openModal();
                } else {
                  const pricing = document.getElementById("precos");
                  pricing?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 bg-[#6C5CE7] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#5B4FCF] transition-colors"
            >
              Descubra agora
              <UserSearch size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-[#0A1128]" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-[#0A1128]" : "text-white"} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <Image
                  src={logo}
                  alt="Tigra Branco"
                  height={32}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-800 font-medium transition-colors"
                  >
                    {link.label}
                    <ArrowRight size={16} className="text-gray-400" />
                  </a>
                ))}
                <a
                  href="#duvidas-comuns"
                  onClick={(e) => handleSmoothScroll(e, "duvidas-comuns")}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-800 font-medium transition-colors"
                >
                  Dúvidas comuns
                  <ArrowRight size={16} className="text-gray-400" />
                </a>
              </div>

              <div className="p-6 border-t border-gray-100 space-y-4">
                <a
                  href="https://www.instagram.com/usezapcheck/"
                  target="_blank"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#E1306C] transition-colors"
                >
                  <Instagram size={24} />
                  <span className="font-medium">Siga-nos no Instagram</span>
                </a>

                <button
                  onClick={() => {
                    if (openModal) openModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#6C5CE7] text-white py-3.5 rounded-full font-medium hover:bg-[#5B4FCF] transition-colors"
                >
                  Descubra agora
                  <UserSearch size={20} />
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  © {new Date().getFullYear()} ZapCheck. Todos os direitos
                  reservados.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
