<template>
  <div id="app">
    <Navi/>
    <ChatHome/>
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
import ChatHome from './components/ChatBot/ChatHome.vue'
import Navi from './components/common/navi.vue'
export default {
  name: 'App',
  components: {
    Navi,
    ChatHome
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
