<template>
  <header class="navbar">
    <!-- 임시로고 클릭시 홈페이지로! -->
    <div class="navbar__logo">
      <router-link :to="{ name: 'Home' }">
        <img class="logo__img" src="@/assets/logo.png" />
      </router-link>
    </div>

    <!-- <div class="navbar__search">
      <input
        type="text"
        class="search"
        placeholder="검색"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='검색'"
      />
      <i class="fas fa-search search-icon"></i>
    </div> -->

    <div class="navbar__icons">
      <span v-if="isLogin">
        안녕하세요 {{ (myinfo && myinfo.username) || "Anonymous" }} 님
      </span>

      <span v-else> 로그인이 필요합니다. </span>

      <div>
        <div v-if="isLogin">
          <button class="log__btn" @click="onLogout">로그아웃</button>
        </div>
        <div v-else>
          <button class="log__btn">
            <router-link to="/login">로그인</router-link>
          </button>
        </div>
      </div>

      <div v-if="!isLogin">
        <button class="log__btn">
          <router-link to="/signup">회원가입</router-link>
        </button>
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
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
