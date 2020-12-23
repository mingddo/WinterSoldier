<template>
  <div id="app">
    <Navi />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/weather">whether api test</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navi from './components/common/navi.vue';
export default {
  name: 'App',
  components: {
    Navi,
  },
};
</script>

<style></style>
