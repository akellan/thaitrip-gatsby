module.exports = {
    siteMetadata: {
        title: `Thai Trip`,
        description: `Thai Trip Blog`,
        author: `Mykola`
    },
    plugins: [
        `gatsby-plugin-webpack-size`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-catch-links`,
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                jsxPragma: `React`,
                allExtensions: true
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts-data`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Thai Trip`,
                short_name: `Thai Trip`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#1ac308`,
                display: `minimal-ui`,
                icon: `src/icons/palm-tree-icon.png`
            }
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        "gatsby-plugin-offline"
    ]
};
