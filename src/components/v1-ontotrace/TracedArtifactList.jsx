import React, {useState} from 'react';
import {GetTracedArtifactListItem} from './TracedArtifactListItem'

export function GetTraceArtifactList({isLoading, artifacts, handleUnTrace, setTab, onArtifactChecked}){
    const [isRequestSent, setIsRequestSent] = useState(false);
    if(isLoading){
        return(
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "25vh", maxWidth:"100%", overflow:"auto"}}>
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
        artifacts.sort(function (a,b){
            if(a.individualName > b.individualName){
                return 1
            }
            if(b.individualName > a.individualName){
                return -1
            }
            return 0
        })
        return (
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "25vh", maxWidth:"100%", overflow:"auto"}}>
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
                                <GetTracedArtifactListItem isLoading={isLoading} isRequestSent={isRequestSent} setIsRequestSent={setIsRequestSent} artifact={artifact} index={index} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }else{
        return (
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "25vh", maxWidth:"100%", overflow:"auto"}}>
                <div className="col-md-12">
                    <div className="text-center" role="alert">
                        <strong>There is not yet a traced artifact!</strong>
                    </div>
                </div>
            </div>
        );
    }
}