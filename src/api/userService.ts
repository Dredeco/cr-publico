import { IUser } from "@/types/User";
import jwt from "jsonwebtoken"

const axios = require('axios').default;

const url: string = process.env.FD_LOGIN_URL as string;

export const login = async (user: string, password: string) => {
    const data = {
        username: `${user}`,
        password: `${password}`
    }
    console.log(url)
    const token = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "alg": "HS256",
            "typ": "JWT"
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()).then((res) => res.access_token)

    const logedUser = jwt.decode(token)

    return logedUser
}