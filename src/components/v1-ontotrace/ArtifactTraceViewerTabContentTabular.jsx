import React, {Fragment, useState} from 'react'
import {GetSuggestedArtifactList} from "./SuggestedArtifactList";
import {GetTraceArtifactList} from "./TracedArtifactList";
import {GetTraceOverviewInformation} from "./TraceInformation";

export function GetArtifactViewerTabContentTabular({setTraceList, traceList, isLoading, tab, tabId, tracedArtifacts, showURI, handleRemoveURIs, handleOnTrace, suggestedArtifacts, setTab, onArtifactChecked, handleUnTrace, sourceArtifacts, targetArtifacts}){
    const [isTraceabilityOverviewPanelFullScreen, setIsTraceabilityOverviewPanelFullScreen] = useState(false)

    if(isTraceabilityOverviewPanelFullScreen){
        return(
            <Fragment>
                <div className={"row pt-3 mx-1"}>
                    <div className={"col-sm-12 shadow-lg bg-white rounded"} style={{height:"75vh"}}>
                        <GetTraceOverviewInformation setIsTraceabilityOverviewPanelFullScreen={setIsTraceabilityOverviewPanelFullScreen} isTraceabilityOverviewPanelFullScreen={isTraceabilityOverviewPanelFullScreen} setTraceList={setTraceList} traceList={traceList} sourceArtifacts={sourceArtifacts} targetArtifacts={targetArtifacts}/>
                    </div>
                </div>
            </Fragment>
        );
    }
    return(
    <Fragment>
        <div className={"row pt-1"}>
            <div className={"col-sm-6"}>
                <h5 className={"d-inline-block"}>Type:</h5> <h5 className={"d-inline-block text-info"}> {tab.artifact._links.suggestedTargets !== undefined ?
                <i className="bi bi-plug-fill"> Source artifact</i>:
                <i className="bi bi-outlet"> Target artifact</i>
            }</h5>
            </div>
            <div className={"col-sm-6"}>
                <h5 className={"d-inline-block"}>Status:</h5> {tracedArtifacts.length === 0 ?<h5 className={"d-inline-block text-danger"}> Un-traced</h5> : <h5 className={"d-inline-block text-success"}> Traced</h5>}
            </div>
        </div>
        <div className={"row pt-3"}>
            <div className={"col-sm-6"}>
                <h5>List of suggested {tab.artifact._links.suggestedTargets !== undefined ? "target artifacts" : "source artifacts"}</h5>
                <GetSuggestedArtifactList isLoading={isLoading} handleOnTrace={handleOnTrace} artifacts={
                    suggestedArtifacts.filter(
                        (suggestedArtifact) => tracedArtifacts.filter((tracedArtifact) => suggestedArtifact.individualURI === tracedArtifact.individualURI).length === 0)
                } setTab={setTab} onArtifactChecked={onArtifactChecked}/>
            </div>
            <div className={"col-sm-6"}>
                <h5>Traced {tab.artifact._links.suggestedTargets !== undefined ? "target artifacts" : "source artifacts"}</h5>
                <GetTraceArtifactList isLoading={isLoading} artifacts={tracedArtifacts} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
            </div>
        </div>
        <div className={"row pt-3 mx-1"}>
            <div className={"col-sm-12 shadow-lg bg-white rounded"} style={{height:"39vh"}}>
                <GetTraceOverviewInformation setIsTraceabilityOverviewPanelFullScreen={setIsTraceabilityOverviewPanelFullScreen} isTraceabilityOverviewPanelFullScreen={isTraceabilityOverviewPanelFullScreen} setTraceList={setTraceList} traceList={traceList} sourceArtifacts={sourceArtifacts} targetArtifacts={targetArtifacts}/>
            </div>
        </div>
    </Fragment>
        );
}