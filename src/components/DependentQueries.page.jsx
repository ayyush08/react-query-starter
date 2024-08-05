import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (email)=>{
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChanneld = (channelId)=>{
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueries = ({email}) => {

    const {data:user} = useQuery(['user', email], ()=>fetchUserByEmail(email))

    const channelId = user?.data.channelId

    const {data:courses} = useQuery(['courses', channelId], ()=>fetchCoursesByChanneld(channelId),
{
    enabled: !!channelId,
})

    return (
        <div>
            DependentQueries
        </div>
    )
}

export default DependentQueries
