import React, {useState} from 'react';
import {GetTextArtifact} from "./TextArtifact";

export function GetTracedArtifactListItem({artifact, isLoading, index, handleUnTrace, setTab, onArtifactChecked, isRequestSent, setIsRequestSent}){
    const onUnTrace = () => {
        setIsRequestSent(true)
        handleUnTrace(artifact).then(()=>{
            setIsRequestSent(false)
        })
    }
    const seeTab = () => {
        onArtifactChecked(artifact)
    }
    return (
        <tr>
            <th scope="row">{index + 1} </th>
            <td><GetTextArtifact canIChangeArtifact={!(isRequestSent&&!isLoading)} artifactUri={artifact.individualURI} seeArtifact={onArtifactChecked}/></td>
            <td>
                <button type="button" disabled={isRequestSent&&!isLoading} onClick={onUnTrace} className="btn btn-danger btn-sm m-0"><i
                    className="bi bi-arrows-angle-expand"></i></button> </td>
        </tr>
    );
}