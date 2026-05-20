"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/form";
import { IMAGES } from "@/app/assets/images";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./navbar.module.scss";

interface NavbarProps {
  forceScrolled?: boolean;
  onOpenContact?: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = true;
  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSectionNav = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      handleSmoothScroll(sectionId);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleSimulateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onOpenContact) {
      onOpenContact();
      return;
    }

    if (pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo and Navigation Links - Left Side */}
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <Image
              src={isScrolled ? IMAGES.LOGO_PRETO : IMAGES.LOGO}
              alt="Tigre Branco Pay"
              width={300}
              height={80}
              className={styles.logoImage}
              style={{ width: "160px", height: "auto" }}
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className={styles.navLinks}>
            <span
              className={styles.navLink}
              onClick={() => handleSectionNav("solucoes")}
            >
              Plataforma
            </span>
            <span
              className={styles.navLink}
              onClick={() => handleSectionNav("workflow")}
            >
              Como funciona
            </span>
            <Link href="/sobre-nos" className={styles.navLink}>
              A empresa
            </Link>
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
            onClick={handleSimulateClick}
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
                    onClick={() => handleSectionNav("solucoes")}
                  >
                    Plataforma
                  </span>
                  <span
                    className={styles.mobileNavLink}
                    onClick={() => handleSectionNav("workflow")}
                  >
                    Como funciona
                  </span>
                  <Link
                    href="/sobre-nos"
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    A empresa
                  </Link>
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
                    onClick={handleSimulateClick}
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
