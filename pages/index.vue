<template lang="pug">
  div
    the-header
    the-article
</template>

<script>
  import TheHeader from '~/components/the-header.vue'
  import TheArticle from '~/components/the-article.vue'

  export default {
    components: {
      TheHeader,
      TheArticle,
    },
  }
</script>

<style lang="sass">
</style>
