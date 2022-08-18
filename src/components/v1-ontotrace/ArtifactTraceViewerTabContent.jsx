import React, {Fragment, useEffect, useState} from 'react';
import {GetArtifactViewerTabContentTabular} from "./ArtifactTraceViewerTabContentTabular";
import {GetArtifactViewOnGraph} from "./JsJointArtifactViewer";

export function GetTabContent({tab, onArtifactChecked, loadedTabs, setContentServicesLoaded, traceList, setTraceList, sourceArtifacts, targetArtifacts}){
    const {id, name} = tab;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [suggestedArtifacts, setSuggestedArtifacts] = useState ([]);
    const [tracedArtifacts, setTracedArtifacts] = useState([]);
    const [showURI, setShowURI] = useState({show:false});
    const suggestedArtifactsQuery = tab.artifact._links.suggestedTargets === undefined ? tab.artifact._links.suggestedSources.href : tab.artifact._links.suggestedTargets.href;
    const tracedArtifactsQuery = tab.artifact._links.tracedTargets === undefined ? tab.artifact._links.tracedSources.href : tab.artifact._links.tracedTargets.href;
    const projectId = localStorage.getItem("current-project")
    const [viewType, setViewType] = useState("tabular");

    const [isLoadingTraced, setIsLoadingTraced] = useState(false)
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

    useEffect(()=>{
        setContentServicesLoaded(!isLoadingTraced && !isLoadingSuggestions)
    },[isLoadingTraced, isLoadingSuggestions])

    const getSuggestedArtifacts = () => {
        setIsLoadingSuggestions(true);
        fetch(suggestedArtifactsQuery)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    let suggestedArtifactsREST = []
                    if(data._embedded !== undefined) {
                        suggestedArtifactsREST = data._embedded.targetList === undefined ? data._embedded.sourceList : data._embedded.targetList;
                    }
                    setIsLoadingSuggestions(false);
                    setSuggestedArtifacts(suggestedArtifactsREST);
                    tab.suggestedArtifacts = suggestedArtifactsREST;
                    if(loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI)){
                        loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI).suggestedArtifacts = suggestedArtifactsREST
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    setIsLoadingSuggestions(false);
                }
            )
    }

    const getTracedArtifacts = () => {
        setIsLoadingTraced(true)
        fetch(tracedArtifactsQuery)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    let tracedArtifactsREST = []
                    if(data._embedded !== undefined) {
                        tracedArtifactsREST = data._embedded.targetList === undefined ? data._embedded.sourceList : data._embedded.targetList;
                    }
                    setIsLoadingTraced(false)
                    setTracedArtifacts(tracedArtifactsREST);
                    tab.tracedArtifacts = tracedArtifactsREST;
                    if(loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI)){
                        loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI).tracedArtifacts = tracedArtifactsREST
                    }
                },
                (error) => {
                    setIsLoadingTraced(false)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect( () => {
        if(tab.suggestedArtifacts.length===0){
            getSuggestedArtifacts()
        }else{
            setSuggestedArtifacts(tab.suggestedArtifacts);
        }
    }, [id])

    useEffect( () => {
        if(tab.tracedArtifacts.length===0){
            getTracedArtifacts()
        }else{
            setTracedArtifacts(tab.tracedArtifacts);
        }
    }, [id])

    const handleRemoveURIs = () => {
        const newShowURI = {...showURI};
        newShowURI.show = !newShowURI.show;
        setShowURI(newShowURI);
    }

    const handleOnTrace = async (artifactToTrace) => {
        let traceObject;
        if(tab.artifact._links.suggestedTargets !== undefined){
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
        await fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/id="+projectId,
            {
                method:"POST",
                body: JSON.stringify(traceObject),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then((d1) => {
                    let newSuggestedArtifacts = []
                    let newTracedArtifacts = [... tracedArtifacts]
                    suggestedArtifacts.forEach(
                        (suggestedArtifact)=>{
                            if(suggestedArtifact.individualURI!==artifactToTrace.individualURI){
                                newSuggestedArtifacts.push(suggestedArtifact)
                            }else{
                                newTracedArtifacts.push(suggestedArtifact)
                            }
                    })
                    setSuggestedArtifacts(newSuggestedArtifacts);
                    setTracedArtifacts(newTracedArtifacts);
                    tab.suggestedArtifacts = newSuggestedArtifacts;
                    if(loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI)){
                        loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI).suggestedArtifacts = newSuggestedArtifacts
                    }
                    const newTraceList = [...traceList, {hasSource:traceObject.hasSource.individualURI, hasTarget:traceObject.hasTarget.individualURI}]
                    setTraceList(newTraceList)
                },
                (error) => {
                    setError(error);
                }
            )
    }

    const handleUnTrace = async (artifactToUnTrace) => {
        let traceObject;
        if(tab.artifact._links.suggestedTargets !== undefined){
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
        await fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/id="+projectId,
            {
                method:"DELETE",
                body: JSON.stringify(traceObject),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res)
            .then((data) => {
                    let newTracedArtifacts = []
                    tracedArtifacts.forEach(
                        (tracedArtifact)=>{
                            if(tracedArtifact.individualURI!==artifactToUnTrace.individualURI){
                                newTracedArtifacts.push(tracedArtifact)
                            }
                        })
                    getSuggestedArtifacts();
                    setTracedArtifacts(newTracedArtifacts);
                    tab.tracedArtifacts = newTracedArtifacts;
                    if(loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI)){
                        loadedTabs.find((tabLoaded) => tabLoaded.id === tab.individualURI).tracedArtifacts = newTracedArtifacts
                    }
                    const newTraceList = traceList.filter((trace) => !(trace.hasSource===traceObject.hasSource.individualURI && trace.hasTarget===traceObject.hasTarget.individualURI))
                    setTraceList(newTraceList)
                },
                (error) => {
                    setError(error);
                }
            )
    }

    const handleOnChangeViewTabularGraphClick = ()=>{
        if(viewType==="tabular"){
            setViewType("graph");
        }else{
            setViewType("tabular")
        }
    }

    if(tab.selected===true){
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
                            <h5 className={"d-inline-block"}>Artifact name:</h5> <h5 className={"d-inline-block text-info"} style={{maxWidth:"70%"}}> {tab.artifact.individualName.replace(/_/g, " ")}</h5>
                        </div>
                    </div>
                    {viewType === "tabular" &&
                        <GetArtifactViewerTabContentTabular traceList={traceList} setTraceList={setTraceList} targetArtifacts={targetArtifacts} sourceArtifacts={sourceArtifacts} isLoading={isLoadingTraced||isLoadingSuggestions} tab={tab} tabId={id} tracedArtifacts={tracedArtifacts} showURI={showURI} handleRemoveURIs={handleRemoveURIs} handleOnTrace={handleOnTrace} suggestedArtifacts={suggestedArtifacts} onArtifactChecked={onArtifactChecked} handleUnTrace={handleUnTrace}/>
                    }
                    {viewType === "graph" &&
                        <GetArtifactViewOnGraph tab={tab}/>
                    }
                </div>
            )
        }
    }
}