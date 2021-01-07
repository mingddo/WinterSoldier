<template>
  <div class="stockframe">
    <div class="stockinput">
      <div>
        <div v-if="selected" style="padding-top: 0px; width: 100%">
          검색하신
          <span>{{ selected || query }}의 결과입니다.</span>
        </div>
        <div class="autosuggest-container">
          <autocomplete
            :search="search"
            @submit="handleSubmit"
            placeholder="Search for stock"
            aria-label="Search for stock"
            :get-result-value="getResultValue"
            default-value="삼성전자"
            auto-select
          ></autocomplete>
        </div>
      </div>
      <div id="stockselect__wrapper">
        <span class="stock__select__box" @click="selectday(2)">10일</span>
        <span class="stock__select__box" @click="selectday(4)">30일</span>
        <span class="stock__select__box" @click="selectday(8)">70일</span>
        <span class="stock__select__box" @click="selectday(11)">100일</span>
        <span class="stock__select__box" @click="selectday(30)">300일</span>
      </div>
      <div class="error-message" v-if="showError">
        {{ errorMessage }}
      </div>
      <div v-if="loading" class="loading">
        <div class="flower">
          <img src="@/assets/aa.png" width="170px" height="170px" />
        </div>
      </div>
    </div>

    <div class="Chart__container" v-if="loaded">
      <div class="Chart__content">
        <line-chart
          chart-id="line-daily"
          v-if="loaded"
          :chart-data="stockNow"
          :chart-labels="chartLabels"
        />
      </div>
      <div class="Chart__content">
        <bar-chart
          chart-id="line-daily"
          v-if="loaded"
          :chart-data="stockvolume"
          :chart-labels="chartLabels"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getstockdata } from "@/api/stock.js";
import LineChart from "@/components/Stock/LineChart";
import BarChart from "@/components/Stock/BarChart";
// import "@/assets/stock.css";
import stockDB from "@/assets/stockDB.json";
import stockDB2 from "@/assets/stockDB2.json";
// import { VueAutosuggest } from "vue-autosuggest";
// import DownloadButton from "@/components/Stock/Download";

export default {
  name: "Stock",
  components: {
    LineChart,
    BarChart,
    // VueAutosuggest,
  },
  data() {
    return {
      loaded: false,
      loading: false,
      showError: false,
      errorMessage: "Please enter a stock name",
      company: "",
      companycode: "",
      period: 10,
      stockNow: [],
      chartLabels: [],
      stock: null,
      stockvolume: null,
      query: "삼성전자",
      selected: "",
    };
  },
  methods: {
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return stockDB2.data.filter((name) => {
        return name.toLowerCase().startsWith(input.toLowerCase());
      });
    },
    getKrStockData() {
      // event.preventDefault();
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
      this.companycode = stockDB.data.filter((e) => {
        return e.name == this.company;
      });
      // console.log(this.companycode[0].code);
      this.companycode = this.companycode[0].code;
      getstockdata(
        this.companycode,
        this.period,
        (res) => {
          console.log(res.data);
          this.stock = res.data;
          this.stockvolume = res.data.volume.reverse();
          this.stockNow = res.data.price.reverse();
          this.chartLabels = res.data.date.reverse();
          this.loaded = true;
          this.loading = false;
        },
        (err) => {
          console.error(err);
          this.showError = true;
          this.loading = false;
        }
      );
    },
    selectday(num) {
      this.period = num;
      this.getKrStockData();
    },

    handleSubmit(result) {
      this.company = result;
      this.getKrStockData();
    },
    getResultValue(result) {
      return result;
    },
  },
  created() {
    this.company = this.query;
    this.getKrStockData();
  },
};
</script>

<style scoped src="@/assets/stock.css">
</style>
