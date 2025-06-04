import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders($status: String, $provider: String) {
    orders(status: $status, provider: $provider) {
      id
      reference
      provider
      status
      eta
      creationDate
      origin
      destination
      trackingNumber
      notes
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      reference
      provider
      status
      eta
      creationDate
      origin
      destination
      trackingNumber
      notes
    }
  }
`;
