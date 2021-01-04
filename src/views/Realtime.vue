<template>
  <div class="realtimeframe">
    <h2>실시간 검색어</h2>
    <div class="broadcast">
      <carousel
        :data="data"
        :controls="false"
        :indicators="True"
        :interval="1000"
        direction="up"
      ></carousel>
    </div>
  </div>
</template>

<script>
import { realtimeList } from '@/api/news.js';

export default {
  name: 'News',
  data() {
    return {
      realtimenews: '',
      number: 0,
      data: [],
      form: {
        id: 1,
        message: 'Rolling broadcast message',
        content(createElement, content) {
          return createElement(
            'div',
            {
              class: 'broadcast-content',
            },
            [createElement('span', [`${content.message}`])]
          );
        },
      },
    };
  },
  methods: {
    getrealtimeList() {
      realtimeList(
        (res) => {
          console.log('실검', res);
          this.realtimenews = res.data;
          this.data[0].message = this.realtimenews[0];
          this.data[1].message = this.realtimenews[1];
          this.data[2].message = this.realtimenews[2];
          this.data[3].message = this.realtimenews[3];
          this.data[4].message = this.realtimenews[4];
          this.data[5].message = this.realtimenews[5];
          this.data[6].message = this.realtimenews[6];
          this.data[7].message = this.realtimenews[7];
          this.data[8].message = this.realtimenews[8];
          this.data[9].message = this.realtimenews[9];
        },
        (err) => {
          console.error(err);
        }
      );
    },
    datap() {
      for (var i = 0; i < 10; i++) {
        this.data.push(this.form);
      }
    },
    aaa() {},
  },
  created() {
    this.datap();
    this.getrealtimeList();
  },
  mounted() {
    this.aaa();
  },
};
</script>

<style scoped>
.realtimeframe {
  text-align: left;
  width: 100%;
  background-color: whitesmoke;
  margin: 5px 0;
  border: none;
  box-shadow: 0px 0px 10px 0.3px var(--color-gray-light);
  border-radius: 15px;
  padding: 10px;
}
.broadcast {
  width: 200px;
  height: 80px;
  border: none;
  /* box-shadow: 0px 0px 10px 0.3px var(--light-gray); */
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  text-align: left;
}

/* .broadcast > .feather {
    margin-right: 0.5rem;
  } */

.broadcast > .carousel {
  flex: 1;
}
</style>
