import { graphql } from "gatsby"
import BlogPostComponent, { Head } from "../@lekoarts/gatsby-theme-jodie-core/components/blogpost"

export default BlogPostComponent

export { Head }

export const query = graphql`
  query ($slug: String!, $formatString: String!, $relativeDirectory: String!) {
    blog: blogPost(slug: { eq: $slug }) {
      excerpt
      color
      date(formatString: $formatString)
      slug
      title
      shortTitle
      category
      homeIndex
      featured
      cover {
        childImageSharp {
          resize(width: 1200, quality: 85) {
            src
          }
        }
        publicURL
      }
    }
    images: allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 1600, quality: 90)
        }
      }
    }
  }
`
