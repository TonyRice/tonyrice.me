/** @jsx jsx */
import { jsx, Heading as ThemeUIHeading } from "theme-ui"
import { Heading } from "@theme-ui/components"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { transparentize } from "polished"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"

export type JodieBlogPostProps = {
  blog: {
    excerpt: string
    color: string
    date: string
    slug: string
    title: string
    shortTitle: string
    category: string
    homeIndex?: number
    featured?: boolean
    cover: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
  images: {
    nodes: {
      name: string
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }[]
  }
}

const BlogPost: React.FC<React.PropsWithChildren<PageProps<JodieBlogPostProps>>> = ({
  data: { blog, images },
  children,
}) => (
  <Layout color={blog.color || undefined}>
    <div sx={{ variant: `content.project` }}>
      <div sx={{ fontSize: 2, textTransform: `uppercase`, letterSpacing: `wider`, mb: 2 }}>{blog.category}</div>
      <Heading as="h1" variant="styles.h1" sx={{ mt: 0 }}>
        {blog.title}
      </Heading>
      <div sx={{ color: 'text', fontSize: 2, mb: 3, fontWeight: 'bold' }}>{blog.date}</div>
      <div sx={{ maxWidth: `70ch`, my: 4 }}>{children}</div>
      {/* Show cover image if available, otherwise show filler image */}
      {blog.cover?.childImageSharp?.resize?.src ? (
        <img
          src={blog.cover.childImageSharp.resize.src}
          alt={blog.title}
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
        />
      ) : (
        <img
          src="/blog_image.png"
          alt="Filler"
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
        />
      )}
      {/* More posts section */}
      <div sx={{ mt: 5, textAlign: 'center' }}>
        <a href="/blog/" sx={{
          display: 'inline-block',
          px: 4,
          py: 2,
          backgroundColor: 'primary',
          color: 'background',
          borderRadius: 6,
          fontWeight: 'bold',
          textDecoration: 'none',
          fontSize: 2,
          transition: 'background 0.2s',
          ':hover': { backgroundColor: 'secondary', color: 'primary' },
        }}>
          More posts
        </a>
        <div sx={{ my: 3, fontWeight: 'bold', color: 'text' }}>or</div>
        <div sx={{ fontWeight: 'bold' }}>
          <a href="https://medium.com/@iamtonyrice" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary' }}>View more posts on Medium</a>
        </div>
      </div>
    </div>
  </Layout>
)

export default BlogPost

export const Head: HeadFC<JodieBlogPostProps> = ({ data: { blog }, location }) => (
  <Seo
    title={blog.title}
    description={blog.excerpt}
    pathname={location.pathname}
    image={
      blog.cover && blog.cover.childImageSharp && blog.cover.childImageSharp.resize
        ? blog.cover.childImageSharp.resize.src
        : "/blog_image.png"
    }
  />
)
