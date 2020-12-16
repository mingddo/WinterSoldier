<template>
  <div>
    <h1>
      로그인!
    </h1>
    <div>
      <div>
        <label for="username">username </label>
        <input type="text" name="username" id="username" v-model="user.username">
      </div>
      <div>
        <label for="password">password</label>
        <input @keyup.enter="onLogin" type="password" name="password" id="password" v-model="user.password">
      </div>
      <button>로그인</button>
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
        this.$store.commit("setIsLogined", true);
        console.log(res)
        localStorage.setItem('jwt', res.data.token)
        alert('로그인이 완료되었습니다!')
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

<style>

</style>