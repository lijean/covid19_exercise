<template>
  <div class="pageTitle text-center py-5 mb-3">
    <h1 class="fs-1 fw-bold mb-0">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    text: String
  }
}
</script>
