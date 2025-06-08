import { graphql } from "gatsby"
import ThoughtsComponent, { Head } from "../@lekoarts/gatsby-theme-jodie-core/components/thoughts"

export default ThoughtsComponent

export { Head }

export const query = graphql`
  {
    thoughts: allThought(sort: { date: DESC }) {
      nodes {
        shortTitle
        slug
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
        }
      }
    }
  }
`
