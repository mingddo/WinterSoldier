import { createInstance } from './index.js'

const instance = createInstance();

function getnews(query, success, fail) {
    instance
        .get(`news/crawler/${query}/`)
        .then(success)
        .catch(fail);

}


function realtimeList(success, fail) {
    instance
        .get(`news/daymost/`)
        .then(success)
        .catch(fail);

}

export { getnews, realtimeList }