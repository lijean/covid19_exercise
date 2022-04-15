<template>
  <div class="city">
    <PageTitle text="台灣各縣市確診案例"/>
    <div class="main">
      <ButtonFilter class="mb-5"
                    :itemList="cityLocalList"
                    :itemIndex="cityCurrentIndex"
                    @filter="changeIndexHandler"/>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import ButtonFilter from '@/components/BtnFilter.vue'

export default {
  name: 'CityView',
  components: {
    PageTitle,
    ButtonFilter
  },
  props: {
    dataList: Array,
    latestDate: String,
    taiwanList: Array
  },
  data () {
    return {
      cityCurrentIndex: 0,
      perPageList: [10, 15, 20, 25, 30],
      perPageIndex: 0,
      currentPage: 1
    }
  },
  computed: {
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
    // },
    // localList () {
    //   const cityId = this.city.currentIndex
    //   const prevLength = this.city.prevList.length
    //   if (cityId >= prevLength) {
    //     const getCity = this.cityList.sort[cityId - (prevLength - 1)]
    //     return this.dataList.filter(({ city }) => city === getCity)
    //   } else {
    //     return this.dataList.filter(({ overseas }) => !overseas)
    //   }
    },
    cityLocalList () {
      const cityPrevList = [
        {
          title: '全部縣市',
          num: this.dataList
            .filter(({ date }) => date <= this.latestDate)
            .filter(({ overseas }) => !overseas).length
        }
      ]
      const cityAfterList = this.cityList.sort.filter((item, index) => index !== 0)
        .map(item => {
          return {
            title: item,
            num: this.cityList.map[item].sort.length
          }
        })

      return cityPrevList.concat(cityAfterList)
    }
  },
  methods: {
    changeIndexHandler (value) {
      this.cityCurrentIndex = value
    }
  }
}
</script>
