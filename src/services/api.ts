import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:3333/",
    timeout: 10000,
})

export const getPodcast = () =>
    new Promise((resolve, reject) => {
        api.get(`episodes`, {
            params: {
                _limit: 12,
                _sort: "published_at",
                _order: "desc",
            },
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })

export const getSinglePodcast = (slug) =>
    new Promise((resolve, reject) => {
        api.get(`episodes/${slug}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
