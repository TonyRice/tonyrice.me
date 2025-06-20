/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import GridItem from "@lekoarts/gatsby-theme-jodie/src/components/grid-item"
import { itemListWrapperStyles, itemStyles } from "@lekoarts/gatsby-theme-jodie/src/styles/item-list"
import locales from "../locales"
import { visuallyHidden } from "@lekoarts/gatsby-theme-jodie/src/styles/utils"
import modifyGrid from "../utils/modify-grid"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"

export type JodieHomepageProps = {
  projects: {
    nodes: {
      slug: string
      title: string
      defer: boolean // Add optional defer property
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      __typename: "MdxProject"
    }[]
  }
  pages: {
    nodes: {
      slug: string
      title: string
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      __typename: "MdxPage"
    }[]
  }
}

const Homepage: React.FC<PageProps<JodieHomepageProps>> = ({ data: { pages, projects } }) => {
  // Add a custom blog grid item as the last item
  const blogItem = {
    slug: '/blog/',
    title: 'My Blog',
    cover: {
      childImageSharp: {
        gatsbyImageData: {
          images: { fallback: { src: '/blog_image.png' } },
          layout: 'constrained' as any, // Cast to any to avoid type error
          width: 800,
          height: 600,
        }
      }
    },
    __typename: 'CustomBlog',
  };

  // Filter out projects with defer set to true
  const filteredProjects = projects.nodes.filter(project => !project.defer);
  const rawItems = [...pages.nodes, ...filteredProjects, blogItem]; // Add blogItem here when the blog is REady todo
  const items = modifyGrid(rawItems as any); // Cast to any to avoid type error
  const itemsCount = items.length
  let divisor = 9

  for (let i = 0; i < itemsCount; i++) {
    const quotient = itemsCount % divisor
    const quotientAlt = (itemsCount - 1) % divisor

    if (quotient === 0 || quotientAlt === 0) {
      break
    }

    divisor -= 1
  }

  return (
    <Layout>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className={`item-list-wrapper`} sx={itemListWrapperStyles}>
        <div className={`item-list div${divisor}`}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <GridItem to={item.slug} className="item" key={item.title} sx={itemStyles} data-testid={item.title}>
                {item.cover?.childImageSharp?.gatsbyImageData?.images?.fallback?.src ? (
                  <GatsbyImage
                    loading={index === 0 ? `eager` : `lazy`}
                    image={item.cover.childImageSharp.gatsbyImageData}
                    alt=""
                  />
                ) : (
                  <img
                    src={item.cover?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || '/blog_image.jpg'}
                    alt="Blog"
                    style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                  />
                )}
                <span>{item.title}</span>
              </GridItem>
            ))
          ) : (
            <div sx={{ padding: 3 }}>
              Please come back later.
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Homepage

export const Head: HeadFC = () => <Seo />
