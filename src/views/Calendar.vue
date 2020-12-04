<template>
  <div>
    <h2>
      <button @click="calendarData(-1)">⬅</button>
      {{ year}}년 {{ month }}월 {{ today }}일
      <button @click="calendarData(1)">➡</button>
    </h2>
    <table>
      <thead>
        <th v-for="(weekday, idx) in weekName" :key="idx">
          {{ weekday }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(date, idx) in dates" :key="idx">
          <td
            v-for="(day, idx2) in date"
            :key="idx2"
            >
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      weekName: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      dates: [],
      currentYear: 0,
      currentMonth: 0,
      year: 0,
      month: 0,
      lastMonthStart: 0,
      nextMonthStart: 0,
      today: 0,
    };
  },
  created () {
    const date = new Date();
    this.currentYear = date.getFullYear(); 
    this.currentMonth = date.getMonth() + 1;
    this.year = this.currentYear;
    this.month = this.currentMonth;
    this.today = date.getDate();
    this.calendarData();
  },
  methods: {
    calendarData(arg) {
      if (arg < 0) {
        this.month -= 1;
      } else if (arg === 1) {
        this.month += 1;
      }
      if (this.month === 0) {
        this.year -= 1;
        this.month = 12;
      } else if (this.month > 12) {
        this.year += 1;
        this.month = 1;
      }
      const [
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      ] = this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getMonthOfDays(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      );
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay() // 이번달 시작요일
      const lastDate = new Date(year, month, 0).getDate(); // 이번달 마지막 날짜
      let lastYear = year;
      let lastMonth = month - 1;
      if (month == 1) { // 1월의 경우 저번달은 작년 12월
        lastMonth = 12;
        lastYear -= 1;
      }
      const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난달 마지막 날짜
      return [firstDay, lastDate, prevLastDate];
    },
    getMonthOfDays(
      monthFirstDay, 
      monthLastDate, 
      prevMonthLastDate
      ) {
        let day = 1;
        let prevDay = (prevMonthLastDate - monthFirstDay) + 1;
        console.log(monthFirstDay)
        const dates = [];
        let weekOfDays = [];
        while (day <= monthLastDate) {
          if (day === 1) {
            // 1일이 어느 요일인지에 따라 테이블에 그리기 위한 지난 셀의 날짜들을 구해야함
            for (let j = 0; j < monthFirstDay; j += 1) {
              weekOfDays.push(prevDay);
              prevDay += 1;
            }
          }
          
          weekOfDays.push(day);
          if (weekOfDays.length === 7) {
            // 일주일이 채워지면
            dates.push(weekOfDays);
            weekOfDays = []; //초기화
          }
          day += 1;
        }
        const len = weekOfDays.length;
        console.log('길이?', len)
        if (len > 0 && len < 7) {
          for (let k = 1; k <= 7 - len; k += 1) {
            weekOfDays.push(k);
          }
        }
        if (weekOfDays.length > 0) dates.push(weekOfDays); // 남은 날짜 추가
        this.nextMonthStart = weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
        return dates;
      },
  },

}
</script>

<style>

</style>