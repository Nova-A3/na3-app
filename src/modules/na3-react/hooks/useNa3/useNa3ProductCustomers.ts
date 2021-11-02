import { useCallback, useEffect, useState } from "react";

import type { ApiPerson } from "../../../na3-types";
import type { ProductData } from "./useNa3Product";

type UseNa3ProductCustomersResult = {
  data: ApiPerson[] | undefined;
  error: string | undefined;
  loading: boolean;
};

export function useNa3ProductCustomers(
  product: ProductData | null | undefined
): UseNa3ProductCustomersResult {
  const [customers, setCustomers] = useState<ApiPerson[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleFetchCustomers = useCallback(
    async (fetchFunction: () => Promise<ApiPerson[]>) => {
      setError(undefined);
      setCustomers(undefined);
      setLoading(true);
      const fetchResult = await fetchFunction();
      fetchResult.length > 0
        ? setCustomers(fetchResult.sort((a, b) => a.name.localeCompare(b.name)))
        : setError(
            "Não foi possível encontrar nenhum cliente para o produto especificado."
          );
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    if (product) {
      void handleFetchCustomers(async () => product.getCustomers());
    } else {
      setLoading(false);
      setCustomers(undefined);
      setError("Nenhum produto especificado.");
    }
  }, [product, handleFetchCustomers]);

  return { data: customers, error, loading };
}
