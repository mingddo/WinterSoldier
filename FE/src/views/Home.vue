<template>
  <div class="home">
    <section class="left_component">
      <Navi class="left_child navbar navbar__active-lg" />
      <Weather class="left__child left_componet_weather" />
      <Corona class="left__child left_componet_corona" />
    </section>
    <section class="right_component">
      <Calendar />
      <div class="contentsFrame">
        <Bottomcontent />
      </div>
    </section>
    <!-- row-reverse 이므로 가장 밑에 위치. -->
    <Navi class="navbar navbar__active-sm" />
  </div>
</template>

<script>
import Navi from '@/components/common/navi.vue';

// @ is an alias to /src
import Calendar from '@/components/Calendar/Calendar.vue';
import Weather from './Weather.vue';
// import Leftnavi from "@/components/common/Leftnavi.vue";
import Corona from './Corona.vue';
import Bottomcontent from './Bottomcontent.vue';

export default {
  name: 'Home',
  components: {
    Calendar,
    Weather,
    // Leftnavi,
    Corona,
    Bottomcontent,
    Navi,
  },
  data() {
    return {
      activetab: 1,
    };
  },
};
</script>
