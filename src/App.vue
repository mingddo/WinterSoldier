<template>
  <div id="app">
    <Navi />
    <ChatHome />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/weather">whether api test</router-link> |
      <router-link to="/stock">stock</router-link>
    </div>
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
