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
    nodes: {
      shortTitle: string
      slug: string
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }[]
  }
}

const Thoughts: React.FC<PageProps<JodieThoughtsProps>> = ({ data: { thoughts } }) => (
  <Layout>
    <h1 sx={visuallyHidden} data-testid="page-title">
      My Thoughts, Ideas & Ramblings
    </h1>
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: [`1fr`, `1fr 1fr`],
        gridAutoRows: `50vw`,
      }}
    >
      {thoughts.nodes.length > 0 ? (
        thoughts.nodes.map((thought) => (
          <GridItem to={thought.slug} key={thought.slug} data-testid={thought.shortTitle}>
            <GatsbyImage image={thought.cover.childImageSharp.gatsbyImageData} alt="" />
            <span>{thought.shortTitle}</span>
          </GridItem>
        ))
      ) : (
        <div sx={{ padding: 3 }}>No posts found.</div>
      )}
    </div>
  </Layout>
)

export default Thoughts

export const Head: HeadFC<JodieThoughtsProps> = ({ location }) => <Seo title="Thoughts" pathname={location.pathname} />
