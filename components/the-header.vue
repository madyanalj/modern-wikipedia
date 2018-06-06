<template lang="pug">
  header
    .the-header__group
      button(@click='toggleShowMenu')
        font-awesome-icon(icon='bars' size='lg')
      form(v-on:submit.prevent='submitSearch')
        input(v-model='search')
        button
          font-awesome-icon(icon='search')
    .the-header__group
      button(@click='setEditingMode' :class='{ "is-active": isEditing }')
        font-awesome-icon(icon='edit')
      button(@click='setReadingMode' :class='{ "is-active": !isEditing }')
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
      ...mapMutations(['toggleShowMenu', 'setEditingMode', 'setReadingMode']),
      submitSearch() {
        if (!this.search) return
        this.$router.replace({ path: this.search })
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import ~assets/sass/variables

  header
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-content: stretch
    background: linear-gradient(to bottom right, $c-blue, $c-blue-grey)
    color: $c-white

  .the-header__group, form
    display: inline-flex

  button, input
    background: 0
    border: 0
    outline: 0
    color: unset
    opacity: .6
    &:hover, &:focus
      opacity: 1

  button
    padding: 0 .8em
    position: relative
    &.is-active
      opacity: 1
      &:after
        content: ''
        display: block
        border-right: .4em solid transparent
        border-left: .4em solid transparent
        border-bottom: .4em solid $c-white
        position: absolute
        bottom: 0px

  input
    font-size: .8em
    border-bottom: $border
    margin: 1em 0
    padding-bottom: .4em
    &:focus
      opacity: 1
</style>
