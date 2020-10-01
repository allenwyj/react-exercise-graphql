import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionItem from './collection-item.component';

// AddItemToCart($item: Item!) - the mutation type, $item is saying it's the variable.
// addItemToCart will be passed an argument which the name is item and its value is $item.
const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItemContainer = props => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {addItemToCart => (
      <CollectionItem
        {...props}
        addItem={item => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default CollectionItemContainer;
