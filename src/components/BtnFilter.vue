<template>
    <div class="filter text-center">
        <button type="button" class="btn btn-outline-primary m-1"
                v-for="item,index of itemList" :key="item.title"
                :class="{ 'active' : (index === itemIndex) }"
                @click="$emit('filter',index)">
                {{ item.title }}
                <span>({{ item.num }})</span>
        </button>
    </div>
</template>

<script>
export default {
  name: 'ButtonFilter',
  props: {
    itemList: Array,
    itemIndex: Number
  }
}
</script>
