import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

const client = new ApolloClient({
  uri: "https://sertao.stepzen.net/api/alert-bee/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
