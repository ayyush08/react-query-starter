//here we ffetch data using react-query
import React, { useState } from 'react'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';
// import { useQuery } from 'react-query'
// import axios from 'axios'

// const fetchSuperHeroes = ()=>{
//     return axios.get('http://localhost:4000/superheroes')
// }
const RQSuperHeroes = () => {

    // const [interval,setInterval] = useState(3000);
    const onSuccess = (data) => {
    console.log('Perform side effect after data fetching',data);
    // if(data?.data.length==4){
    //     setInterval(false)
    // }
}
    const onError = (error) => {
    console.log('Perform side effect after encountering an error',error);
    }
    
    // const {isLoading,data,isError,error,isFetching,refetch } = useQuery(
    //     'super-heroes',//query key
    //     fetchSuperHeroes,//fetch function
    //     {//query config options
    //         // staleTime: 5000,
    //         // refetchInterval:interval,
    //         // refetchIntervalInBackground:true,
    //         // enabled:false,
    //         onSuccess: onSuccess,
    //         onError: onError,
    //         select:(data)=>{
    //             const superHeroNames = data.data.map(hero=>hero.name)
    //             return superHeroNames
    //         }
    //     }
    // )

    const {isLoading,data,isError,error,isFetching,refetch } = useSuperHeroesData(onSuccess,onError)

    console.log({isLoading,isFetching});
    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
        <h2>RQ Super Heroes Page</h2>
        <button onClick={refetch}>Fetch Heroes</button>
        {/* {data?.data.map(hero=>{
            return <div key={hero.name}>{hero.name}</div>
        })} */}
        {data.map(heroName=>{
            return <div key={heroName}>{heroName}</div>
        })}
        </>
    )
}

export default RQSuperHeroes 
