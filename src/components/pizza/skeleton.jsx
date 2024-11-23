import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="125" cy="125" r="120" /> 
    <rect x="90" y="270" rx="0" ry="0" width="0" height="1" /> 
    <rect x="160" y="281" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="267" rx="10" ry="10" width="233" height="19" /> 
    <rect x="0" y="315" rx="10" ry="10" width="243" height="81" /> 
    <rect x="0" y="418" rx="10" ry="15" width="96" height="33" /> 
    <rect x="108" y="413" rx="23" ry="23" width="135" height="40" />
  </ContentLoader>
)

export default Skeleton

