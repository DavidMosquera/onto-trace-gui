import React from 'react';

export function GetTracedArtifactListItem({artifact, index, handleUnTrace, setTab, onArtifactChecked}){
    const onUnTrace = () => {
        handleUnTrace(artifact)
    }
    const seeTab = () => {
        onArtifactChecked(artifact)
        //setTab(artifact.individualURI)
    }
    return (
        <tr>
            <th scope="row">{index + 1} </th>
            <td>{artifact.individualName}<button type="button" onClick={seeTab} className="btn btn-link btn-sm m-0">
                <i className="bi bi-eye"></i></button></td>
            <td>
                <button type="button" onClick={onUnTrace} className="btn btn-danger btn-sm m-0"><i
                    className="bi bi-arrows-angle-expand"></i></button> </td>
        </tr>
    );
}