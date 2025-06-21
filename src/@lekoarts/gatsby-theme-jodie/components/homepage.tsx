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
import { Tracing } from "node:trace_events"

export type JodieHomepageProps = {
  projects: {
    nodes: {
      slug: string
      title: string
      shortTitle: Tracing
      defer: boolean
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
  blogs?: {
    nodes: Array<{
      slug: string
      title: string
      shortTitle?: string
      date?: string
      featured?: boolean
      homeIndex?: number
      defer?: boolean
      cover?: {
        childImageSharp?: {
          gatsbyImageData?: IGatsbyImageData
        }
      }
      __typename: string
    }>
  }
}

const Homepage: React.FC<PageProps<JodieHomepageProps>> = ({ data: { pages, projects, blogs } }) => {
  // Add a custom blog grid item as the last item
  const blogItem = {
    slug: '/blog/',
    title: 'My Blog',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    defer: false,
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
    __typename: 'MdxProject',
  };

  // Find the first blog post with a 'featured' property set to true, if available
  let featuredBlog = null;
  let homeIndex: number | null = null;
  if (blogs && blogs.nodes && blogs.nodes.length > 0) {
    featuredBlog = blogs.nodes.find(blog => (blog as any).featured);
    if (featuredBlog && typeof (featuredBlog as any).homeIndex === 'number') {
      homeIndex = (featuredBlog as any).homeIndex;
    }
  }

  // Prepare the featured blog item if found
  const featuredBlogItem = featuredBlog
    ? {
        slug: featuredBlog.slug,
        title: featuredBlog.title,
        defer: false,
        cover: featuredBlog.cover && featuredBlog.cover.childImageSharp && featuredBlog.cover.childImageSharp.gatsbyImageData
          ? { childImageSharp: { gatsbyImageData: featuredBlog.cover.childImageSharp.gatsbyImageData } }
          : blogItem.cover,
        __typename: 'MdxProject',
      }
    : null;

  // Filter out projects with defer set to true
  const filteredProjects = projects.nodes.filter(project => !project.defer);
  let rawItems: typeof filteredProjects = [...pages.nodes, ...filteredProjects];

  // Insert featured blog at the specified homeIndex, or after blogItem if homeIndex is -1/null
  if (featuredBlogItem) {
    if (homeIndex !== null && homeIndex >= 0 && homeIndex <= rawItems.length) {
      rawItems = [
        ...rawItems.slice(0, homeIndex),
        featuredBlogItem ? featuredBlogItem : blogItem,
        ...rawItems.slice(homeIndex)
      ];
    } else {
      rawItems.push(featuredBlogItem ? featuredBlogItem : blogItem);
    }
  } else {
    rawItems.push(blogItem);
  }
  const items = modifyGrid(rawItems as any); // Cast to any to avoid type error
  const itemsCount = items.length;
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
