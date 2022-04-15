<template>
    <div class="order d-flex flex-wrap">
        <h3 class="fs-3 mb-0 d-inline-block">{{ itemTitle }}</h3>
        <span class="fs-6 d-inline-block ms-auto opacity-50">{{ itemDate }}</span>
        <div class="list-group rounded-3 py-5 px-4 mt-3 bg-secondary bg-opacity-10 w-100">
            <div v-for="item,index of itemList" :key="item.title"
                class="list-group-item d-flex align-items-center border-0 rounded text-white"
                :class="[[`bg-${colorStyleList(index)}`],
                        index!==0 ? 'mt-3' : '']">
                <div class="me-3">
                    <div class="icon icon-shape rounded-circle shadow-lg bg-gradient"
                        :class="[`bg-${colorStyleList(index)}`]">
                    {{ index+1 }}
                    </div>
                </div>
                <div class="flex-fill">
                    <div class="card-title fs-4 mb-0">{{ item.title }}</div>
                    <p class="card-text fs-6 opacity-50">{{ itemText }} {{ item.num }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    itemTitle: String,
    itemText: String,
    itemDate: String,
    itemList: Array
  },
  methods: {
    colorStyleList (idx) {
      const colorList = ['danger', 'primary', 'secondary']
      if (idx < colorList.length - 1) return colorList[idx]
      else return colorList[colorList.length - 1]
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
    line-height: 1;
    text-align: center;
    &-shape {
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
}
</style>
