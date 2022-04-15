<template>
    <div class="cardItem row mt-4">
        <div class="col-xl-4 col-12 mb-3" v-for="item,index of itemList" :key="item.title">
            <div class="card rounded-3 text-center">
              <div class="card-header py-3 text-white" :class="[`bg-${colorStyleList(index)}`]">
                <div class="fs-4">{{ item.title }}</div>
              </div>
              <div class="card-body">
                <div class="card-title fs-1 fw-bold mb-2" :class="`text-${colorStyleList(index)}`">{{ item.num }}</div>
                <p class="card-text fs-6 opacity-50">{{ item.text }}</p>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    itemList: Array
  },
  methods: {
    colorStyleList (idx) {
      const colorList = ['danger', 'success', 'primary']
      return colorList[idx % colorList.length]
    }
  }
}
</script>
