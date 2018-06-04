<template lang="pug">
  h1 Hello {{ name }}!
</template>

<script>
export default {
  data: () => ({
    name: 'World!',
  }),
}
</script>

<style lang="sass">
  h1
    color: blue
</style>
