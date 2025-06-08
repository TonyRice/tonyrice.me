import * as React from "react"
import type { PageProps } from "gatsby"
import Thought, { Head, JodieThoughtProps } from "../../gatsby-theme-jodie/components/thought"
export default function JodieCoreProject({ children, ...props }: PageProps<JodieThoughtProps>) {
  return <Thought {...props}>{children}</Thought>
}

export { Head }
