import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";

import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://sheltered-shelf-92500.herokuapp.com"
});

const authLinkHttp = setContext(() => {
  const token = localStorage.getItem("receivedToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLinkHttp.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevtools: true
});

export default (
  <ApolloProvider client={client}>
    <App></App>
  </ApolloProvider>
);
