import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount } from './cart.utils';

// extends in graphql: extend to the existing type of mutation that might exist in the back-end.
// If exists, then modify it
// If doesn't exist, then add it
// it's type definition inside of the Mutation.
// AddItemToCart(item: Item!): [Item]! - AddItemToCart method takes item as the parameter
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

// A query to read from the cache about the initial value
// @client - specify where to fetch data from the client side - looking for the value on the local cache.
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// defining the mutations, queries or additional types that might exist on the client side
// Inside of Mutation, they are the actual mutation definitions.
// Mutation takes four parameter and they are meant to not be modified.
// _root：represents the top level object that holds the actual type. like the parent class.
//        For mutation object, it will be an empty object, because mutation is the highest level object.
// _args: represents all of the arguments that can be accessed to inside of the mutation.
// _context: the cache and the client, normally just destructuring: { cache }
// _info: the information about the query or the mutation
export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // passing the actual query to make an request to the cache
      // { cartHidden } = data.cartHidden
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      // updating the cart hidden value,
      // query - identifies where to update this data
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      // return the value in case we might need it.
      return !cartHidden;
    },

    // AddItemToCart(Item) mutation's body
    addItemToCart: (_root, { item }, { cache }) => {
      // fetching the existing cart items
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      // using the utils function
      const newCartItems = addItemToCart(cartItems, item);

      // calculating the total number of items in cart
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
      });

      // updating the new cart items to the cache
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });

      return newCartItems;
    }
  }
};
