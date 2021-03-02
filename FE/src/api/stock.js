import {createInstance} from './index.js'

const instance = createInstance();

function getstockdata(companycode, period, success, fail) {
    instance
    .get(`stocks/${companycode}/${period}/`)
    .then(success)
    .catch(fail);

}
export {getstockdata}