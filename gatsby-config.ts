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
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `@tonyrice`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `thoughts`,
        path: `content/thoughts`,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-jodie`,
      // See the theme's README for all available options
      options: {
        navigation: [
          { name: `Home`, slug: `/` },
          { name: `About Me`, slug: `/about` },
          { name: `Contact`, slug: `/contact` },
          { name: `Resume`, slug: `/resume` },
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
        name: `jodie - @lekoarts/gatsby-theme-jodie`,
        short_name: `jodie`,
        description: `Image-heavy photography portfolio with colorful accents & customizable pages. Includes adaptive image grids powered by CSS grid and automatic image integration into projects.`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
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
