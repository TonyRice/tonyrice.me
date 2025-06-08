import { graphql } from "gatsby"
import ProjectComponent, { Head } from "@lekoarts/gatsby-theme-jodie/src/components/project"

export default ProjectComponent

export { Head }

export const query = graphql`
  query ($slug: String!, $formatString: String!, $relativeDirectory: String!) {
    project(slug: { eq: $slug }) {
      excerpt
      color
      date(formatString: $formatString)
      slug
      title
      shortTitle
      defer
      category
      cover {
        childImageSharp {
          resize(width: 1200, quality: 85) {
            src
          }
        }
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
