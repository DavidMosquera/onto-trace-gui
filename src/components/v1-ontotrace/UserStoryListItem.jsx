import React, {useState} from 'react'

export function GetUserStoryListItem({userStory, onSeeArtifact}){
    const {name,goal,action,role, objects} = userStory
    const [userStoryClicked, setUserStoryClicked] = useState(false)
    const handleUserStoryClick = ()=>{
        setUserStoryClicked(!userStoryClicked)
    }
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
                    <a href={"#"} className="card card-body text-decoration-none" onClick={handleRoleStoryClick}>
                        {role.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                    <a href={"#"}  className="card card-body text-decoration-none" onClick={handleActionStoryClick}>
                        {action.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                    {
                        objects.map((object) =>{
                            return(<a href={"#"}  className="card card-body text-decoration-none" onClick={()=>{
                                    const objectArtifact = {individualURI:object}
                                    onSeeArtifact(objectArtifact)
                                }
                            }>
                                {object.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                            </a>)
                        })
                    }
                    <a href={"#"}  className="card card-body text-decoration-none" onClick={handleGoalStoryClick}>
                        {goal.replace(/http([\s\S]*?)#|<|>/g, "").replace(/_/g, " ")}
                    </a>
                </div>
            </div>
        </div>
    );
}