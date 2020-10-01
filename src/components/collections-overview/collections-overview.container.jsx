import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

// making the query to fetch data from GraphQL
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

// wrapping between Query component will allow to make the request by using query key
// and this Query component will return back a function with an object containing
// multiple fields, such as loading, error and data.
const CollectionsOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, error, data }) => {
      console.log({ loading });
      console.log({ error });
      console.log({ data });
      if (loading) return <Spinner />;
      return <CollectionsOverview collections={data.collections} />;
    }}
  </Query>
);

export default CollectionsOverviewContainer;
