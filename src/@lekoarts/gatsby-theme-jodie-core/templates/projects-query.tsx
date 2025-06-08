import { graphql } from "gatsby"
import ProjectsComponent, { Head } from "@lekoarts/gatsby-theme-jodie/src/components/projects"

export default ProjectsComponent

export { Head }

export const query = graphql`
  {
    projects: allProject(sort: { date: DESC }) {
      nodes {
        shortTitle
        slug
        defer
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
        }
      }
    }
  }
`
