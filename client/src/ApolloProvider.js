import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://faceit-blog.jelastic.metropolia.fi/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken'); //get token from local storage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '' // set token as auth header
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);