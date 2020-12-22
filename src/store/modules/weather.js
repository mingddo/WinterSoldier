import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const BASE_URL = process.env.VUE_APP_WEATHER_API_URL_BASE;

const weather = {
  namespace: false,
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
    location: '서울',
    temp: '12',
    today: {
      year: '2020',
      month: '12',
      date: '22',
    },
  },
  getters: {},
  mutations: {},
  actions: {
    getWeatherData: ({ state }) => {
      let dateObj = new Date();
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth() + 1; // 0 ~ 11 반환.
      let date = dateObj.getDate();
      let base_date = `${year}${month}${date}`;

      state.today = {
        year,
        month,
        date,
      };

      let nx = state.locations[state.location][0];
      let ny = state.locations[state.location][1];

      let numOfRows = '100';
      let dataType = 'JSON';
      let base_time = '0500';

      let url = `${BASE_URL}?serviceKey=${API_KEY}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

      console.log(url);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.response.body.items.item);
        })
        .catch((err) => {
          console.log('Error 발생!!');
          console.log(err);
        });
    },
  },
};

export default weather;
