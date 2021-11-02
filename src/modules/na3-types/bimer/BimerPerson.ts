export type BimerPersonCategory = {
  Ativo: boolean;
  CodigoExterno: string;
  Identificador: string;
  Nome: string;
};

export type BimerPersonContact = {
  ContatoPrincipal?: boolean;
  Email?: string;
  EmailBoleto?: string;
  EmailCobranca?: string;
  EmailNfEletronica?: string;
  Fax?: string;
  Identificador: string;
  Nome: string;
  PaginaInternet?: string;
  Suporte?: string;
  TelefoneCelular?: string;
  TelefoneFixo?: string;
  TipoCadastro?: "A" | "E" | "I";
};

export type BimerPersonAddress = {
  Ativo: boolean;
  Bairro?: { Codigo: string; Identificador: string; Nome: string };
  BairroCidadeUnidadeFederativaCep: string;
  Cep?: string;
  Cidade?: {
    Codigo: string;
    CodigoDDD: string;
    CodigoIBGE: string;
    Identificador: string;
    Nome: string;
    UF?: {
      CodigoIBGE: number;
      Nome: string;
      Sigla: string;
    };
  };
  Codigo: string;
  CodigoSuframa: string;
  Complemento: string;
  ContatoPrincipal?: BimerPersonContact;
  InscricaoEstadual: string;
  InscricaoMunicipal: string;
  Latitude: number;
  Longitude: number;
  NomeLogradouro: string;
  NumeroLogradouro: string;
  Observacao: string;
  PessoasContato: BimerPersonContact[];
  Status?: string;
  TipoContribuicaoICMS: "1" | "2" | "9";
  TipoLogradouro?: { Identificador: string; Nome: string };
  TipoNomeNumeroComplementoLogradouro: string[];
  TiposEnderecos: string[];
  Uf: string;
};

export type BimerPerson = {
  AliquotaIRRF?: number;
  Categorias: BimerPersonCategory[];
  Codigo: string;
  CpfCnpj?: number;
  DataCadastro: string;
  DataInicioAtividades: string;
  DataNascimento?: string;
  EnderecoPrincipal?: BimerPersonAddress;
  Enderecos: BimerPersonAddress[];
  EntidadeAdministracaoPublicaFederal?: boolean;
  FotoPessoa?: {
    Conteudo: string;
    Descricao: string;
    TipoImagem: 0 | 1;
  };
  Identificador: string;
  InformacoesRestritas?: boolean;
  Nome: string;
  NomeCurto: string;
  PossuiCaracteristicaInadimplencia?: boolean;
  PrestadoraServico?: boolean;
  RepresentantePrincipalRelacionado?: BimerPersonContact;
  RetemTributosContribuicoes?: boolean;
  RetemTributosDeQualquerValor?: boolean;
  TipoClienteTelecomunicacao: string;
  TipoPessoa: 0 | 1;
};
