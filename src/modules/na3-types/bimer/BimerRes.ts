export type BimerError = {
  ErrorCode?: string;
  ErrorMessage: string;
  PossibleCause?: string;
  StackTrace?: string;
};

type BimerPagination = {
  Limite: number;
  Pagina: number;
  Total: number;
  TotalPagina: number;
};

export type BimerResFail = {
  Erros: BimerError[] & { 0: BimerError };
  ListaObjetos: [];
};

export type BimerResSuccess<T> = {
  Erros: [];
  ListaObjetos: T[] & { 0: T };
};

export type BimerRes<T> =
  | { Paginacao?: BimerPagination } & (BimerResFail | BimerResSuccess<T>);
