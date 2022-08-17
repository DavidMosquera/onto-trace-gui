import React, {useState} from 'react';

export function GetTracedArtifactListItem({artifact, index, handleUnTrace, setTab, onArtifactChecked, isRequestSent, setIsRequestSent}){
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
            <td>{artifact.individualName.replace(/_/g, " ")}<button type="button" onClick={seeTab} className="btn btn-link btn-sm m-0">
                <i className="bi bi-eye"></i></button></td>
            <td>
                <button type="button" disabled={isRequestSent} onClick={onUnTrace} className="btn btn-danger btn-sm m-0"><i
                    className="bi bi-arrows-angle-expand"></i></button> </td>
        </tr>
    );
}