import React from "react"
interface Props {
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-40">{children}</div>
  )
}

export default Container
