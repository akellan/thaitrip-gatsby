module.exports = {
    siteMetadata: {
        title: `Thai Trip`,
        description: `Thai Trip Blog`,
        author: `Mykola`
    },
    plugins: [
        `gatsby-plugin-webpack-size`,
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-embed-video",
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 400, // Optional: Overrides optional.ratio
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            noIframeBorder: true //Optional: Disable insertion of <style> border: 0
                        }
                    }
                ]
            }
        },
        `gatsby-plugin-react-helmet`,
        // `gatsby-plugin-catch-links`,
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
                display: `standalone`,
                icon: `src/icons/palm-tree-icon.png`
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // "gatsby-plugin-offline"
    ]
};
