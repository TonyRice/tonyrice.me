import * as React from "react"
import type { PageProps } from "gatsby"
import BlogPost, { Head, JodieBlogPostProps } from "../../gatsby-theme-jodie/components/blogpost"
export default function JodieCoreBlogPost({ children, ...props }: PageProps<JodieBlogPostProps>) {
  return <BlogPost {...props}>{children}</BlogPost>
}

export { Head }
