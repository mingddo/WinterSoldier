export const getWeatherData = (state, data) => {
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
        state.sky = '눈';
      } else if (data.fcstValue === '3') {
        state.sky = '눈';
      } else if (data.fcstValue === '4') {
        state.sky = '바';
      } else if (data.fcstValue === '5') {
        state.sky = '비';
      } else if (data.fcstValue === '6') {
        state.sky = '비';
      } else if (data.fcstValue === '7') {
        state.sky = '눈';
      }
    }
  });
};
