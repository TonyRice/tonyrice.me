import * as React from "react"
import type { PageProps } from "gatsby"
import Thoughts, { Head, JodieThoughtsProps } from "../../gatsby-theme-jodie/components/thoughts"

export default function JodieCoreThoughts({ children, ...props }: PageProps<JodieThoughtsProps>) {
  return <Thoughts {...props}>{children}</Thoughts>
}

export { Head }
