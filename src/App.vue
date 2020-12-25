<template>
  <div id="app">
    <Navi />
    <ChatHome />
    <router-view />
  </div>
</template>

<script>
import ChatHome from './components/ChatBot/ChatHome.vue';
import Navi from './components/common/navi.vue';
export default {
  name: 'App',
  components: {
    Navi,
    ChatHome
  },
}
</script>

<style></style>
