export type BimerPersonCategory = {
  Identificador: string;
  Ativo: boolean;
  CodigoExterno: string;
  Nome: string;
};

export type BimerPersonContact = {
  Identificador: string;
  Nome: string;
  ContatoPrincipal?: boolean;
  Fax?: string;
  Email?: string;
  EmailNfEletronica?: string;
  EmailCobranca?: string;
  EmailBoleto?: string;
  PaginaInternet?: string;
  TipoCadastro?: "A" | "E" | "I";
  TelefoneCelular?: string;
  TelefoneFixo?: string;
  Suporte?: string;
};

export type BimerPersonAddress = {
  Codigo: string;
  Ativo: boolean;
  Bairro?: { Identificador: string; Codigo: string; Nome: string };
  BairroCidadeUnidadeFederativaCep: string;
  Cep?: string;
  Cidade?: {
    Identificador: string;
    Codigo: string;
    Nome: string;
    CodigoDDD: string;
    CodigoIBGE: string;
    UF?: {
      CodigoIBGE: number;
      Nome: string;
      Sigla: string;
    };
  };
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
  TipoLogradouro?: { Identificador: string; Nome: string };
  TipoNomeNumeroComplementoLogradouro: string[];
  TiposEnderecos: string[];
  Uf: string;
  TipoContribuicaoICMS: "1" | "2" | "9";
};

export type BimerPerson = {
  Identificador: string;
  Codigo: string;
  Nome: string;
  NomeCurto: string;
  CpfCnpj?: number;
  DataNascimento?: string;
  Categorias: BimerPersonCategory[];
  DataCadastro: string;
  EnderecoPrincipal?: BimerPersonAddress;
  Enderecos: BimerPersonAddress[];
  FotoPessoa?: {
    Conteudo: string;
    Descricao: string;
    TipoImagem: 0 | 1;
  };
  InformacoesRestritas?: boolean;
  PossuiCaracteristicaInadimplencia?: boolean;
  RepresentantePrincipalRelacionado?: BimerPersonContact;
  TipoPessoa: 0 | 1;
  TipoClienteTelecomunicacao: string;
  RetemTributosContribuicoes?: boolean;
  RetemTributosDeQualquerValor?: boolean;
  PrestadoraServico?: boolean;
  AliquotaIRRF?: number;
  DataInicioAtividades: string;
  EntidadeAdministracaoPublicaFederal?: boolean;
};
