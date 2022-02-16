import { gql } from '@apollo/client';

export const FetchCryptoData = gql`
    query {
        GetCryptoData {
            Name
            PreviousClosePrice
            Open
            Close
            Volume
            Current
            Logo
        }
    }
`