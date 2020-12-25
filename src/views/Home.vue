<template>
  <div class="home">
    <section class="left_component">
      <!-- <div class="left_component_weather"> -->
        <Weather class="left_componet_weather"/>
      <!-- </div> -->
      <div class="left_component_button">
        <div>버튼 클릭클릭</div>
        <div>버튼 클릭클릭</div>
        <div>버튼 클릭클릭</div>
      </div>
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

export default {
  name: 'Home',
  components: {
    Calendar,
    Weather,
  }
}
</script>
