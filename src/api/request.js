import axios from 'axios'
import Cookies from 'js-cookie'
const client = axios.create({baseURL : 'https://api.godiva.gomaplus.tech/api/v1'})
export const  request = async ({...options}) => {
    client.defaults.headers.common.Authorization =`Bearer ${Cookies.get('_casher_token')}`
    client.defaults.timeout = 6000
    const onSuccess = (res) => {
        return res
    }
    const onError = (err) => {
        return err
    }
    return client(options)
    .then((res) => res)
}