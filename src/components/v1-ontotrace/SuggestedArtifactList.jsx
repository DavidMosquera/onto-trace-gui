import React, {useState} from 'react';
import {GetSuggestedArtifactListItem} from './SuggestedArtifactListItem';

export function  GetSuggestedArtifactList({isLoading, artifacts, handleOnTrace, setTab, onArtifactChecked}){
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
        function compare( a, b ) {
            if ( a.similarity < b.similarity ){
                return 1;
            }
            if ( a.similarity > b.similarity ){
                return -1;
            }
            return 0;
        }
        artifacts = artifacts.sort( compare );
        return (
            <div className={"row pt-1 ms-0 border border-info"} style={{height: "25vh", maxWidth:"100%", overflow:"auto"}}>
                <div className={"col-sm-12"}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Artifact Name</th>
                            <th scope="col">Similarity</th>
                            <th scope={"col"}>Trace</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            artifacts.map((artifact, index) => (
                               <GetSuggestedArtifactListItem isRequestSent={isRequestSent} isLoading = {isLoading} setIsRequestSent={setIsRequestSent} setTab={setTab} index={index} artifact={artifact} handleOnTrace={handleOnTrace} onArtifactChecked={onArtifactChecked}/>
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
                        <strong>There is not yet a suggested artifact!</strong>
                    </div>
                </div>
            </div>
        );
    }
}