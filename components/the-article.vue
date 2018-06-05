<template lang="pug">
  article.the-article
    aside.the-article__menu
      nuxt-link(to='/')
        img(src='/logo.svg')
      div(v-show='article.headings && article.headings.length')
        div Contents
        ul
          li(v-for='heading in article.headings')
            a(:href='"#" + heading.id') {{ heading.title }}
            ul
              li(v-for='heading in heading.children')
                a(:href='"#" + heading.id') {{ heading.title }}
    section.the-article__content(:contenteditable='isEditing')
      h1 {{ article.title }}
      div(v-html='article.content')
    aside.the-article__infobox(v-show='article.infobox' v-html='article.infobox' :contenteditable='isEditing')
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import WikipediaArticle from '~/assets/js/WikipediaArticle'

  const HOME_TITLE = 'Wikipedia, the free encyclopedia'
  const HOME_ARTICLE = new WikipediaArticle(
    'Welcome to Wikipedia!',
    '<p>Welcome to Wikipedia!</p>',
  )
  const ERROR_ARTICLE = new WikipediaArticle(
    '404 Article Not Found',
    '<p>Please try searching for something else.</p>',
  )

  export default {
    data: () => ({
      pageTitle: HOME_TITLE,
    }),
    computed: mapState(['article', 'isEditing']),
    head() {
      return {
        title: this.pageTitle,
      }
    },
    async created() {
      if (process.server) return
      const { articleTitle } = this.$route.params
      let pageTitle = HOME_TITLE
      let wikipediaArticle = HOME_ARTICLE
      if (articleTitle) {
        wikipediaArticle = new WikipediaArticle(articleTitle)
        await wikipediaArticle.fetch().catch(() => {
          wikipediaArticle = ERROR_ARTICLE
        })
        pageTitle = `${wikipediaArticle.title} - Wikipedia`
      }
      this.pageTitle = pageTitle
      this.setArticle(wikipediaArticle)
    },
    methods: mapMutations(['setArticle']),
  }
</script>

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
