import React, {useState} from 'react';
import {GetTracedArtifactListItem} from './TracedArtifactListItem'

export function GetTraceArtifactList({isLoading, artifacts, handleUnTrace, setTab, onArtifactChecked}){
    const [isRequestSent, setIsRequestSent] = useState(false);
    if(isLoading){
        return(
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "20vh", maxWidth:"100%", overflow:"auto"}}>
                <div className="col-md-12">
                    <div className="text-center align-middle" style={{paddingTop:"7vh"}}>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>);
    }
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
                                <GetTracedArtifactListItem isRequestSent={isRequestSent} setIsRequestSent={setIsRequestSent} artifact={artifact} index={index} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
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