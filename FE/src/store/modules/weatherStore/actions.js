import { getWeatherInfo } from '@/api/weather.js';

export const getWeatherData = ({ state, commit }, loc) => {
  let dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = make_string(dateObj.getMonth() + 1); // 0 ~ 11 반환.
  let date = make_string(dateObj.getDate());
  let time = make_string(dateObj.getHours());
  let base_date = `${year}${month}${date}`;

  let yesterday = new Date(dateObj.getTime() - 24 * 3600 * 1000);

  state.today = {
    year,
    month,
    date,
  };

  let nx = state.locations[loc][0];
  let ny = state.locations[loc][1];

  let base_time_list = [2, 5, 8, 11, 14, 17, 20, 23];
  let base_time = '';

  for (let hour of base_time_list) {
    if (Number(time) <= 2) {
      base_time = '2300';
      base_date = `${yesterday.getFullYear()}${make_string(
        yesterday.getMonth() + 1
      )}${make_string(yesterday.getDate())}`;
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

  getWeatherInfo(
    base_date,
    base_time,
    nx,
    ny,
    (res) => {
      // console.log(res);
      commit('getWeatherData', res.data.response.body.items.item);
    },
    (err) => {
      console.log(err);
    }
  );
};

function make_string(num) {
  let tmp = String(num);
  if (tmp.length == 1) {
    return `0${tmp}`;
  }
  return tmp;
}
