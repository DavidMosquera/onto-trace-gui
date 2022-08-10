import React from 'react';

export function GetArtifactListItem({artifact, onArtifactChecked, unTracedArtifacts}){
    const {individualName} = artifact;
    const handleClick = () => {
        onArtifactChecked(artifact)
    }
    return (
        <div className={"row"} style={{paddingTop:"2%", paddingBottom:"2%", maxHeight:"inherit", fontSize:"0.8em", borderTop:"0.2px solid"}}>
            <div className={"col-sm-2"}>
                <input type = "checkbox" onChange={handleClick} checked={artifact.selected}/>
            </div>
            <div className={"col-sm-10"} style={{maxWidth:"100%", overflow:"clip"}}>
                {individualName}
            </div>
        </div>
    );
}