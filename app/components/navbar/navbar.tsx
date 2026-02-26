"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/app/components/form";
import { IMAGES } from "@/app/assets/images";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./navbar.module.scss";

interface NavbarProps {
  forceScrolled?: boolean;
  onOpenContact?: () => void;
}

export function Navbar({ forceScrolled = false, onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (forceScrolled) {
      return;
    }

    const handleScroll = () => {
      // Detecta quando saiu do header (assumindo que o header tem aproximadamente 100vh)
      const headerHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > headerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const whatsappLink =
    "https://wa.me/5511914924000?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20da%20Tigre%20Branco%20e%20gostaria%20de%20receber%20assist%C3%AAncia%20de%20um%20especialista.";

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSimulateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    }
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    handleSmoothScroll(sectionId);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo and Navigation Links - Left Side */}
        <div className={styles.leftSection}>
          <div 
            className={styles.logo}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={isScrolled ? IMAGES.LOGO_PRETO : IMAGES.LOGO}
              alt="Tigre Branco Pay"
              width={isScrolled ? 200 : 320}
              height={isScrolled ? 48 : 88}
              className={styles.logoImage}
            />
          </div>

          {/* Navigation Links - Desktop */}
          <div className={styles.navLinks}>
            <span
              className={styles.navLink}
              onClick={() => handleSmoothScroll("workflow")}
            >
              Como funciona
            </span>
            <span
              className={styles.navLink}
              onClick={() => handleSmoothScroll("solucoes")}
            >
              Soluções
            </span>
          </div>
        </div>

        {/* Actions - Right Side */}
        <div className={styles.actions}>
          <Button
            variant={isScrolled ? "primary" : "white"}
            label="Simular agora"
            onClick={handleSimulateClick}
            size="md"
            className={styles.desktopButton}
          />
          <Button
            variant={isScrolled ? "secondary" : "outlineWhite"}
            label="Falar com especialista"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            className={styles.desktopButton}
          />

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileMenuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 400, mass: 0.5 }}
            >
              <div className={styles.mobileMenuContent}>
                <div className={styles.mobileMenuHeader}>
                  <span
                    className={styles.mobileNavLinkTop}
                    onClick={() => handleNavClick("workflow")}
                  >
                    Como funciona
                  </span>
                  <button
                    className={styles.mobileMenuClose}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Fechar menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className={styles.mobileNavLinks}>
                  <span
                    className={styles.mobileNavLink}
                    onClick={() => handleNavClick("solucoes")}
                  >
                    Soluções
                  </span>
                </div>
                <div className={styles.mobileActions}>
                  <Button
                    variant={isScrolled ? "primary" : "primary"}
                    label="Simular agora"
                    onClick={handleSimulateClick}
                    size="md"
                    width={{ base: "100%" }}
                  />
                  <Button
                    variant={isScrolled ? "secondary" : "secondary"}
                    label="Falar com especialista"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    width={{ base: "100%" }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

