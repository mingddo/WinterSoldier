<template>
  <div>
    <div>
      오늘의 뉴스
      <form @keypress.enter.prevent="onSubmit">
        <input type="text" v-model="query" />
      </form>
      <div v-for="(n, id) in news" :key="id">
        <a :href="n.link"> {{ n.title }}</a> {{ n.date }} {{ n.source }}
      </div>
    </div>
  </div>
</template>

<script>
import { getnews } from "@/api/news.js";

export default {
  name: "News",
  data() {
    return {
      query: "ssafy",
      day: "",
      month: "",
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
  created() {
    this.query =
      new Date().getMonth() + 1 + "월 " + new Date().getDate() + "일";
  },
  mounted() {
    this.onSubmit();
  },
};
</script>