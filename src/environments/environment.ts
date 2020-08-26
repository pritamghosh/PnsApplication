// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
export const environment = {
  production: false,
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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
