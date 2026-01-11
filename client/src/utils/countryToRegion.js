// ISO-2 Country Code → Business Region Mapping
// Regions: Africa | Europe | Americas | Asia

export const COUNTRY_TO_REGION = {
   /* =======================
      AFRICA
   ======================= */
   NG: "Africa", // Nigeria
   GH: "Africa", // Ghana
   ZA: "Africa", // South Africa
   KE: "Africa", // Kenya
   EG: "Africa", // Egypt
   MA: "Africa", // Morocco
   DZ: "Africa", // Algeria
   TN: "Africa", // Tunisia
   ET: "Africa", // Ethiopia
   TZ: "Africa", // Tanzania
   UG: "Africa", // Uganda
   RW: "Africa", // Rwanda
   SN: "Africa", // Senegal
   CI: "Africa", // Ivory Coast
   CM: "Africa", // Cameroon
   AO: "Africa", // Angola
   ZM: "Africa", // Zambia
   ZW: "Africa", // Zimbabwe
   BW: "Africa", // Botswana
   NA: "Africa", // Namibia
   MZ: "Africa", // Mozambique
   MW: "Africa", // Malawi
   SL: "Africa", // Sierra Leone
   LR: "Africa", // Liberia
   GM: "Africa", // Gambia
   TG: "Africa", // Togo
   BJ: "Africa", // Benin
   BF: "Africa", // Burkina Faso
   NE: "Africa", // Niger
   ML: "Africa", // Mali
   SD: "Africa", // Sudan
   SS: "Africa", // South Sudan
   CD: "Africa", // DR Congo
   CG: "Africa", // Republic of Congo
   GA: "Africa", // Gabon
   GQ: "Africa", // Equatorial Guinea
   SO: "Africa", // Somalia
   LY: "Africa", // Libya

   /* =======================
      EUROPE
   ======================= */
   GB: "Europe", // United Kingdom
   IE: "Europe", // Ireland
   FR: "Europe", // France
   DE: "Europe", // Germany
   NL: "Europe", // Netherlands
   BE: "Europe", // Belgium
   LU: "Europe", // Luxembourg
   ES: "Europe", // Spain
   PT: "Europe", // Portugal
   IT: "Europe", // Italy
   CH: "Europe", // Switzerland
   AT: "Europe", // Austria
   SE: "Europe", // Sweden
   NO: "Europe", // Norway
   DK: "Europe", // Denmark
   FI: "Europe", // Finland
   IS: "Europe", // Iceland
   PL: "Europe", // Poland
   CZ: "Europe", // Czech Republic
   SK: "Europe", // Slovakia
   HU: "Europe", // Hungary
   RO: "Europe", // Romania
   BG: "Europe", // Bulgaria
   GR: "Europe", // Greece
   HR: "Europe", // Croatia
   SI: "Europe", // Slovenia
   EE: "Europe", // Estonia
   LV: "Europe", // Latvia
   LT: "Europe", // Lithuania
   UA: "Europe", // Ukraine

   /* =======================
      AMERICAS (North + South)
   ======================= */
   US: "Americas", // United States
   CA: "Americas", // Canada
   MX: "Americas", // Mexico
   BR: "Americas", // Brazil
   AR: "Americas", // Argentina
   CL: "Americas", // Chile
   CO: "Americas", // Colombia
   PE: "Americas", // Peru
   VE: "Americas", // Venezuela
   EC: "Americas", // Ecuador
   BO: "Americas", // Bolivia
   PY: "Americas", // Paraguay
   UY: "Americas", // Uruguay
   GY: "Americas", // Guyana
   SR: "Americas", // Suriname
   JM: "Americas", // Jamaica
   TT: "Americas", // Trinidad & Tobago
   DO: "Americas", // Dominican Republic
   HT: "Americas", // Haiti
   CR: "Americas", // Costa Rica
   PA: "Americas", // Panama
   SV: "Americas", // El Salvador
   HN: "Americas", // Honduras
   GT: "Americas", // Guatemala
   NI: "Americas", // Nicaragua

   /* =======================
      ASIA
   ======================= */
   IN: "Asia", // India
   PK: "Asia", // Pakistan
   BD: "Asia", // Bangladesh
   LK: "Asia", // Sri Lanka
   NP: "Asia", // Nepal
   CN: "Asia", // China
   JP: "Asia", // Japan
   KR: "Asia", // South Korea
   TH: "Asia", // Thailand
   VN: "Asia", // Vietnam
   MY: "Asia", // Malaysia
   SG: "Asia", // Singapore
   ID: "Asia", // Indonesia
   PH: "Asia", // Philippines
   KH: "Asia", // Cambodia
   MM: "Asia", // Myanmar
   LA: "Asia", // Laos
   TW: "Asia", // Taiwan
   HK: "Asia", // Hong Kong
   MN: "Asia", // Mongolia
   AE: "Asia", // UAE
   SA: "Asia", // Saudi Arabia
   QA: "Asia", // Qatar
   KW: "Asia", // Kuwait
   OM: "Asia", // Oman
   IL: "Asia", // Israel
   TR: "Asia", // Turkey
};

export function resolveRegionFromCountry(countryCode) {
   if (!countryCode) return "Africa";
   return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? "Africa";
}
