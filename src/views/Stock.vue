<template>
  <div>
    <div>종목명을 입력하세요</div>
    <form @keypress.enter="getKrStockData">
      <input type="text" v-model="company" />
    </form>
    <div v-for="st in stock" :key="st">
      {{ st }}
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
      stock: null,
      stockdate: null,
      stockprices: null,
      stockvolume: null,
    };
  },
  methods: {
    getKrStockData() {
      event.preventDefault();
      axios({
        method: "GET",
        url: SERVER_URL + "stocks" + "/" + this.company + "/",
      })
        .then((res) => {
          console.log("🚀 ~ file: Stock.vue ~ line 126 ~ .then ~ res", res);
          this.stock = res.data;
          this.stockdate = res.data;
          this.stockprices = res.data;
          this.stockvolume = res.data;
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

<style></style>
