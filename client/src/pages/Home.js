import React from 'react'
import { useQuery, gql } from '@apollo/client';

const TEST = gql`
    query {
        test 
    }
`

function Home() {

    function GetData() {
        const { loading, error, data } = useQuery(TEST);

        if (loading) return <p>loading</p>
        if (error) return <p>error</p>

        return (
            <p>{data.test}</p>
        )
    }

    return (
            GetData()
    )
}

export default Home
