<template>
  <header class="navbar">
    <!-- 임시로고 클릭시 홈페이지로! -->
    <div class="navbar__logo">
      <router-link :to="{ name: 'Home' }">
        <img
          class="logo__img"
          src="https://img.icons8.com/dusk/64/000000/warface-logo.png"
        />
      </router-link>
    </div>

    <div class="navbar__search">
      <input
        type="text"
        class="search"
        placeholder=""
        onfocus="this.placeholder=''"
        onblur="this.placeholder=''"
      />
      <font-awesome-icon
        class="search-icon"
        icon="search"
        size="lg"
      ></font-awesome-icon>
    </div>

    <div class="navbar__icons">
      <span v-if="isLogin">
        <h2>안녕하세요 {{ myinfo.username }} 님</h2>
      </span>

      <span v-else>
        로그인이 필요합니다.
      </span>

      <div>
        <div v-if="isLogin">
          <button @click="onLogout">
            로그아웃
          </button>
        </div>
        <div v-else>
          <button><router-link to="/login">Login</router-link></button>
        </div>
      </div>

      <div v-if="!isLogin">
        <button><router-link to="/signup">Signup</router-link></button>
      </div>

      <div v-if="myinfo">
        <router-link :to="{ name: 'Profile', query: { name: myinfo.username } }"
          ><i class="fas fa-user"></i
        ></router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Navi',
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  },
  methods: {
    onLogout() {
      this.$store.dispatch('userStore/LOGOUT');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style></style>
