import { AxiosResponse } from 'axios';

export default class Helpers {
    static isQuerySuccess(response: AxiosResponse): boolean {
        return response.status === 200 && response.statusText === 'OK'
    }
}
