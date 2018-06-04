<template lang="pug">
  article.the-article
    aside.the-article__menu
      img(src='logo.svg')
      div Contents
      ul
        li Heading
        li Heading
        li Heading
    section.the-article__content
      h1 Title
      p Content...
    aside.the-article__infobox
      div Infobox
</template>

<style lang="sass">
  .the-article
    display: flex
    flex-wrap: wrap

    &__menu
      flex: 0 180px

    &__content
      flex: 1 400px

    &__infobox
      flex: 0 260px
</style>
