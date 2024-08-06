import { useQuery,useMutation,useQueryClient } from "react-query"
import axios from "axios"

const fetchSuperHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes',hero)
}

export const useSuperHeroesData = (onSuccess,onError) => {
    return useQuery(
        'super-heroes',//query key
        fetchSuperHeroes,//fetch function
        {//query config options
            // staleTime: 5000,
            // refetchInterval:interval,
            // refetchIntervalInBackground:true,
            // enabled:false,
            onSuccess,
            onError,
            // select:(data)=>{
            //     const superHeroNames = data.data.map(hero=>hero.name)
            //     return superHeroNames
            // }
        }
    )
}

export const useAddSuperHeroData = ()=>{
    const queryClient = useQueryClient()

    return useMutation(addSuperHero,{
        // onSuccess:(data)=>{
        //     // queryClient.invalidateQueries('super-heroes')
        //     //seetQueryData is used to update query cache
        //     queryClient.setQueryData('super-heroes', (oldData) => {
        //         return {
        //             ...oldData,
        //             data:[...oldData.data,data.data]
        //         }
        //     })
        // }
        onMutate: async(newHero)=>{
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', (oldData) => {
                        return {
                            ...oldData,
                            data:[...oldData.data,{
                                id: oldData?.data?.length+1,
                                ...newHero
                            }]
                        }
                    })
            return {
                previousHeroData
            }
        },
        onError: (_error,_hero,context)=>{
            queryClient.setQueryData('super-heroes',context.previousHeroData)
        },
        onSettled: ()=>{
            queryClient.invalidateQueries('super-heroes')
        },
    })
}