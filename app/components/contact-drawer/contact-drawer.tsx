"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./contact-drawer.module.scss";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => setIsVisible(true), 0);
      document.body.style.overflow = "hidden";
    } else {
      timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h2>Contato Comercial</h2>
            <button
              className={styles["close-button"]}
              onClick={onClose}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </header>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className={styles["form-control"]}
              placeholder="Nome"
              required
            />

            <input
              type="text"
              className={styles["form-control"]}
              placeholder="Sobrenome / Cargo"
            />

            <input
              type="text"
              className={styles["form-control"]}
              placeholder="Empresa"
            />

            <div className={styles["select-wrapper"]}>
              <select
                className={`${styles["form-control"]} ${styles.select}`}
                defaultValue=""
              >
                <option value="" disabled>
                  Setor
                </option>
                <option value="imobiliario">Imobiliário</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="varejo">Varejo</option>
                <option value="servicos">Serviços</option>
                <option value="financeiro">Financeiro</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <input
              type="tel"
              className={styles["form-control"]}
              placeholder="Telefone"
            />

            <input
              type="email"
              className={styles["form-control"]}
              placeholder="E-mail"
              required
            />

            <textarea
              className={`${styles["form-control"]} ${styles.textarea}`}
              placeholder="Comentários que podem auxiliar a conversa (opcional)"
            />

            <button type="submit" className={styles["submit-button"]}>
              Enviar
            </button>
          </form>

          <footer className={styles.footer}>
            <p>
              Declaro que conheço a <a href="#">Política de Privacidade</a> e
              autorizo a utilização das minhas informações pela Opea.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
