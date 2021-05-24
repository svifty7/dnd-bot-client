export default class Helpers {
    static isQuerySuccess(response) {
        return response.status === 200 && response.statusText === 'OK'
    }
}
