module.exports = {
  siteMetadata: {
    title: `Thai Trip`,
    description: `Thai Trip Blog`,
    author: `Mykola`
  },
  plugins: [
    `gatsby-plugin-webpack-size`,
    `gatsby-plugin-emotion`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/posts-data`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts-data`,
        path: `${__dirname}/src/posts-data`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
    //   }
    // }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
