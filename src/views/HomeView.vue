<template>
  <div class="home">
    <PageTitle text="台灣當日新增疫情一覽"/>
    <div class="main">
      <CardItem class="mb-4" :itemList="confirmedNumList"/>
      <div class="row align-items-start py-5">
        <OrderItem class="col-xl-4 col-12 mb-4"
                  itemTitle="當日確診排行"
                  :itemDate="latestDate"
                  itemText="確診人數"
                  :itemList="cityOrderList"
                  v-if="cityOrderList.length>0"/>
        <MapItem class="col-xl-8 col-12 mb-4 flex-lg-grow-1"
                  itemTitle="當日縣市疫情地圖"
                  :itemDate="latestDate"
                  :itemList="cityConfirmedList"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import CardItem from '@/components/CardItem.vue'
import OrderItem from '@/components/OrderItem.vue'
import MapItem from '@/components/MapItem.vue'

export default {
  name: 'HomeView',
  components: {
    PageTitle,
    CardItem,
    OrderItem,
    MapItem
  },
  props: {
    dataList: Array,
    latestDate: String,
    taiwanList: Array
  },
  computed: {
    totalConfirmed () {
      return this.dataList.filter(({ date }) => date <= this.latestDate).length
    },
    todayList () {
      return this.dataList.filter(({ date }) => date === this.latestDate)
    },
    todayLocal () {
      return this.todayList.filter(({ overseas }) => !overseas).length
    },
    todayOverseas () {
      return this.todayList.filter(({ overseas }) => overseas).length
    },
    confirmedNumList () {
      return [
        {
          title: '累計總確診(例)',
          num: this.currencyHandler(this.totalConfirmed),
          text: this.latestDate
        },
        {
          title: '當日本土新增(例)',
          num: (this.todayLocal !== 0 ? '+ ' : '') + this.currencyHandler(this.todayLocal),
          text: this.latestDate
        },
        {
          title: '當日境外移入(例)',
          num: (this.todayOverseas !== 0 ? '+ ' : '') + this.currencyHandler(this.todayOverseas),
          text: this.latestDate
        }
      ]
    },
    cityList () {
      const obj = {
        sort: this.taiwanList,
        map: {}
      }
      obj.sort.forEach(city => {
        obj.map[city] = {
          sort: [],
          map: {}
        }
      })
      this.dataList.forEach(({ id, date, city, town, gender, overseas, age }) => {
        obj.map[city].sort.push(id)
        obj.map[city].map[id] = { date, town, gender, overseas, age }
      })

      return obj
    },
    cityConfirmedList () {
      const filterList = this.cityList.sort
        .map(item => {
          const obj = this.cityList.map[item]
          const arr = obj.sort.filter(item2 => obj.map[item2].date === this.latestDate)
          return {
            title: item,
            num: arr.length
          }
        })
      return filterList
    },
    cityOrderList () {
      const filterList = this.cityConfirmedList
        .filter((item, idx) => idx !== 0)
        .filter(({ num }) => num > 0)
        .sort((a, b) => b.num - a.num)
        .map(({ title, num }) => {
          return {
            title: title,
            num: this.currencyHandler(num)
          }
        })
        .slice(0, 4)
      return filterList
    },
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
    }
  },
  methods: {
    currencyHandler (value) {
      // 轉換數字成含千分位的文字
      const parts = value.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    }
  }
}
</script>
