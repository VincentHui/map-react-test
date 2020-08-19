import * as clients from "./clients.json";

const getCountriesDict = (client) =>
  client.reduce((acc, client) => {
    acc[client.Country] = acc[client.Country] || {};
    acc[client.Country][client.City] = acc[client.Country][client.City] || [];
    acc[client.Country][client.City].push(client);
    return acc;
  }, {});

export const Countries = getCountriesDict(clients.default.Customers);
