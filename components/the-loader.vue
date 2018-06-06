<template lang="pug">
  #the-loader(v-show='isLoading')
    font-awesome-icon(icon='sun' spin)
    #the-loader__label Loading...
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
    }),
    methods: {
      start() {
        this.isLoading = true
      },
      finish() {
        this.isLoading = false
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import ~assets/sass/variables

  #the-loader
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    color: $c-blue-light
    background: $c-blue-green
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    z-index: 5
    &__label
      font-size: 1.5em
      margin-top: .5em

  .fa-sun
    font-size: 10em
</style>
