import React,{Fragment} from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}
const InfiniteQueries = () => {
    const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['colors'], fetchColors,
        {
            getNextPageParam: (_lastpage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1;
                } else {
                    return undefined
                }
            }
        }
    )
    // console.log(data.pages[0]);


    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <div>
                {data?.pages.map((group, i) => {
                    console.log(group.data[1]);
                    
                    return (
                        <Fragment key={i}>
                            {
                                group.data.map((color) => {
                                    return <h2 key={color.id}>
                                        {color.id} {color.label}
                                    </h2>
                                })
                            }
                        </Fragment>
                    )
                })}
            </div>
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching..' : null}</div>
        </>
    )
}

export default InfiniteQueries
