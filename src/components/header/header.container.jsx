import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

// query for fetching data
// @client - identify fetching data from the local cache
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

// destructuring data property from the returned object
const HeaderContainer = () => (
  <Query query={GET_CART_HIDDEN}>
    {({ data: { cartHidden } }) => <Header hidden={cartHidden} />}
  </Query>
);

export default HeaderContainer;
