import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_WEATHER_API_URL_BASE;

export const getWeatherData = ({ state, commit }, loc) => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1; // 0 ~ 11 반환.
  let date = dateObj.getDate();
  let time = dateObj.getHours();
  let base_date = `${year}${month}${date}`;

  let yesterday = new Date(dateObj.getTime() - 24 * 3600 * 1000);

  state.today = {
    year,
    month,
    date,
  };

  let nx = state.locations[loc][0];
  let ny = state.locations[loc][1];

  let numOfRows = '10';
  let dataType = 'JSON';
  let base_time_list = [2, 5, 8, 11, 14, 17, 20, 23];
  let base_time = '';

  for (let hour of base_time_list) {
    if (Number(time) <= 2) {
      base_time = '2300';
      base_date = `${yesterday.getFullYear()}${yesterday.getMonth() +
        1}${yesterday.getDate()}`;
      break;
    }

    if (Number(time) >= hour) {
      base_time =
        String(hour).length === 1 ? `0${String(hour)}00` : `${String(hour)}00`;
    } else if (Number(time) === 0 || Number(time) === 1) {
      base_time = `0${String(hour)}00`;
      break;
    } else {
      break;
    }
  }

  let url = `${BASE_URL}?serviceKey=${API_KEY}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

  axios
    .get(url)
    .then((res) => {
      commit('getWeatherData', res.data.response.body.items.item);
    })
    .catch((err) => {
      console.log('---------------------------------------------');
      console.log('Error 발생!!');
      console.log(err);
      console.log('---------------------------------------------');
    });
};
