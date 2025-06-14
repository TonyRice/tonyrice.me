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
      // See the theme's README for all available options
      options: {
        navigation: [
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
          formats: ["webp", "jpg"], // Disable AVIF to avoid Netlify build errors
        },
        failOnError: false, // Optional: don't fail build on image errors
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        defaults: {
          formats: ["auto", "webp", "jpg"], // Disable AVIF here too
        },
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
