"use client";

import { useEffect, type ChangeEvent } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import styles from "./contact-drawer.module.scss";

const EMAILJS_SERVICE_ID = "service_7lr3xzs";
const EMAILJS_TEMPLATE_ID = "template_it8ycs4";
const EMAILJS_PUBLIC_KEY = "L1YskZ0ctigZ8BuJI";
const WHATSAPP_PHONE_NUMBER = "5511914924000";

const marketExperienceMap: Record<string, string> = {
  yes: "Sim",
  no: "Não",
};

const operationStageMap: Record<string, string> = {
  from_zero: "Quero iniciar do zero",
  active: "Já possuo operação em andamento",
};

const investmentRangeMap: Record<string, string> = {
  "50k-100k": "R$ 50 mil a R$ 100 mil",
  "100k-500k": "R$ 100 mil a R$ 500 mil",
  "above-500k": "Acima de R$ 500 mil",
};

const solutionMap: Record<string, string> = {
  complete_package: "Pacote completo",
  system_only: "Somente o sistema",
};

const primaryGoalMap: Record<string, string> = {
  build_operation: "Estruturar minha operação",
  scale_operation: "Escalar uma operação existente",
  understand_market: "Entender melhor o mercado",
  seek_technology: "Buscar tecnologia para operar",
};

const capitalSourceMap: Record<string, string> = {
  own: "Capital próprio",
  investors: "Investidores",
  both: "Ambos",
};

const timelineMap: Record<string, string> = {
  immediate: "Imediatamente",
  "30_days": "Próximos 30 dias",
  researching: "Apenas pesquisando o mercado",
};

const validationSchema = yup.object({
  marketExperience: yup.string().required("Selecione uma opção"),
  operationStage: yup.string().required("Selecione uma opção"),
  solution: yup.string().required("Selecione uma opção"),
  investmentRange: yup.string().required("Selecione uma faixa"),
  primaryGoal: yup.string().required("Selecione uma opção"),
  capitalSource: yup.string().required("Selecione uma opção"),
  timeline: yup.string().required("Selecione uma opção"),
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
  company: yup.string().optional().max(100, "Máximo de 100 caracteres"),
});

interface FormData {
  marketExperience: string;
  operationStage: string;
  solution: string;
  investmentRange: string;
  primaryGoal: string;
  capitalSource: string;
  timeline: string;
  name: string;
  phone: string;
  company?: string;
}

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function buildWhatsappLink(data: FormData) {
  const message = encodeURIComponent(
    `Olá! Acabei de preencher o pré-diagnóstico pelo site da Tigre Branco.

Nome: ${data.name}
WhatsApp: ${data.phone}
Empresa/operação: ${data.company || "Não informado"}
Atua no mercado: ${marketExperienceMap[data.marketExperience] ?? data.marketExperience}
Estágio atual: ${operationStageMap[data.operationStage] ?? data.operationStage}
Investimento: ${investmentRangeMap[data.investmentRange] ?? data.investmentRange}
Busca agora: ${solutionMap[data.solution] ?? data.solution}
Objetivo principal: ${primaryGoalMap[data.primaryGoal] ?? data.primaryGoal}
Capital para operar: ${capitalSourceMap[data.capitalSource] ?? data.capitalSource}
Prazo para iniciar: ${timelineMap[data.timeline] ?? data.timeline}`,
  );

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
}

export function Contact({ isOpen, onClose }: ContactDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
    mode: "onBlur",
  });

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      }

      return numbers
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return value;
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(event.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    const whatsappLink = buildWhatsappLink(data);
    const templateParams = {
      responsible_name: data.name,
      phone: data.phone,
      company_name: data.company || "Não informado",
      market_experience:
        marketExperienceMap[data.marketExperience] ?? data.marketExperience,
      operation_stage: operationStageMap[data.operationStage] ?? data.operationStage,
      investment_range:
        investmentRangeMap[data.investmentRange] ?? data.investmentRange,
      solution_interest: solutionMap[data.solution] ?? data.solution,
      primary_goal: primaryGoalMap[data.primaryGoal] ?? data.primaryGoal,
      capital_source: capitalSourceMap[data.capitalSource] ?? data.capitalSource,
      timeline: timelineMap[data.timeline] ?? data.timeline,
      to_email: "antoniotigrebranco@gmail.com",
      email: "antoniotigrebranco@gmail.com",
      reply_to: "antoniotigrebranco@gmail.com",
    };

    void emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .catch((error: unknown) => {
        console.error("Erro ao enviar formulário:", error);
      });

    reset();
    onClose();
    window.location.assign(whatsappLink);
  };

  return (
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
                  <h2 className={styles.title}>Pré-diagnóstico da operação</h2>
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
                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Você já atua no mercado factoring, securitizadora ou fomento comercial?
                  </label>
                  <select
                    {...register("marketExperience")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.marketExperience ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(marketExperienceMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.marketExperience && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.marketExperience.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Hoje você pretende iniciar do zero ou já possui operação em andamento?
                  </label>
                  <select
                    {...register("operationStage")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.operationStage ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(operationStageMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.operationStage && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.operationStage.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Qual faixa de investimento você separou para estruturar sua operação?
                  </label>
                  <select
                    {...register("investmentRange")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.investmentRange ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma faixa</option>
                    {Object.entries(investmentRangeMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.investmentRange && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.investmentRange.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>O que você busca nesse momento?</label>
                  <select
                    {...register("solution")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.solution ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(solutionMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.solution && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.solution.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Qual seu principal objetivo entrando nesse mercado?
                  </label>
                  <select
                    {...register("primaryGoal")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.primaryGoal ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(primaryGoalMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.primaryGoal && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.primaryGoal.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Você pretende operar com capital próprio, investidores ou ambos?
                  </label>
                  <select
                    {...register("capitalSource")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.capitalSource ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(capitalSourceMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.capitalSource && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.capitalSource.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>Você pretende iniciar em quanto tempo?</label>
                  <select
                    {...register("timeline")}
                    className={`${styles["form-control"]} ${styles.select} ${
                      errors.timeline ? styles.error : ""
                    }`}
                  >
                    <option value="">Selecione uma opção</option>
                    {Object.entries(timelineMap).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.timeline && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.timeline.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>Nome completo</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`${styles["form-control"]} ${errors.name ? styles.error : ""}`}
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

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>WhatsApp</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    {...register("phone")}
                    className={`${styles["form-control"]} ${errors.phone ? styles.error : ""}`}
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

                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Empresa ou operação <span className={styles.optional}>(opcional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("company")}
                    className={`${styles["form-control"]} ${errors.company ? styles.error : ""}`}
                    placeholder="Nome da empresa ou operação"
                    maxLength={100}
                  />
                  {errors.company && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.company.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles["submit-button"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Simular agora"}
                </button>
              </form>

              <footer className={styles.footer}>
                <p>
                  Ao enviar, você concorda com nossa{" "}
                  <a href="/politica-privacidade">Política de Privacidade</a>. Este
                  diagnóstico será usado para qualificar seu perfil e direcionar o próximo
                  contato.
                </p>
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
