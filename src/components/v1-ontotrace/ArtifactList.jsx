import React, {useState} from 'react';
import {GetUserStoryList} from "./UserStoryList";
import {GetClassDiagramList} from "./ClassDiagramList";

export function GetArtifactList({artifacts, onArtifactChecked, artifactType}){
    if(artifacts!=null){
        return (
            <div style={{maxHeight:"100%", height : "100%", background:"#f8f7f7"}}>
                {artifactType==="user-stories-sources" && <GetUserStoryList onSeeArtifact={onArtifactChecked}/>}
                {artifactType==="class-diagram-targets" && <GetClassDiagramList onSeeArtifact={onArtifactChecked}/> }
            </div>
        );
    }
}