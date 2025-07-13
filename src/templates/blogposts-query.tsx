import { graphql } from "gatsby"
import BlogPostsComponent, { Head } from "../@lekoarts/gatsby-theme-jodie-core/components/blogposts"

export default BlogPostsComponent

export { Head }

export const query = graphql`
  {
    blogs: allBlogPost(sort: { date: DESC }) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        shortTitle
        slug
        homeIndex
        featured
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
          publicURL
        }
      }
    }
  }
`
