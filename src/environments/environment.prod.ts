export const environment = {
  production: true,
  tax: 18,
  keycloak: {
    issuer: "https://pns.southeastasia.cloudapp.azure.com/auth/",
    realm: "PNS_REALM",
    clientId: "pns-ui",
  },
  contractSearchOption: [
    {
      value: "Search Contract",
      type: "search",
      searchFieldName: "Enter Key for Searching",
      searchButtonName: "Search",
      hidden: false,
    },
    {
      value: "Find By AMC Start Date",
      type: "byAmcDateRange",
      searchButtonName: "Find By Date",
      hidden: true,
    },
    {
      value: "Find By Contract Create/Renew Date",
      type: "byCreationDateRange",
      searchButtonName: "Find By Date",
      hidden: true,
    },
    {
      value: "Find By Proposal No",
      type: "byProposalNo",
      searchFieldName: "Enter Proposal No",
      searchButtonName: "Find By Proposal No",
      hidden: false,
    },
    {
      value: "Find All",
      type: "all",
      searchFieldName: "Keep It Blank",
      searchButtonName: "Find All",
      hidden: false,
    },
  ],

  designations: [
    "Customer Executive",
    "Engineer",
    "Service Delivery Manager",
    "Branch Manager",
    "Operation Head",
  ],
  baseLocations: ["KOLKATA", "BHUBANESWAR"],

  domains: ["PNS Proprietorship", "PNS Partnership"],
};
