<template>
  <nav>
    <ul class="navbarCategory navbarCategory-list">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/signup">Signup</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/weather">whether api test</router-link>
      </li>
      <li>
        <router-link to="/stock">stock</router-link>
      </li>
      <li v-if="userinfo">
        <router-link :to="{name: 'Profile', query: {name: userinfo.username  }}">{{ userinfo.username }} 님의 profile 가기!</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  },
};
</script>

<style>

</style>
