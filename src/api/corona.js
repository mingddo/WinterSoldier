import { createInstance } from './index.js'

const instance = createInstance();

function getInfo(success, fail) {
    instance
        .get('corona/')
        .then(success)
        .catch(fail);

}
export { getInfo }