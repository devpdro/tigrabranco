import Calculadoras from "@/app/pages/calculadoras/calculadoras";

export const metadata = {
  title: "Calculadora CCB · Tigre Branco Pay",
  description:
    "Calcule debito atualizado para execucao de CCB com correcao, juros, mora, multa, honorarios e custas.",
};

export default function Page() {
  return <Calculadoras initialTab="execucao" />;
}
