import Calculadoras from "@/app/pages/calculadoras/calculadoras";

export const metadata = {
  title: "Calculadoras CCB · Tigre Branco Pay",
  description:
    "Central de calculadoras CCB para liquidacao antecipada, saldo devedor e memoria de calculo de execucao.",
};

export default function Page() {
  return <Calculadoras initialTab="liquidacao" />;
}
