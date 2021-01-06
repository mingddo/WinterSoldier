<template>
  <div class="home">
    <section class="left_component">
      <Weather class="left__child left_componet_weather" />
      <Corona class="left__child left_componet_corona" />
      <Leftnavi class="left__child left_component_button" />
    </section>
    <section class="right_component">
      <Calendar />
      <div class="contentsFrame">
        <News />
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar/Calendar.vue";
import Weather from "./Weather.vue";
import Leftnavi from "@/components/common/Leftnavi.vue";
import Corona from "./Corona.vue";
import News from "./News.vue";
// import Realtime from "./Realtime.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Weather,
    Leftnavi,
    Corona,
    News,
  },
};
</script>