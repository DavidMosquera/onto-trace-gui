import React, {Fragment, useState, useEffect} from 'react';
import {GetNavbar} from "../components/common/NavBar";
import {GetFooter} from "../components/common/Footer";
import {GetSuggestedArtifactListItem} from "../components/v1-ontotrace/SuggestedArtifactListItem";

export function Projects(){
    const [userProjects, setProjects] = useState([]);
    //TODO check if the token exists
    let uuid = localStorage.getItem("token")
    fetch("http://localhost:8080/onto-trace-api/users/id="+uuid+"/projects").then((res) => {
        if(res.ok){
            res.json().then((data) => {
                setProjects(data._embedded.oWLOntoTraceFileList)
            })
        }else{
            //TODO ERROR HANDLING
        }}
    )
   return(
            <Fragment>
                <GetNavbar/>
                {
                    userProjects.map((userProject, index) => (
                        userProject.projectName + " " + userProject.fileName + " \n"
                    ))
                }
                <GetFooter/>
            </Fragment>
        )
}