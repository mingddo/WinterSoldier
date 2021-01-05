<template>
  <div class="home">
    <section class="left_component">
      <!-- <div class="left_component_weather"> -->
      <Weather class="left_componet_weather" />
      <Corona class="left_componet_corona" />
      <!-- </div> -->
      <!-- <Leftnavi class="left_component_button" /> -->
    </section>
    <section class="right_component">
      <Calendar />
      <div class="contentsFrame">
        <Bottomcontent />
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar/Calendar.vue";
import Weather from "./Weather.vue";
// import Leftnavi from "@/components/common/Leftnavi.vue";
import Corona from "./Corona.vue";
import Bottomcontent from "./Bottomcontent.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Weather,
    // Leftnavi,
    Corona,
    Bottomcontent,
  },
  data() {
    return {
      activetab: 1,
    };
  },
};
</script>