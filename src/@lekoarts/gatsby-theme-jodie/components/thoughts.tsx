/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"
import GridItem from "@lekoarts/gatsby-theme-jodie/src/components/grid-item"
import { visuallyHidden } from "@lekoarts/gatsby-theme-jodie/src/components/../styles/utils"

export type JodieThoughtsProps = {
  thoughts: {
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

const Thoughts: React.FC<PageProps<JodieThoughtsProps>> = ({ data: { thoughts } }) => (
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
      {thoughts.nodes.length > 0 ? (
        thoughts.nodes.filter(thought => !thought.defer).map((thought) => (
          <GridItem to={thought.slug} key={thought.slug} data-testid={thought.shortTitle}>
            {thought.cover?.childImageSharp?.gatsbyImageData ? (
              <GatsbyImage image={thought.cover.childImageSharp.gatsbyImageData} alt="Image" />
            ) : (
              <img src="/blog_image.png" alt="Filler" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }} />
            )}
            <span>{thought.shortTitle || thought.title}</span>
          </GridItem>
        ))
      ) : (
        <div sx={{ padding: 3 }}>No posts found.</div>
      )}
    </div>
  </Layout>
);

export default Thoughts;

export const Head: HeadFC<JodieThoughtsProps> = ({ location }) => <Seo title="Thoughts" pathname={location.pathname} />
