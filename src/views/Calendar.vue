<template>
  <div>
    <div>
      <!--월간달력 구간-->
      <!-- 월간 달력 년 월 구간 / 양쪽 버튼 클릭시 월을 하나씩 이동 가능 + 날짜 더블클릭시 input 입력창이 나오며 해당 년월로 이동-->
      <h2>
        <button @click="calendarData(-1)">⬅</button>
        <span @dblclick="changeYearForm" :class="{inputYearMonth: !yearForm}">
          {{ year}}
        </span>
        <input type="number" :class="{inputYearMonth: yearForm}" v-model.number="changedYear" @keypress.enter="changeYearForm">
        년
        <span @dblclick="changeMonthForm" :class="{inputYearMonth: !monthForm}">
          {{ month }}
        </span>
        <input type="number" value="currentMonth" :class="{inputYearMonth: monthForm}" v-model.number="changedMonth" @keypress.enter="changeMonthForm">
        월
        <button @click="calendarData(1)">➡</button>
      </h2>
      <!-- 월간 달력 테이블 -->
      <table class="calendar">
        <thead>
          <th v-for="(weekday, idx) in weekName" :key="idx">
            <span v-if="idx===0" class="sunday-color">{{ weekday }}</span>
            <span v-else>{{ weekday }}</span>
          </th>
        </thead>
        <tbody>
          <tr v-for="(date, idx) in dates" :key="idx">
            <td
              v-for="(day, idx2) in date"
              :key="idx2"
              >
              <button v-if="day===today && month === currentMonth && year === currentYear" class="today-point day-button" @click="todaySchedule(day)">{{ day }}</button>
              <button v-else-if="idx2===0" @click="todaySchedule(day)" class="sunday-color day-button">{{ day }}</button>
              <button v-else-if="idx2===6" @click="todaySchedule(day)" class="saturday-color day-button">{{ day }}</button>
              <button v-else @click="todaySchedule(day)" class="day-button">{{ day }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--월간 달력에서 날짜 클릭시 뜨는 모달창 구역-->
    <div :class="{dayModal:!modal}">
      {{ month }} 월 {{ thisDay }} 일 입니다!
      <button @click="modalDisappear">
        ok
      </button>
    </div>

    <!-- 주간 달력 구간 -->
    <!-- 주간 달력 페이지 이동 -->
    <h2>
      <button @click="changeWeekly(-1)">
        ⬅
      </button>
      <button @click="changeWeekly(1)">
        ➡
      </button>
    </h2>

    <!-- 주간 달력 테이블 -->
    <div>
      <table>
        <thead>
          <th v-for="(weekday, idx) in weekName" :key="idx" :weekday="weekday">
            {{ weekday }}
          </th>
        </thead>
        <thead>
          <th v-for="(weekdaily, idx2) in weekCalendar" :key="idx2" :weekdaily="weekdaily" >
            {{ weekdaily }}
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              해야할일!!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      modal: false,
      thisDay: 1,
      yearForm: true,
      monthForm: true,
      changedYear: this.currentYear,
      changedMonth: this.currentMonth,
      weekCalendar: [],
      weekIdx: 0,
      MaximumWeek: 0,
      goToBack: false,
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
    this.pickWeek();
  },
  methods: {
    changeWeekly(arg) {
      if (arg<0) {
        this.weekIdx -= 1;
      } else if (arg === 1) {
        this.weekIdx += 1;
      }
      if (this.weekIdx<0) {
        this.month -= 1
        if (this.month ===0) {
          this.year -= 1;
          this.month = 12;
          this.goToBack = true
        }
      } else if (this.weekIdx == this.MaximumWeek) {
        this.month += 1
      } if (this.month > 12) {
        this.year += 1;
        this.month = 1;
        this.weekIdx = 0
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
      )
      if (this.goToBack) {
        this.weekIdx = this.dates.length
      }
      this.weekCalendar = this.dates[this.weekIdx]
      this.goToBack = false
    },
    pickWeek () {
      for (const weekIdx in this.dates) {
        for (const daily of this.dates[weekIdx]) {
          if (this.today === daily) {
            this.weekCalendar = this.dates[weekIdx]
            this.weekIdx = weekIdx
          }
        }
      }
      this.MaximumWeek = this.dates.length
      console.log('몇개까지임?', this.MaximumWeek)
    },
    changeYearForm () {
      this.year = this.changedYear
      const [
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      ] = this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getMonthOfDays(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      )
      this.yearForm = !this.yearForm
    },
    changeMonthForm () {
      this.month = this.changedMonth
      const [
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      ] = this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getMonthOfDays(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      )
      this.monthForm = !this.monthForm
    },
    modalDisappear () {
      this.modal = false
    },
    todaySchedule (day) {
      this.modal = true
      this.thisDay = day
      console.log("모달은", this.modal)
    },
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
              console.log('prevDay', prevDay)
              weekOfDays.push('');
              // weekOfDays.push(prevDay); , 달력상에 지난 날짜 표현 x
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
        // if (len > 0 && len < 7) {
        //   for (let k = 1; k <= 7 - len; k += 1) {
        //     console.log('k', k)
        //   }
        // } // 달력상 다음달 날짜 미리 표기 x 
        
        console.log('오늘!', this.today)
        console.log('이번달!', this.currentMonth)
        console.log('이달은!', this.month)
        if (weekOfDays.length > 0) dates.push(weekOfDays); // 남은 날짜 추가
        this.nextMonthStart = weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
        return dates;
      },
  },

}
</script>

<style>
.inputYearMonth {
  display: none;
}
.calendar{
  justify-content: center;
}
.day-button{
  width: 100%;
  background-color: white;
  border: none;
  cursor: pointer;
}
.today-point {
  background-color: pink;
}
.sunday-color {
  color: red;
}
.saturday-color {
  color: blue;
}
.dayModal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>