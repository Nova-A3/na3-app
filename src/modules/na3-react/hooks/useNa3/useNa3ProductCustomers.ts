import { useCallback, useEffect, useState } from "react";
import { na3 } from "../../../na3";
import type { ApiPerson, ApiProduct } from "../../../na3-types";

type UseNa3ProductCustomersResult = {
  data: ApiPerson[] | undefined;
  loading: boolean;
  error: string | undefined;
};

export function useNa3ProductCustomers(
  product: ApiProduct | null | undefined
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
      void handleFetchCustomers(async () =>
        na3.people().getCustomers(product, { ignoreErrors: true })
      );
    } else {
      setLoading(false);
      setCustomers(undefined);
      setError("Nenhum produto especificado.");
    }
  }, [product, handleFetchCustomers]);

  return { data: customers, error, loading };
}
