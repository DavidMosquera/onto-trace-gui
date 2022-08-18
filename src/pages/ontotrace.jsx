import React, {Fragment, useState, useEffect} from 'react';
import { GetArtifactList } from '../components/v1-ontotrace/ArtifactList';
import { GetNavbar } from '../components/common/NavBar';
import { GetArtifactView } from '../components/v1-ontotrace/ArtifactTraceViewer';
import { GetFooter } from '../components/common/Footer.jsx';

export function OntoTraceMenu() {
    const [errorOnPage, setError] = useState(null);
    const [sourceArtifacts, setSourceArtifacts] = useState([]);
    const [artifactViewTabs, setArtifactViewTabs] = useState({
        id: '',
        name: '',
        selected: false,
        artifact: {},
        suggestedArtifacts: [],
        tracedArtifacts: []
    });
    const [targetArtifacts, setTargetArtifacts] = useState([]);
    const [loadedTabs, setLoadedTabs] = useState([]);
    const projectId = localStorage.getItem("current-project");
    const [canIChangeArtifact, setCanIChangeArtifact] = useState(true);
    const [contentServicesLoaded, setContentServicesLoaded] = useState(true);
    const [traceListOverall, setTraceList] = useState([]);


    const [isProjectLoaded, setIsProjectLoaded] = useState(false);
    const [isTargetArtifactsLoaded, setIsTargetArtifactsLoaded] = useState(false);
    const [isSourceArtifactsLoaded, setIsSourceArtifactsLoaded] = useState(false);
    const [isTraceListLoaded, setIsTraceListLoaded] = useState(false);

    //Check if project is loaded
    useEffect(() => {
        setIsProjectLoaded(isSourceArtifactsLoaded && isTargetArtifactsLoaded && isTraceListLoaded)
    },[isTargetArtifactsLoaded, isSourceArtifactsLoaded, isTraceListLoaded])

    //Check if services are loaded to change artifact
    useEffect(()=>{
        setCanIChangeArtifact(contentServicesLoaded)
    }, [contentServicesLoaded])

    useEffect( () => {
        setIsTargetArtifactsLoaded(false)
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/target-artifacts/id="+projectId)
            .then(res => res.json())
            .then(
                (data2) => {
                    if(Object.keys(data2).length !== 0){
                        // eslint-disable-next-line array-callback-return
                        data2._embedded.targetList.map((artifact) => {
                            artifact.selected = false;
                        })
                        setTargetArtifacts(data2._embedded.targetList);
                    }
                    setIsTargetArtifactsLoaded(true)
                },
                (error) => {
                    setIsTargetArtifactsLoaded(true)
                    setError(error);
                }
            )
    }, [projectId])

    useEffect(() => {
        setIsSourceArtifactsLoaded(false)
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/source-artifacts/id="+projectId)
            .then(res => res.json())
            .then(
                (data2) => {
                    if(Object.keys(data2).length !== 0){
                        // eslint-disable-next-line array-callback-return
                        data2._embedded.sourceList.map((artifact) => {
                            artifact.selected = false;
                        })
                        setSourceArtifacts(data2._embedded.sourceList);
                    }
                    setIsSourceArtifactsLoaded(true)
                },
                (error) => {
                    setIsSourceArtifactsLoaded(true)
                    setError(error);
                }
            )
    }, [projectId])

    //We get all the traces between artifacts
    useEffect(()=>{
        setIsTraceListLoaded(false)
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/id="+projectId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(Object.keys(data).length !== 0){
                        const {_embedded:{traceList}} = data
                        setTraceList(traceList)
                    }
                    setIsTraceListLoaded(true)
                },
                (error) => {
                    setIsTraceListLoaded(true)
                    setError(error);
                }
            )
    },[projectId])

    const onSeeArtifact = (artifactOnSelect) => {
        if(canIChangeArtifact){
            let artifactInList = sourceArtifacts.find((source) => source.individualURI === artifactOnSelect.individualURI);
            artifactInList = artifactInList === undefined ? targetArtifacts.find((target) => target.individualURI === artifactOnSelect.individualURI):artifactInList;
            if(!loadedTabs.find((tab) => tab.id === artifactInList.individualURI)){
                const newTab = { id: artifactInList.individualURI, name: artifactInList.individualName, selected:true, artifact: artifactInList, suggestedArtifacts:[], tracedArtifacts:[]};
                setArtifactViewTabs((tab) => {return newTab});
                setLoadedTabs([...loadedTabs, newTab])
            }else{
                const newTab = {...loadedTabs.find((tab) => tab.id === artifactInList.individualURI)}
                setArtifactViewTabs((tab) => {return newTab});
            }
        }
    }

    const updateSourceArtifacts = (artifacts) => {
        setSourceArtifacts(artifacts)
    }

    if (errorOnPage) {
        return <div>Error: {errorOnPage.message}</div>;
    } else if (!isProjectLoaded) {
        return (<div className={"row pt-1 ms-0 border border-info"} style={{height: "100vh", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"45vh"}}>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>);
    } else {
        return(
            <Fragment>
                <GetNavbar/>
                <div className={"container-fluid mh-100"} style={{height:"100%", maxHeight:"100%", paddingTop:"0", paddingBottom:"0"}}>
                    <div className={"row"} style={{height:"85vh", maxHeight:"85vh"}}>
                        <div className={"col-sm-2 mh-100"} style={{background:"#f8f7f7", borderBottom:"0.5px solid #a1a1a1"}}>
                            <div className={"row pt-3 pb-2"} style={{background:"#f8f7f7"}}>
                                <div className={"col-sm-12"}>
                                    <center>
                                        <h5  style = {{background:"#f8f7f7"}}><i className="bi bi-plug-fill"></i> Source artifacts</h5>
                                    </center>
                                </div>
                            </div>
                            <div className={"overflow-auto m-0 p-0"} style={{height:"90%"}}>
                                <GetArtifactList canIChangeArtifact={canIChangeArtifact} artifactType={"user-stories-sources"} artifacts={sourceArtifacts} onArtifactChecked={onSeeArtifact} setSourceArtifacts={updateSourceArtifacts}/>
                            </div>
                        </div>
                        <div className={"col-sm-8 mh-100 pt-2"}>
                            <GetArtifactView sourceArtifacts={sourceArtifacts} targetArtifacts={targetArtifacts} traceList={traceListOverall} setTraceList={setTraceList} setContentServicesLoaded={setContentServicesLoaded} loadedTabs={loadedTabs} tab={artifactViewTabs} onArtifactChecked={onSeeArtifact}/>
                        </div>
                        <div className={"col-sm-2 mh-100"} style={{background:"#f8f7f7", overflow:"auto", borderBottom:"0.5px solid #a1a1a1"}}>
                            <div className={"row pt-2 pb-2"} style={{background:"#f8f7f7"}}>
                                <div className={"col-sm-12 pt-3 mh-100"} >
                                    <center>
                                        <h5  style = {{background:"#f8f7f7"}}><i className="bi bi-outlet"></i> Target artifacts</h5>
                                    </center>
                                </div>
                            </div>
                            <div className={"overflow-auto m-0 p-0"} style={{height:"90%"}}>
                                <GetArtifactList canIChangeArtifact={canIChangeArtifact} artifactType={"class-diagram-targets"} artifacts={targetArtifacts} onArtifactChecked={onSeeArtifact} setSourceArtifacts={updateSourceArtifacts}/>
                            </div>
                        </div>
                    </div>
                </div>
                <GetFooter/>
            </Fragment>
        )
    }


}