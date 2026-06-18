"use client";

import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Calculator,
  FileText,
  RotateCcw,
  Sparkles,
  TrendingDown,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  BRL,
  PISO_PCT,
  bigMoney,
  brlToNum,
  buildSchedule,
  calcQuitacao,
  dateBR2ISO,
  fmtDate,
  parseCCBText,
  parseDate,
  r2,
  taxaToNum,
  type ParsedCCB,
  type ScheduleRow,
} from "./utils";
import { AnimatedText } from "@/app/components/ui/animated-underline-text";
import styles from "./simulador-ccb.module.scss";

type ImportStatus = "" | "ok" | "err" | "load" | "dirty";

type PdfJsTextItem = { str: string };
type PdfJsTextContent = { items: PdfJsTextItem[] };
type PdfJsPage = {
  getTextContent: () => Promise<PdfJsTextContent>;
};
type PdfJsDocument = {
  numPages: number;
  getPage: (n: number) => Promise<PdfJsPage>;
};
type PdfJsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<PdfJsDocument> };
};

// ── shared animation primitives (matched to services-grid/process-timeline) ─
const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

// Container que escalona filhos (stagger). Use com <RevealItem> dentro.
const containerStagger = (stagger = 0.06, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Item individual que entra com fade + lift.
const itemRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// Item com lift um pouco maior (cards principais).
const cardRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Fade simples (sem lift) — bom para cabeçalhos.
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// RevealGroup escalona os filhos automaticamente. Funciona com motion.* aninhados
// que possuam variants "hidden"/"show".
function RevealGroup({
  children,
  stagger = 0.06,
  delayChildren = 0.05,
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const variants = containerStagger(stagger, delayChildren);
  if (as === "section") {
    return (
      <motion.section
        className={className}
        variants={variants}
        initial={"hidden" as const}
        whileInView={"show" as const}
        viewport={{ once: true, margin: "-80px" }}
      >
        {children}
      </motion.section>
    );
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={"hidden" as const}
      whileInView={"show" as const}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

const todayISO = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

export function SimuladorCcb() {

  // ── form state ─────────────────────────────────────────────────────
  const [pv, setPv] = useState("");
  const [taxa, setTaxa] = useState("");
  const [n, setN] = useState("");
  const [pmt, setPmt] = useState("");
  const [lib, setLib] = useState("");
  const [venc1, setVenc1] = useState("");
  const [iof, setIof] = useState("");
  const [liq, setLiq] = useState("");
  const [dataLiq, setDataLiq] = useState(todayISO());
  const [dataPick, setDataPick] = useState(todayISO());

  // ── derived state ──────────────────────────────────────────────────
  const [eyebrow, setEyebrow] = useState("Cédula de Crédito Bancário");
  const [docTag, setDocTag] = useState(
    "Importe uma CCB ou preencha os dados da operação abaixo.",
  );
  const [dirty, setDirty] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    msg: string;
    cls: ImportStatus;
  }>({ msg: "", cls: "" });

  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [rate, setRate] = useState(0);
  const [pvBase, setPvBase] = useState(0);
  const [calculated, setCalculated] = useState(false);

  // ── antecipação ───────────────────────────────────────────────────
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // ── calculations ──────────────────────────────────────────────────
  const q = useMemo(
    () => calcQuitacao(rows, rate, parseDate(dataLiq), pvBase),
    [rows, rate, dataLiq, pvBase],
  );

  const pickSummary = useMemo(() => {
    const D = parseDate(dataPick);
    let vp = 0;
    let nom = 0;
    for (const rw of rows) {
      if (selected.has(rw.k)) {
        nom += rw.parcela;
        const dias = (rw.venc.getTime() - D.getTime()) / 86400000;
        vp += dias > 0 ? rw.parcela / Math.pow(1 + rate, dias / 30) : rw.parcela;
      }
    }
    return { vp: r2(vp), nom: r2(nom), eco: r2(nom - r2(vp)) };
  }, [rows, selected, dataPick, rate]);

  // ── totals for amortization footer ────────────────────────────────
  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.j += r.juros;
        acc.a += r.amort;
        acc.p += r.parcela;
        return acc;
      },
      { j: 0, a: 0, p: 0 },
    );
  }, [rows]);

  // ── handlers ───────────────────────────────────────────────────────
  const updateField = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    if (calculated) setDirty(true);
  };

  const handleCalc = () => {
    const pvN = parseFloat(pv) || 0;
    const taxaN = parseFloat(taxa) || 0;
    const nN = Math.max(0, Math.floor(parseFloat(n) || 0));
    const pmtN = parseFloat(pmt) || 0;
    const rateN = taxaN / 100;
    setRate(rateN);
    setPvBase(pvN);

    if (pvN > 0 && nN > 0 && pmtN > 0 && venc1) {
      const newRows = buildSchedule(pvN, rateN, nN, pmtN, parseDate(venc1));
      setRows(newRows);
      // se o default (última) for inválido, limpa
      setSelected((prev) => {
        const filtered = new Set(
          [...prev].filter((k) => k <= newRows.length),
        );
        return filtered.size > 0 ? filtered : new Set([newRows.length]);
      });
    } else {
      setRows([]);
      setSelected(new Set());
    }
    setDirty(false);
    setCalculated(true);

    // rolar até o simulador
    const hero = document.getElementById("ccb-simulador-resultado");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReset = () => {
    setPv("");
    setTaxa("");
    setN("");
    setPmt("");
    setLib("");
    setVenc1("");
    setIof("");
    setLiq("");
    setRows([]);
    setSelected(new Set());
    setEyebrow("Cédula de Crédito Bancário");
    setDocTag("Importe uma CCB ou preencha os dados da operação abaixo.");
    setImportStatus({ msg: "", cls: "" });
    setDirty(false);
    setCalculated(false);
    setRate(0);
    setPvBase(0);
  };

  const applyCCB = (d: ParsedCCB) => {
    if (d.pv) setPv(String(brlToNum(d.pv)));
    if (d.taxa) setTaxa(String(taxaToNum(d.taxa)));
    if (d.n) setN(d.n);
    if (d.pmt) setPmt(String(brlToNum(d.pmt)));
    if (d.lib) setLib(dateBR2ISO(d.lib));
    if (d.venc1) setVenc1(dateBR2ISO(d.venc1));
    if (d.iof) setIof(String(brlToNum(d.iof)));
    if (d.liq) setLiq(String(brlToNum(d.liq)));
    if (d.ccb) setEyebrow(`Cédula de Crédito Bancário · Nº ${d.ccb}`);
    if (d.nome || d.cpf) {
      setDocTag(
        `EMITENTE: ${d.nome || "—"}${d.cpf ? ` · CPF ${d.cpf}` : ""} · CREDOR: Via Capital SCD S/A`,
      );
    }
    if (d.n) {
      const parsed = parseInt(d.n, 10);
      setSelected(new Set([parsed || 10]));
    }
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (typeof window === "undefined" || !("pdfjsLib" in window)) {
      // dynamic load fallback
      try {
        await loadPdfJs();
      } catch {
        setImportStatus({
          msg: "Leitor de PDF indisponível (sem internet?)",
          cls: "err",
        });
        return;
      }
    }

    setImportStatus({ msg: `Lendo ${file.name}…`, cls: "load" });

    try {
      const pdfjsLib = (window as unknown as { pdfjsLib: PdfJsLib }).pdfjsLib;
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let text = "";
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const tc = await page.getTextContent();
        text += " " + tc.items.map((i) => i.str).join(" ");
      }
      text = text.replace(/\s+/g, " ");

      const data = parseCCBText(text);
      const okFields = ["pv", "pmt", "n", "venc1", "taxa"].filter(
        (k) => data[k as keyof ParsedCCB],
      ).length;
      if (okFields < 3) throw new Error("campos não reconhecidos");

      applyCCB(data);
      setDirty(false);
      setCalculated(true);

      // recalcula após import
      setTimeout(() => {
        handleCalc();
      }, 0);

      const missing = ["pv", "taxa", "n", "pmt", "venc1", "iof", "lib"].filter(
        (k) => !data[k as keyof ParsedCCB],
      );
      setImportStatus({
        msg: missing.length
          ? `✓ Importada — confira: ${missing.join(", ")}`
          : "✓ CCB importada e calculada",
        cls: "ok",
      });
    } catch {
      setImportStatus({
        msg: "Não consegui ler esta CCB. Confira os campos manualmente.",
        cls: "err",
      });
    } finally {
      e.target.value = "";
    }
  };

  const toggleParcela = (k: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const handleQuick = (q: "last" | "last2" | "all" | "none") => {
    const n = rows.length;
    if (q === "last") setSelected(new Set([n]));
    else if (q === "last2")
      setSelected(new Set([n - 1, n].filter((x) => x >= 1)));
    else if (q === "all") setSelected(new Set(rows.map((r) => r.k)));
    else setSelected(new Set());
  };

  return (
    <section id="ccb-simulador" className={styles.section}>
      <div className={styles.container}>
        {/* ── Header da seção ─────────────────────────────── */}
        <motion.div
          className={styles.header}
          variants={containerStagger(0.08, 0)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.span variants={fadeIn} className={styles.eyebrow}>
            <Sparkles size={12} strokeWidth={2.2} />
            {eyebrow}
          </motion.span>
          <motion.h1 variants={fadeIn} className={styles.title}>
            <AnimatedText
              text="Liquidação antecipada"
              strokeColor="#02a657"
              strokeWidth={4}
              underlinePath="M 0,10 Q 60,0 120,10 Q 180,20 240,10"
              underlineHoverPath="M 0,10 Q 60,20 120,10 Q 180,0 240,10"
              underlineDuration={1.5}
            />{" "}
            <em>&amp; saldo devedor</em>
          </motion.h1>
          <motion.p variants={fadeIn} className={styles.subtitle}>
            Importe a CCB em PDF ou edite qualquer campo: a tabela recalcula
            sozinha o cronograma, o saldo devedor e o valor de quitação por
            valor presente — com redução proporcional dos juros, na forma da
            Cláusula 9 e do art. 52, §2º do CDC.
          </motion.p>
          <motion.p variants={fadeIn} className={styles.docTag}>
            {docTag}
          </motion.p>
        </motion.div>

        {/* ── 01 · Dados da operação ──────────────────────────── */}
        <motion.div
          className={styles.card}
          variants={cardRise}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <RevealGroup
            stagger={0.05}
            delayChildren={0.05}
            className={styles.cardHead}
          >
            <motion.span variants={fadeIn} className={styles.cardIdx}>
              01
            </motion.span>
            <motion.h2 variants={fadeIn} className={styles.cardTitle}>
              Dados da operação
            </motion.h2>
            <motion.span variants={fadeIn} className={styles.cardNote}>
              Preencha os campos e clique em Calcular
            </motion.span>
          </RevealGroup>

          <RevealGroup
            className={styles.grid}
            stagger={0.04}
            delayChildren={0.1}
          >
            <motion.div variants={itemRise}>
              <Field
                label="Valor financiado"
                hint="PV / Quadro II.1"
                id="pv"
                type="number"
                value={pv}
                onChange={updateField(setPv)}
                placeholder="0,00"
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Taxa de juros"
                hint="% ao mês"
                id="taxa"
                type="number"
                value={taxa}
                onChange={updateField(setTaxa)}
                placeholder="0,00"
                step="0.0001"
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Nº de parcelas"
                id="n"
                type="number"
                value={n}
                onChange={updateField(setN)}
                placeholder="0"
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Valor da parcela"
                hint="PMT contratado"
                id="pmt"
                type="number"
                value={pmt}
                onChange={updateField(setPmt)}
                placeholder="0,00"
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Data de liberação"
                id="lib"
                type="date"
                value={lib}
                onChange={updateField(setLib)}
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Venc. 1ª parcela"
                id="venc1"
                type="date"
                value={venc1}
                onChange={updateField(setVenc1)}
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="IOF"
                hint="informativo"
                id="iof"
                type="number"
                value={iof}
                onChange={updateField(setIof)}
                placeholder="0,00"
                readOnly
              />
            </motion.div>
            <motion.div variants={itemRise}>
              <Field
                label="Líquido entregue"
                hint="Quadro II.2"
                id="liq"
                type="number"
                value={liq}
                onChange={updateField(setLiq)}
                placeholder="0,00"
                readOnly
              />
            </motion.div>
          </RevealGroup>

          <RevealGroup
            className={styles.actions}
            stagger={0.05}
            delayChildren={0.1}
          >
            <motion.button
              type="button"
              variants={itemRise}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`${styles.btn} ${styles.btnCalc} ${
                dirty ? styles.dirty : ""
              }`}
              onClick={handleCalc}
            >
              <Calculator size={16} strokeWidth={2.2} />
              Calcular
            </motion.button>

            <motion.label
              variants={itemRise}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`${styles.btn} ${styles.btnImport}`}
              htmlFor="ccb-file-input"
            >
              <Upload size={16} strokeWidth={2.2} />
              Importar CCB
            </motion.label>
            <input
              id="ccb-file-input"
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleImport}
            />

            <motion.button
              type="button"
              variants={itemRise}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`${styles.btn} ${styles.btnReset}`}
              onClick={handleReset}
            >
              <RotateCcw size={15} strokeWidth={2.2} />
              Zerar Dados
            </motion.button>

            <AnimatePresence>
              {dirty && (
                <motion.span
                  key="stale"
                  variants={itemRise}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={styles.staleHint}
                >
                  dados alterados — clique em Calcular
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {importStatus.msg && (
                <motion.span
                  key={importStatus.msg}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`${styles.importStatus} ${
                    importStatus.cls ? styles[importStatus.cls] : ""
                  }`}
                >
                  {importStatus.cls === "ok" && (
                    <CheckCircle2 size={14} strokeWidth={2.2} />
                  )}
                  {importStatus.cls === "err" && (
                    <AlertCircle size={14} strokeWidth={2.2} />
                  )}
                  {importStatus.msg}
                </motion.span>
              )}
            </AnimatePresence>
          </RevealGroup>
        </motion.div>

        {/* ── 02 · Simulador (hero) ───────────────────────────── */}
        <motion.div
          id="ccb-simulador-resultado"
          className={`${styles.card} ${styles.hero}`}
          variants={cardRise}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <RevealGroup
            className={styles.cardHead}
            stagger={0.05}
            delayChildren={0}
          >
            <motion.span variants={fadeIn} className={`${styles.cardIdx} ${styles.heroIdx}`}>
              02
            </motion.span>
            <motion.h2 variants={fadeIn} className={`${styles.cardTitle} ${styles.heroTitle}`}>
              Simulador de quitação
            </motion.h2>
          </RevealGroup>
          <motion.div
            className={styles.heroGrid}
            variants={containerStagger(0.09, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={itemRise}>
              <div className={styles.bigLabel}>
                Valor para quitar nesta data
              </div>
              <div
                className={styles.bigValue}
                dangerouslySetInnerHTML={{
                  __html: bigMoney(q.valor),
                }}
              />
              {q.pisoAtivo && q.piso !== null && (
                <span className={styles.heroPiso}>
                  Piso aplicado: Valor Financiado + {PISO_PCT * 100}% ={" "}
                  {BRL.format(q.piso)}
                </span>
              )}
            </motion.div>
            <motion.div variants={itemRise} className={styles.heroDate}>
              <label htmlFor="dataLiq">Data da liquidação</label>
              <input
                id="dataLiq"
                type="date"
                value={dataLiq}
                onChange={(e) => setDataLiq(e.target.value)}
              />
            </motion.div>
            <motion.div variants={itemRise} className={styles.heroStat}>
              <div className={styles.bigLabel}>
                <TrendingDown size={12} strokeWidth={2.2} /> Economia de juros
              </div>
              <div className={`${styles.sVal} ${styles.sEco}`}>
                {BRL.format(q.economia)}
              </div>
            </motion.div>
          </motion.div>
          <RevealGroup
            className={styles.heroMeta}
            stagger={0.06}
            delayChildren={0.1}
          >
            <motion.span variants={fadeIn}>
              Parcelas quitadas: <b>{q.pagas}</b>
            </motion.span>
            <motion.span variants={fadeIn}>
              Parcelas vincendas: <b>{q.vincendas}</b>
            </motion.span>
            <motion.span variants={fadeIn}>
              Soma nominal das vincendas: <b>{BRL.format(q.somaNom)}</b>
            </motion.span>
          </RevealGroup>
        </motion.div>

        {/* ── Empty state ─────────────────────────────────────── */}
        <AnimatePresence>
          {rows.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={styles.emptyHint}
            >
              <b>Comece por aqui.</b> Toque em <b>Importar CCB</b> para ler o
              PDF da cédula automaticamente, ou preencha os campos da operação
              acima. As tabelas aparecem assim que houver valor financiado,
              taxa, nº de parcelas e 1º vencimento.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 03 · Cronograma ─────────────────────────────────── */}
        <AnimatePresence>
          {rows.length > 0 && (
            <motion.div
              key={`schedule-${rows.length}`}
              className={styles.card}
              variants={cardRise}
              initial="hidden"
              animate="show"
            >
              <RevealGroup
                className={styles.cardHead}
                stagger={0.05}
                delayChildren={0}
              >
                <motion.span variants={fadeIn} className={styles.cardIdx}>
                  03
                </motion.span>
                <motion.h2 variants={fadeIn} className={styles.cardTitle}>
                  Cronograma de amortização
                </motion.h2>
                <motion.span variants={fadeIn} className={styles.cardNote}>
                  Sistema Price · saldo pela taxa do contrato
                </motion.span>
              </RevealGroup>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Parc.</th>
                      <th>Vencimento</th>
                      <th>Juros</th>
                      <th>Amortização</th>
                      <th>Parcela</th>
                      <th>Saldo devedor</th>
                    </tr>
                  </thead>
                  <motion.tbody
                    variants={containerStagger(0.025, 0.05)}
                    initial="hidden"
                    animate="show"
                  >
                    {rows.map((rw) => (
                      <motion.tr key={rw.k} variants={itemRise}>
                        <td className={styles.idxCell}>
                          {String(rw.k).padStart(2, "0")}
                        </td>
                        <td className={styles.muted}>{fmtDate(rw.venc)}</td>
                        <td className={styles.money}>
                          {BRL.format(rw.juros)}
                        </td>
                        <td className={styles.money}>{BRL.format(rw.amort)}</td>
                        <td className={styles.money}>
                          {BRL.format(rw.parcela)}
                        </td>
                        <td className={styles.money}>{BRL.format(rw.saldo)}</td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td />
                      <td className={styles.money}>
                        {BRL.format(r2(totals.j))}
                      </td>
                      <td className={styles.money}>
                        {BRL.format(r2(totals.a))}
                      </td>
                      <td className={styles.money}>
                        {BRL.format(r2(totals.p))}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 04 · Antecipação de parcelas específicas ────────── */}
        <AnimatePresence>
          {rows.length > 0 && (
            <motion.div
              key={`pick-${rows.length}`}
              className={styles.card}
              variants={cardRise}
              initial="hidden"
              animate="show"
            >
              <RevealGroup
                className={styles.cardHead}
                stagger={0.05}
                delayChildren={0}
              >
                <motion.span variants={fadeIn} className={styles.cardIdx}>
                  04
                </motion.span>
                <motion.h2 variants={fadeIn} className={styles.cardTitle}>
                  Antecipação de parcelas específicas
                </motion.h2>
                <motion.span variants={fadeIn} className={styles.cardNote}>
                  Marque as parcelas que o cliente quer pagar
                </motion.span>
              </RevealGroup>

              <RevealGroup
                className={styles.pickBar}
                stagger={0.05}
                delayChildren={0.05}
              >
                <motion.div variants={itemRise} className={styles.pickField}>
                  <label htmlFor="dataPick">Data do pagamento</label>
                  <input
                    id="dataPick"
                    type="date"
                    value={dataPick}
                    onChange={(e) => setDataPick(e.target.value)}
                  />
                </motion.div>
                <motion.div
                  className={styles.pickQuick}
                  variants={containerStagger(0.04, 0)}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    { key: "last", label: "Só a última" },
                    { key: "last2", label: "Últimas 2" },
                    { key: "all", label: "Todas" },
                    { key: "none", label: "Limpar" },
                  ].map((b) => (
                    <motion.button
                      key={b.key}
                      type="button"
                      variants={itemRise}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className={`${styles.btn} ${styles.btnQuick}`}
                      onClick={() =>
                        handleQuick(b.key as "last" | "last2" | "all" | "none")
                      }
                    >
                      {b.label}
                    </motion.button>
                  ))}
                </motion.div>
              </RevealGroup>

              <motion.div
                className={styles.pickList}
                variants={containerStagger(0.025, 0.05)}
                initial="hidden"
                animate="show"
              >
                {rows.map((rw) => {
                  const on = selected.has(rw.k);
                  return (
                    <motion.button
                      type="button"
                      key={rw.k}
                      variants={itemRise}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className={`${styles.pickItem} ${on ? styles.on : ""}`}
                      onClick={() => toggleParcela(rw.k)}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={on}
                        tabIndex={-1}
                      />
                      <span className={styles.piK}>
                        {String(rw.k).padStart(2, "0")}
                      </span>
                      <span className={styles.piMeta}>
                        {fmtDate(rw.venc)}
                        <b>{BRL.format(rw.parcela)}</b>
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              <RevealGroup
                className={styles.pickSummary}
                stagger={0.07}
                delayChildren={0.05}
              >
                <motion.div variants={itemRise} className={styles.psItem}>
                  <span>Parcelas selecionadas</span>
                  <b>{selected.size}</b>
                </motion.div>
                <motion.div variants={itemRise} className={styles.psItem}>
                  <span>Valor nominal (soma)</span>
                  <b>{BRL.format(pickSummary.nom)}</b>
                </motion.div>
                <motion.div
                  variants={itemRise}
                  className={`${styles.psItem} ${styles.psHl}`}
                >
                  <span>Valor a pagar nesta data</span>
                  <b>{BRL.format(pickSummary.vp)}</b>
                </motion.div>
                <motion.div
                  variants={itemRise}
                  className={`${styles.psItem} ${styles.psEco}`}
                >
                  <span>Economia de juros</span>
                  <b>{BRL.format(pickSummary.eco)}</b>
                </motion.div>
              </RevealGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  id: string;
  type: "text" | "number" | "date";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  readOnly?: boolean;
};

function Field({
  label,
  hint,
  id,
  type,
  value,
  onChange,
  placeholder,
  step,
  readOnly,
}: FieldProps) {
  return (
    <div className={`${styles.field} ${readOnly ? styles.readonly : ""}`}>
      <label htmlFor={id}>
        {label}
        {hint && <span className={styles.hint}> {hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        step={step}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const PDFJS_SCRIPT_ID = "pdfjs-script";

async function loadPdfJs(): Promise<void> {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(PDFJS_SCRIPT_ID) as
    | HTMLScriptElement
    | null;
  if (existing) {
    return new Promise<void>((resolve) => {
      if ((window as unknown as { pdfjsLib?: PdfJsLib }).pdfjsLib) resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
    });
  }
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.id = PDFJS_SCRIPT_ID;
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("pdfjs load failed"));
    document.head.appendChild(s);
  });
  const worker = document.createElement("script");
  worker.src =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  document.head.appendChild(worker);
  (window as unknown as { pdfjsLib: PdfJsLib }).pdfjsLib.GlobalWorkerOptions.workerSrc = worker.src;
}
