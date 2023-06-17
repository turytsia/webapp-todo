import axios from "axios";
import { useEffect, useMemo, useState } from "react";

// FIXME

const request = axios.create({
    baseURL: 'http://localhost:8000',
})

const useAxios = () => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    request.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token")

    return { token, setToken, request }
}

export default useAxios