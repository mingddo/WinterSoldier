import { createInstance } from './index.js'

const instance = createInstance();

function getInfo(success, fail) {
    instance
        .get('corona/')
        .then(success)
        .catch(fail);

}

function getCityInfo(success, fail) {
    instance
        .get('corona/city/')
        .then(success)
        .catch(fail);

}

export { getInfo, getCityInfo }