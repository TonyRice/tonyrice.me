import * as React from "react"
import type { PageProps } from "gatsby"
import BlogPosts, { Head, JodieBlogPostsProps } from "../../gatsby-theme-jodie/components/blogposts"

export default function JodieCoreBlogPosts({ children, ...props }: PageProps<JodieBlogPostsProps>) {
  return <BlogPosts {...props}>{children}</BlogPosts>
}

export { Head }
