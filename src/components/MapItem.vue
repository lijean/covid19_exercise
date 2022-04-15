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

<style scoped lang="scss">
.map {
    position: relative;
}
[class*='mapTarget'] {
    position: absolute;
    z-index: 5;
    line-height: 1.2;
    cursor: pointer;
    pointer-events: auto;
    > span {
        margin-top: 3pt;
        font-size: 0.8rem;
    }
}
.mapTarget {
    &List {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-left: 0;
        list-style: none;
        pointer-events: none;
    }
    &0 {
        bottom: 5px;
        left: 5px;
        padding: 10px;
        border: 1px solid var(--bs-gray-400);
        border-radius: 3px;
    }
    &1 {
        top: 1%;
        right: 14%;
    }
    &2 {
        top: 9.5%;
        right: 10%;
    }
    &3 {
        top: 0;
        right: -2%;
    }
    &4 {
        top: 19.5%;
        right: 6.5%;
    }
    &5 {
        top: 5%;
        right: 28%;
    }
    &6 {
        top: 12%;
        right: 36%;
    }
    &7 {
        top: 15%;
        right: 24%;
    }
    &8  {
        top: 21.5%;
        right: 33.5%;
    }
    &9 {
        top: 29.5%;
        right: 40%;
    }
    &10 {
        top: 37%;
        right: 51%;
    }
    &11 {
        top: 40.5%;
        right: 30%;
    }
    &12 {
        top: 44.5%;
        right: 51%;
    }
    &13 {
        top: 51%;
        right: 53%;
    }
    &14 {
        top: 52%;
        right: 39%;
    }
    &15 {
        top: 60.5%;
        right: 53%;
    }
    &16 {
        top: 66%;
        right: 40%;
    }
    &17 {
        top: 78%;
        right: 43%;
    }
    &18 {
        top: 43%;
        right: 11.5%;
    }
    &19 {
        top: 69%;
        right: 25%;
    }
    &20 {
        top: 47%;
        left: 12%;
    }
    &21 {
        top: 3.5%;
        left: 32%;
    }
    &22 {
        top: 26%;
        left: 18%;
    }
}
</style>
