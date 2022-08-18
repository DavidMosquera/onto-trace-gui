import React, {useState} from 'react';

export function GetSuggestedArtifactListItem({index, artifact, handleOnTrace, setTab, onArtifactChecked, isRequestSent, setIsRequestSent, isLoading}){
    const onTrace = () => {
        setIsRequestSent(true)
        handleOnTrace(artifact).then(()=>{
            setIsRequestSent(false)
        });
    }
    const seeTab = () => {
        onArtifactChecked(artifact);
    }
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{artifact.individualName.replace(/_/g, " ")}<button disabled={isRequestSent&&!isLoading} onClick={seeTab} type="button" className="btn btn-link btn-sm m-0">
                <i className="bi bi-eye"></i></button></td>
            <td>{Math.round(artifact.similarity * 100)}%</td>
            <td>
                {artifact.recommended === true &&  <button id={artifact.individualName+"_button"} disabled={isRequestSent&&!isLoading} type="button" onClick={onTrace} className="btn btn-success btn-sm m-0"><i
                    className="bi bi-arrows-angle-contract"></i></button>}
                {artifact.recommended === false &&  <button id={artifact.individualName+"_button"} disabled={isRequestSent&&!isLoading} type="button" onClick={onTrace} className="btn btn-warning btn-sm m-0"><i
                    className="bi bi-arrows-angle-contract"></i></button>}
            </td>
        </tr>
    );
}