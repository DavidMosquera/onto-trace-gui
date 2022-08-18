import React, {Fragment, useState, useEffect} from 'react';
import {GetNavbar} from "../components/common/NavBar";
import {GetFooter} from "../components/common/Footer";
import {GetSuggestedArtifactListItem} from "../components/v1-ontotrace/SuggestedArtifactListItem";
import {ProjectCard} from "../components/v1-projects/ProjectCard";
import {NoProjects} from "../components/common/Empty";

export function Projects(){
    const [userProjects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //TODO check if the token exists
    let uuid = localStorage.getItem("token")
    localStorage.removeItem("current-project")
    localStorage.removeItem("current-project-name")
    localStorage.removeItem("current-project-type")
    const fetchProjectsFromAPI = () => {
        setIsLoading(true)
        fetch("http://localhost:8080/onto-trace-api/users/id="+uuid+"/projects").then((res) => {
            if(res.ok){
                res.json().then((data) => {
                    if(!(Object.keys(data).length === 0)){
                        const {_embedded:{oWLOntoTraceFileList}} = data
                        setProjects(oWLOntoTraceFileList)
                    }
                    setIsLoading(false)
                })
            }else{
                //TODO ERROR HANDLING
                setIsLoading(false)
            }}
        )
    }
    useEffect(()=>{
        fetchProjectsFromAPI()
    },[])
    if(isLoading){
        return (<div className={"row pt-1 ms-0 border border-info"} style={{height: "100vh", maxWidth:"100%", overflow:"auto"}}>
            <div className="col-md-12">
                <div className="text-center align-middle" style={{paddingTop:"45vh"}}>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>);
    }
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