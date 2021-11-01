type ApiPersonCategory = {
  id: string;
  active: boolean;
  code: string;
  name: string;
};

export type ApiPersonContact = {
  id: string;
  name: string;
  isMainContact: boolean;
  fax: string | null;
  email: string | null;
  emailInvoice: string | null;
  emailBilling: string | null;
  emailBillingDoc: string | null;
  website: string | null;
  registrationType: "A" | "E" | "I" | null;
  mobile: string | null;
  phone: string | null;
  support: string | null;
};

export type ApiPersonAddress = {
  code: string;
  active: boolean;
  zipCode: string | null;
  neighborhood: { id: string; code: string; name: string } | null;
  city: {
    id: string;
    code: string;
    name: string;
    areaCode: string;
    ibgeCode: string;
    state: {
      ibgeCode: number;
      name: string;
      abbreviation: string;
    } | null;
  } | null;
  street: string;
  streetNumber: string;
  addressLine2: string;
  streetType: { id: string; name: string } | null;
  addressFull: string;
  addressChunks: string[];
  latLong: [number, number];
  contactPersonMain: ApiPersonContact | null;
  contactPeople: ApiPersonContact[];
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  status: string | null;
  addressTypes: string[];
  stateAbbreviation: string;
  icmsStatus: "1" | "2" | "9";
  suframaCode: string;
  note: string;
};

export type ApiPerson = {
  id: string;
  code: string;
  name: string;
  nickname: string;
  taxId: string | null;
  birthDate: string | null;
  categories: ApiPersonCategory[];
  registeredAt: string;
  addressMain: ApiPersonAddress | null;
  addresses: ApiPersonAddress[];
  profilePic: {
    content: string;
    description: string;
    type: "bmp" | "jpeg";
  } | null;
  dataIsRestricted: boolean;
  isDefaulting: boolean;
  contactPersonMain: ApiPersonContact | null;
  type: 0 | 1;
  commCustomerType: string;
  withHoldsContributionTaxes: boolean;
  withHoldsAnyValue: boolean;
  isServiceProvider: boolean;
  irrfRate: number | null;
  foundedAt: string;
  isFederalPublicAdmEntity: boolean;
};
