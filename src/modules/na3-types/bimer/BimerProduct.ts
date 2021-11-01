import type { BimerBase } from "./BimerBase";

export type BimerProduct = {
  Identificador: string;
  Codigo: string;
  Nome: string;
  IdentificadorProdutoMaster?: string;
  IdentificadorProdutoOrigem?: string;
  Grupo: BimerBase;
  Familia: BimerBase;
  ProdutoAplicacao?: string;
  Dimensoes: {
    TipoEmbalagem: string;
    Altura: number;
    Largura: number;
    Profundidade: number;
    Diametro: number;
  };
  PesoBruto: number;
  PesoLiquido: number;
  QuantidadeVolumes: number;
  MarcasProduto: { Identificador: string; Codigo: string; NomeMarca: string }[];
  CaracteristicasProduto: {
    Identificador: string;
    Codigo: string;
    Caracteristica: string;
  }[];
  FatorConversaoUnidade: number;
  CodigoClassificacao?: string;
  Ativo?: boolean;
  AtivoCompra?: boolean;
  ClassificacaoFiscal?: BimerBase & {
    AliquotaTotalTributosPrecedentes: number;
    Classificacao: string;
  };
};

export type BimerProductImage = {
  Conteudo: string;
  Descricao: string;
  TipoImagem: 0 | 1;
};

export type BimerProductGrid = {
  Identificador: string;
  GradeHorizontal: {
    Identificador: string;
    Codigo: number;
    Sigla: string;
    Tipo: { Identificador: string; Codigo: string };
  };
  GradeVertical: {
    Identificador: string;
    Codigo: number;
    Sigla: string;
    Tipo: { Identificador: string; Codigo: string };
  };
  NmProduto: string;
};
