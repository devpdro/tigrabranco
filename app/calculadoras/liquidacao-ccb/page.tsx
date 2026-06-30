import Calculadoras from "@/app/pages/calculadoras/calculadoras";

export const metadata = {
  title: "Liquidacao CCB · Tigre Branco Pay",
  description:
    "Simule liquidacao antecipada, saldo devedor e antecipacao de parcelas de uma CCB.",
};

export default function Page() {
  return <Calculadoras initialTab="liquidacao" />;
}
