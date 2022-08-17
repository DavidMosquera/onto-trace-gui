import React, {useState} from 'react';
import {GetArtifactTab} from './ArtifactTraceViewerTab'
import {GetTabContent} from './ArtifactTraceViewerTabContent'
import $ from 'jquery';

export function GetArtifactView({tab, onArtifactChecked}){
    return (
       <div style={{height:"100%", background:"#FFFFFF", overflow:"auto"}}>
           <div className={"tab-content"} id={"nav-tabContent"}>
               {tab.id!=='' && <GetTabContent tab={tab} onArtifactChecked={onArtifactChecked}/>}
           </div>
       </div>
    );
}