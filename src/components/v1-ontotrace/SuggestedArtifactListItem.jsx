import React from 'react';

export function GetSuggestedArtifactListItem({index, artifact, handleOnTrace, setTab, onArtifactChecked}){
    const onTrace = () => {
        handleOnTrace(artifact);
    }
    const seeTab = () => {
        onArtifactChecked(artifact);
        //setTab(artifact.individualURI);
    }
    return (
        <tr>
            <th scope="row">{index + 1} </th>
            <td>{artifact.individualName}<button onClick={seeTab} type="button" className="btn btn-link btn-sm m-0">
                <i className="bi bi-eye"></i></button></td>
            <td>{artifact.recommended === true ? "recommended!" : ""}{Math.round(artifact.similarity * 100)}%</td>
            <td>
                <button type="button" onClick={onTrace} className="btn btn-warning btn-sm m-0"><i
                    className="bi bi-arrows-angle-contract"></i></button></td>
        </tr>
    );
}