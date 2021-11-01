export type ApiProduct = {
  /* From Bimer */
  id: string;
  code: string;
  name: string;
  masterProductId: string | null;
  originProductId: string | null;
  customerIds: string[];
  group: { id: string; code: string; description: string } | null;
  family: {
    id: string | null;
    code: string | null;
    description: string | null;
  } | null;
  application: string | null;
  dimensions: {
    packageType: string;
    length: number;
    width: number;
    height: number;
    diameter: number;
  };
  weight: { net: number; gross: number };
  perCarton: number;
  variants: { id: string; code: string; name: string }[];
  attributes: { id: string; code: string; name: string }[];
  conversionFactor: number;
  classificationCode: string | null;
  active: boolean;
  taxClassification: {
    id: string;
    code: string;
    description: string;
    precedingTaxesRate: number;
    classification: string;
  } | null;
  isInventoryProduct: boolean;
  isMexicoProduct: boolean;

  images: ApiProductImage[];
  grid: ApiProductGrid | null;

  /* From Nomus */
  unit: { name: string; abbreviation: Uppercase<string> };
};

export type ApiProductImage = {
  content: string;
  description: string;
  type: "bmp" | "jpeg";
};

export type ApiProductGrid = {
  id: string;
  horizontal: {
    id: string;
    code: number;
    abbreviation: string;
    type: { id: string; code: string };
  };
  vertical: {
    id: string;
    code: number;
    abbreviation: string;
    type: { id: string; code: string };
  };
  productName: string;
};
