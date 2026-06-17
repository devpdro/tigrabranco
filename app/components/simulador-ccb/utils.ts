export const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const r2 = (x: number): number =>
  Math.round((x + Number.EPSILON) * 100) / 100;

export type ScheduleRow = {
  k: number;
  venc: Date;
  juros: number;
  amort: number;
  parcela: number;
  saldo: number;
};

export type ParsedCCB = {
  pv: string | null;
  liq: string | null;
  pmt: string | null;
  n: string | null;
  venc1: string | null;
  taxa: string | null;
  iof: string | null;
  lib: string | null;
  nome: string | null;
  cpf: string | null;
  ccb: string | null;
};

export type QuotationResult = {
  valor: number;
  somaNom: number;
  economia: number;
  pagas: number;
  vincendas: number;
  piso: number | null;
  pisoAtivo: boolean;
};

export const PISO_PCT = 0.05;

export const brlToNum = (s: string): number =>
  parseFloat(
    s
      .replace("R$", "")
      .trim()
      .replace(/\./g, "")
      .replace(",", "."),
  );

export const taxaToNum = (s: string): number => {
  const v = s.trim();
  return /^\d+\.\d+$/.test(v) ? parseFloat(v) : brlToNum(v);
};

export const dateBR2ISO = (s: string): string => {
  const [d, m, y] = s.split("/");
  return `${y}-${m}-${d}`;
};

export const parseDate = (str: string): Date => {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const fmtDate = (d: Date): string => d.toLocaleDateString("pt-BR");

export const addMonths = (d: Date, months: number): Date => {
  const day = d.getDate();
  const t = new Date(d.getFullYear(), d.getMonth() + months, 1);
  const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
  t.setDate(Math.min(day, last));
  return t;
};

export const buildSchedule = (
  pv: number,
  i: number,
  n: number,
  pmt: number,
  venc1: Date,
): ScheduleRow[] => {
  let saldo = pv;
  const rows: ScheduleRow[] = [];
  for (let k = 1; k <= n; k++) {
    const juros = r2(saldo * i);
    const amort = r2(pmt - juros);
    const parcela = pmt;
    saldo = r2(saldo - amort);
    rows.push({
      k,
      venc: addMonths(venc1, k - 1),
      juros,
      amort,
      parcela,
      saldo: Math.max(saldo, 0),
    });
  }
  return rows;
};

export const calcQuitacao = (
  rows: ScheduleRow[],
  i: number,
  D: Date,
  pvBase: number,
): QuotationResult => {
  let valor = 0;
  let somaNom = 0;
  let pagas = 0;
  for (const r of rows) {
    if (r.venc.getTime() > D.getTime()) {
      const dias = (r.venc.getTime() - D.getTime()) / 86400000;
      valor += r.parcela / Math.pow(1 + i, dias / 30);
      somaNom += r.parcela;
    } else {
      pagas++;
    }
  }
  valor = r2(valor);
  let piso: number | null = null;
  let pisoAtivo = false;
  if (pagas === 0 && pvBase > 0) {
    piso = r2(pvBase * (1 + PISO_PCT));
    if (valor < piso) {
      valor = piso;
      pisoAtivo = true;
    }
  }
  return {
    valor,
    somaNom: r2(somaNom),
    economia: r2(somaNom - valor),
    pagas,
    vincendas: rows.length - pagas,
    piso,
    pisoAtivo,
  };
};

export const bigMoney = (v: number): string => {
  const s = BRL.format(v);
  const i = s.lastIndexOf(",");
  if (i < 0) return s;
  return `${s.slice(0, i)}<span class="cents">${s.slice(i)}</span>`;
};

export const parseCCBText = (T: string): ParsedCCB => {
  const g = (re: RegExp): string | null => {
    const m = T.match(re);
    return m ? m[1].trim() : null;
  };
  return {
    pv: g(/Valor do Cr[eé]dito:\s*R\$\s*([\d.,]+)/i),
    liq: g(/Valor Entregue ao Emitente:\s*R\$\s*([\d.,]+)/i),
    pmt: g(/Valor da Parcela:\s*R\$\s*([\d.,]+)/i),
    n: g(/N[uú]mero de Parcelas:\s*(\d+)/i),
    venc1: g(/Vencimento da Primeira Parcela:\s*(\d{2}\/\d{2}\/\d{4})/i),
    taxa: g(/Taxa de Juros\s*%?\s*a\.?\s*m\.?:?\s*([\d.,]+)/i),
    iof: g(/IOF:\s*R\$\s*([\d.,]+)/i),
    lib: g(/libera[cç][aã]o do recurso:\s*(\d{2}\/\d{2}\/\d{4})/i),
    nome: g(/Nome:\s*(.+?)\s*\(\s*"?EMITENTE/i),
    cpf: g(/CPF:\s*([\d.\-]+)/i),
    ccb: g(/CR[EÉ]DITO BANC[AÁ]RIO N[ºo°]?\s*([\d]+)/i),
  };
};
