<template>
    <div class="map d-flex flex-wrap">
        <h3 class="fs-3 mb-0 d-inline-block" v-if="itemTitle">{{ itemTitle }}</h3>
        <span class="fs-6 d-inline-block ms-auto opacity-50" v-if="itemDate">{{ itemDate }}</span>
        <div class="text-center rounded-3 py-5 px-4 mt-3 bg-secondary bg-opacity-10 w-100">
            <div class="map d-inline-block">
                <img src="../assets/map.png" alt="台灣地圖" class="w-auto mw-100">
                <ul class="mapTargetList">
                    <li v-for="item,index of itemList" :key="item.title"
                        class="text-nowrap fs-6" :class="`mapTarget${index}`">
                        {{ item.title }}
                        <span class="d-block rounded-3 text-white"
                            :class="[`bg-${colorStyleList(item.num)}`]">
                            {{ item.num }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CityMap',
  props: {
    itemTitle: String,
    itemDate: String,
    itemList: Array
  },
  methods: {
    colorStyleList (num) {
      const colorList = ['danger', 'primary', 'secondary']
      if (num >= 100) return colorList[0]
      else if (num > 0) return colorList[1]
      else return colorList[2]
    }
  }
}
</script>
