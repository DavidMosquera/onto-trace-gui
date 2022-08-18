import React, {useEffect, useState} from 'react';
import {GetTabContent} from "./ArtifactTraceViewerTabContent";
import {GetUserStoryListItem} from "./UserStoryListItem";

export function GetUserStoryList({onSeeArtifact, canIChangeArtifact}){
    const projectId = localStorage.getItem("current-project");
    const [userStories, setUserStories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        fetch("http://localhost:8080/onto-trace-api/ontology-web-services/user-stories/id="+projectId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(Object.keys(data).length !== 0){
                        const {_embedded:{sourceList}} = data
                        let processedUserStories = []
                        sourceList.forEach((userStory)=>{
                            let processedUserStory = {
                                name:userStory.individualURI.split("#")[1],
                                goal:null,
                                action:null,
                                objects: [],
                                role:null
                            }
                            userStory.statements.forEach((statement) => {
                                if(statement.match(/.*#hasPartGoal.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedUserStory.goal = statement
                                }
                                if(statement.match(/.*#hasPartAction.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedUserStory.action = statement
                                }
                                if(statement.match(/.*#hasPartRole/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedUserStory.role = statement
                                }
                                if(statement.match(/.*ontotrace:performObject.*/g)){
                                    statement = statement.split(" ")[2].replaceAll(/<|>|\s|/g, "").slice(0,-1)
                                    processedUserStory.objects = [...processedUserStory.objects, statement]
                                }
                            })
                            processedUserStories.push(processedUserStory)
                        })
                        processedUserStories.sort(function (a, b) {
                            if (Number(a.name.split("_")[1]) > Number(b.name.split("_")[1])) {
                                return 1;
                            }
                            if (Number(b.name.split("_")[1]) > Number(a.name.split("_")[1])) {
                                return -1;
                            }
                            return 0;
                        });
                        setUserStories(processedUserStories)
                    }
                    setIsLoading(false)
                },
                (error) => {
                    //TODO ERROR!!
                    setIsLoading(false)
                }
            )
    },[])

    if(isLoading){
        return (<div className={"row pt-1 ms-0 border border-info"} style={{height: "100%", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"50%"}}>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>);
    }else if(userStories.length===0){
        return (<div className={"row pt-1 ms-0 border"} style={{height: "100%", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"100%"}}>
                    <p className={"font-weight-bold"}>There is not yet a source artifact registered!</p>
                </div>
            </div>
        </div>);
    }
    return(
      <div className="accordion accordion-flush">
          {
              userStories.map((userStory) => (
                  <GetUserStoryListItem canIChangeArtifact={canIChangeArtifact} userStory={userStory} onSeeArtifact={onSeeArtifact}/>
              ))
          }
      </div>
        );
}