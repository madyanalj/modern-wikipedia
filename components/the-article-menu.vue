<template lang="pug">
  div
    nuxt-link#the-logo(to='/')
      img(src='/img/logo.svg')
    div(v-show='article.headings && article.headings.length')
      .toc__title Contents
      ul
        li(v-for='heading in article.headings')
          a.toc__link(:href='"#" + heading.id') {{ heading.title }}
          ul
            li(v-for='heading in heading.children')
              a.toc__link.toc__link--nested(:href='"#" + heading.id') {{ heading.title }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState(['article']),
  }
</script>

<style lang="sass" scoped>
  @import ~assets/sass/variables

  #the-logo
    padding: $p-sm
    border-bottom: $border
    display: block
    text-align: center

  img
    width: 100%
    max-width: 200px

  .toc
    &__title, &__link
      padding: $p-md
      background-color: $c-blue-light
      border-bottom: $border
      font-weight: bold
    &__title
      color: $c-grey
      text-align: center
    &__link
      display: block
      color: $c-black
      font-size: .9em
      text-decoration: none
      &:hover
        background-color: $c-grey-lighter
      &--nested
        font-weight: unset
        padding: $p-sm
        padding-left: 4em
        border-bottom-width: 0
        li:last-child &
          border-bottom-width: 1px
</style>
