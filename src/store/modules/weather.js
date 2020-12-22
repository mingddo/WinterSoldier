import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_WEATHER_API_URL_BASE;

const weather = {
  namespace: true,
  state: {
    locations: {
      서울: [60, 127],
      부산: [98, 76],
      대구: [89, 90],
      인천: [55, 124],
      광주: [58, 74],
      대전: [67, 100],
      울산: [102, 84],
      세종: [66, 103],
      경기: [60, 120],
      강원: [73, 134],
      충북: [69, 107],
      충남: [68, 100],
      전북: [63, 89],
      전남: [51, 67],
      경북: [89, 91],
      경남: [91, 77],
      제주: [52, 38],
    },
    temp: '12',
    sky: '',
    pop: '',
    today: {
      year: '2020',
      month: '12',
      date: '22',
    },
  },
  getters: {},
  mutations: {
    getWeatherData(state, data) {
      let first_fcst_time = data[0].fcstTime;
      let fcst_data = data.filter((d) => {
        return d.fcstTime === first_fcst_time;
      });

      fcst_data.forEach((data) => {
        if (data.category === 'POP') {
          state.pop = data.fcstValue;
        } else if (data.category === 'SKY') {
          if (data.fcstValue === '1') {
            state.sky = '맑음';
          } else if (data.fcstValue === '3') {
            state.sky = '구름 많음';
          } else {
            state.sky = '흐림';
          }
        } else if (data.category === 'T3H') {
          state.temp = data.fcstValue;
        } else if (data.category === 'PTY') {
          if (data.fcstValue === '1') {
            state.sky = '비';
          } else if (data.fcstValue === '2') {
            state.sky = '진눈개비';
          } else if (data.fcstValue === '3') {
            state.sky = '눈';
          } else if (data.fcstValue === '4') {
            state.sky = '소나기';
          } else if (data.fcstValue === '5') {
            state.sky = '빗방울';
          } else if (data.fcstValue === '6') {
            state.sky = '빗방울/눈날림';
          } else if (data.fcstValue === '7') {
            state.sky = '눈날림';
          }
        }
      });
    },
  },
  actions: {
    getWeatherData: ({ state, commit }, loc) => {
      let dateObj = new Date();
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth() + 1; // 0 ~ 11 반환.
      let date = dateObj.getDate();
      let time = dateObj.getHours();
      let base_date = `${year}${month}${date}`;

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
        if (Number(time) > hour) {
          base_time =
            String(hour).length === 1
              ? `0${String(hour)}00`
              : `${String(hour)}00`;
          break;
        } else if (Number(time) === 0 || Number(time) === 1) {
          base_time = `0${String(hour)}00`;
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
          console.log('Error 발생!!');
          console.log(err);
        });
    },
  },
};

export default weather;
