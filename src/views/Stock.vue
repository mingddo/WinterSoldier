<template>
  <div>
    <div>종목명을 입력하세요</div>
    <form @keypress.enter="getKrStockData">
      <input type="text" v-model=company>
    </form>
    <div>
      {{ stockdata }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000/";

export default {
  name: "Stock",
  data() {
    return {
      company: "",
      stockdata: null,
    };
  },
  methods: {
    getKrStockData() {
      event.preventDefault()
      axios({
        method: "GET",
        url: SERVER_URL + "stock" + "/" + this.company + "/",
      })
        .then((res) => {
          console.log("🚀 ~ file: Stock.vue ~ line 126 ~ .then ~ res", res);
          this.stockdata = res.data;
        })
        .catch((err) => {
          console.error(
            "🚀 ~ file: Stock.vue ~ line 28 ~ getKrStockData ~ err",
            err
          );
        });
    },
    created() {},
    mounted() {},
  },
};
</script>

<style>
</style>