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
      homeIndex?: number
      featured?: boolean
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
              <GatsbyImage 
                image={blog.cover.childImageSharp.gatsbyImageData} 
                alt="Image" 
                style={{ filter: 'brightness(0.7)', transition: 'filter 0.2s', borderRadius: 8 }}
              />
            ) : blog.cover?.publicURL.endsWith('.svg') ? (
              <img 
                src={blog.cover.publicURL}
                alt="Filler" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block', filter: 'brightness(0.7)', transition: 'filter 0.2s' }} 
              />) : (
              <img 
                src="/blog_image.png" 
                alt="Filler" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block', filter: 'brightness(0.7)', transition: 'filter 0.2s' }} 
              />
            )}
            <div sx={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', p: 3, pointerEvents: 'none' }}>
              <span sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 4,
                textAlign: 'right',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: 1.1,
                mb: 1,
                px: 3,
                wordBreak: 'break-word',
              }}>{blog.shortTitle || blog.title}</span>
              {blog.date && (
                <div sx={{
                  color: 'white',
                  opacity: 0.85,
                  fontSize: 2,
                  textAlign: 'right',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  fontWeight: 'normal',
                  px: 3,
                }}>{blog.date}</div>
              )}
            </div>
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
