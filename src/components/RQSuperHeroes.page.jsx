//here we ffetch data using react-query
import React, { useState } from 'react'
import { useSuperHeroesData,useAddSuperHeroData } from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query'
// import axios from 'axios'

// const fetchSuperHeroes = ()=>{
//     return axios.get('http://localhost:4000/superheroes')
// }
const RQSuperHeroes = () => {
    const [name,setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')
    // const [interval,setInterval] = useState(3000);
    const onSuccess = (data) => {
        console.log('Perform side effect after data fetching', data);
        // if(data?.data.length==4){
        //     setInterval(false)
        // }
    }
    const onError = (error) => {
        console.log('Perform side effect after encountering an error', error);
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

    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

    const handleAddHeroClick = () => {
        console.log({name,alterEgo});
        const hero = {name,alterEgo}
        addHero(hero)
    }
    const {mutate:addHero}=useAddSuperHeroData()

    console.log({ isLoading, isFetching });
    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
        // console.log(error);
        
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    value={alterEgo}
                    onChange={e => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            <button onClick={refetch}>Fetch Heroes</button>
            {data?.data.map(hero => {
                return <div key={hero.id}>
                    <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                </div>
            })}
            {/* {data.map(heroName=>{
            return <div key={heroName}>{heroName}</div>
        })} */}
        </>
    )
}

export default RQSuperHeroes 
