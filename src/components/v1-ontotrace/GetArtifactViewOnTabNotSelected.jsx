import React, {Fragment} from 'react'
import {GetTraceOverviewInformation} from "./TraceInformation";

export function GetArtifactViewOnTabNotSelected({onArtifactChecked,canIChangeArtifact, filterWords, setFilterWords, traceList, sourceArtifacts}){
    return(
        <Fragment>
            <div className={"tab-pane fade active show p-3" }>
                <div className={"row text-center alert alert-info mx-5 pt-2 pb-0"} role="alert">
                    <p>Hey!! Welcome back <i className="bi bi-emoji-sunglasses"></i>! Just click on an artifact (on your <i
                        className="bi bi-arrow-left"></i>, <i className="bi bi-arrow-right"></i>, or <i
                        className="bi bi-arrow-down"></i>) to start tracing <i
                        className="bi bi-emoji-wink"></i></p>
                </div>
                <div className={"row mx-1"}>
                    <div className={"col-sm-12 shadow-lg bg-white rounded"} style={{height:"70vh"}}>
                        <GetTraceOverviewInformation canIChangeArtifact={canIChangeArtifact} onArtifactChecked={onArtifactChecked} filterWords={filterWords} setFilterWords={setFilterWords} isTraceabilityOverviewPanelFullScreen={true} setIsTraceabilityOverviewPanelFullScreen={()=>{}} traceList={traceList} sourceArtifacts={sourceArtifacts}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}