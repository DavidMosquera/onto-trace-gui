import React, {useState} from 'react';
import {GetTabContent} from './ArtifactTraceViewerTabContent'
import {GetArtifactViewOnTabNotSelected} from "./GetArtifactViewOnTabNotSelected";

export function GetArtifactView({canIChangeArtifact, tab, onArtifactChecked, loadedTabs, setContentServicesLoaded, traceList, setTraceList, sourceArtifacts, targetArtifacts}){
    const [filterWords, setFilterWords] = useState("")
    return (
       <div style={{height:"100%", background:"#FFFFFF", overflow:"auto"}}>
           <div className={"tab-content"} id={"nav-tabContent"}>
               {tab.id!=='' && <GetTabContent canIChangeArtifact={canIChangeArtifact} setFilterWords={setFilterWords} filterWords={filterWords} sourceArtifacts={sourceArtifacts} targetArtifacts={targetArtifacts} setTraceList={setTraceList} traceList={traceList} setContentServicesLoaded={setContentServicesLoaded} tab={tab} loadedTabs={loadedTabs} onArtifactChecked={onArtifactChecked}/>}
               {tab.id==='' && <GetArtifactViewOnTabNotSelected onArtifactChecked={onArtifactChecked} canIChangeArtifact={canIChangeArtifact} filterWords={filterWords} setFilterWords={setFilterWords} traceList={traceList} sourceArtifacts={sourceArtifacts}/>}
           </div>
       </div>
    );
}