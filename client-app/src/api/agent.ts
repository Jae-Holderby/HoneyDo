import axios, { AxiosResponse } from 'axios';
import { IThing } from '../models/Thing';

axios.defaults.baseURL = 'http://localhost:5000';

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Things = {
    list: (): Promise<IThing[]> => requests.get('/things'),
    create: (thing: IThing) => requests.post('/things', thing),
    update: (thing: IThing) => requests.put(`/things/${thing.id}`, thing),
    delete: (id: string) => requests.delete(`things/${id}`)
}

export default {
    Things
}