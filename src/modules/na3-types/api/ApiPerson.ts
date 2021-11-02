type ApiPersonCategory = {
  active: boolean;
  code: string;
  id: string;
  name: string;
};

export type ApiPersonContact = {
  email: string | null;
  emailBilling: string | null;
  emailBillingDoc: string | null;
  emailInvoice: string | null;
  fax: string | null;
  id: string;
  isMainContact: boolean;
  mobile: string | null;
  name: string;
  phone: string | null;
  registrationType: "A" | "E" | "I" | null;
  support: string | null;
  website: string | null;
};

export type ApiPersonAddress = {
  active: boolean;
  addressChunks: string[];
  addressFull: string;
  addressLine2: string;
  addressTypes: string[];
  city: {
    areaCode: string;
    code: string;
    ibgeCode: string;
    id: string;
    name: string;
    state: {
      abbreviation: string;
      ibgeCode: number;
      name: string;
    } | null;
  } | null;
  code: string;
  contactPeople: ApiPersonContact[];
  contactPersonMain: ApiPersonContact | null;
  icmsStatus: "1" | "2" | "9";
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  latLong: [number, number];
  neighborhood: { code: string; id: string; name: string } | null;
  note: string;
  stateAbbreviation: string;
  status: string | null;
  street: string;
  streetNumber: string;
  streetType: { id: string; name: string } | null;
  suframaCode: string;
  zipCode: string | null;
};

export type ApiPerson = {
  addressMain: ApiPersonAddress | null;
  addresses: ApiPersonAddress[];
  birthDate: string | null;
  categories: ApiPersonCategory[];
  code: string;
  commCustomerType: string;
  contactPersonMain: ApiPersonContact | null;
  dataIsRestricted: boolean;
  foundedAt: string;
  id: string;
  irrfRate: number | null;
  isDefaulting: boolean;
  isFederalPublicAdmEntity: boolean;
  isServiceProvider: boolean;
  name: string;
  nickname: string;
  profilePic: {
    content: string;
    description: string;
    type: "bmp" | "jpeg";
  } | null;
  registeredAt: string;
  taxId: string | null;
  type: 0 | 1;
  withHoldsAnyValue: boolean;
  withHoldsContributionTaxes: boolean;
};
