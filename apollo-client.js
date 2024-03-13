import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.STEPZEN_URI,
    headers: {
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
