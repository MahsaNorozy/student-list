import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
  uri: "http://localhost:5150/graphql", // oder https://localhost:5001/graphql
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  debug: true,
  link: httpLink,
});

export default client;
