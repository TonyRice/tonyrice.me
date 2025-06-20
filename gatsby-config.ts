import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Tony Rice - Entrepreneur, Creator and Software Engineer`,
    siteTitleAlt: `Tony Rice - Entrepreneur, Creator and Software Engineer`,
    siteHeadline: `Tony Rice - Entrepreneur, Creator and Software Engineer`,
    siteUrl: `https://tonyrice.me`,
    siteDescription: `Basically my projects, resume, and a few other things.`,
    siteDescriptionAlt: `Tony Rice - Portfolio and Resume`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    author: `@tonyrice`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-jodie`,
      options: {
        navigation: [
          { name: `About Me`, slug: `/about` },
          { name: `Blog`, slug: `/blog` },
          { name: `Contact`, slug: `/contact` },
          { name: `Portfolio`, slug: `/portfolio` },

        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tony Rice - Entrepreneur, Creator and Software Engineer`,
        short_name: `tonyrice`,
        description: `Portfolio, resume, and project showcase for Tony Rice, an entrepreneurial full-stack software engineer and creator. Explore my work, background, and ways to connect.`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `browser`, // Prevents PWA install prompt
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ["auto", "webp", "jpg"], 
        },
        failOnError: false, 
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        defaults: {
          formats: ["auto", "webp", "jpg"], 
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static-assets`,
        path: `${__dirname}/static/`,
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config
