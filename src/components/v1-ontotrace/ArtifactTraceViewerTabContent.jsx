import React, {Fragment, useEffect, useState} from 'react';
import {GetTraceArtifactList} from './TracedArtifactList';
import {GetSuggestedArtifactList} from './SuggestedArtifactList';

export function GetTabContent({tab, setTab, onArtifactChecked}){
    const {id, name} = tab;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [suggestedArtifacts, setSuggestedArtifacts] = useState ([]);
    const [tracedArtifacts, setTracedArtifacts] = useState([]);
    const [showURI, setShowURI] = useState({show:false});
    const suggestedArtifactsQuery = tab.artifact._links.suggestedTargets === undefined ? tab.artifact._links.suggestedSources.href : tab.artifact._links.suggestedTargets.href;
    const tracedArtifactsQuery = tab.artifact._links.tracedTargets === undefined ? tab.artifact._links.tracedSources.href : tab.artifact._links.tracedTargets.href;

    const getSuggestedArtifacts = () => {
        fetch(suggestedArtifactsQuery)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    let suggestedArtifactsREST = []
                    if(data._embedded !== undefined) {
                        suggestedArtifactsREST = data._embedded.targetList === undefined ? data._embedded.sourceList : data._embedded.targetList;
                    }
                    setSuggestedArtifacts(suggestedArtifactsREST);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const getTracedArtifacts = () => {
        fetch(tracedArtifactsQuery)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    let tracedArtifactsREST = []
                    if(data._embedded !== undefined) {
                        tracedArtifactsREST = data._embedded.targetList === undefined ? data._embedded.sourceList : data._embedded.targetList;
                    }
                    setTracedArtifacts(tracedArtifactsREST);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect( () => {
        getSuggestedArtifacts()
    }, [])

    useEffect( () => {
        getTracedArtifacts()
    }, [])

    const handleRemoveURIs = () => {
        const newShowURI = {...showURI};
        newShowURI.show = !newShowURI.show;
        setShowURI(newShowURI);
    }

    const handleOnTrace = (artifactToTrace) => {
        let traceObject;
        if(tab.artifact._links.suggestedTargets != undefined){
            traceObject = {
                hasSource: {
                    individualURI: tab.artifact.individualURI
                },
                hasTarget:{
                    individualURI: artifactToTrace.individualURI
                }
            }
        }else{
            traceObject = {
                hasSource: {
                    individualURI: artifactToTrace.individualURI
                },
                hasTarget:{
                    individualURI: tab.artifact.individualURI
                }
            }
        }

        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/id=1",
            {
                method:"POST",
                body: JSON.stringify(traceObject),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then((data) => {
                    getSuggestedArtifacts();
                    getTracedArtifacts()
                },
                (error) => {
                    setError(error);
                }
            )
    }

    const handleUnTrace = (artifactToUnTrace) => {
        let traceObject;
        if(tab.artifact._links.suggestedTargets != undefined){
            traceObject = {
                hasSource: {
                    individualURI: tab.artifact.individualURI
                },
                hasTarget:{
                    individualURI: artifactToUnTrace.individualURI
                }
            }
        }else{
            traceObject = {
                hasSource: {
                    individualURI: artifactToUnTrace.individualURI
                },
                hasTarget:{
                    individualURI: tab.artifact.individualURI
                }
            }
        }
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/id=1",
            {
                method:"DELETE",
                body: JSON.stringify(traceObject),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res)
            .then((data) => {
                    getSuggestedArtifacts();
                    getTracedArtifacts()
                },
                (error) => {
                    setError(error);
                }
            )
    }

    if(tab.selected){
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className={tab.selected === true ? "tab-pane fade active show p-3" : "tab-pane fade p-3"} id={id} role="tabpanel"
                     aria-labelledby="nav-home-tab">
                    <div className={"row"}>
                        <div className={"col-sm-12"}>
                            <h5 className={"d-inline-block"}>Artifact name:</h5> <h5 className={"d-inline-block text-info"}> {tab.artifact.individualName}</h5>
                        </div>
                    </div>
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
                                        <li>{showURI.show === true ? statement : statement.replace(/http([\s\S]*?)#|<|>/g, "")}</li>
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
                    <GetSuggestedArtifactList handleOnTrace={handleOnTrace} artifacts={
                        suggestedArtifacts.filter(
                            (suggestedArtifact) => tracedArtifacts.filter((tracedArtifact) => suggestedArtifact.individualURI === tracedArtifact.individualURI).length == 0)
                    } setTab={setTab} onArtifactChecked={onArtifactChecked}/>
                    <div className={"row pt-3"}>
                        <div className={"col-sm-12"}>
                            <h5>Traced {tab.artifact._links.suggestedTargets != undefined ? "target artifacts" : "source artifacts"}</h5>
                        </div>
                    </div>
                    <GetTraceArtifactList artifacts={tracedArtifacts} handleUnTrace={handleUnTrace} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
              </div>
            )
        }
    }
}