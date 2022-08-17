import React, {Fragment, useState, useEffect} from 'react';
import {GetNavbar} from "../components/common/NavBar";
import {GetFooter} from "../components/common/Footer";
import {GetSuggestedArtifactListItem} from "../components/v1-ontotrace/SuggestedArtifactListItem";
import {ProjectCard} from "../components/v1-projects/ProjectCard";
import {NoProjects} from "../components/common/Empty";

export function Projects(){
    const [userProjects, setProjects] = useState([]);
    //TODO check if the token exists
    let uuid = localStorage.getItem("token")
    const fetchProjectsFromAPI = () => {
        fetch("http://localhost:8080/onto-trace-api/users/id="+uuid+"/projects").then((res) => {
            if(res.ok){
                res.json().then((data) => {
                    if(!(Object.keys(data).length === 0)){
                        const {_embedded:{oWLOntoTraceFileList}} = data
                        setProjects(oWLOntoTraceFileList)
                    }
                })
            }else{
                //TODO ERROR HANDLING
            }}
        )
    }
    fetchProjectsFromAPI()
   return(
            <Fragment>
                <GetNavbar/>
                <div className={"col-md-12 overflow-auto"} style={{maxHeight: "85vh", flex:"1"}}>
                    { userProjects.length > 0 &&
                        userProjects.map((userProject, index) => (
                            <ProjectCard project={userProject}/>
                        ))
                    }
                    {userProjects.length == 0 &&
                        <NoProjects fetchProjectFunction={fetchProjectsFromAPI}/>
                    }
                </div>

                <GetFooter/>
            </Fragment>
        )
}