<template>
  <header class="navbar">
    <!-- 임시로고 클릭시 홈페이지로! -->
    <div class="navbar__logo">
      <router-link :to="{ name: 'Home' }">
        <img class="logo__img" src="@/assets/logo.png" />
      </router-link>
    </div>

    <div class="navbar__icons">
      <span v-if="isLogin">
        안녕하세요 {{ (myinfo && myinfo.username) || "Anonymous" }} 님
      </span>

      <span v-else> 로그인이 필요합니다. </span>

      <div v-if="isLogin">
        <button class="log__btn" @click="onLogout">로그아웃</button>
      </div>

      <div class="signup__wrapper">
        <button v-if="!isLogin" class="log__btn">
          <router-link to="/login">로그인</router-link>
        </button>

        <button v-if="!isLogin" class="log__btn">
          <router-link to="/signup">회원가입</router-link>
        </button>
      </div>

      <div v-if="myinfo">
        <router-link
          :to="{
            name: 'Profile',
            query: { name: (myinfo && myinfo.username) || 'Anonymous' },
          }"
          ><i class="fas fa-user"></i
        ></router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navi",
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  },
  methods: {
    onLogout() {
      this.$store.dispatch("userStore/LOGOUT");
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style></style>
