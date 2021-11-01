import type { BimerBase } from "./BimerBase";

type BimerDocumentItem = {
  Identificador: string;
  SerieLote?: {
    Codigo: string;
    Identificador: string;
    Tipo: "L" | "S";
  };
  IdentificadorProduto: string;
  IdentificadorSetorEntrada?: string;
  IdentificadorSetorSaida: string;
  Quantidade: number;
  ValorUnitario: number;
  ValorPesoBruto: number;
  ValorPesoLiquido: number;
};

type BimerDocumentPayment = {
  Identificador: string;
  Aliquota: number;
  AliquotaConvenio: number;
  AliquotaTACConvenio: number;
  AliquotaTACEmpresa: number;
  AtualizaFinanceiro: boolean;
  DataVencimento: string;
  DescricaoAgrupamento: string;
  IdentificadorFormaPagamento: string;
  IdentificadorNaturezaLancamento: string;
  IdentificadorPessoaConvenio?: string;
  IdentificadorPessoaFinanceiro?: string;
  IdentificadorTipoBaixa?: string;
  NomeAdquirenteCartao?: string;
  NumeroAutorizacaoCartao?: string;
  NumeroSequencialUnicoCartao?: string;
  NumeroCheque: string;
  NumeroDias: number;
  NumeroDiasIntervalo: number;
  NumeroDiasPrimeiraParcelaVenda: number;
  NumeroDiasRecebimento: number;
  NumeroParcelas: number;
  NumeroParcelasRecebimento: number;
  NumeroTitulo: number;
  Valor: number;
  ValorJurosPrazo: number;
  ValorTACConvenio: number;
  ValorTACEmpresa: number;
};

export type BimerDoc = {
  ChaveAcesso: string;
  Identificador: string;
  Numero: string;
  IdentificadorLoteEstoque: string;
  StatusNotaFiscalEletronica:
    | "A"
    | "C"
    | "D"
    | "E"
    | "I"
    | "N"
    | "R"
    | "S"
    | "X";
  StatusDocumentoTelecomunicacao: string;
  TipoFinalidade: string;
  TipoDocumento: "C" | "F" | "N" | "O" | "S" | "T";
  Liberado: boolean;
  DocumentoCancelado: boolean;
  UnidadeNegocio?: BimerBase;
  CodigoEmpresa: string;
  DataEmissao: string;
  DataReferencia: string;
  DataReferenciaPagamento: string;
  IdentificadorOperacao: string;
  IdentificadorPessoa: string;
  Itens: BimerDocumentItem[];
  NomeEntidadeOrigem?: string;
  Faturamento?: string;
  Pagamentos: BimerDocumentPayment[];
  Observacao: string;
  Mensagens?: (BimerBase | null)[];
};
