import React from 'react'
import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = (heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}


const DynamicParallel = ({heroIds}) => {
    const queryResults = useQueries(
        heroIds.map(id=>{
            return {
                queryKey:['super-hero', id],
                queryFn:()=>fetchSuperHeroes(id)
            }
        })
    )
    console.log(queryResults);
    
    return (
        <div>
            {
                queryResults.map((queryResult, index)=>{
                    const {data, error, isLoading} = queryResult
                    if(isLoading){
                        return <p key={index}>Loading...</p>
                    }
                    if(error){
                        return <p key={index}>Error: {error.message}</p>
                    }
                    return <p key={index}>{index}:{data.data.name}</p>
                })
            }
        </div>
    )
}

export default DynamicParallel
