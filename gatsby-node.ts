// your-project-root/gatsby-node.ts

import { withDefaults, JodieThemeOptions } from "./src/utils/default-options";
import { mdxResolverPassthrough, slugify } from "@lekoarts/themes-utils";
import type { GatsbyNode, NodePluginArgs, CreateSchemaCustomizationArgs, CreatePagesArgs } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import path from "path";

const blogpostTemplate = path.resolve(__dirname, "src/templates/blog-post-query.tsx");
const blogpostsTemplate = path.resolve(__dirname, "src/templates/blog-posts-query.tsx");

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = function (args, options) {
  const themeOptions = withDefaults(options as any);
  const { createTypes, createFieldExtension } = args.actions;
  const { basePath, blogPrefix } = themeOptions;
  createFieldExtension({
    name: `slugifyBlogPost`,
    extend() {
      return {
        resolve(source: { slug: string; title: string }) {
          return slugify({ slug: source.slug, title: source.title }, `${basePath}/${blogPrefix}`);
        },
      };
    },
  });
  createFieldExtension({
    name: `mdxpassthroughBlogPost`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }: { fieldName: string }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });
  createTypes(`
    interface BlogPost implements Node {
      id: ID!
      title: String!
      slug: String! @slugifyBlogPost
      date: String! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      contentFilePath: String!
      shortTitle: String
      category: String
      defer: Boolean
    }
    type MdxBlogPost implements Node & BlogPost {
      title: String!
      slug: String! @slugifyBlogPost
      date: String! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthroughBlogPost(fieldName: "excerpt")
      contentFilePath: String!
      shortTitle: String
      category: String
      defer: Boolean
    }
  `);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = function (args, options) {
  const themeOptions = withDefaults(options as any);
  const node = args.node as any;
  const { actions, getNode, createNodeId, createContentDigest } = args;
  const { createNode, createParentChildLink } = actions;
  const { blogPath } = themeOptions;
  if (node.internal.type !== `Mdx`) {
    return;
  }
  const fileNode = getNode(node.parent as string) as FileSystemNode | undefined;
  const source = fileNode?.sourceInstanceName;
  
  // Only create BlogPost nodes
  if (source === "posts") {
    const cover = node.frontmatter?.cover ? node.frontmatter.cover : "/blog_image.jpg";
    const fieldData = {
      slug: node.frontmatter?.slug ? String(node.frontmatter.slug) : undefined,
      title: String(node.frontmatter?.title),
      date: String(node.frontmatter?.date),
      color: node.frontmatter?.color ? String(node.frontmatter.color) : undefined,
      cover,
      defer: node.frontmatter?.defer ?? false,
      contentFilePath: fileNode?.absolutePath,
    };
    const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`);
    createNode({
      ...fieldData,
      id: mdxBlogPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBlogPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
      },
    });
    const childNode = getNode(mdxBlogPostId);
    if (childNode) {
      createParentChildLink({ parent: node, child: childNode });
    }
  }
};

export const createPages: GatsbyNode["createPages"] = async function (args, options) {
  const themeOptions = withDefaults(options as any);
  const createPage = args.actions.createPage;
  const graphql = args.graphql;
  const reporter = args.reporter;
  const { basePath, blogUrl, formatString } = themeOptions;

  // Blog posts listing page
  createPage({
    path: `/${basePath}/${blogUrl}`.replace(/\/\/+/, "/"),
    component: blogpostsTemplate,
  });

  // Individual BlogPost pages
  const result = await graphql(`
    {
      allBlogPost(sort: { date: DESC }) {
        nodes {
          slug
          contentFilePath
          ... on MdxBlogPost {
            parent {
              ... on Mdx {
                parent {
                  ... on File {
                    relativeDirectory
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }
  const blogPosts = (result.data as any).allBlogPost.nodes;
  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach((blogPost: any) => {
      createPage({
        path: blogPost.slug,
        component: `${blogpostTemplate}?__contentFilePath=${blogPost.contentFilePath}`,
        context: {
          slug: blogPost.slug,
          formatString,
          relativeDirectory: blogPost.parent?.parent?.relativeDirectory,
        },
      });
    });
  }
};