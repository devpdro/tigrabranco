"use client";

import { type ChangeEvent, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  FileText,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import {
  calcularExecucao,
  fmtBRL,
  fmtDateBR,
  novaParcela,
  parcelaFromParsed,
  parseCCBExecucao,
  todayISO,
  validateExecucao,
  type DadosCcbExecucao,
  type LinhaResultado,
  type NegociacaoExecucao,
  type ParcelaExecucao,
  type ParamsExecucao,
  type StatusParcela,
} from "./utils";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import styles from "./calculadora-execucao-ccb.module.scss";

type PdfJsTextItem = { str: string; transform?: number[] };
type PdfJsTextContent = { items: PdfJsTextItem[] };
type PdfJsPage = { getTextContent: () => Promise<PdfJsTextContent> };
type PdfJsDocument = { numPages: number; getPage: (n: number) => Promise<PdfJsPage> };
type PdfJsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<PdfJsDocument> };
};

const initialDados: DadosCcbExecucao = {
  numeroCCB: "",
  credor: "",
  devedorNome: "",
  devedorCPF: "",
  taxaJurosAM: "",
};

const initialParams = (): ParamsExecucao => ({
  dataBase: todayISO(),
  vencAntecipado: todayISO(),
  taxaMora: "1.00",
  multa: "2.00",
  honorarios: "10.00",
  custasPct: "2.00",
  ufesp: "38.42",
  custasPiso: "5",
  custasTeto: "3000",
  taxaIntimacao: "32.15",
});

const initialNegociacao: NegociacaoExecucao = {
  ativa: false,
  substitui: false,
  valor: "",
  dataAcordo: "",
  status: "nao_pago",
  dataPagamento: "",
  valorPago: "",
};

export function CalculadoraExecucaoCcb() {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [dados, setDados] = useState<DadosCcbExecucao>(initialDados);
  const [params, setParams] = useState<ParamsExecucao>(initialParams);
  const [parcelas, setParcelas] = useState<ParcelaExecucao[]>([novaParcela(1)]);
  const [negociacao, setNegociacao] = useState<NegociacaoExecucao>(initialNegociacao);
  const [rawText, setRawText] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "err" | "load"; msg: string }>({
    kind: "idle",
    msg: "",
  });
  const [erro, setErro] = useState("");
  const [calculado, setCalculado] = useState(false);

  const resultado = useMemo(
    () => calcularExecucao(parcelas, negociacao, dados, params),
    [parcelas, negociacao, dados, params],
  );

  const updateDados = (field: keyof DadosCcbExecucao, value: string) => {
    setDados((current) => ({ ...current, [field]: value }));
    setCalculado(false);
  };

  const updateParams = (field: keyof ParamsExecucao, value: string) => {
    setParams((current) => ({ ...current, [field]: value }));
    setCalculado(false);
  };

  const updateNegociacao = <K extends keyof NegociacaoExecucao>(
    field: K,
    value: NegociacaoExecucao[K],
  ) => {
    setNegociacao((current) => ({ ...current, [field]: value }));
    setCalculado(false);
  };

  const updateParcela = <K extends keyof ParcelaExecucao>(
    id: string,
    field: K,
    value: ParcelaExecucao[K],
  ) => {
    setParcelas((current) =>
      current.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
    setCalculado(false);
  };

  const handleAddParcela = () => {
    setParcelas((current) => [...current, novaParcela(current.length + 1)]);
    setCalculado(false);
  };

  const handleRemoveParcela = (id: string) => {
    setParcelas((current) =>
      current.filter((p) => p.id !== id).map((p, index) => ({ ...p, n: index + 1 })),
    );
    setCalculado(false);
  };

  const handleReset = () => {
    setDados(initialDados);
    setParams(initialParams());
    setParcelas([novaParcela(1)]);
    setNegociacao(initialNegociacao);
    setRawText("");
    setStatus({ kind: "idle", msg: "" });
    setErro("");
    setCalculado(false);
  };

  const handleCalculate = () => {
    const validation = validateExecucao(parcelas, negociacao);
    if (validation) {
      setErro(validation);
      setCalculado(false);
      return;
    }
    setErro("");
    setCalculado(true);
    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus({ kind: "load", msg: `Lendo ${file.name}...` });
    setErro("");

    try {
      await loadPdfJs();
      const text = await extractPdfText(file);
      const parsed = parseCCBExecucao(text);
      setRawText(text);
      setDados({
        numeroCCB: parsed.numeroCCB ?? "",
        credor: parsed.credor ?? "",
        devedorNome: parsed.devedorNome ?? "",
        devedorCPF: parsed.devedorCPF ?? "",
        taxaJurosAM: parsed.taxaJurosAM ?? "",
      });
      setParcelas(
        parsed.parcelas.length
          ? parsed.parcelas.map(parcelaFromParsed)
          : [novaParcela(1)],
      );
      setStatus({
        kind: parsed.formato ? "ok" : "err",
        msg: parsed.formato
          ? `CCB reconhecida: ${parsed.formato === "BMP" ? "BMP" : "Via Capital"} · ${
              parsed.parcelas.length
            } parcela(s) importada(s)`
          : parsed.warnings[0],
      });
      setCalculado(false);
    } catch {
      setStatus({
        kind: "err",
        msg: "Nao consegui ler este PDF. Voce ainda pode preencher os dados manualmente.",
      });
    } finally {
      e.target.value = "";
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          <FileText size={13} strokeWidth={2.2} />
          Memoria de calculo CCB
        </span>
        <h1>
          <AnimatedText
            text="Calculo de debito atualizado"
            strokeColor="#02a657"
            strokeWidth={4}
            underlinePath="M 0,10 Q 60,22 120,10 Q 180,-2 240,10"
            underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
            underlineDuration={1.5}
          />{" "}
          <em>para execucao</em>
        </h1>
        <p>
          Importe a CCB, revise parcelas e pagamentos, ajuste encargos e gere a
          memoria com correcao, juros, mora, multa, honorarios, custas e taxa de
          intimacao.
        </p>
      </div>

      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <span>01</span>
          <div>
            <h2>Anexar e revisar a CCB</h2>
            <p>Leitura automatica dos modelos BMP e Via Capital, com campos editaveis.</p>
          </div>
        </div>

        <label className={styles.dropzone} htmlFor="execucao-file-input">
          <Upload size={22} strokeWidth={2.1} />
          <span>
            <b>Importar CCB em PDF</b>
            <small>Ou preencha tudo manualmente abaixo.</small>
          </span>
          <input id="execucao-file-input" type="file" accept="application/pdf" onChange={handleImport} />
        </label>

        {status.msg && (
          <div className={`${styles.status} ${styles[status.kind]}`}>
            {status.kind === "ok" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            {status.msg}
          </div>
        )}

        <div className={styles.grid}>
          <Field label="Numero da CCB" value={dados.numeroCCB} onChange={(v) => updateDados("numeroCCB", v)} />
          <Field label="Credor" value={dados.credor} onChange={(v) => updateDados("credor", v)} />
          <Field label="Devedor" value={dados.devedorNome} onChange={(v) => updateDados("devedorNome", v)} />
          <Field label="CPF do devedor" value={dados.devedorCPF} onChange={(v) => updateDados("devedorCPF", v)} />
          <Field
            label="Juros remuneratorios"
            hint="% a.m."
            type="number"
            step="0.01"
            value={dados.taxaJurosAM}
            onChange={(v) => updateDados("taxaJurosAM", v)}
          />
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <span>02</span>
          <div>
            <h2>Parcelas e pagamentos</h2>
            <p>Marque parcelas quitadas ou pagamentos parciais quando houver.</p>
          </div>
        </div>

        <div className={styles.parcelaList}>
          {parcelas.map((parcela, index) => (
            <div key={parcela.id} className={styles.parcelaRow}>
              <div className={styles.parcelaBadge}>{String(index + 1).padStart(2, "0")}</div>
              <Field
                label="Vencimento"
                type="date"
                value={parcela.vencISO}
                onChange={(v) => updateParcela(parcela.id, "vencISO", v)}
              />
              <Field
                label="Valor"
                type="number"
                step="0.01"
                value={parcela.valor}
                onChange={(v) => updateParcela(parcela.id, "valor", v)}
              />
              <SelectField
                label="Status"
                value={parcela.status}
                onChange={(v) => updateParcela(parcela.id, "status", v)}
              />
              <button
                className={styles.iconButton}
                type="button"
                aria-label="Remover parcela"
                onClick={() => handleRemoveParcela(parcela.id)}
                disabled={parcelas.length === 1}
              >
                <Trash2 size={16} />
              </button>
              {parcela.status !== "nao_pago" && (
                <div className={styles.paymentFields}>
                  {parcela.status === "parcial" && (
                    <Field
                      label="Valor pago"
                      type="number"
                      step="0.01"
                      value={parcela.valorPago}
                      onChange={(v) => updateParcela(parcela.id, "valorPago", v)}
                    />
                  )}
                  <Field
                    label="Data do pagamento"
                    type="date"
                    value={parcela.dataPagamento}
                    onChange={(v) => updateParcela(parcela.id, "dataPagamento", v)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="button" className={styles.secondaryButton} onClick={handleAddParcela}>
          <Plus size={15} />
          Adicionar parcela
        </button>
      </div>

      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <span>03</span>
          <div>
            <h2>Parametros do calculo</h2>
            <p>Encargos e custos estimados para memoria de execucao.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <Field label="Data-base" type="date" value={params.dataBase} onChange={(v) => updateParams("dataBase", v)} />
          <Field
            label="Vencimento antecipado"
            type="date"
            value={params.vencAntecipado}
            onChange={(v) => updateParams("vencAntecipado", v)}
          />
          <Field label="Juros de mora" hint="% a.m." type="number" step="0.01" value={params.taxaMora} onChange={(v) => updateParams("taxaMora", v)} />
          <Field label="Multa contratual" hint="%" type="number" step="0.01" value={params.multa} onChange={(v) => updateParams("multa", v)} />
          <Field label="Honorarios" hint="%" type="number" step="0.01" value={params.honorarios} onChange={(v) => updateParams("honorarios", v)} />
          <Field label="Custas" hint="%" type="number" step="0.01" value={params.custasPct} onChange={(v) => updateParams("custasPct", v)} />
          <Field label="UFESP" type="number" step="0.01" value={params.ufesp} onChange={(v) => updateParams("ufesp", v)} />
          <Field label="Piso custas" hint="UFESP" type="number" value={params.custasPiso} onChange={(v) => updateParams("custasPiso", v)} />
          <Field label="Teto custas" hint="UFESP" type="number" value={params.custasTeto} onChange={(v) => updateParams("custasTeto", v)} />
          <Field label="Taxa intimacao" type="number" step="0.01" value={params.taxaIntimacao} onChange={(v) => updateParams("taxaIntimacao", v)} />
        </div>

        <div className={styles.negPanel}>
          <label className={styles.checkboxLine}>
            <input
              type="checkbox"
              checked={negociacao.ativa}
              onChange={(e) => updateNegociacao("ativa", e.target.checked)}
            />
            <span>Houve negociacao ou acordo sobre este debito</span>
          </label>

          {negociacao.ativa && (
            <div className={styles.negBody}>
              <Field label="Valor negociado" type="number" step="0.01" value={negociacao.valor} onChange={(v) => updateNegociacao("valor", v)} />
              <Field label="Data do acordo" type="date" value={negociacao.dataAcordo} onChange={(v) => updateNegociacao("dataAcordo", v)} />
              <SelectField label="Status do acordo" value={negociacao.status} onChange={(v) => updateNegociacao("status", v)} />
              {negociacao.status !== "nao_pago" && (
                <>
                  {negociacao.status === "parcial" && (
                    <Field label="Valor pago" type="number" step="0.01" value={negociacao.valorPago} onChange={(v) => updateNegociacao("valorPago", v)} />
                  )}
                  <Field label="Data do pagamento" type="date" value={negociacao.dataPagamento} onChange={(v) => updateNegociacao("dataPagamento", v)} />
                </>
              )}
              <label className={styles.checkboxLine}>
                <input
                  type="checkbox"
                  checked={negociacao.substitui}
                  onChange={(e) => updateNegociacao("substitui", e.target.checked)}
                />
                <span>A negociacao substitui o calculo das parcelas originais</span>
              </label>
            </div>
          )}
        </div>

        {erro && <div className={`${styles.status} ${styles.err}`}>{erro}</div>}

        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={handleCalculate}>
            <Calculator size={16} />
            Calcular execucao
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleReset}>
            <RotateCcw size={15} />
            Zerar dados
          </button>
        </div>
      </div>

      <div ref={resultRef} className={`${styles.stage} ${styles.resultStage}`}>
        <div className={styles.stageHead}>
          <span>04</span>
          <div>
            <h2>Memoria de calculo</h2>
            <p>{calculado ? "Resultado atualizado com os parametros informados." : "Calcule para validar o resultado."}</p>
          </div>
        </div>

        <div className={styles.summary}>
          <SummaryItem label="Debito atualizado" value={fmtBRL(resultado.totalAtualizado)} />
          <SummaryItem label="Honorarios estimados" value={fmtBRL(resultado.honorarios)} />
          <SummaryItem label="Custas de distribuicao" value={fmtBRL(resultado.custas)} />
          <SummaryItem label="Taxa de intimacao" value={fmtBRL(resultado.taxaIntimacao)} />
          <div className={styles.summaryTotal}>
            <span>Valor total para execucao</span>
            <strong>{fmtBRL(resultado.totalExecucao)}</strong>
          </div>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Parc.</th>
                <th>Venc.</th>
                <th>Dias</th>
                <th>Corrigido</th>
                <th>Juros rem.</th>
                <th>Mora</th>
                <th>Multa</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {[...resultado.linhas, ...(resultado.negocLinha ? [resultado.negocLinha] : [])].map(
                (linha) => (
                  <ResultadoRow key={`${linha.parcela}-${fmtDateBR(linha.vencimentoOriginal)}`} linha={linha} />
                ),
              )}
            </tbody>
          </table>
        </div>

        <p className={styles.note}>
          Metodologia: correcao monetaria pelo IPCA da base original, juros
          remuneratorios pro-rata, mora simples, multa unica e abatimento de
          pagamentos parciais antes do saldo remanescente.
        </p>

        {rawText && (
          <details className={styles.raw}>
            <summary>Ver texto extraido do PDF</summary>
            <pre>{rawText}</pre>
          </details>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  type = "text",
  step,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <label className={styles.field}>
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      <input type={type} step={step} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: StatusParcela;
  onChange: (value: StatusParcela) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as StatusParcela)}>
        <option value="nao_pago">Nao pago</option>
        <option value="parcial">Pago parcialmente</option>
        <option value="integral">Pago integralmente</option>
      </select>
    </label>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.summaryItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ResultadoRow({ linha }: { linha: LinhaResultado }) {
  return (
    <tr>
      <td>
        <b>{linha.parcela}</b>
        {linha.status !== "nao_pago" && <small>{statusLabel(linha.status)}</small>}
      </td>
      <td>{fmtDateBR(linha.vencimentoOriginal)}</td>
      <td>{linha.diasAtraso}</td>
      <td>{fmtBRL(linha.valorCorrigido)}</td>
      <td>{fmtBRL(linha.jurosRemuneratorios)}</td>
      <td>{fmtBRL(linha.jurosMora)}</td>
      <td>{fmtBRL(linha.multa)}</td>
      <td>
        <b>{fmtBRL(linha.total)}</b>
      </td>
    </tr>
  );
}

const statusLabel = (status: LinhaResultado["status"]) =>
  ({
    parcial: "Parcial",
    integral: "Quitada",
    "parcial-quitada": "Quitada",
    nao_pago: "",
  })[status];

const PDFJS_SCRIPT_ID = "pdfjs-script";

async function loadPdfJs(): Promise<void> {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(PDFJS_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise<void>((resolve) => {
      if ((window as unknown as { pdfjsLib?: PdfJsLib }).pdfjsLib) resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
    });
  }
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.id = PDFJS_SCRIPT_ID;
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("pdfjs load failed"));
    document.head.appendChild(s);
  });
  const worker = document.createElement("script");
  worker.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  document.head.appendChild(worker);
  (window as unknown as { pdfjsLib: PdfJsLib }).pdfjsLib.GlobalWorkerOptions.workerSrc =
    worker.src;
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjsLib = (window as unknown as { pdfjsLib: PdfJsLib }).pdfjsLib;
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let fullText = "";

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const items = content.items
      .filter((item) => item.str && item.str.trim().length > 0)
      .map((item) => ({
        str: item.str,
        x: item.transform?.[4] ?? 0,
        y: item.transform?.[5] ?? 0,
      }))
      .sort((a, b) => b.y - a.y || a.x - b.x);

    const lines: Array<typeof items> = [];
    let current: typeof items = [];
    let currentY: number | null = null;

    for (const item of items) {
      if (currentY === null || Math.abs(item.y - currentY) <= 3) {
        current.push(item);
        currentY ??= item.y;
      } else {
        lines.push(current);
        current = [item];
        currentY = item.y;
      }
    }
    if (current.length) lines.push(current);

    for (const line of lines) {
      fullText += `${line
        .sort((a, b) => a.x - b.x)
        .map((item) => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()}\n`;
    }
  }

  return fullText;
}
