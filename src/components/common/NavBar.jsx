import React from 'react';
import Logo from '../../assets/withe-logo.png'
import {useNavigate} from "react-router-dom";
export function GetNavbar({projectMenu}){
    const email = localStorage.getItem("email")
    const projectName = localStorage.getItem("current-project-name")
    const projectType = localStorage.getItem("current-project-type")
    const navigate = useNavigate()
    const onLogoClick = () => {
        navigate("/projects")
    }
    return (
        <nav className={"navbar navbar-expand-lg navbar-dark container-fluid"} style={{background:"#1F1F1F"}}>
            <a href={"#"} className={"navbar-brand "} onClick={onLogoClick}><img className={"img-fluid"} style={{maxWidth:"100px"}} src={Logo}/></a>
            <button className={"navbar-toggler"} data-bs-toggle={"collapse"} data-bs-target={"#navbarNav"}>
                <span className={"navbar-toggler-icon"}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link">{email}</a>
                    </li>
                    {!projectMenu && <li className="nav-item">
                        <a className="nav-link">Currently working on: <strong>{projectName}</strong></a>
                    </li>}
                    {!projectMenu && <li className="nav-item">
                        <a className="nav-link">Tracing: <strong>{projectType === "us-umlclass" && "User Stories and Class Diagrams"}{projectType==="us-edg" && "User Stories and EDG"}</strong></a>
                    </li>}
                </ul>
            </div>
        </nav>
    );
}