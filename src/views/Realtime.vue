<template>
  <div class="realtimeframe">
    <div class="broadcast">
      <carousel
        :data="data"
        :controls="false"
        :indicators="false"
        :interval="1500"
        direction="up"
      ></carousel>
    </div>
  </div>
</template>

<script>
import { realtimeList } from "@/api/news.js";

export default {
  name: "News",
  data() {
    return {
      realtimenews: "",
      number: 0,
      data: [
        {
          id: 1,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 2,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 3,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 4,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 5,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 6,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 7,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 8,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 9,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
        {
          id: 10,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "a",
              {
                attrs: {
                  href: `https://search.naver.com/search.naver?where=nexearch&query=${content.message}`,
                  target: "_blank",
                  onMouseOver: "this.style.color='#0F0'",
                  onMouseOut: "this.style.color='black'",
                },
                style: "color:black",
              },
              [createElement("span", [`${content.id}위: ${content.message}`])]
            );
          },
        },
      ],
    };
  },
  methods: {
    getrealtimeList() {
      realtimeList(
        (res) => {
          this.realtimenews = res.data;
          this.data[0].message = res.data[0];
          this.data[1].message = res.data[1];
          this.data[2].message = res.data[2];
          this.data[3].message = res.data[3];
          this.data[4].message = res.data[4];
          this.data[5].message = res.data[5];
          this.data[6].message = res.data[6];
          this.data[7].message = res.data[7];
          this.data[8].message = res.data[8];
          this.data[9].message = res.data[9];
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  created() {
    this.getrealtimeList();
  },
};
</script>

<style scoped>
.broadcast {
  padding-left: 12px;
  width: 400px;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
}

/* .broadcast > .carousel {
  flex: 1;
} */

.carousel{
  box-shadow: 0px 0px 10px 0.3px var(--color-gray-light);
  border: none;
  border-radius: 5px;
}

.broadcast-content {
  color: red;
}

</style>
