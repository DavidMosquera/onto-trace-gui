import React, {useEffect, useState} from 'react'
import {GetTraceInformationItem} from "./TraceInformationItem";
export function GetTraceOverviewInformation({traceList, sourceArtifacts, isTraceabilityOverviewPanelFullScreen, setIsTraceabilityOverviewPanelFullScreen}){
    const [tracedArtifact, setTracedArtifact] = useState([])
    const [filterWords, setFilterWords] = useState("")
    useEffect(()=>{
        let newTracedArtifacts = []
        sourceArtifacts.forEach((sourceArtifact) =>{
            newTracedArtifacts = [...newTracedArtifacts, {individualURI:sourceArtifact.individualURI, tracedArtifactList:[], display:true}]
        })
        traceList.forEach((trace)=>{
            let newTracedArtifact = newTracedArtifacts.find((tracedArtifactOnList) => tracedArtifactOnList.individualURI === trace.hasSource)
            if(newTracedArtifact){
                if(!newTracedArtifact.tracedArtifactList.find((tracedArtifactOnList) => tracedArtifactOnList === trace.hasTarget)){
                    newTracedArtifact.tracedArtifactList = [...newTracedArtifact.tracedArtifactList, trace.hasTarget]
                }
            }
            newTracedArtifact.tracedArtifactList.sort(function (a, b) {
                if (a > b) {
                    return 1;
                }
                if (b > a) {
                    return -1;
                }
                return 0;
            })
        })
        newTracedArtifacts.sort(function (a, b) {
            if (a.individualURI > b.individualURI) {
                return 1;
            }
            if (b.individualURI > a.individualURI) {
                return -1;
            }
            return 0;
        })
        setTracedArtifact(newTracedArtifacts)
    }, [traceList])
    const handleOnTraceabilityOverviewPanelFullScreenOption = () => {
        setIsTraceabilityOverviewPanelFullScreen(!isTraceabilityOverviewPanelFullScreen)
    }
    return (
    <div className={"row"}>
        <div className={"col-sm-12"}>
            <div className={"row mx-1 pt-3 mb-2"}>
                <div className={"col-sm-4"}>
                    <h4>Traceability overview panel</h4>
                </div>
                <div className={"col-sm-7"}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-light" id="basic-addon1"><i className="bi bi-search"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Filter!" aria-label="filter"
                               aria-describedby="basic-addon1" value={filterWords} onChange={event => setFilterWords(event.target.value)}/>
                    </div>
                </div>
                <div className={"col-sm-1"}>
                    {isTraceabilityOverviewPanelFullScreen && <button type="button" className="btn btn-light"><i className="bi bi-arrows-collapse" onClick={handleOnTraceabilityOverviewPanelFullScreenOption}></i></button>}
                    {!isTraceabilityOverviewPanelFullScreen && <button type="button" className="btn btn-dark"><i className="bi bi-arrows-expand" onClick={handleOnTraceabilityOverviewPanelFullScreenOption}></i></button>}
                </div>
            </div>
            <div className={"row pt-2 pb-2 px-3 border-bottom border-dark"}>
                <div className={"col-sm-3"}>
                    <h5>Source artifacts</h5>
                </div>
                <div className={"offset-sm-2 col-sm-3 px-0"}>
                    <h5>Traced target artifacts</h5>
                </div>
            </div>
            <div className={"overflow-auto px-3"} style={{maxHeight:isTraceabilityOverviewPanelFullScreen?"57vh":"25vh", minHeight:"25vh"}}>
                {sourceArtifacts.length === 0 &&
                    <div className={"row pt-1 ms-0"} style={{height: "25vh", maxWidth:"100%", overflow:"auto"}}>
                        <div className="col-md-12 p-3">
                            <div className="text-center" role="alert">
                                <strong>There is not yet artifacts to trace!</strong>
                            </div>
                        </div>
                    </div>
                }
                {
                    tracedArtifact.map((tracedArtifactOnList) =>
                        <GetTraceInformationItem traceInfoObject={tracedArtifactOnList} filterWords={filterWords}/>
                    )
                }
            </div>
        </div>
    </div>);
}