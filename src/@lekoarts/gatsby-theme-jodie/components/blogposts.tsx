/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"
import GridItem from "@lekoarts/gatsby-theme-jodie/src/components/grid-item"
import { visuallyHidden } from "@lekoarts/gatsby-theme-jodie/src/components/../styles/utils"

export type JodieBlogPostsProps = {
  blogs: {
    nodes: Array<{
      title: string
      shortTitle: string
      slug: string
      date?: string 
      cover?: {
        childImageSharp?: {
          gatsbyImageData?: IGatsbyImageData
        }
      }
      defer?: boolean
    }>
  }
}

const BlogPosts: React.FC<PageProps<JodieBlogPostsProps>> = ({ data: { blogs } }) => (
  <Layout>
    <h1 sx={visuallyHidden} data-testid="page-title">
      My Blog
    </h1>
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: [`1fr`, `1fr 1fr`],
        gridAutoRows: `50vw`,
      }}
    >
      {blogs.nodes.length > 0 ? (
        blogs.nodes.filter(blog => !blog.defer).map((blog) => (
          <GridItem to={blog.slug} key={blog.slug} data-testid={blog.shortTitle}>
            {blog.cover?.childImageSharp?.gatsbyImageData ? (
              <GatsbyImage image={blog.cover.childImageSharp.gatsbyImageData} alt="Image" />
            ) : (
              <img src="/blog_image.png" alt="Filler" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }} />
            )}
            <span>{blog.shortTitle || blog.title}</span>
          </GridItem>
        ))
      ) : (
        <div sx={{ padding: 3 }}>No posts found.</div>
      )}
    </div>
  </Layout>
);

export default BlogPosts;

export const Head: HeadFC<JodieBlogPostsProps> = ({ location }) => <Seo title="Blog" pathname={location.pathname} />
