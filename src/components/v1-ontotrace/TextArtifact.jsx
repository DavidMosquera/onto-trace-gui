import React from 'react'
export function GetTextArtifact ({artifactUri, canIChangeArtifact, seeArtifact}){
    let color = "#008cfd"
    if(artifactUri.match(/.*#Goal_.*/g)){
        color = "#9E4770"
    }
    if(artifactUri.match(/.*#Object_.*/g)){
        color = "#0b8f8f"
    }
    if(artifactUri.match(/.*#Action_.*/g)){
        color = "#fa7c48"
    }
    if(artifactUri.match(/.*#UserRole_.*/g)){
        color = "#ffab00"
    }
    color = "#008cfd"
    const handleClickOnArtifact = () => {
        const artifact = {
            individualURI: artifactUri
        }
        seeArtifact(artifact)
    }
    return (
        <a  href={"#"+artifactUri}
            className={"text-decoration-none p-0 m-0"}
            style={{cursor:canIChangeArtifact?"pointer":"progress",
                    opacity:canIChangeArtifact?"1.0":"0.6",
                    color:color}}
            onClick={handleClickOnArtifact}>
            {artifactUri.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
        </a>)

}