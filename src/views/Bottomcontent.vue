<template>
  <div id="tabs">
    <div class="tabs">
      <a
        v-on:click="activetab = 1"
        v-bind:class="[activetab === 1 ? 'active' : '']"
        >뉴스</a
      >
      <a
        v-on:click="activetab = 2"
        v-bind:class="[activetab === 2 ? 'active' : '']"
        >주식</a
      >
    </div>

    <div class="content">
      <div v-if="activetab === 1" class="tabcontent">
        <News />
      </div>
      <div v-if="activetab === 2" class="tabcontent">
        <!-- <Stock /> -->
      </div>
    </div>
  </div>
</template>
<script>
import News from "./News";
// import Stock from "./Stock";

export default {
  components: { 
    News, 
    // Stock
    },
  data() {
    return { activetab: 1 };
  },
};
</script>

<style scoped src="@\assets\bottomcontent.css">
</style>