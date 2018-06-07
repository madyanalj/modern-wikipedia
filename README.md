![Wikipedia Logo](static/img/logo.svg)

# Modern Wikipedia
Modern, responsive Wikipedia front-end web app made with Vue.js, love and coffee! ☕

[View it live on Netlify](https://modern-wikipedia.netlify.com).

## Stack
Name | Type
-- | --
Vue.js | JavaScript front-end framework
Nuxt.js | Vue.js development framework
Sass | CSS preprocessor
Pug | HTML preprocessor
Webpack | Module bundler
Normalize.css | Modern alternative to CSS resets
Axios | Promise based HTTP client
Font Awesome | Icon toolkit

## Getting Started
Before you start, use the link above to view a live version of the app or follow the [Development Instructions](#development-instructions) to run it on your own machine. After you've got the app running, feel free to explore it by completing any of the following actions:
- Use the search box at the top left corner of the app to find articles.
- Click on any link inside any article to read the articles it links to.
- Click on the logo to return to the homepage.
- Click on any heading in the table of contents displayed in the left menu to navigate to the relevant section.
- Click on the toggle icon at the top left to show or hide the left menu.
- Click on the read/edit icons at the top right to toggle between reading and editing modes.

## Development Instructions
```bash
git clone https://github.com/maddyalj/modern-wikipedia.git
cd modern-wikipedia

# install dependencies
npm install

# launch dev server
npm run dev

# generate static version (in /dist)
npm run generate
```

## Note
The HTML markup of article content is fetched from the Wikipedia API, which comes with embedded class names and inline styles. Hence this app doesn't have total control on the styling practices used, which might not be the best sometimes. The app however does attempt to clean/hack some of the markup given by Wikipedia but doesn't tackle all of them, as the point of this app is to demonstrate the concept, not to cover every rare use case.

## Special Thanks
The UI was inspired by [this dribble](https://dribbble.com/shots/1508672-Wikipedia-concept). Thank you Aurélien Salomon! :)
