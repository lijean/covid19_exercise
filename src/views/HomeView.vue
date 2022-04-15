<template>
  <div class="home">
    <PageTitle text="台灣當日新增疫情一覽"/>
    <div class="main">
      <CardItem :itemList="confirmedNumList"/>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import CardItem from '@/components/CardItem.vue'

export default {
  name: 'HomeView',
  components: {
    PageTitle,
    CardItem
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
          num: this.currencyHandler(this.todayLocal),
          text: this.latestDate
        },
        {
          title: '當日境外移入(例)',
          num: this.currencyHandler(this.todayOverseas),
          text: this.latestDate
        }
      ]
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
