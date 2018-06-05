<template lang="pug">
  .the-header
    .the-header__item
      button
        font-awesome-icon(:icon='["fas", "bars"]')
      form.the-header__search-form(v-on:submit.prevent='submitSearch')
        input(v-model='search')
        button
          font-awesome-icon(:icon='["fas", "search"]')
    .the-header__item
      button(@click='setEditingMode')
        font-awesome-icon(:icon='["fas", "edit"]')
      button(@click='setReadingMode')
        font-awesome-icon(:icon='["far", "file"]')
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data: () => ({
      search: null,
    }),
    computed: mapState(['isEditing']),
    methods: {
      ...mapMutations(['setEditingMode']),
      ...mapMutations(['setReadingMode']),
      submitSearch() {
        if (!this.search) return
        this.$router.replace({ path: this.search })
      },
    },
  }
</script>

<style lang="sass">
  .the-header
    display: flex
    flex-wrap: wrap
    justify-content: space-between

    &__search-form
      display: inline-flex
</style>
