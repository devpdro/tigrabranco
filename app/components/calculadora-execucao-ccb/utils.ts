export type StatusParcela = "nao_pago" | "parcial" | "integral";
export type StatusLinha = StatusParcela | "parcial-quitada";

export type ParcelaExecucao = {
  id: string;
  n: number | string;
  vencISO: string;
  valor: string;
  status: StatusParcela;
  dataPagamento: string;
  valorPago: string;
};

export type NegociacaoExecucao = {
  ativa: boolean;
  substitui: boolean;
  valor: string;
  dataAcordo: string;
  status: StatusParcela;
  dataPagamento: string;
  valorPago: string;
};

export type DadosCcbExecucao = {
  numeroCCB: string;
  credor: string;
  devedorNome: string;
  devedorCPF: string;
  taxaJurosAM: string;
};

export type ParamsExecucao = {
  dataBase: string;
  vencAntecipado: string;
  taxaMora: string;
  multa: string;
  honorarios: string;
  custasPct: string;
  ufesp: string;
  custasPiso: string;
  custasTeto: string;
  taxaIntimacao: string;
};

type ParsedDateParts = { y: number; mo: number; d: number };

type ParcelaCalc = {
  n: number | string;
  vencDate: Date;
  valor: number;
  status: StatusParcela;
  dataPagamento: Date | null;
  valorPago: number;
};

export type LinhaResultado = {
  parcela: number | string;
  vencimentoOriginal: Date;
  vencimentoEfetivo: Date;
  status: StatusLinha;
  dataPagamento?: Date | null;
  valorPagoInformado?: number;
  devidoNaDataPagamento?: number;
  saldoAposPagamento?: number;
  diasAtraso: number;
  fatorCorrecao?: number;
  valorCorrigido: number;
  jurosRemuneratorios: number;
  jurosMora: number;
  subtotal: number;
  multa: number;
  total: number;
};

export type ResultadoExecucao = {
  linhas: LinhaResultado[];
  negocLinha: LinhaResultado | null;
  totalParcelas: number;
  totalAtualizado: number;
  honorarios: number;
  custas: number;
  custasBrutas: number;
  custasPiso: number;
  custasTeto: number;
  taxaIntimacao: number;
  totalExecucao: number;
  substituiu: boolean;
};

export type ParsedCcbExecucao = Partial<DadosCcbExecucao> & {
  formato: "BMP" | "VIA_CAPITAL" | null;
  parcelas: Array<{ n: number; vencimento: string; valor: number }>;
  warnings: string[];
};

type ParamsCalc = {
  dataBase: Date;
  dataVencAntecipado: Date;
  taxaJurosAM: number;
  taxaMoraAM: number;
  multaPct: number;
  honorariosPct: number;
  custasPct: number;
  ufesp: number;
  custasPisoUfesp: number;
  custasTetoUfesp: number;
  taxaIntimacao: number;
  diasMes: number;
};

const IPCA_TABLE = [
  { ym: 202512, label: "dez/25", variacao: 0 },
  { ym: 202601, label: "jan/26", variacao: 0.0033 },
  { ym: 202602, label: "fev/26", variacao: 0.007 },
  { ym: 202603, label: "mar/26", variacao: 0.0088 },
  { ym: 202604, label: "abr/26", variacao: 0.0067 },
  { ym: 202605, label: "mai/26", variacao: 0.0058 },
  { ym: 202606, label: "jun/26", variacao: 0.0058, estimado: true },
  { ym: 202607, label: "jul/26", variacao: 0, estimado: true },
  { ym: 202608, label: "ago/26", variacao: 0, estimado: true },
  { ym: 202609, label: "set/26", variacao: 0, estimado: true },
  { ym: 202610, label: "out/26", variacao: 0, estimado: true },
  { ym: 202611, label: "nov/26", variacao: 0, estimado: true },
  { ym: 202612, label: "dez/26", variacao: 0, estimado: true },
  { ym: 202701, label: "jan/27", variacao: 0, estimado: true },
  { ym: 202702, label: "fev/27", variacao: 0, estimado: true },
  { ym: 202703, label: "mar/27", variacao: 0, estimado: true },
].map((row, index, table) => ({
  ...row,
  fatorAcumulado: table
    .slice(0, index + 1)
    .reduce((acc, current) => acc * (1 + current.variacao), 1),
}));

export const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const parseNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) return Number.NaN;
  const str = String(value).trim();
  if (!str) return Number.NaN;
  if (str.includes(",") && str.includes(".")) {
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
  }
  if (str.includes(",")) return parseFloat(str.replace(",", "."));
  if (str.includes(".")) {
    const parts = str.split(".");
    if (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3) {
      return parseFloat(str.replace(/\./g, ""));
    }
  }
  return parseFloat(str);
};

export const fmtBRL = (value: number): string =>
  Number.isFinite(value) ? BRL.format(value) : "R$ 0,00";

export const todayISO = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
};

export const dateFromISO = (iso: string): Date | null => {
  const [y, mo, d] = iso.split("-").map(Number);
  if (!y || !mo || !d) return null;
  return dateFromParts({ y, mo, d });
};

export const fmtDateBR = (date: Date | null | undefined): string => {
  if (!date) return "-";
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${d}/${m}/${y}`;
};

const parseBRDate = (str: string): ParsedDateParts | null => {
  const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(str);
  if (!m) return null;
  return { y: parseInt(m[3], 10), mo: parseInt(m[2], 10), d: parseInt(m[1], 10) };
};

const dateFromParts = (p: ParsedDateParts): Date =>
  new Date(Date.UTC(p.y, p.mo - 1, p.d, 12, 0, 0));

const datePartsToISO = (p: ParsedDateParts): string =>
  `${p.y}-${String(p.mo).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;

const daysBetween = (d1: Date, d2: Date): number =>
  Math.round((d2.getTime() - d1.getTime()) / 86400000);

const ymOf = (date: Date): number => date.getUTCFullYear() * 100 + date.getUTCMonth() + 1;

const fatorIndice = (ym: number): number | null =>
  IPCA_TABLE.find((row) => row.ym === ym)?.fatorAcumulado ?? null;

const detectFormat = (text: string): "BMP" | "VIA_CAPITAL" | null => {
  if (/BMP\s+SOCIEDADE\s+DE\s+CRE?DITO/i.test(text)) return "BMP";
  if (/VIA\s+CAPITAL/i.test(text)) return "VIA_CAPITAL";
  return null;
};

const parseBMP = (text: string): ParsedCcbExecucao => {
  const out: ParsedCcbExecucao = {
    formato: "BMP",
    credor: "BMP Sociedade de Credito Direto S.A.",
    parcelas: [],
    warnings: [],
  };

  let m = /C[ÉE]DULA DE CREDITO[^\n]*\n(\d+)\s+(\d{2}\/\d{2}\/\d{4})/.exec(text);
  if (m) out.numeroCCB = m[1];
  else out.warnings.push("Numero/data de emissao nao encontrados.");

  m = /Nome CPF\s*\n([A-ZÀ-Úa-zà-ú\s]+?)\s+([\d.]+-\d{2})/.exec(text);
  if (m) {
    out.devedorNome = m[1].trim();
    out.devedorCPF = m[2];
  } else {
    out.warnings.push("Nome/CPF do devedor nao encontrados.");
  }

  m =
    /CARACTER[ÍI]STICAS DA OPERA[ÇC][ÃA]O[\s\S]*?R\$\s*([\d.,]+)\s+R\$\s*([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/.exec(
      text,
    );
  if (m) out.taxaJurosAM = "";

  m = /(\d{1,2},\d{2})%\s+(\d{1,3},\d{2})%\s+([\d.,]+)\s+([\d.,]+)/.exec(text);
  if (m) out.taxaJurosAM = String(parseNumber(m[1]));
  else out.warnings.push("Taxa de juros nao encontrada.");

  const fluxoStart = text.search(/FLUXO DE PAGAMENTO/i);
  const condStart = text.search(/CONDI[ÇC][ÕO]ES GERAIS/i);
  if (fluxoStart >= 0) {
    const sec = condStart > fluxoStart ? text.slice(fluxoStart, condStart) : text.slice(fluxoStart);
    const rowRe = /(\d{3})\s+(\d{2}\/\d{2}\/\d{4})\s+(\d+,\d{2})/g;
    let rm: RegExpExecArray | null;
    const rows: ParsedCcbExecucao["parcelas"] = [];
    while ((rm = rowRe.exec(sec)) !== null) {
      rows.push({ n: parseInt(rm[1], 10), vencimento: rm[2], valor: parseNumber(rm[3]) });
    }
    out.parcelas = rows.sort((a, b) => a.n - b.n);
  }

  if (out.parcelas.length === 0) {
    out.warnings.push("Fluxo de pagamento nao encontrado. Preencha as parcelas manualmente.");
  }
  return out;
};

const parseViaCapital = (text: string): ParsedCcbExecucao => {
  const out: ParsedCcbExecucao = {
    formato: "VIA_CAPITAL",
    credor: "Via Capital - Sociedade de Credito Direto S/A.",
    parcelas: [],
    warnings: [],
  };

  let m = /C[ÉE]DULA DE CR[ÉE]DITO BANC[ÁA]RIO\s*N[ºo]\s*(\d+)/i.exec(text);
  if (m) out.numeroCCB = m[1];
  else out.warnings.push("Numero da CCB nao encontrado.");

  m = /Nome:\s*([^(]+?)\s*\(/.exec(text);
  if (m) out.devedorNome = m[1].trim();
  else out.warnings.push("Nome do devedor nao encontrado.");

  m = /CPF:\s*([\d.-]+)/.exec(text);
  if (m) out.devedorCPF = m[1];

  m = /Taxa de Juros % a\.m\.:\s*([\d.,]+)/i.exec(text);
  if (m) out.taxaJurosAM = String(parseNumber(m[1]));
  else out.warnings.push("Taxa de juros a.m. nao encontrada.");

  const fluxoStart = text.search(/FLUXO DE PAGAMENTO/i);
  if (fluxoStart >= 0) {
    const sec = text.slice(fluxoStart);
    const rowRe = /\n(\d{1,2})\s+([\d.,]+)\s+([\d.,]+)\s+R\$\s*([\d.,]+)\s+(\d{2}\/\d{2}\/\d{4})/g;
    let rm: RegExpExecArray | null;
    const rows: ParsedCcbExecucao["parcelas"] = [];
    while ((rm = rowRe.exec(sec)) !== null) {
      rows.push({ n: parseInt(rm[1], 10), vencimento: rm[5], valor: parseNumber(rm[4]) });
    }
    out.parcelas = rows.sort((a, b) => a.n - b.n);
  }

  if (out.parcelas.length === 0) {
    out.warnings.push("Fluxo de pagamento nao encontrado. Preencha as parcelas manualmente.");
  }
  return out;
};

export const parseCCBExecucao = (text: string): ParsedCcbExecucao => {
  const fmt = detectFormat(text);
  if (fmt === "BMP") return parseBMP(text);
  if (fmt === "VIA_CAPITAL") return parseViaCapital(text);
  return {
    formato: null,
    parcelas: [],
    warnings: [
      "Nao foi possivel identificar o credor automaticamente. Modelos reconhecidos: BMP e Via Capital.",
    ],
  };
};

const acumular = (base: number, dataIni: Date, dataFim: Date, params: ParamsCalc) => {
  const dias = Math.max(0, daysBetween(dataIni, dataFim));
  const fIni = fatorIndice(ymOf(dataIni));
  const fFim = fatorIndice(ymOf(dataFim));
  const fatorCorrecao = fIni && fFim ? fFim / fIni : 1;
  const valorCorrigido = base * fatorCorrecao;
  const jurosRemuneratorios =
    valorCorrigido * (Math.pow(1 + params.taxaJurosAM, dias / params.diasMes) - 1);
  const jurosMora = valorCorrigido * params.taxaMoraAM * (dias / params.diasMes);
  return {
    dias,
    fatorCorrecao,
    valorCorrigido,
    jurosRemuneratorios,
    jurosMora,
    subtotal: valorCorrigido + jurosRemuneratorios + jurosMora,
  };
};

const calcParcela = (p: ParcelaCalc, params: ParamsCalc): LinhaResultado => {
  const vencEfetivo =
    p.vencDate.getTime() < params.dataVencAntecipado.getTime()
      ? p.vencDate
      : params.dataVencAntecipado;

  if (p.status === "integral") {
    return {
      parcela: p.n,
      vencimentoOriginal: p.vencDate,
      vencimentoEfetivo: vencEfetivo,
      status: "integral",
      dataPagamento: p.dataPagamento,
      valorPagoInformado: p.valorPago,
      valorCorrigido: 0,
      jurosRemuneratorios: 0,
      jurosMora: 0,
      subtotal: 0,
      multa: 0,
      total: 0,
      diasAtraso: 0,
    };
  }

  if (p.status === "parcial" && p.dataPagamento) {
    const per1 = acumular(p.valor, vencEfetivo, p.dataPagamento, params);
    const devidoNaDataPagamento = per1.subtotal;
    const saldoAposPagamento = Math.max(0, devidoNaDataPagamento - (p.valorPago || 0));

    if (saldoAposPagamento <= 0.005) {
      return {
        parcela: p.n,
        vencimentoOriginal: p.vencDate,
        vencimentoEfetivo: vencEfetivo,
        status: "parcial-quitada",
        dataPagamento: p.dataPagamento,
        valorPagoInformado: p.valorPago,
        devidoNaDataPagamento,
        valorCorrigido: 0,
        jurosRemuneratorios: 0,
        jurosMora: 0,
        subtotal: 0,
        multa: 0,
        total: 0,
        diasAtraso: 0,
      };
    }

    const per2 = acumular(saldoAposPagamento, p.dataPagamento, params.dataBase, params);
    const multa = per2.subtotal * params.multaPct;
    return {
      parcela: p.n,
      vencimentoOriginal: p.vencDate,
      vencimentoEfetivo: vencEfetivo,
      status: "parcial",
      dataPagamento: p.dataPagamento,
      valorPagoInformado: p.valorPago,
      devidoNaDataPagamento,
      saldoAposPagamento,
      diasAtraso: per2.dias,
      fatorCorrecao: per2.fatorCorrecao,
      valorCorrigido: per2.valorCorrigido,
      jurosRemuneratorios: per2.jurosRemuneratorios,
      jurosMora: per2.jurosMora,
      subtotal: per2.subtotal,
      multa,
      total: per2.subtotal + multa,
    };
  }

  const per = acumular(p.valor, vencEfetivo, params.dataBase, params);
  const multa = per.subtotal * params.multaPct;
  return {
    parcela: p.n,
    vencimentoOriginal: p.vencDate,
    vencimentoEfetivo: vencEfetivo,
    status: "nao_pago",
    diasAtraso: per.dias,
    fatorCorrecao: per.fatorCorrecao,
    valorCorrigido: per.valorCorrigido,
    jurosRemuneratorios: per.jurosRemuneratorios,
    jurosMora: per.jurosMora,
    subtotal: per.subtotal,
    multa,
    total: per.subtotal + multa,
  };
};

export const parcelaFromParsed = (
  p: { n: number; vencimento: string; valor: number },
  index: number,
): ParcelaExecucao => {
  const dateParts = parseBRDate(p.vencimento);
  return {
    id: `${Date.now()}-${index}-${p.n}`,
    n: p.n,
    vencISO: dateParts ? datePartsToISO(dateParts) : "",
    valor: Number.isFinite(p.valor) ? p.valor.toFixed(2) : "",
    status: "nao_pago",
    dataPagamento: "",
    valorPago: "",
  };
};

export const novaParcela = (n: number): ParcelaExecucao => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  n,
  vencISO: "",
  valor: "",
  status: "nao_pago",
  dataPagamento: "",
  valorPago: "",
});

export const calcularExecucao = (
  parcelas: ParcelaExecucao[],
  negociacao: NegociacaoExecucao,
  dados: DadosCcbExecucao,
  params: ParamsExecucao,
): ResultadoExecucao => {
  const dataBase = dateFromISO(params.dataBase) ?? dateFromParts({ y: 2026, mo: 6, d: 30 });
  const dataVencAntecipado = dateFromISO(params.vencAntecipado) ?? dataBase;

  const paramsCalc: ParamsCalc = {
    dataBase,
    dataVencAntecipado,
    taxaJurosAM: (parseNumber(dados.taxaJurosAM) || 0) / 100,
    taxaMoraAM: (parseNumber(params.taxaMora) || 0) / 100,
    multaPct: (parseNumber(params.multa) || 0) / 100,
    honorariosPct: (parseNumber(params.honorarios) || 0) / 100,
    custasPct: (parseNumber(params.custasPct) || 0) / 100,
    ufesp: parseNumber(params.ufesp) || 0,
    custasPisoUfesp: parseNumber(params.custasPiso) || 0,
    custasTetoUfesp: parseNumber(params.custasTeto) || 0,
    taxaIntimacao: parseNumber(params.taxaIntimacao) || 0,
    diasMes: 30,
  };

  const parcelasValidas: ParcelaCalc[] = parcelas.flatMap((p, index) => {
    const vencDate = dateFromISO(p.vencISO);
    const valor = parseNumber(p.valor);
    if (!vencDate || !Number.isFinite(valor)) return [];
    return [
      {
        n: index + 1,
        vencDate,
        valor,
        status: p.status,
        dataPagamento: dateFromISO(p.dataPagamento),
        valorPago: parseNumber(p.valorPago) || 0,
      },
    ];
  });

  const linhas = parcelasValidas.map((p) => calcParcela(p, paramsCalc));
  const totalParcelas = linhas.reduce((sum, linha) => sum + linha.total, 0);
  let negocLinha: LinhaResultado | null = null;
  let totalAtualizado = totalParcelas;

  if (negociacao.ativa) {
    const acordoDate = dateFromISO(negociacao.dataAcordo) ?? dataBase;
    negocLinha = calcParcela(
      {
        n: "NEG",
        vencDate: acordoDate,
        valor: parseNumber(negociacao.valor) || 0,
        status: negociacao.status,
        dataPagamento: dateFromISO(negociacao.dataPagamento),
        valorPago: parseNumber(negociacao.valorPago) || 0,
      },
      paramsCalc,
    );
    totalAtualizado = negociacao.substitui ? negocLinha.total : totalParcelas + negocLinha.total;
  }

  const honorarios = totalAtualizado * paramsCalc.honorariosPct;
  const custasBrutas = totalAtualizado * paramsCalc.custasPct;
  const custasPiso = paramsCalc.custasPisoUfesp * paramsCalc.ufesp;
  const custasTeto = paramsCalc.custasTetoUfesp * paramsCalc.ufesp;
  const custas = [custasBrutas, custasPiso, custasTeto].sort((a, b) => a - b)[1] ?? 0;
  const taxaIntimacao = paramsCalc.taxaIntimacao;

  return {
    linhas,
    negocLinha,
    totalParcelas,
    totalAtualizado,
    honorarios,
    custas,
    custasBrutas,
    custasPiso,
    custasTeto,
    taxaIntimacao,
    totalExecucao: totalAtualizado + honorarios + custas + taxaIntimacao,
    substituiu: negociacao.ativa && negociacao.substitui,
  };
};

export const validateExecucao = (
  parcelas: ParcelaExecucao[],
  negociacao: NegociacaoExecucao,
): string | null => {
  const validas = parcelas.filter((p) => p.vencISO && Number.isFinite(parseNumber(p.valor)));
  if (validas.length === 0) return "Inclua ao menos uma parcela com vencimento e valor.";

  for (const [index, p] of validas.entries()) {
    if (p.status === "parcial" && (!p.dataPagamento || !parseNumber(p.valorPago))) {
      return `Parcela ${index + 1}: informe valor pago e data do pagamento parcial.`;
    }
    if (p.status === "integral" && !p.dataPagamento) {
      return `Parcela ${index + 1}: informe a data do pagamento integral.`;
    }
  }

  if (negociacao.ativa && !parseNumber(negociacao.valor)) {
    return "Informe o valor negociado do acordo.";
  }
  return null;
};
