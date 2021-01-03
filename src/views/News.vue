<template>
  <div>
    오늘의 뉴스
    <form @keypress.enter.prevent="onSubmit">
      <input type="text" v-model="query" />
    </form>
    <div v-for="(n, id) in news.title" :key="id">{{ id + 1 }} {{ n }}</div>
  </div>
</template>

<script>
import { getnews } from "@/api/news.js";

export default {
  name: "News",
  data() {
    return {
      query: "코로나",
      news: null,
    };
  },
  methods: {
    onSubmit() {
      getnews(
        this.query,
        (res) => {
          console.log("뉴스 결과", res.data);
          this.news = res.data;
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  mounted() {
    this.onSubmit();
  },
};
</script>