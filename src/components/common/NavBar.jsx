import React from 'react';
import Logo from '../../assets/withe-logo.png'
export function GetNavbar(){
    return (
        <nav className={"navbar navbar-expand-lg navbar-dark"} style={{background:"#1F1F1F"}}>
            <div className={"container-fluid"}>
                <a href={"#"} className={"navbar-brand"}><img className={"img-fluid"} style={{maxWidth:"100px"}} src={Logo}/></a>
                <button className={"navbar-toggler"} data-bs-toggle={"collapse"} data-bs-target={"#navbar"}>
                    <span className={"navbar-toggler-icon"}></span>
                </button>
            </div>
        </nav>
    );
}