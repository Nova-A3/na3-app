export type BimerError = {
  ErrorMessage: string;
  ErrorCode?: string;
  PossibleCause?: string;
  StackTrace?: string;
};

type BimerPagination = {
  Limite: number;
  Pagina: number;
  TotalPagina: number;
  Total: number;
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
