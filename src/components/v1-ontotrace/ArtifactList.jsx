import React, {useState} from 'react';
import {GetArtifactListItem} from './ArtifactListItem';

export function GetArtifactList({artifacts, onArtifactChecked}){
    console.log(artifacts)
    if(artifacts!=null){
        return (
            <div className={"mh-100"} style={{maxHeight:"100%", height : "100%", background:"#f8f7f7"}}>
                {
                    artifacts.map((source) => (
                        <GetArtifactListItem artifact={source} onArtifactChecked={onArtifactChecked}/>
                    ))
                }
            </div>
        );
    }
}