<template>
  <div>
    <div>종목명을 입력하세요</div>
    <form @keypress.enter="getKrStockData">
      <input type="text" v-model="company" placeholder="stock name" />
    </form>
    <div class="error-message" v-if="showError">
      {{ errorMessage }}
    </div>
    <div v-if="loading" class="loading">
      🔧 차트 불러오는 중입니다 ㅇㅅㅇ 🔧
      <div class="flower">
        <img
          src="https://raw.githubusercontent.com/jaiyah77/Library77/gh-pages/flower.png"
          width="100px"
          height="100px"
        />
      </div>
    </div>

    <div class="Chart__container" v-if="loaded">
      <!-- <div class="Chart__title">
        <h2>
          Downloads per Day <span>{{ formattedPeriod }}</span>
        </h2>
        <DownloadButton :name="packageName + '-daily'" :link="dailyPng" />
      </div>
      <hr /> -->
      <div class="Chart__content">
        <line-chart
          chart-id="line-daily"
          v-if="loaded"
          :chart-data="stockNow"
          :chart-labels="chartLabels"
          @generate="setDailyPng"
        />
      </div>
      <div class="Chart__content">
        <bar-chart
          chart-id="line-daily"
          v-if="loaded"
          :chart-data="stockvolume"
          :chart-labels="chartLabels"
          @generate="setDailyPng"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/Stock/LineChart";
import BarChart from "@/components/Stock/BarChart";
// import DownloadButton from "@/components/Stock/Download";
const SERVER_URL = "http://127.0.0.1:8000/";

export default {
  name: "Stock",
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      loaded: false,
      loading: false,
      showError: false,
      errorMessage: "Please enter a stock name",
      company: "",
      stockNow: [],
      chartLabels: [],
      stock: null,
      stockdate: null,
      stockprices: null,
      stockvolume: null,
    };
  },
  methods: {
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    getKrStockData() {
      event.preventDefault();
      if (
        this.company === null ||
        this.company === "" ||
        this.company === "undefined"
      ) {
        this.showError = true;
        this.loading = false;
        return;
      }
      this.resetState();
      this.loading = true;
      axios({
        method: "GET",
        url: SERVER_URL + "stocks" + "/" + this.company + "/",
      })
        .then((res) => {
          console.log("🚀 ~ file: Stock.vue ~ line 126 ~ .then ~ res", res);
          this.stock = res.data;
          this.stockdate = res.data;
          this.stockprices = res.data;
          this.stockvolume = res.data.volume;
          this.stockNow = res.data.price;
          this.chartLabels = res.data.date;

          this.loaded = true;
          this.loading = false;
        })
        .catch((err) => {
          console.error(
            "🚀 ~ file: Stock.vue ~ line 28 ~ getKrStockData ~ err",
            err
          );
          this.showError = true;
          this.loading = false;
        });
    },
    setDailyPng(payload) {
      this.dailyPng = payload;
    },
    created() {},
    mounted() {},
  },
};
</script>

<style>
.Chart__container {
  border-radius: $base-border-radius;
  background-color: #fff;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  padding: rem(20) rem(40);
  margin: rem(50) 0;
}

/* .Chart__title {
  display: flex;
  flex-direction: row;
  margin-bottom: rem(20);
  justify-content: space-between;

  h2 {
    display: flex;
    align-items: center;
    color: color(fjord);
    margin: 0;
    font-weight: 600;
    font-size: rem(16);

    > span {
      font-weight: 400;
      color: color(robin-egg-blue);
      font-size: rem(16);
      margin-left: rem(25);
    }
  }
} */
.loading {
  text-align: center;
  color: color(fjord);
  font-size: rem(18);
}
.flower {
  width: 200px;
  height: 200px;
  -webkit-animation: flower 3s linear infinite;
}
@-webkit-keyframes flower {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
