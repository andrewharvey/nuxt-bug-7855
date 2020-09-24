setInterval(() => {
  const { heapUsed: used, rss, heapTotal: tot, external: ext } = process.memoryUsage()
  const f = (value) => (!value ? '-' : `${Math.round(value / 1048576)} MB`)

  console.log(
    `[${new Date().toTimeString().substr(0, 8)}] Memory usage: ${f(used)} (RSS: ${f(rss)}) - total heap: ${f(
      tot
    )} - external: ${f(ext)}`
  )
}, 10000)

export default {
  target: 'static', // static generated application
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    parallel: true,
    quiet: false,

    // minify has a huge performance cost, so it's disabled to keep generate times down
    html: {
      minify: false
    },

    profile: true,

    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    concurrency: 1, // number of routes to generate concurrently
    // build out 500 dynamic routes
    routes: Array.from({length:250},(v,k)=>k+1).map(v => '/' + v.toString()),
    crawler: false // don't crawl for routes since these are already passed above
  },
  buildModules: [
  '@nuxtjs/vuetify'
  ],
  vuetify: {
    // tree shake may cause memory leaks to tried to disable it, but doing so
    // broke defaultAssets: false
    treeShake: true,
    defaultAssets: false, // needed for offline resources
    customVariables: ['~/assets/variables.scss'], // set custom vuetify variables
    theme: {
      themes: {
        light: {
          primary: '#3c1f4d',
          secondary: '#753c96'
        }
      }
    }
  }
}
