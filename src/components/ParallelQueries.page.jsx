import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = ()=>{
    return axios.get('http://localhost:4000/friends')
}


const ParallelQueries = () => {

    const { data:superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
    const { data:friends }  = useQuery('friends', fetchFriends)
    return (
        <div>
            {
                superHeroes && friends && (
                    <div>
                        <h2>Super Heroes</h2>
                        <ul>
                            {
                                superHeroes.data.map(hero=>(
                                    <li key={hero.id}>{hero.name}</li>
                                ))
                            }
                        </ul>
                        <h2>Friends</h2>
                        <ul>
                            {
                                friends.data.map(friend=>(
                                    <li key={friend.id}>{friend.name}</li>
                                ))
                            }
                        </ul>
                    </div>
            )}
        </div>
    )
}

export default ParallelQueries
