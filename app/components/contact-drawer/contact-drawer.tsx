"use client";

import { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./contact-drawer.module.scss";

const financingTypeMap: Record<string, string> = {
  'receivables': 'Antecipação de Recebíveis',
  'contracts': 'Antecipação de Contratos',
  'capital-giro': 'Capital de Giro',
  'abertura-conta': 'Abertura de Conta',
  'conta-escrow': 'Conta Escrow',
  'custom': 'Estruturação Customizada'
};

const monthlyRevenueMap: Record<string, string> = {
  'up-to-100k': 'Até R$ 100K',
  '100k-500k': 'R$ 100K - R$ 500K',
  '500k-2m': 'R$ 500K - R$ 2M',
  '2m-10m': 'R$ 2M - R$ 10M',
  'above-10m': 'Acima de R$ 10M'
};

// Schema de validação
const validationSchema = yup.object({
  financingType: yup.string().required('Selecione o tipo de securitização'),
  amount: yup
    .string()
    .required('Informe o valor solicitado')
    .test('is-valid-amount', 'Valor inválido', (value) => {
      if (!value) return false;
      const numbers = value.replace(/\D/g, '');
      return numbers.length > 0 && parseFloat(numbers) >= 100; // Mínimo R$ 1,00
    }),
  companyName: yup
    .string()
    .required('Informe o nome da empresa')
    .min(5, 'Nome da empresa deve ter no mínimo 5 caracteres')
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres'),
  cnpj: yup
    .string()
    .required('Informe o CNPJ')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  responsibleName: yup
    .string()
    .required('Informe o nome do responsável')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  phone: yup
    .string()
    .required('Informe o telefone')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido'),
  monthlyRevenue: yup.string().required('Selecione o faturamento mensal'),
});

type FormData = yup.InferType<typeof validationSchema>;

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactDrawerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

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
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Máscara para CNPJ
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  // Máscara para telefone (XX) XXXXX-XXXX
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        return numbers
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        // Celular: (XX) XXXXX-XXXX
        return numbers
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
      }
    }
    return value;
  };

  // Máscara para valor monetário (formato simples: números apenas)
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers;
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setValue('cnpj', formatted, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = formatCurrency(e.target.value);
    // Formatar como R$ X.XXX,XX
    if (numbers.length > 0) {
      const number = parseFloat(numbers) / 100;
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      setValue('amount', formatted, { shouldValidate: true });
    } else {
      setValue('amount', '', { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Aqui você pode enviar os dados para sua API
      console.log('Form data:', data);
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Formulário enviado com sucesso!');
      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    }
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
                <h2 className={styles.title}>Solicitar Proposta</h2>
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
                  <div className={styles["select-wrapper"]}>
                    <select
                      {...register('financingType')}
                      className={`${styles["form-control"]} ${styles.select} ${errors.financingType ? styles.error : ''}`}
                    >
                      <option value="">Tipo de Securitização</option>
                      {Object.entries(financingTypeMap).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.financingType && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.financingType.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    {...register('amount')}
                    className={`${styles["form-control"]} ${errors.amount ? styles.error : ''}`}
                    placeholder="Valor Solicitado (R$)"
                    onChange={handleAmountChange}
                  />
                  {errors.amount && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.amount.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <input
                    type="text"
                    {...register('companyName')}
                    className={`${styles["form-control"]} ${errors.companyName ? styles.error : ''}`}
                    placeholder="Nome da Empresa"
                    maxLength={100}
                  />
                  {errors.companyName && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.companyName.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <input
                    type="text"
                    {...register('cnpj')}
                    className={`${styles["form-control"]} ${errors.cnpj ? styles.error : ''}`}
                    placeholder="CNPJ"
                    maxLength={18}
                    onChange={handleCNPJChange}
                  />
                  {errors.cnpj && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.cnpj.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <input
                    type="text"
                    {...register('responsibleName')}
                    className={`${styles["form-control"]} ${errors.responsibleName ? styles.error : ''}`}
                    placeholder="Nome do Responsável"
                    maxLength={50}
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                  />
                  {errors.responsibleName && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.responsibleName.message}
                    </span>
                  )}
                </div>

                <div className={styles["input-wrapper"]}>
                  <input
                    type="tel"
                    inputMode="tel"
                    {...register('phone')}
                    className={`${styles["form-control"]} ${errors.phone ? styles.error : ''}`}
                    placeholder="Telefone (XX) XXXXX-XXXX"
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
                  <div className={styles["select-wrapper"]}>
                    <select
                      {...register('monthlyRevenue')}
                      className={`${styles["form-control"]} ${styles.select} ${errors.monthlyRevenue ? styles.error : ''}`}
                    >
                      <option value="">Faturamento Mensal</option>
                      {Object.entries(monthlyRevenueMap).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.monthlyRevenue && (
                    <span className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.monthlyRevenue.message}
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className={styles["submit-button"]}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>

              <footer className={styles.footer}>
                <p>
                  Declaro que conheço a <a href="/politica-privacidade">Política de Privacidade</a> e
                  autorizo a utilização das minhas informações pelo Tigre Branco.
                </p>
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
