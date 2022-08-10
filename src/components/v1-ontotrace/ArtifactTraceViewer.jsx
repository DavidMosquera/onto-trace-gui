import React, {useState} from 'react';
import {GetArtifactTab} from './ArtifactTraceViewerTab'
import {GetTabContent} from './ArtifactTraceViewerTabContent'
import $ from 'jquery';

function check_navigation_tabs() {
    let container_width = $("#nav-container").width();
    let tabs_width = 0;
    $('.tab-in-nav-button').each(function(){
        tabs_width += $(this).outerWidth();
    });
    if(tabs_width>container_width) {
        $('#goPrev').fadeIn();
        $('#goNext').fadeIn();
    } else {
        $('#goPrev').fadeOut();
        $('#goNext').fadeOut();
    }
}
export function GetArtifactView({tabList, setTab, onArtifactChecked}){
    $(function() {
        $('#goPrev').click(function(){
            $('#nav-container').stop().animate({scrollLeft:'-=100'}, 200);
        });
        $('#goNext').click(function(){
            $('#nav-container').stop().animate({scrollLeft:'+=100'}, 200);
        });
        $(window).resize(function(){
            check_navigation_tabs();
        });
        check_navigation_tabs();
    });
    return (
       <div style={{height:"100%", background:"#FFFFFF", overflow:"auto"}}>
           <nav className={tabList.length > 0 ? "border-bottom": ""}>
               <div className={"row p-0 m-0"}>
                   <div style={{display:"inline-block", maxWidth:"5%"}} className={"p-0 m-0"}>
                       <button style={{height:"100%", width:"100%"}} id="goPrev" type="button" className="btn btn-light btn-sm m-0"><i
                           className="bi bi-chevron-left"></i></button>
                   </div>
                   <div style={{display:"inline-block", maxWidth:"90%"}} className={"p-0 m-0"}>
                       <div on id={"nav-container"} style={{overflow:"hidden", width:"100%"}}>
                           <div style={{ width:"100%", flexWrap:"nowrap"}} className="nav nav-tabs" id="nav-tab" role="tablist">
                               {
                                   tabList.map((tab)=>(
                                       <GetArtifactTab tab={tab} setTab={setTab}  />
                                   ))
                               }
                           </div>
                       </div>
                   </div>
                    <div style={{display:"inline-block", maxWidth:"5%"}} className={"p-0 m-0"}>
                        <button style={{height:"100%", width:"100%"}} id="goNext" type="button" className="btn btn-light btn-sm m-0"><i
                            className="bi bi-chevron-right"></i></button>
                    </div>
               </div>

           </nav>
           <div className={"tab-content"} id={"nav-tabContent"}>
               {
                   tabList.map((tab) => (
                       <GetTabContent tab={tab} setTab={setTab} onArtifactChecked={onArtifactChecked}/>
                   ))
               }
           </div>
       </div>
    );
}