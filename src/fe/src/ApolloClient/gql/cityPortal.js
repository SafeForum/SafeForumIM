import { gql } from "@apollo/client";

const GET_SINGLE_PORTAL = gql`
query GetSinglePortal($portalId: String!) {
  getSingleCityPortal(portalId: $portalId){
      _id
      city
      state
      users {
        _id
      }
      messageBoard {
        _id
      }
    }
  }
`

export default GET_SINGLE_PORTAL;