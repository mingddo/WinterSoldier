<template>
  <div class="coronaframe">
    <div class="coronaInfotitle">코로나-19</div>
    <div class="coronaInfosubtitle">{{ corona_info.updateTime }}</div>
    <div class="coronatotalInfo">
      <div class="coronaboxInfo1">
        <div class="coronaTotalcase">
          확진환자
          <div class="Infodetail">(누적) {{ corona_info.TotalCase }}</div>
        </div>

        <div class="coronaRecover">
          격리해제
          <div class="Infodetail">(누적) {{ corona_info.TotalRecovered }}</div>
        </div>
      </div>

      <div class="coronaboxInfo2">
        <div class="coronaRecovering">
          치료중
          <div class="Infodetail">(누적) {{ corona_info.NowCase }}</div>
        </div>

        <div class="corodaDeath">
          사망
          <div class="Infodetail">(누적) {{ corona_info.TotalDeath }}</div>
        </div>
      </div>
    </div>

    <div class="broadcast">
      <carousel
        :data="data"
        :controls="false"
        :indicators="false"
        :interval="3000"
        direction="up"
      ></carousel>
    </div>
    <!-- <div>{{ corona_info }}</div>
    <div>{{ coroan_detail_info }}</div> -->
  </div>
</template>

<script>
import { getInfo, getCityInfo } from "@/api/corona.js";

export default {
  data() {
    return {
      corona_info: [],
      coroan_detail_info: [],
      updatemessage: "",
      data: [
        {
          id: 1,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 2,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 3,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 4,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 5,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 6,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 7,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 8,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 9,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 10,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 11,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 12,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 13,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 14,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 15,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 16,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
        {
          id: 17,
          message: "Rolling broadcast message",
          content(createElement, content) {
            return createElement(
              "div",
              {
                class: "broadcast-content",
              },
              [createElement("span", [`${content.message}`])]
            );
          },
        },
      ],
    };
  },
  methods: {
    corona() {
      getInfo(
        (res) => {
          this.corona_info = res.data;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    citycorona() {
      getCityInfo(
        (res) => {
          this.data[0].message =
            "[" +
            res.data.seoul.countryName +
            "]" +
            " 확진자 : " +
            res.data.seoul.totalCase +
            "(" +
            res.data.seoul.newCase +
            ")";
          this.data[1].message =
            "[" +
            res.data.gyeonggi.countryName +
            "]" +
            " 확진자 : " +
            res.data.gyeonggi.totalCase +
            "(" +
            res.data.gyeonggi.newCase +
            ")";
          this.data[2].message =
            "[" +
            res.data.gangwon.countryName +
            "]" +
            " 확진자 : " +
            res.data.gangwon.totalCase +
            "(" +
            res.data.gangwon.newCase +
            ")";
          this.data[3].message =
            "[" +
            res.data.gwangju.countryName +
            "]" +
            " 확진자 : " +
            res.data.gwangju.totalCase +
            "(" +
            res.data.gwangju.newCase +
            ")";
          this.data[4].message =
            "[" +
            res.data.gyeongbuk.countryName +
            "]" +
            " 확진자 : " +
            res.data.gyeongbuk.totalCase +
            "(" +
            res.data.gyeongbuk.newCase +
            ")";
          this.data[5].message =
            "[" +
            res.data.gyeongnam.countryName +
            "]" +
            " 확진자 : " +
            res.data.gyeongnam.totalCase +
            "(" +
            res.data.gyeongnam.newCase +
            ")";

          this.data[6].message =
            "[" +
            res.data.daegu.countryName +
            "]" +
            " 확진자 : " +
            res.data.daegu.totalCase +
            "(" +
            res.data.daegu.newCase +
            ")";
          this.data[7].message =
            "[" +
            res.data.daejeon.countryName +
            "]" +
            " 확진자 : " +
            res.data.daejeon.totalCase +
            "(" +
            res.data.daejeon.newCase +
            ")";

          this.data[8].message =
            "[" +
            res.data.busan.countryName +
            "]" +
            " 확진자 : " +
            res.data.busan.totalCase +
            "(" +
            res.data.busan.newCase +
            ")";
          this.data[9].message =
            "[" +
            res.data.sejong.countryName +
            "]" +
            " 확진자 : " +
            res.data.sejong.totalCase +
            "(" +
            res.data.sejong.newCase +
            ")";

          this.data[10].message =
            "[" +
            res.data.ulsan.countryName +
            "]" +
            " 확진자 : " +
            res.data.ulsan.totalCase +
            "(" +
            res.data.ulsan.newCase +
            ")";
          this.data[11].message =
            "[" +
            res.data.incheon.countryName +
            "]" +
            " 확진자 : " +
            res.data.incheon.totalCase +
            "(" +
            res.data.incheon.newCase +
            ")";
          this.data[12].message =
            "[" +
            res.data.jeonbuk.countryName +
            "]" +
            " 확진자 : " +
            res.data.jeonbuk.totalCase +
            "(" +
            res.data.jeonbuk.newCase +
            ")";
          this.data[13].message =
            "[" +
            res.data.jeonnam.countryName +
            "]" +
            " 확진자 : " +
            res.data.jeonnam.totalCase +
            "(" +
            res.data.jeonnam.newCase +
            ")";
          this.data[14].message =
            "[" +
            res.data.jeju.countryName +
            "]" +
            " 확진자 : " +
            res.data.jeju.totalCase +
            "(" +
            res.data.jeju.newCase +
            ")";
          this.data[15].message =
            "[" +
            res.data.chungbuk.countryName +
            "]" +
            " 확진자 : " +
            res.data.chungbuk.totalCase +
            "(" +
            res.data.chungbuk.newCase +
            ")";
          this.data[16].message =
            "[" +
            res.data.chungnam.countryName +
            "]" +
            " 확진자 : " +
            res.data.chungnam.totalCase +
            "(" +
            res.data.chungnam.newCase +
            ")";

          this.coroan_detail_info = res.data;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    getcoronaInfo() {
      this.corona();
      this.citycorona();
      setInterval(() => {
        this.corona();
        this.citycorona();
      }, 3600000);
    },
  },
  created() {
    console.log("==================");
    // this.getcoronaInfo();
    this.corona();
    this.citycorona();
  },
};
</script>

<style scoped src="@/assets/corona.css">
</style>
