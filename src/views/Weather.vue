<template>
  <div class="weather">
    <span class="weather__date"
      >{{ today.year }}년 {{ today.month }}월 {{ today.date }}일</span
    >
    <div class="weather__select">
      <label for="city-select">CITY</label>
      <select name="" id="city-select">
        <option v-for="(loc, idx) in locations" :key="idx" :value="idx">{{
          idx
        }}</option>
      </select>
    </div>
    <div class="weather__info">
      <h2>서울</h2>
      <h3>{{ temp }}°C</h3>
    </div>
    <div class="weather__recommend">
      <i class="fas fa-mitten"></i>
      <span>추워요~!</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Weather',
  computed: {
    ...mapState({
      locations: (state) => state.weather.locations,
      today: (state) => state.weather.today,
      temp: (state) => state.weather.temp,
    }),
  },
  methods: {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-ser if;
}

#weather {
  background-image: url('../assets/cold-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#weather.warm {
  background-image: url('../assets/warm.jpg');
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  /* html의 input 요소는 브라우저의 기본 스타일을 대부분 따른다. */

  appearance: none; /* 크롬에서 기본적으로 제공하는 스타일 제거 */
  border: none; /* border는 객체를 둘러싼 선 */
  outline: none; /* outline은 말 그대로 border 바로 바깥의 외곽선 */
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  transition: 0.4s;
}

/* input 태그에 커서를 올렸을 때 -> :focus */
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
