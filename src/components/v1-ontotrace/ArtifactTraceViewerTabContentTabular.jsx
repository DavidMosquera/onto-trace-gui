import React, {Fragment} from 'react'
import {GetSuggestedArtifactList} from "./SuggestedArtifactList";
import {GetTraceArtifactList} from "./TracedArtifactList";

export function GetArtifactViewerTabContentTabular({isLoadingSuggestions, isLoadingTraced, tab, tabId, tracedArtifacts, showURI, handleRemoveURIs, handleOnTrace, suggestedArtifacts, setTab, onArtifactChecked, handleUnTrace}){
    return(
    <Fragment>
        <div className={"row pt-1"}>
            <div className={"col-sm-6"}>
                <h5 className={"d-inline-block"}>Type:</h5> <h5 className={"d-inline-block text-info"}> {tab.artifact._links.suggestedTargets != undefined ?
                <i className="bi bi-plug-fill"> Source artifact</i>:
                <i className="bi bi-outlet"> Target artifact</i>
            }</h5>
            </div>
            <div className={"col-sm-6"}>
                <h5 className={"d-inline-block"}>Status:</h5> {tracedArtifacts.length === 0 ?<h5 className={"d-inline-block text-danger"}> Un-traced</h5> : <h5 className={"d-inline-block text-success"}> Traced</h5>}
            </div>
        </div>
        <div className={"row pt-3"}>
            <div className={"col-sm-12"}>
                <h5 className={"d-inline-block"}>Ontology assertions</h5> <input className = {"ms-3"} type={"checkbox"} checked={!showURI.show} onChange={handleRemoveURIs}/> Remove URIs
            </div>
        </div>
        <div className={"row pt-1 ms-0 border border-info text-nowrap"} style={{height: "15vh", maxWidth:"100%", overflow:"auto"}}>
            <div className={"col-sm-12"}>
                <ul className={"list-unstyled"}>
                    {
                        tab.artifact.statements.map((statement) => (
                            <li>{showURI.show === true ? statement : statement.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <div className={"row pt-3"}>
            <div className={"col-sm-12"}>
                <h5>List of suggested {tab.artifact._links.suggestedTargets != undefined ? "target artifacts" : "source artifacts"}</h5>
            </div>
        </div>
        <GetSuggestedArtifactList isLoading={isLoadingSuggestions} handleOnTrace={handleOnTrace} artifacts={
            suggestedArtifacts.filter(
                (suggestedArtifact) => tracedArtifacts.filter((tracedArtifact) => suggestedArtifact.individualURI === tracedArtifact.individualURI).length == 0)
        } setTab={setTab} onArtifactChecked={onArtifactChecked}/>
        <div className={"row pt-3"}>
            <div className={"col-sm-12"}>
                <h5>Traced {tab.artifact._links.suggestedTargets != undefined ? "target artifacts" : "source artifacts"}</h5>
            </div>
        </div>
        <GetTraceArtifactList isLoading={isLoadingTraced} artifacts={tracedArtifacts} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
    </Fragment>
        );
}