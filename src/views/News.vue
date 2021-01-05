<template>
  <div class="news__wrapper">
    <span class="news__section"> 오늘의 뉴스 </span>
    <form @keypress.enter.prevent="onSubmit">
        class="news__search"
        type="text"
        v-model="query"
        placeholder="검색"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='검색'"
      />
    </form>
    <div class="news__title" v-for="(n, id) in news" :key="id">
      <a :href="n.link">
        <span class="news__item__title">{{ n.title }}</span></a
      >
      {{ n.date }} {{ n.source }}
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
          console.log("뉴스  결과", res.data);
          this.news = res.data;
          this.query = "";
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

<style scoped>
.news__wrapper {
  width: 100%;
  height: 100%;
  padding: 12px 24px;
}

.news__search {
  border: 3px solid var(--color-yellow-prime);
  border-radius: 0px;
  width: 50%;
  padding: 4px 8px;
  font-size: var(--font-small);
}

.news__search:focus {
  border: 3px solid var(--color-yellow-prime);
}

.news__title {
  padding: 4px 0;
}

.news__item__title:hover {
  font-weight: bold;
}

.news__section {
  font-size: var(--font-medium);
}
</style>