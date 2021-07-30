<template>
  <div class="calendar">
    <div class="container">
      <p class="week">
        <span v-for="(item, index) in weekList" :key="index">
          {{ item.week }}
        </span>
      </p>
      <div class="day">
        <div :class="{'active': index === currentWeek - 1}" v-for="(item, index) in dayList" :key="index">
          <p> {{ item.solarCalendar }} </p>
          <span> {{ item.lunarCalendar }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import lunarDayCn from '@/utils/lunarDayCn'

// Define the component in class-style
@Component({
  mounted () {
    let time = ''
    this.getDay(time)
  }
})
export default class calendar extends Vue {
  weekList: Array<object> = [
    { week: '一' },
    { week: '二' },
    { week: '三' },
    { week: '四' },
    { week: '五' },
    { week: '六' },
    { week: '日' },
  ]
  dayList: Array<object> = []
  currentWeek = -1
  // 获取日历
  getDay (timeValue: any): void {
    const time = timeValue ? new Date(timeValue) : new Date()
    const year = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDate() as any
    const week = timeValue ? (new Date(timeValue)).getDay() : (new Date()).getDay()
    // 今天是周几
    this.currentWeek = week
    // 上个月有多少天
    const lastMonthDays = this.getDays(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1)
    let dayList = []
    for(let i = 1; i < 15; i++) {
      // 阳历
      let solarCalendar = 0
      // 阴历
      let lunarCalendar = '初一'
      // 获取阴历需要的参数
      let params = ''
      // 今天之前的 天
      if (i < week) {
        solarCalendar = day - (week - i)
        params = `${year}-${month + 1}-${solarCalendar}`
        if (solarCalendar <= 0) {
          solarCalendar = lastMonthDays + (day - (week - i))
          params = `${month === 0 ? year - 1 : year}-${month === 0 ? 12 : month + 1}-${solarCalendar}`
        }
      } else if (i === week) {
        // 今天
        solarCalendar = day
        params = `${year}-${month + 1}-${solarCalendar}`
      } else {
        // 今天之后的天
        solarCalendar = day + (i - week)
        if (solarCalendar > this.getDays(year, month)) {
          solarCalendar = solarCalendar - this.getDays(year, month)
          params = `${month === 11 ? year + 1 : year}-${month === 11 ? 1 : month + 2}-${solarCalendar}`
        } else {
          params = `${year}-${month + 1}-${solarCalendar}`
        }
      }
      lunarCalendar = lunarDayCn(params).lunarDayCn === '初一' ? lunarDayCn(params).lunarMonthCn : lunarDayCn(params).lunarDayCn
      dayList.push({
        solarCalendar: solarCalendar, lunarCalendar: lunarCalendar
      })
    }
    this.dayList = dayList
  }
  // 获取每个月几天
  getDays (year:number, month: number):number {
    let days = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31] 
    if ( (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ) {
      days[1] = 29
    }
　　return days[month]  
  }
}
</script>
<style lang="scss">
  .calendar {
    .container {
      width: 400px;
      height: 300px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow:  0px 2px 10px rgba(111, 111, 111, 0.1);
      .week {
        border-bottom: 1px solid #F6F7F9;
        padding-bottom: 10px;
        span {
          display: inline-block;
          width: calc(100% / 7);
          text-align: center;
        }
      }

      .day {
        div {
          display: inline-block;
          margin-top: 10px;
          width: calc(100% / 7);
          text-align: center;
          cursor: pointer;
          border-radius: 50%;
          &::before {
            content: '';
            padding-top: 100%;
            float: left;
          }
          p {
            margin-top: 7px;
          }
          span {
            font-size: 12px;
            color: #AFBBC2;
          }
          &.active {
            background: #3F70FF;
            color: #fff;
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>