<template>
   <header class="navbar">
    <div>
    <div v-if="isLogin">
      안녕하세요! {{username}}님
    </div>
    <div v-else>
      누구세요;
    </div>
    <button @click="onLogout">
      로그아웃
    </button>
  </div>
    <div class="navbarLogo">
      <i class="fab fa-microblog"></i>
    </div>
    <ul class="navbarCategory">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/weather">whether api test</router-link> |
      <router-link to="/stock">stock</router-link>
      <!-- <li>안녕하세요 000님!</li>
      <li>주식</li>
      <li>영화예매</li>
      <li>날씨</li>
      <li>로그아웃</li> -->
    </ul>
    <div class="navbarIcons">
      <div class="search-bar">
        <input type="text" class="search" placeholder="검색">
        <i class="fas fa-search"></i>
      </div>
      <i class="fas fa-user"></i>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'Navi',
  computed: {
    ...mapState({
      username: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  },
  methods: {
    onLogout () {
      this.$store.dispatch("userStore/LOGOUT")
      alert("로그아웃!")
    },
  },

}
</script>

<style>

</style>