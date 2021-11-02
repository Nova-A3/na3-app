export type ApiProduct = {
  active: boolean;
  application: string | null;
  attributes: { code: string; id: string; name: string }[];
  classificationCode: string | null;
  code: string;
  conversionFactor: number;
  customerIds: string[];
  dimensions: {
    diameter: number;
    height: number;
    length: number;
    packageType: string;
    width: number;
  };
  family: {
    code: string | null;
    description: string | null;
    id: string | null;
  } | null;
  grid: ApiProductGrid | null;
  group: { code: string; description: string; id: string } | null;
  /* From Bimer */
  id: string;
  images: ApiProductImage[];
  isInventoryProduct: boolean;
  isMexicoProduct: boolean;
  masterProductId: string | null;
  name: string;
  originProductId: string | null;
  perCarton: number;
  taxClassification: {
    classification: string;
    code: string;
    description: string;
    id: string;
    precedingTaxesRate: number;
  } | null;

  /* From Nomus */
  unit: { abbreviation: Uppercase<string>; name: string };
  variants: { code: string; id: string; name: string }[];

  weight: { gross: number; net: number };
};

export type ApiProductImage = {
  content: string;
  description: string;
  type: "bmp" | "jpeg";
};

export type ApiProductGrid = {
  horizontal: {
    abbreviation: string;
    code: number;
    id: string;
    type: { code: string; id: string };
  };
  id: string;
  productName: string;
  vertical: {
    abbreviation: string;
    code: number;
    id: string;
    type: { code: string; id: string };
  };
};
