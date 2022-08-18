import React from 'react';
import {GetTabContent} from './ArtifactTraceViewerTabContent'
import {GetArtifactViewOnTabNotSelected} from "./GetArtifactViewOnTabNotSelected";

export function GetArtifactView({tab, onArtifactChecked, loadedTabs, setContentServicesLoaded, traceList, setTraceList, sourceArtifacts, targetArtifacts}){
    return (
       <div style={{height:"100%", background:"#FFFFFF", overflow:"auto"}}>
           <div className={"tab-content"} id={"nav-tabContent"}>
               {tab.id!=='' && <GetTabContent sourceArtifacts={sourceArtifacts} targetArtifacts={targetArtifacts} setTraceList={setTraceList} traceList={traceList} setContentServicesLoaded={setContentServicesLoaded} tab={tab} loadedTabs={loadedTabs} onArtifactChecked={onArtifactChecked}/>}
               {tab.id==='' && <GetArtifactViewOnTabNotSelected traceList={traceList} sourceArtifacts={sourceArtifacts}/>}
           </div>
       </div>
    );
}