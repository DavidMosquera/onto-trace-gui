import React, {Fragment, useState, useEffect} from 'react';
import { GetArtifactList } from '../components/v1-ontotrace/ArtifactList';
import { GetNavbar } from '../components/common/NavBar';
import { GetArtifactView } from '../components/v1-ontotrace/ArtifactTraceViewer';
import { GetFooter } from '../components/common/Footer.jsx';

export function OntoTraceMenu(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sourceArtifacts, setSourceArtifacts] = useState([]);
    const [artifactViewTabs, setArtifactViewTabs] = useState([]);
    const [targetArtifacts, setTargetArtifacts] = useState([]);
    const [unTracedArtifacts, setUnTracedArtifacts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/un-traced-sources/id=1")
            .then(res => res.json())
            .then(
                (data) => {
                    let dataSources = [...unTracedArtifacts];
                    dataSources = dataSources.concat(data._embedded.sourceList);
                    setIsLoaded(true);
                    setUnTracedArtifacts(dataSources);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/traces/un-traced-targets/id=1")
            .then(res => res.json())
            .then(
                (data) => {
                    let dataTargets = [...unTracedArtifacts];
                    dataTargets = dataTargets.concat(data._embedded.targetList);
                    setIsLoaded(true);
                    setUnTracedArtifacts(dataTargets);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect( () => {
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/target-artifacts/id=1")
            .then(res => res.json())
            .then(
                (data2) => {
                    setIsLoaded(true);
                    // eslint-disable-next-line array-callback-return
                    data2._embedded.targetList.map((artifact) => {
                        artifact.selected = false;
                    })
                    setTargetArtifacts(data2._embedded.targetList);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/source-artifacts/id=1")
            .then(res => res.json())
            .then(
                (data2) => {
                    setIsLoaded(true);
                    // eslint-disable-next-line array-callback-return
                    data2._embedded.sourceList.map((artifact) => {
                        artifact.selected = false;
                    })
                    setSourceArtifacts(data2._embedded.sourceList);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const onArtifactChecked = (artifact) => {
        const {individualURI: id, individualName: name} = artifact;
        if(artifact.selected){
            const newArtifactViewTabs = artifactViewTabs.filter((tab) => tab.id !== id);
            setArtifactViewTabs(newArtifactViewTabs)
            artifact.selected = false;
        }else{
            const newArtifactViewTabs = [...artifactViewTabs, {id: id, name: name, selected:false, artifact: artifact}]
            setArtifactViewTabs(newArtifactViewTabs)
            artifact.selected = true;
        }
    }

    const onSeeArtifact = (artifact) => {
        let artifactInList = sourceArtifacts.find((source) => source.individualURI === artifact.individualURI);
        artifactInList = artifactInList === undefined ? targetArtifacts.find((target) => target.individualURI === artifact.individualURI):artifactInList;
        if(artifactInList.selected){
            setTab(artifactInList.individualName);
        }else{
            const newArtifactViewTabs = [...artifactViewTabs, {id: artifactInList.individualURI, name: artifactInList.individualName, selected:false, artifact: artifactInList}]
            artifactInList.selected = true;
            setArtifactViewTabs(newArtifactViewTabs);
        }
    }

    const setTab = (id) => {
        const newTabListState = [...artifactViewTabs];
        // eslint-disable-next-line array-callback-return
        newTabListState.map((tab) => {
            tab.selected = tab.name === id;
        })
        setArtifactViewTabs(newTabListState);
    }

    const updateSourceArtifacts = (artifacts) => {
        setSourceArtifacts(artifacts)
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <Fragment>
                <GetNavbar/>
                <div className={"container-fluid mh-100"} style={{height:"100%", maxHeight:"100%", paddingTop:"0", paddingBottom:"0"}}>
                    <div className={"row"} style={{height:"85vh", maxHeight:"85vh"}}>
                        <div className={"col-sm-2 mh-100"} style={{background:"#f8f7f7", overflow:"auto", borderBottom:"0.5px solid #a1a1a1"}}>
                            <div className={"row pt-2 pb-2"} style={{background:"#f8f7f7"}}>
                                <div className={"col-sm-12"}>
                                    <center>
                                        <h5  style = {{background:"#f8f7f7"}}><i className="bi bi-plug-fill"></i> Source artifacts</h5>
                                    </center>
                                </div>
                            </div>
                            <GetArtifactList artifacts={sourceArtifacts} onArtifactChecked={onArtifactChecked} setSourceArtifacts={updateSourceArtifacts}/>
                        </div>
                        <div className={"col-sm-8 mh-100 pt-2"}>
                            <GetArtifactView tabList={artifactViewTabs} setTab={setTab} onArtifactChecked={onSeeArtifact}/>
                        </div>
                        <div className={"col-sm-2 mh-100"} style={{background:"#f8f7f7", overflow:"auto", borderBottom:"0.5px solid #a1a1a1"}}>
                            <div className={"row pt-2 pb-2"} style={{background:"#f8f7f7"}}>
                                <div className={"col-sm-12 mh-100"} >
                                    <center>
                                        <h5  style = {{background:"#f8f7f7"}}><i className="bi bi-outlet"></i> Target artifacts</h5>
                                    </center>
                                </div>
                            </div>
                            <GetArtifactList artifacts={targetArtifacts} onArtifactChecked={onArtifactChecked} setSourceArtifacts={updateSourceArtifacts}/>
                        </div>
                    </div>
                </div>
                <GetFooter/>
            </Fragment>
        )
    }


}