import React, {useState} from 'react'

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
                    <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"} className="card card-body text-decoration-none" onClick={handleRoleStoryClick}>
                        {role.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                    <a style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} href={"#"}  className="card card-body text-decoration-none" onClick={handleActionStoryClick}>
                        {action.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                    {
                        objects.map((object) =>{
                            return(
                                <a href={"#"} style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} className="card card-body text-decoration-none" onClick={()=>{
                                    const objectArtifact = {individualURI:object}
                                    onSeeArtifact(objectArtifact)
                                }
                            }>
                                {object.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                            </a>)
                        })
                    }
                    <a href={"#"} style={{cursor:canIChangeArtifact?"default":"progress", opacity:canIChangeArtifact?"1.0":"0.6"}} className="card card-body text-decoration-none" onClick={handleGoalStoryClick}>
                        {goal.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                </div>
            </div>
        </div>
    );
}