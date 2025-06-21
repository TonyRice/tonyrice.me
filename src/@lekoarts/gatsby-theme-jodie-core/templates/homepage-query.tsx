import { graphql } from "gatsby"
import HomepageComponent, { Head } from "@lekoarts/gatsby-theme-jodie/src/components/homepage"

export default HomepageComponent

export { Head }

export const query = graphql`
  query ($homepagePageLimit: Int!, $homepageProjectLimit: Int!) {
    pages: allPage(sort: { title: ASC }, limit: $homepagePageLimit) {
      nodes {
        slug
        title
        defer
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90, formats: [AUTO, WEBP, AVIF])
          }
        }
        __typename
      }
    }
    projects: allProject(sort: { date: DESC }, limit: $homepageProjectLimit) {
      nodes {
        slug
        title: shortTitle
        defer
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90, formats: [AUTO, WEBP, AVIF])
          }
        }
        __typename
      }
    }
    blogs: allBlogPost(sort: { date: DESC }, limit: 5) {
      nodes {
        slug
        title: shortTitle
        date
        featured
        homeIndex
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90, formats: [AUTO, WEBP, AVIF])
          }
        }
        __typename
      }
    }
  }
`
