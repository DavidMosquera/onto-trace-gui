import React, {Fragment} from 'react';
import CustomProjectImage from '../../assets/custom.png'
import UserStoryClassDiagramImage from '../../assets/us-class.png'
import UserStoryCode from '../../assets/us-code.png'
import {useNavigate} from "react-router-dom";

export function ProjectCard({project}) {
    let {projectName, creationDate, type, id} = project;
    creationDate = new Date(creationDate)
    const navigate = useNavigate();
    const onProjectClick = () =>{
        localStorage.setItem("current-project", id)
        localStorage.removeItem("tab")
        navigate("/v1/onto-trace")
    }
    return (
        <Fragment key={id}>
            <div className="card d-inline-flex m-1 shadow-sm p-3 mb-1 bg-white rounded" style={{width:"18rem"}}>
                {type === "us-ooclass" && <img className="card-img-top" src={UserStoryCode} style={{maxHeight:"9rem"}} alt="Card image cap"/>}
                {type === "custom" && <img className="card-img-top" src={CustomProjectImage} style={{maxHeight:"9rem"}} alt="Card image cap"/>}
                {type === "us-umlclass" && <img className="card-img-top" src={UserStoryClassDiagramImage} style={{maxHeight:"9rem"}} alt="Card image cap"/>}
                <div className="card-body">
                    <h5 className="card-title text-truncate">{projectName}</h5>
                    <p className="card-text">{creationDate.getDay()+"/"+creationDate.getMonth()+"/"+creationDate.getFullYear()}</p>
                    <a href="#" className="btn btn-primary" onClick={onProjectClick}>Lets Trace!</a>
                </div>
            </div>
        </Fragment>
    );
}