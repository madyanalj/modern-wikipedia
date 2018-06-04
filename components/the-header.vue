<template lang="pug">
  .the-header
    .the-header__item
      button
        font-awesome-icon(:icon='["fas", "bars"]')
      form.the-header__search-form
        input
        button
          font-awesome-icon(:icon='["fas", "search"]')
    .the-header__item
      button
        font-awesome-icon(:icon='["fas", "edit"]')
      button
        font-awesome-icon(:icon='["far", "file"]')
</template>

<style lang="sass">
  .the-header
    display: flex
    flex-wrap: wrap
    justify-content: space-between

    &__search-form
      display: inline-flex
</style>
