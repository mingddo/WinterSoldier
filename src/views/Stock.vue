<template>
  <div class="stockframe">
    <div class="stockinput">
      <di>
        <div v-if="selected" style="padding-top: 0px; width: 100%">
          검색하신
          <span>{{ selected || query }}의 결과입니다.</span>
        </div>
        <div class="autosuggest-container">
          <vue-autosuggest
            v-model="query"
            :suggestions="filteredOptions"
            @focus="focusMe"
            @input="onInputChange"
            @selected="onSelected"
            :get-suggestion-value="getSuggestionValue"
            :input-props="{
              id: 'autosuggest__input',
              placeholder: '종목명을 입력하세요',
            }"
          >
            <div slot-scope="{ suggestion }">
              <div>{{ suggestion.item.name }}</div>
            </div>
          </vue-autosuggest>
        </div>
      </di>
      <div>
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
        🔧 차트 불러오는 중입니다 🔧
        <div class="flower">
          <img src="@/assets/aa.png" width="100px" height="100px" />
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
import { getstockdata } from "@/api/stock.js";
import LineChart from "@/components/Stock/LineChart";
import BarChart from "@/components/Stock/BarChart";
// import "@/assets/stock.css";
import stockDB from "@/assets/stockDB.json";
import { VueAutosuggest } from "vue-autosuggest";
// import DownloadButton from "@/components/Stock/Download";

export default {
  name: "Stock",
  components: {
    LineChart,
    BarChart,
    VueAutosuggest,
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
      suggestions: [
        {
          data: [],
        },
      ],
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
      this.companycode = stockDB.data.filter((e) => {
        return e.name == this.company;
      });
      // console.log(this.companycode[0].code);
      this.companycode = this.companycode[0].code;
      getstockdata(
        this.companycode,
        this.period,
        (res) => {
          console.log(res);
          this.stock = res.data;
          this.stockvolume = res.data.volume;
          this.stockNow = res.data.price;
          this.chartLabels = res.data.date;
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
    setDailyPng(payload) {
      this.dailyPng = payload;
    },
    // clickHandler() {
    //   // event fired when clicking on the input
    // },
    onSelected(item) {
      console.log("", item.item);
      this.selected = item.item.name;
      this.company = item.item.name;
      this.getKrStockData();
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text);
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    focusMe(e) {
      console.log(e); // FocusEvent
    },
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.suggestions[0].data.filter((option) => {
            return (
              option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
  created() {
    this.suggestions[0].data = stockDB.data;
    this.company = this.query;
    this.getKrStockData();
    // console.log(this.suggestions[0].data);
  },
};
</script>

<style scoped src="@/assets/stock.css">
</style>
