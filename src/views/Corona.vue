<template>
  <div>
    <button @click="getcoronaInfo">코로나</button>
    <div>{{corona_info}}</div>
  </div>
</template>

<script>
import {getInfo} from "@/api/corona.js"


export default {
  data() {
    return {
      corona_info: [],
      coroan_detail_info:[],
    }
  },
  methods: {
    getcoronaInfo(){
      getInfo(
        (res)=>{
          console.log('코로나 결과', res.data)
          this.corona_info = res.data
        },
        (err)=>{
          console.error(err)
        }
      )
    }

  },
}
</script>

<style>

</style>