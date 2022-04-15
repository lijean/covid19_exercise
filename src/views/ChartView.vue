<template>
  <div class="chart">
    <PageTitle text="台灣確診疫情統計圖"/>
    <div class="main">
      <div class="border-bottom d-flex flex-wrap mb-4">
        <div class="radio d-flex align-items-center mb-3">
            <span>顯示</span>
            <label class="ms-3" v-for="item,index of radioInputList" :key="item.title">
                <input class="form-check-input" type="radio"
                        :value="index"
                        v-model="radioIndex">
                {{ item.title }}
            </label>
        </div>
        <div class="d-flex align-items-center mb-3 ms-auto">
          <span>顯示天數</span>
          <select class="form-select form-select-sm w-auto ms-2" v-model="selectIndex">
            <option v-for="item,index of selectInputList"
                    :key="item.title"
                    :value="index">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div class="chartBox mb-4">
        <LineChart :chartData="chartLineData"
                  class="chartItem"
                  :class="{'show':radioInputList[radioIndex].value==='line'}" />
        <BarChart :chartData="chartBarData"
                  class="chartItem"
                  :class="{'show':radioInputList[radioIndex].value==='bar'}" />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'ChartView',
  components: {
    PageTitle,
    LineChart,
    BarChart
  },
  props: {
    dataList: Array,
    latestDate: String,
    taiwanList: Array
  },
  data () {
    return {
      radioIndex: 0,
      radioInputList: [
        {
          title: '長條圖',
          value: 'bar'
        },
        {
          title: '折線圖',
          value: 'line'
        }
      ],
      selectIndex: 0,
      selectInputList: [
        {
          num: 30,
          title: '近 30 日'
        },
        {
          num: 90,
          title: '近 90 日'
        },
        {
          num: 180,
          title: '近 180 日'
        },
        {
          num: 365,
          title: '近 365 日'
        },
        {
          num: 500,
          title: '近 500 日'
        }
      ]
    }
  },
  computed: {
    dateList () {
      const obj = {
        sort: [],
        map: {}
      }
      this.dataList.forEach(({ id, date, city, town, gender, overseas, age }) => {
        if (!obj.map[date]) {
          obj.sort.push(date)
          obj.map[date] = {
            sort: [],
            map: {}
          }
        }

        obj.map[date].sort.push(id)
        obj.map[date].map[id] = { city, town, gender, overseas, age }
      })

      return obj
    },
    chartNum () {
      return this.selectInputList[this.selectIndex].num
    },
    chartBarData () {
      const labels = this.dateList.sort
        .slice(0, this.chartNum)
        .reverse()

      const nums = []
      const nums2 = []
      labels.forEach(date => {
        const num = this.dateList.map[date].sort.filter(item => !this.dateList.map[date].map[item].overseas).length
        nums.push(num)

        const num2 = this.dateList.map[date].sort.filter(item => this.dateList.map[date].map[item].overseas).length
        nums2.push(num2)
      })
      return {
        labels: labels,
        datasets: [
          {
            label: '當日本土新增',
            backgroundColor: '#198754',
            borderColor: '#198754',
            data: nums
          },
          {
            label: '當日境外移入',
            backgroundColor: '#6366e0',
            borderColor: '#6366e0',
            data: nums2
          }
        ]
      }
    },
    chartLineData () {
      const labels = this.dateList.sort
        .slice(0, this.chartNum)
        .reverse()

      const nums = []
      labels.forEach(date => {
        const num = this.dateList.map[date].sort.length
        nums.push(num)
      })
      return {
        labels: labels,
        datasets: [
          {
            label: '當日總確診人數',
            backgroundColor: '#dc3545',
            borderColor: '#dc3545',
            data: nums
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.chartBox {
  position: relative;
  .chartItem {
    width: 100%;
    transition: all .4s;
    &:not(.show) {
      opacity: 0;
      visibility: hidden;
    }
    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
