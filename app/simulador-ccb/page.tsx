import { SimuladorCcb } from "@/app/pages";

export const metadata = {
  title: "Simulador de Liquidação CCB · Tigre Branco Pay",
  description:
    "Importe sua CCB em PDF ou preencha os dados da operação para simular liquidação antecipada, saldo devedor e antecipação de parcelas com a precisão do Sistema Price.",
};

export default function Page() {
  return <SimuladorCcb />;
}
