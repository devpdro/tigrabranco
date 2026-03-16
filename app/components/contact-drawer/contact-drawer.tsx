"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import styles from "./contact-drawer.module.scss";

const EMAILJS_SERVICE_ID = "service_7lr3xzs";
const EMAILJS_TEMPLATE_ID = "template_it8ycs4";
const EMAILJS_PUBLIC_KEY = "L1YskZ0ctigZ8BuJI";

const interestMap: Record<string, string> = {
  platform: "Plataforma Tigre Branco Pay",
  mentoring: "Mentoria Tigre Branco",
  secaas: "SECaaS – Securitizadora as a Service",
  partnership: "Parceria Comercial",
  other: "Outro",
};

const profileMap: Record<string, string> = {
  correspondent: "Correspondente Bancário",
  originator: "Originador de Crédito",
  fintech: "Fintech / Factoring",
  securitizer: "Securitizadora",
  investor: "Investidor",
  entrepreneur: "Empresário / Empreendedor",
  other: "Outro",
};

const volumeMap: Record<string, string> = {
  none: "Ainda não opero",
  "up-to-100k": "Até R$ 100K/mês",
  "100k-500k": "R$ 100K a R$ 500K/mês",
  "500k-2m": "R$ 500K a R$ 2M/mês",
  "above-2m": "Acima de R$ 2M/mês",
};

const validationSchema = yup.object({
  interest: yup.string().required("Selecione o seu interesse"),
  profile: yup.string().required("Selecione o seu perfil"),
  name: yup
    .string()
    .required("Informe o seu nome")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(80, "Nome deve ter no máximo 80 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  phone: yup
    .string()
    .required("Informe o seu WhatsApp")
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Número inválido"),
  company: yup.string().max(100, "Máximo de 100 caracteres"),
  volume: yup.string().required("Selecione o volume aproximado"),
});

type FormData = yup.InferType<typeof validationSchema>;

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactDrawerProps) {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        return numbers
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2");
      }
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const templateParams = {
        interest: interestMap[data.interest] ?? data.interest,
        profile: profileMap[data.profile] ?? data.profile,
        responsible_name: data.name,
        phone: data.phone,
        company_name: data.company || "Não informado",
        volume: volumeMap[data.volume] ?? data.volume,
        to_email: "antoniotigrebranco@gmail.com",
        email: "antoniotigrebranco@gmail.com",
        reply_to: "antoniotigrebranco@gmail.com",
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      setFeedback({
        type: "success",
        message:
          "Recebemos seu contato. Nosso time vai analisar o seu perfil e entrar em contato pelo WhatsApp em até 1 dia útil.",
      });
      reset();
      onClose();
    } catch (error: unknown) {
      console.error("Erro ao enviar formulário:", error);
      setFeedback({
        type: "error",
        message:
          "Não foi possível enviar agora. Tente novamente ou fale diretamente pelo WhatsApp.",
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={onClose}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            <motion.div
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 400,
                mass: 0.5,
              }}
            >
              <div className={styles.content}>
                <header className={styles.header}>
                  <div>
                    <h2 className={styles.title}>Falar com especialista</h2>
                    <p className={styles.subtitle}>
                      Preencha abaixo e retornamos em até 1 dia útil.
                    </p>
                  </div>
                  <button
                    className={styles["close-button"]}
                    onClick={onClose}
                    aria-label="Fechar"
                  >
                    <X size={24} />
                  </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  {/* Interesse */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>Qual é o seu interesse?</label>
                    <div className={styles["select-wrapper"]}>
                      <select
                        {...register("interest")}
                        className={`${styles["form-control"]} ${styles.select} ${
                          errors.interest ? styles.error : ""
                        }`}
                      >
                        <option value="">Selecione uma opção</option>
                        {Object.entries(interestMap).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.interest && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.interest.message}
                      </span>
                    )}
                  </div>

                  {/* Perfil */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>Qual é o seu perfil?</label>
                    <div className={styles["select-wrapper"]}>
                      <select
                        {...register("profile")}
                        className={`${styles["form-control"]} ${styles.select} ${
                          errors.profile ? styles.error : ""
                        }`}
                      >
                        <option value="">Selecione uma opção</option>
                        {Object.entries(profileMap).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.profile && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.profile.message}
                      </span>
                    )}
                  </div>

                  {/* Nome */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>Nome completo</label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`${styles["form-control"]} ${
                        errors.name ? styles.error : ""
                      }`}
                      placeholder="Seu nome"
                      maxLength={80}
                    />
                    {errors.name && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>WhatsApp</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      {...register("phone")}
                      className={`${styles["form-control"]} ${
                        errors.phone ? styles.error : ""
                      }`}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      onChange={handlePhoneChange}
                    />
                    {errors.phone && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Empresa (opcional) */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>
                      Empresa{" "}
                      <span className={styles.optional}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      {...register("company")}
                      className={`${styles["form-control"]} ${
                        errors.company ? styles.error : ""
                      }`}
                      placeholder="Nome da empresa"
                      maxLength={100}
                    />
                    {errors.company && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.company.message}
                      </span>
                    )}
                  </div>

                  {/* Volume */}
                  <div className={styles["input-wrapper"]}>
                    <label className={styles.label}>
                      Volume aproximado de crédito por mês
                    </label>
                    <div className={styles["select-wrapper"]}>
                      <select
                        {...register("volume")}
                        className={`${styles["form-control"]} ${styles.select} ${
                          errors.volume ? styles.error : ""
                        }`}
                      >
                        <option value="">Selecione uma faixa</option>
                        {Object.entries(volumeMap).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.volume && (
                      <span className={styles["error-message"]}>
                        <AlertCircle size={16} />
                        {errors.volume.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={styles["submit-button"]}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Quero falar com especialista"}
                  </button>
                </form>

                <footer className={styles.footer}>
                  <p>
                    Ao enviar, você concorda com nossa{" "}
                    <a href="/politica-privacidade">Política de Privacidade</a>.
                    Seus dados não serão compartilhados com terceiros.
                  </p>
                </footer>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <>
            <motion.div
              className={styles.overlay}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setFeedback(null)}
            />
            <motion.div
              className={styles.feedbackModal}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className={styles.feedbackCard}>
                <h3 className={styles.feedbackTitle}>
                  {feedback.type === "success"
                    ? "Mensagem enviada com sucesso"
                    : "Algo deu errado"}
                </h3>
                <p className={styles.feedbackMessage}>{feedback.message}</p>
                <button
                  type="button"
                  className={styles.feedbackButton}
                  onClick={() => setFeedback(null)}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
