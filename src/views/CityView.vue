<template>
  <div class="city">
    <PageTitle text="台灣各縣市確診案例"/>
    <div class="main">
      <ButtonFilter class="mb-3"
                    :itemList="cityLocalList"
                    :itemIndex="cityCurrentIndex"
                    @filter="changeIndexHandler"/>
      <div class="row align-items-start py-5">
        <div class="col-xl-5 col-12 mb-4 mt-3">
          <DoughnutChart :chartData="chartData" />
        </div>

        <div class="col-xl-7 col-12">

          <div class="d-flex flex-wrap justify-content-end justify-content-xl-start mb-3">
            <div class="d-flex align-items-center">
              <span>顯示筆數</span>
              <select class="form-select form-select-sm w-auto ms-2" v-model="perPageIndex">
                <option v-for="page,index of perPageList"
                        :key="page"
                        :value="index">
                  {{ page }}
                </option>
              </select>
            </div>
          </div>

          <div class="table-responsive text-center">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">NO.</th>
                  <th scope="col">日期</th>
                  <th scope="col">縣市</th>
                  <th scope="col">鄉鎮</th>
                  <th scope="col">性別</th>
                  <th scope="col">年齡層</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item,index of pageList" :key="item.id">
                  <td>{{ (this.currentPage - 1) * this.perPage + index + 1 }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.city }}</td>
                  <td>{{ item.town }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.age }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ButtonPagination class="mt-2"
                            :totalPages="totalPages"
                            :currentPage="currentPage"
                            @change="changeCurrentPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import ButtonFilter from '@/components/BtnFilter.vue'
import ButtonPagination from '@/components/BtnPagination.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'

export default {
  name: 'CityView',
  components: {
    PageTitle,
    ButtonFilter,
    ButtonPagination,
    DoughnutChart
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
    },
    cityPrevList () {
      return [
        {
          title: '全部縣市',
          num: this.dataList
            .filter(({ date }) => date <= this.latestDate)
            .filter(({ overseas }) => !overseas).length
        }
      ]
    },
    cityLocalList () {
      const cityAfterList = this.cityList.sort.filter((item, index) => index !== 0)
        .map(item => {
          return {
            title: item,
            num: this.cityList.map[item].sort.length
          }
        })

      return this.cityPrevList.concat(cityAfterList)
    },
    localList () {
      const prevLength = this.cityPrevList.length
      if (this.cityCurrentIndex >= prevLength) {
        const getCity = this.cityList.sort[this.cityCurrentIndex - (prevLength - 1)]
        return this.dataList.filter(({ city }) => city === getCity)
      } else {
        return this.dataList.filter(({ overseas }) => !overseas)
      }
    },
    perPage () {
      return this.perPageList[this.perPageIndex]
    },
    pageList () {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.localList.slice(start, end)
    },
    totalPages () {
      return Math.ceil(this.localList.length / this.perPage)
    },
    chartData () {
      let labels = []; let dataList = []
      if (this.cityCurrentIndex >= this.cityPrevList.length) {
        const obj = {
          sort: [],
          map: {}
        }
        this.dataList
          .filter(({ city }) => city === this.cityList.sort[this.cityCurrentIndex])
          .forEach(({ id, date, town }) => {
            if (!obj.map[town]) {
              obj.sort.push(town)
              obj.map[town] = {
                sort: [],
                map: {}
              }
            }

            obj.map[town].sort.push(id)
            obj.map[town].map[id] = { date }
          })

        labels = obj.sort
          .sort((a, b) => obj.map[b].sort.length - obj.map[a].sort.length)

        dataList = labels.map((item) => obj.map[item].sort.length)
      } else {
        labels = this.cityList.sort
          .filter((item, index) => index !== 0)
          .sort((a, b) => this.cityList.map[b].sort.length - this.cityList.map[a].sort.length)
        dataList = labels.map((item) => this.cityList.map[item].sort.length)
      }

      const colorList = ['#6366e0', '#e8537a', '#dc3545', '#fd7e14', '#ebcd71', '#20c997', '#67acd6']
      const bgColor = labels.map((item, index) => colorList[((index + colorList.length) % colorList.length)])

      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: bgColor,
            data: dataList
          }
        ]
      }
    }
  },
  methods: {
    changeIndexHandler (value) {
      this.cityCurrentIndex = value
      this.changeCurrentPage(1)
    },
    changeCurrentPage (page) {
      this.currentPage = (page + this.totalPages + 1) % (this.totalPages + 1)
    }
  }
}
</script>
