import React from 'react';
import {GetTracedArtifactListItem} from './TracedArtifactListItem'

export function GetTraceArtifactList({artifacts, handleUnTrace, setTab, onArtifactChecked}){
    if(artifacts.length >0){
        return (
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "20vh", maxWidth:"100%", overflow:"auto"}}>
                <div className={"col-sm-12"}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Artifact Name</th>
                            <th scope={"col"}>Un-trace</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            artifacts.map((artifact, index) => (
                                <GetTracedArtifactListItem artifact={artifact} index={index} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }else{
        return (
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "20vh", maxWidth:"100%", overflow:"auto"}}>
                <div className="col-md-12">
                    <div className="text-center" role="alert">
                        <strong>There is not yet a traced artifact!</strong>
                    </div>
                </div>
            </div>
        );
    }
}