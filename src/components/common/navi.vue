<template>
   <header class="navbar">
    <div>
      <div v-if="isLogin">
        <div>
          안녕하세요! {{userinfo}}님
        </div>
        <button @click="onLogout">
          로그아웃
        </button>
      </div>
      <div v-else>
        로그인이 필요합니다.
      </div>
    </div>
    <div class="navbarLogo">
      <i class="fab fa-microblog"></i>
    </div>

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
      userinfo: (state) => state.userStore.userInfo,
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