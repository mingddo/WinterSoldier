<template>
  <div class="home">
    <Calendar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from './Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar,
  }
}
</script>
