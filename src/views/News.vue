<template>
  <div class="news__wrapper">
    <div class="content news__wrapper">
      <h2 class="news__section">Today's NEWS</h2>
      <h2 class="news__section">Today's NEWS</h2>
    </div>
    <form @keypress.enter.prevent="onSubmit">
      <input
        class="news__search"
        type="text"
        v-model="query"
        placeholder="검색"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='검색'"
      />
    </form>
    <!-- <div>
      <div>
        <div class="news__title" v-for="(n, id) in news" :key="id">
          <figure
            class="text-center"
            style="
              background-color: black;
              border-style: solid;
              border-color: white;
            "
          >
            <blockquote class="news__title">
              <img :src="n.img_source" alt="" /><a :href="n.link">{{
                n.title
              }}</a>
            </blockquote>
            <figcaption>{{ n.date }} {{ n.source }}</figcaption>
          </figure>
        </div>
      </div>
    </div> -->

    <div id="v-carousel" type="x/template">
      <div class="card-carousel-wrapper">
        <div
          class="card-carousel--nav__left"
          @click="moveCarousel(-1)"
          :disabled="atHeadOfList"
        ></div>
        <div class="card-carousel">
          <div class="card-carousel--overflow-container">
            <div
              class="card-carousel-cards"
              :style="{
                transform: 'translateX' + '(' + currentOffset + 'px' + ')',
              }"
            >
              <div
                class="card-carousel--card"
                v-for="(n, id) in news"
                :key="id"
              >
                <img :src="n.img_source" alt="" /><a :href="n.link">{{
                  n.title
                }}</a>
                <div class="card-carousel--card--footer">
                  <p>{{ n.date }}</p>
                  <p>{{ n.source }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-carousel--nav__right"
          @click="moveCarousel(1)"
          :disabled="atEndOfList"
        ></div>
      </div>
    </div>
    <div id="app">
      <carousel></carousel>
    </div>
  </div>
</template>

<script>
import { getnews } from "@/api/news.js";
export default {
  name: "News",
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      query: "ssafy",
      day: "",
      month: "",
      news: null,
    };
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    onSubmit() {
      getnews(
        this.query,
        (res) => {
          console.log("뉴스 결과", res.data);
          this.news = res.data;
          this.query = "";
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.news.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
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

.news__section {
  font-size: var(--font-medium);
}
.content {
  position: relative;
  margin-left: 45%;
  margin-top: 5%;
  margin-bottom: 10%;
}
.content h2 {
  position: absolute;
  color: #ffffff;
  transform: translate(-50%, -50%);
  font-size: 4em;
}
.content h2:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 2px blue;
}
.content h2:nth-child(2) {
  color: blue;
  animation: animate 15s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 100%,
      7% 100%,
      21% 100%,
      37% 100%,
      51% 100%,
      67% 99%,
      83% 99%,
      99% 99%
    );
  }
  50% {
    clip-path: polygon(
      0 100%,
      0 0,
      24% 0,
      42% 0,
      63% 0,
      82% 0,
      100% 0,
      100% 100%
    );
  }
}
</style>
<style src="../assets/carousel.css">
</style>
