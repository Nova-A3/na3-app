import { useCallback, useEffect, useState } from "react";

import { na3 } from "../../../na3";
import type { ApiProduct, ApiResponse } from "../../../na3-types";

type UseNa3ProductResult = {
  data: ApiProduct | undefined;
  error: string | undefined;
  loading: boolean;
};

export function useNa3Product(query: string): UseNa3ProductResult {
  const [product, setProduct] = useState<ApiProduct>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleFetchProduct = useCallback(
    async (fetchFunction: () => Promise<ApiResponse<ApiProduct>>) => {
      setError(undefined);
      setProduct(undefined);
      setLoading(true);
      const fetchResult = await fetchFunction();
      fetchResult.data
        ? setProduct(fetchResult.data)
        : setError(fetchResult.error.message);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    const typoFixedQuery = na3.products().fixQuery(query);
    if (na3.products().isProductId(typoFixedQuery)) {
      void handleFetchProduct(async () =>
        na3.products().getById(typoFixedQuery)
      );
    } else if (na3.products().isProductCode(typoFixedQuery)) {
      void handleFetchProduct(async () =>
        na3.products().getByCode(typoFixedQuery)
      );
    } else {
      setLoading(false);
      setProduct(undefined);
      if (!typoFixedQuery)
        setError("Nenhum ID ou código de produto fornecido.");
      else setError("ID ou código de produto inválido.");
    }
  }, [query, handleFetchProduct]);

  return { data: product, error, loading };
}
