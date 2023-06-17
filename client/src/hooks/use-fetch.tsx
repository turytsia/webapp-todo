import React, { useState } from 'react'
import { request } from "../axios"

const useFetch = () => {

    // const { request } = useAxios()

    /**
     * 
     * @throws {AxiosError}
     */
    const get = async (url: string) => {
        const response = await request.get(url)
        return response.data
    }

    const post = async (url: string, data: object) => {
        const response = await request.post(url, data)
        return response.data
    }

    const remove = async (url: string) => {
        const response = await request.delete(url)
        return response.data
    }

    const update = async (url: string, data: object) => {
        const response = await request.patch(url, data)
        return response.data
    }


    return { get, post, remove, update }
}

export default useFetch
