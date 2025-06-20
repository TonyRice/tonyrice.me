/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { transparentize } from "polished"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"

export type JodieThoughtProps = {
  thought: {
    excerpt: string
    color: string
    date: string
    slug: string
    title: string
    shortTitle: string
    category: string
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

const Thought: React.FC<React.PropsWithChildren<PageProps<JodieThoughtProps>>> = ({
  data: { thought, images },
  children,
}) => (
  <Layout color={thought.color || undefined}>
    <div sx={{ variant: `content.project` }}>
      <div sx={{ fontSize: 2, textTransform: `uppercase`, letterSpacing: `wider`, mb: 2 }}>{thought.category}</div>
      <Heading as="h1" variant="styles.h1" sx={{ mt: 0 }}>
        {thought.title}
      </Heading>
      <div sx={{ color: 'text', fontSize: 2, mb: 3, fontWeight: 'bold' }}>{thought.date}</div>
      <div sx={{ maxWidth: `70ch`, my: 4 }}>{children}</div>
      {/* Show cover image if available, otherwise show filler image */}
      {thought.cover?.childImageSharp?.resize?.src ? (
        <img
          src={thought.cover.childImageSharp.resize.src}
          alt={thought.title}
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
        />
      ) : (
        <img
          src="/blog_image.png"
          alt="Filler"
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
        />
      )}
      <div sx={{ fontWeight: 'bold' }}>
        <a href="https://medium.com/@iamtonyrice" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary' }}>View more posts on Medium</a>
      </div>
    </div>
  </Layout>
)


export default Thought

export const Head: HeadFC<JodieThoughtProps> = ({ data: { thought }, location }) => (
  <Seo
    title={thought.title}
    description={thought.excerpt}
    pathname={location.pathname}
    image={
      thought.cover && thought.cover.childImageSharp && thought.cover.childImageSharp.resize
        ? thought.cover.childImageSharp.resize.src
        : "/blog_image.png"
    }
  />
)
