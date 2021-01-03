import { createInstance } from './index.js'

const instance = createInstance();

function getnews(query, success, fail) {
    instance
        .get(`news/${query}/`)
        .then(success)
        .catch(fail);

}
export { getnews }