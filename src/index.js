import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo';
// connect the client to the specific endpoint(/graphql)
import { createHttpLink } from 'apollo-link-http';
// used to cache the data that it fetched already
import { InMemoryCache } from 'apollo-cache-inmemory';
// gql is the function that can understand the syntax of GraphQL (the JSON-like object)
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

// establishing the connection to the backend
// createHttpLink() takes object as the argument
// uri is the endpoint that we will use to fetch data from.
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

// creating the cache object
const cache = new InMemoryCache();

// making the client by passing an object as the argument
// link - points to where to request
// cache - points to where to cache
const client = new ApolloClient({
  link: httpLink,
  cache: cache,
  typeDefs,
  resolvers
});

// write data to the cache immediately after the client instantiated
// these data will be stored as cache
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
});

// wrapped the application inside the ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
