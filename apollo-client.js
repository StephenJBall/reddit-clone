import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STEPZEN_URI,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
