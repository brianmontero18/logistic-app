import { gql } from '@apollo/client';

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
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
