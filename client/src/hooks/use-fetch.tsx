import React, { useState } from 'react'
import { request } from "../request"

const useFetch: () => [boolean, Function, Function] = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const withLoading = (target: Function) => {
        return (...args: any) => {
            setIsLoading(true)
            const data = target(...args)
            setIsLoading(false)
            return data
        }
    }

    const get = withLoading(async (url: string) => {
        const response = await request.get(url)
        return response.data
    })

    const post = withLoading(async (url: string, data: object) => {
        const response = await request.post(url, data)
        return response.data
    })


    return [isLoading, get, post]
}

export default useFetch