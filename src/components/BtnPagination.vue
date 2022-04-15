<template>
    <div class="page text-center">
        <ul class="pagination flex-wrap justify-content-center justify-content-xl-end" v-show="totalPages>1">
            <li class="page-item" :class="{'disabled' : currentPage <= 1}">
            <button class="page-link" @click="$emit('change',currentPage-1)">Prev</button>
            </li>
            <li class="page-item" v-for="page of totalPages" :key="page"
                :class="{'active' : page === currentPage}"
                v-show="page<=currentPage+2 && page>=currentPage-2">
                <button class="page-link" @click="$emit('change',page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{'disabled' : currentPage >= totalPages}">
            <button class="page-link" @click="$emit('change',currentPage+1)">Next</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'ButtonPagination',
  props: {
    totalPages: Number,
    currentPage: Number
  }
}
</script>
