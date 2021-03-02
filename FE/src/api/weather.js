import { createInstance } from './index.js';

const instance = createInstance();

function getWeatherInfo(base_date, base_time, nx, ny, success, fail) {
  instance
    .get(`weather/${base_date}/${base_time}/${nx}/${ny}/`)
    .then(success)
    .catch(fail);
}
export { getWeatherInfo };
