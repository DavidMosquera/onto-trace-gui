import React, {useState} from 'react'
import {GetTextArtifact} from "./TextArtifact";

export function GetUserStoryListItem({userStory, onSeeArtifact, canIChangeArtifact}){
    const {name,goal,action,role, objects} = userStory
    const handleGoalStoryClick = () => {
        const artifact = {
            individualURI:goal
        }
        onSeeArtifact(artifact)
    }
    const handleActionStoryClick = () => {
        const artifact = {
            individualURI:action
        }
        onSeeArtifact(artifact)
    }
    const handleRoleStoryClick = () => {
        const artifact = {
            individualURI:role
        }
        onSeeArtifact(artifact)
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={"heading"+name}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={"#"+name} aria-expanded="true" aria-controls={name}>
                    {name.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                </button>
            </h2>
            <div id={name} className="accordion-collapse collapse" aria-labelledby={"heading"+name}>
                <div className="accordion-body">
                    <div className="card card-body">
                        <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={role} seeArtifact={onSeeArtifact}/>
                    </div>
                    <div className="card card-body">
                        <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={action} seeArtifact={onSeeArtifact}/>
                    </div>
                    {
                        objects.map((object) => {
                            return <div className="card card-body ">
                                <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={object} seeArtifact={onSeeArtifact}/>
                            </div>})
                    }
                    <div className="card card-body ">
                        <GetTextArtifact canIChangeArtifact={canIChangeArtifact} artifactUri={goal} seeArtifact={onSeeArtifact}/>
                    </div>
                </div>
            </div>
        </div>
    );
}