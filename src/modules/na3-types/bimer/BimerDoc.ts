import type { BimerBase } from "./BimerBase";

type BimerDocumentItem = {
  Identificador: string;
  IdentificadorProduto: string;
  IdentificadorSetorEntrada?: string;
  IdentificadorSetorSaida: string;
  Quantidade: number;
  SerieLote?: {
    Codigo: string;
    Identificador: string;
    Tipo: "L" | "S";
  };
  ValorPesoBruto: number;
  ValorPesoLiquido: number;
  ValorUnitario: number;
};

type BimerDocumentPayment = {
  Aliquota: number;
  AliquotaConvenio: number;
  AliquotaTACConvenio: number;
  AliquotaTACEmpresa: number;
  AtualizaFinanceiro: boolean;
  DataVencimento: string;
  DescricaoAgrupamento: string;
  Identificador: string;
  IdentificadorFormaPagamento: string;
  IdentificadorNaturezaLancamento: string;
  IdentificadorPessoaConvenio?: string;
  IdentificadorPessoaFinanceiro?: string;
  IdentificadorTipoBaixa?: string;
  NomeAdquirenteCartao?: string;
  NumeroAutorizacaoCartao?: string;
  NumeroCheque: string;
  NumeroDias: number;
  NumeroDiasIntervalo: number;
  NumeroDiasPrimeiraParcelaVenda: number;
  NumeroDiasRecebimento: number;
  NumeroParcelas: number;
  NumeroParcelasRecebimento: number;
  NumeroSequencialUnicoCartao?: string;
  NumeroTitulo: number;
  Valor: number;
  ValorJurosPrazo: number;
  ValorTACConvenio: number;
  ValorTACEmpresa: number;
};

export type BimerDoc = {
  ChaveAcesso: string;
  CodigoEmpresa: string;
  DataEmissao: string;
  DataReferencia: string;
  DataReferenciaPagamento: string;
  DocumentoCancelado: boolean;
  Faturamento?: string;
  Identificador: string;
  IdentificadorLoteEstoque: string;
  IdentificadorOperacao: string;
  IdentificadorPessoa: string;
  Itens: BimerDocumentItem[];
  Liberado: boolean;
  Mensagens?: (BimerBase | null)[];
  NomeEntidadeOrigem?: string;
  Numero: string;
  Observacao: string;
  Pagamentos: BimerDocumentPayment[];
  StatusDocumentoTelecomunicacao: string;
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
  TipoDocumento: "C" | "F" | "N" | "O" | "S" | "T";
  TipoFinalidade: string;
  UnidadeNegocio?: BimerBase;
};
