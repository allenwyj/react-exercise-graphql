import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

// specifying which mutation type will be called (ToggleCartHidden),
// and for this type of mutation, clarifying what's the actual mutation body (toggleCartHidden)
// and where to find this body - defined in the resolvers on the client side.
// toggleCartHidden is an arrow function in the resolvers
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// There will be a function between Mutation component tag
// toggleCartHidden will be passed by Mutation tag as the parameter, which is an call-back function
// toggleCartHidden will get called inside of CartIcon component, it actually changes the value stored in the cache.
const CartIconContainer = () => (
  <Query query={GET_ITEM_COUNT}>
    {({ data: { itemCount } }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {toggleCartHidden => (
          <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartIconContainer;
