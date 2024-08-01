//here we ffetch data using react-query
import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}
const RQSuperHeroes = () => {
    const {isLoading,data,isError,error,isFetching } = useQuery('super-heroes',fetchSuperHeroes,
        {
            // staleTime: 5000,
            // refetchInterval:2000,
            // refetchIntervalInBackground:true
        }
    )

    console.log({isLoading,isFetching});
    if(isLoading){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
        <h2>RQ Super Heroes Page</h2>
        {data?.data.map(hero=>{
            return <div key={hero.name}>{hero.name}</div>
        })}
        </>
    )
}

export default RQSuperHeroes 
