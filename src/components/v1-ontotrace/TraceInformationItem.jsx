import React, {useEffect, useState} from 'react'

export function GetTraceInformationItem({traceInfoObject, filterWords}){
    const [display, setDisplay] = useState(false)
    useEffect(()=>{
        if(filterWords===undefined||filterWords.length===0||filterWords===""||filterWords===null){
            setDisplay(true);
        }else{
            if(traceInfoObject.individualURI.toUpperCase().replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ").indexOf(filterWords.toUpperCase()) > -1){
                setDisplay(true);
            }else{
                let displayBasedOnArtifactList = false;
                traceInfoObject.tracedArtifactList.forEach((tracedArtifactInList)=>{
                    if(tracedArtifactInList.toUpperCase().replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ").indexOf(filterWords.toUpperCase()) > -1){
                        displayBasedOnArtifactList=true;
                    }
                })
                if(traceInfoObject.tracedArtifactList.length===0){
                    if("empty!".toUpperCase().replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ").indexOf(filterWords.toUpperCase()) > -1){
                        displayBasedOnArtifactList=true;
                    }
                }
                setDisplay(displayBasedOnArtifactList);
            }
        }
    },[filterWords])
    return (
    <div className={"row border-bottom border-dark"}  style={{display:display?"":"none"}}>
        <div className={"col-sm-5"}>
            {traceInfoObject.individualURI.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
        </div>
        <ul className={"col-sm-7"} style={{height:"100%"}}>
            {traceInfoObject.tracedArtifactList.map((tracedArtifactOnList)=>
                <li>{tracedArtifactOnList.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}</li>
            )}
            {traceInfoObject.tracedArtifactList.length===0 &&
                <em>Empty!</em>
            }
        </ul>
    </div>)
}