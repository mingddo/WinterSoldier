<template>
  <div class="home">
    <section class="left_component">
      <!-- <div class="left_component_weather"> -->
      <Weather class="left_componet_weather"/>
      <!-- </div> -->
      <Leftnavi class="left_component_button"/>
    </section>
    <section class="right_component">
      <Calendar/>
      <div class="contentsFrame">
        <!-- 오늘의 뉴스 등 콘텐츠 들어가는 박스 -->
        오늘의 뉘우스
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar/Calendar.vue'
import Weather from './Weather.vue'
import Leftnavi from '../components/common/Leftnavi.vue'

export default {
  name: 'Home',
  components: {
    Calendar,
    Weather,
    Leftnavi
  }
}
</script>