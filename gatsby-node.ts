// your-project-root/gatsby-node.ts

import { withDefaults, JodieThemeOptions } from "./src/utils/default-options";
import { mdxResolverPassthrough, slugify } from "@lekoarts/themes-utils";
import type { GatsbyNode, NodePluginArgs, CreateSchemaCustomizationArgs, CreatePagesArgs } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import path from "path";

const thoughtTemplate = path.resolve(__dirname, "src/templates/thought-query.tsx");
const thoughtsTemplate = path.resolve(__dirname, "src/templates/thoughts-query.tsx");

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = function (args, options) {
  const themeOptions = withDefaults(options as any);
  const { createTypes, createFieldExtension } = args.actions;
  const { basePath, thoughtsPrefix } = themeOptions;
  createFieldExtension({
    name: `slugifyThought`,
    extend() {
      return {
        resolve(source: { slug: string; title: string }) {
          return slugify({ slug: source.slug, title: source.title }, `${basePath}/${thoughtsPrefix}`);
        },
      };
    },
  });
  createFieldExtension({
    name: `mdxpassthroughThought`,
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
    interface Thought implements Node {
      id: ID!
      title: String!
      slug: String! @slugifyThought
      date: Date! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      contentFilePath: String!
      shortTitle: String
      category: String
      defer: Boolean
    }
    type MdxThought implements Node & Thought {
      title: String!
      slug: String! @slugifyThought
      date: Date! @dateformat
      color: String
      cover: File @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthroughThought(fieldName: "excerpt")
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
  const { thoughtsPath } = themeOptions;
  if (node.internal.type !== `Mdx`) {
    return;
  }
  const fileNode = getNode(node.parent as string) as FileSystemNode | undefined;
  const source = fileNode?.sourceInstanceName;
  // Only create Thought nodes
  if (source === "thoughts") {
    const fieldData = {
      slug: node.frontmatter?.slug ? String(node.frontmatter.slug) : undefined,
      title: String(node.frontmatter?.title),
      date: String(node.frontmatter?.date),
      color: node.frontmatter?.color ? String(node.frontmatter.color) : undefined,
      cover: node.frontmatter?.cover,
      defer: node.frontmatter?.defer ?? false,
      contentFilePath: fileNode?.absolutePath,
    };
    const mdxThoughtId = createNodeId(`${node.id} >>> MdxThought`);
    createNode({
      ...fieldData,
      id: mdxThoughtId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxThought`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Thought interface`,
      },
    });
    const childNode = getNode(mdxThoughtId);
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
  const { basePath, thoughtsUrl, formatString } = themeOptions;

  // Thoughts listing page
  createPage({
    path: `/${basePath}/${thoughtsUrl}`.replace(/\/\/+/, "/"),
    component: thoughtsTemplate,
  });

  // Individual Thoughts pages
  const result = await graphql(`
    {
      allThought(sort: { date: DESC }) {
        nodes {
          slug
          contentFilePath
          ... on MdxThought {
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
    reporter.panicOnBuild(`There was an error loading your thoughts`, result.errors);
    return;
  }
  const thoughts = (result.data as any).allThought.nodes;
  if (thoughts && thoughts.length > 0) {
    thoughts.forEach((thought: any) => {
      createPage({
        path: thought.slug,
        component: `${thoughtTemplate}?__contentFilePath=${thought.contentFilePath}`,
        context: {
          slug: thought.slug,
          formatString,
          relativeDirectory: thought.parent?.parent?.relativeDirectory,
        },
      });
    });
  }
};