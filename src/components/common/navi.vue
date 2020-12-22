<template>
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