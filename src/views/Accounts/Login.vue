<template>
  <div class="loginbox">
    <div class="login__title">로그인</div>
    <div class="login-form">
      <div>
        <label for="username">아이디</label>
        <input type="text" name="username" id="username" v-model="user.username">
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input @keyup.enter="onLogin" type="password" name="password" id="password" v-model="user.password">
      </div>
      <button @click="onLogin">로그인</button>
    </div>
  </div>
</template>

<script>
import { userlogin } from "@/api/accounts.js";


export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
    onLogin () {
      console.log(this.user)
      userlogin (this.user,
      (res) => {
        this.$store.commit("userStore/setIsLogined", true);
        console.log(res)
        localStorage.setItem('jwt', res.data.token)
        this.$store.dispatch("userStore/GET_MEMBER_INFO", res.data.token)
        this.$router.push({ name : 'Home'})
      },
      (err) => {
        console.log(err)
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
      )
    },
  },
}
</script>

<style scoped src="@/assets/accounts.css">

</style>